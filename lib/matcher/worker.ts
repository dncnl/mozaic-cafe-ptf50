/// <reference lib="webworker" />

/**
 * Web Worker that runs the AI model, so the page never freezes while the
 * model downloads or thinks.
 *
 * The model (all-MiniLM-L6-v2, ~23 MB quantised) is fetched once from the
 * Hugging Face Hub — free, no API key — and kept in the browser's Cache
 * Storage, so later visits load it instantly and work offline. The ONNX
 * Runtime engine is served from our own /ort/ (see scripts/copy-ort.ts).
 *
 * Protocol
 *   in : { type: "load" } | { type: "embed", id, text }
 *   out: { type: "progress", loaded, total } | { type: "ready" }
 *      | { type: "vector", id, vector } | { type: "error", message, id? }
 */
import { env, pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { MODEL_DTYPE, MODEL_ID } from "./itemText.ts";

env.allowLocalModels = false;
env.useBrowserCache = true;
// Load the engine straight from /ort/ instead of re-wrapping it as a blob:
// URL. The blob route needs `blob:` in script-src; same-origin static files
// are HTTP-cached by the browser anyway, so nothing is lost.
env.useWasmCache = false;
const onnx = env.backends.onnx as { wasm?: { wasmPaths?: unknown; numThreads?: number } };
if (onnx.wasm) {
  onnx.wasm.wasmPaths = {
    mjs: "/ort/ort-wasm-simd-threaded.mjs",
    wasm: "/ort/ort-wasm-simd-threaded.wasm",
  };
  // No cross-origin isolation on this site, so no SharedArrayBuffer threads.
  onnx.wasm.numThreads = 1;
}

type ProgressEvent = { status: string; file?: string; loaded?: number; total?: number };

let extractor: Promise<FeatureExtractionPipeline> | null = null;
const files = new Map<string, { loaded: number; total: number }>();

function load() {
  extractor ??= pipeline("feature-extraction", MODEL_ID, {
    dtype: MODEL_DTYPE,
    device: "wasm",
    progress_callback: (e: ProgressEvent) => {
      if (e.status === "progress" && e.file && e.total) {
        files.set(e.file, { loaded: e.loaded ?? 0, total: e.total });
        let loaded = 0;
        let total = 0;
        for (const f of files.values()) {
          loaded += f.loaded;
          total += f.total;
        }
        self.postMessage({ type: "progress", loaded, total });
      }
    },
  }) as Promise<FeatureExtractionPipeline>;
  return extractor;
}

self.addEventListener("message", async (event: MessageEvent) => {
  const msg = event.data as { type: "load" } | { type: "embed"; id: number; text: string };
  try {
    if (msg.type === "load") {
      await load();
      self.postMessage({ type: "ready" });
    } else if (msg.type === "embed") {
      const model = await load();
      const output = await model(msg.text, { pooling: "mean", normalize: true });
      // Own copy, so transferring its buffer can't detach anything ORT reuses.
      const vector = new Float32Array(output.data as Float32Array);
      self.postMessage({ type: "vector", id: msg.id, vector }, [vector.buffer]);
    }
  } catch (err) {
    extractor = null; // allow a retry
    self.postMessage({
      type: "error",
      id: msg.type === "embed" ? msg.id : undefined,
      message: err instanceof Error ? err.message : String(err),
    });
  }
});
