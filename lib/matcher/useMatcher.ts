"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { menuItems } from "../mockData.ts";
import { menuHash } from "./itemText.ts";
import { parseQuery, type ParsedQuery } from "./parseQuery.ts";
import { rankMenu, type RankResult, type Vector } from "./rank.ts";

export type MatcherStatus = "idle" | "loading" | "ready" | "error";

export interface MatcherOutcome extends RankResult {
  query: ParsedQuery;
}

type WorkerOut =
  | { type: "progress"; loaded: number; total: number }
  | { type: "ready" }
  | { type: "vector"; id: number; vector: Float32Array }
  | { type: "error"; message: string; id?: number };

/** True when the visitor's browser asks us to go easy on data. */
function prefersLowData() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  return Boolean(c?.saveData || c?.effectiveType === "2g" || c?.effectiveType === "slow-2g");
}

/**
 * Owns the AI worker and the precomputed menu index.
 *
 * - The model starts downloading as soon as the page mounts, unless the
 *   browser signals Save-Data / 2G — then it waits for the first interaction
 *   (`prepare()`), so nobody burns 23 MB just by opening the page.
 * - `match(text)` = parse rules → embed in the worker → rank. Returns null if
 *   a newer query superseded it (typing fast never shows stale results).
 */
export function useMatcher() {
  const [status, setStatus] = useState<MatcherStatus>("idle");
  const [progress, setProgress] = useState({ loaded: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const pending = useRef(new Map<number, { resolve: (v: Float32Array) => void; reject: (e: Error) => void }>());
  const nextId = useRef(0);
  const latest = useRef(0);
  const index = useRef<Promise<Map<string, Vector>> | null>(null);

  const loadIndex = useCallback(() => {
    index.current ??= import("./menuEmbeddings.json").then((mod) => {
      const data = mod.default;
      if (data.menuHash !== menuHash(menuItems)) {
        console.warn("[matcher] menuEmbeddings.json is stale — run `npm run embed`.");
      }
      return new Map<string, Vector>(data.items.map((e) => [e.id, e.v]));
    });
    return index.current;
  }, []);

  const prepare = useCallback(() => {
    if (workerRef.current) return;
    const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
    workerRef.current = worker;
    setStatus("loading");
    setError(null);

    worker.addEventListener("message", (event: MessageEvent<WorkerOut>) => {
      const msg = event.data;
      if (msg.type === "progress") setProgress({ loaded: msg.loaded, total: msg.total });
      else if (msg.type === "ready") setStatus("ready");
      else if (msg.type === "vector") {
        pending.current.get(msg.id)?.resolve(msg.vector);
        pending.current.delete(msg.id);
      } else if (msg.type === "error") {
        if (msg.id !== undefined) {
          pending.current.get(msg.id)?.reject(new Error(msg.message));
          pending.current.delete(msg.id);
        }
        console.error("[matcher]", msg.message);
        setStatus("error");
        setError(msg.message);
        worker.terminate();
        workerRef.current = null;
      }
    });
    worker.addEventListener("error", (event) => {
      console.error("[matcher] worker failed to start", event.message);
      setStatus("error");
      setError(event.message || "Worker failed to start");
      workerRef.current = null;
    });

    worker.postMessage({ type: "load" });
    void loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    if (!prefersLowData()) prepare();
    const pendingMap = pending.current;
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      pendingMap.clear();
    };
  }, [prepare]);

  const embed = useCallback(
    (text: string) =>
      new Promise<Float32Array>((resolve, reject) => {
        prepare();
        const id = ++nextId.current;
        pending.current.set(id, { resolve, reject });
        workerRef.current?.postMessage({ type: "embed", id, text });
      }),
    [prepare]
  );

  const match = useCallback(
    async (text: string): Promise<MatcherOutcome | null> => {
      const ticket = ++latest.current;
      const query = parseQuery(text);
      const [vectors, queryVector] = await Promise.all([loadIndex(), embed(query.semantic)]);
      if (ticket !== latest.current) return null;
      return { query, ...rankMenu(queryVector, query, menuItems, vectors) };
    },
    [embed, loadIndex]
  );

  const retry = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    prepare();
  }, [prepare]);

  return { status, progress, error, prepare, match, retry };
}
