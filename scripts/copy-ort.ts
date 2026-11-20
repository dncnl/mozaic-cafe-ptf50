// Runs automatically before `npm run dev` and `npm run build` (predev/prebuild).
//
// Copies ONNX Runtime Web's WebAssembly engine into public/ort/ so the AI
// model runs from our own origin. Without this, Transformers.js fetches the
// engine from cdn.jsdelivr.net at runtime — which our CSP blocks, and which
// would add a third-party dependency to the demo. public/ort/ is gitignored:
// it's regenerated from node_modules on every build, so it always matches the
// installed onnxruntime-web version.
//
// Only the plain SIMD build (~14 MB raw, ~3.5 MB compressed) is copied: the
// matcher runs on the CPU ("wasm" device), so the larger WebGPU builds
// (asyncify/jsep/jspi) would just be dead weight.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../node_modules/onnxruntime-web/dist/", import.meta.url));
const dest = fileURLToPath(new URL("../public/ort/", import.meta.url));
const files = ["ort-wasm-simd-threaded.mjs", "ort-wasm-simd-threaded.wasm"];

mkdirSync(dest, { recursive: true });
for (const file of files) {
  if (!existsSync(src + file)) {
    console.error(`copy-ort: missing ${file} — is @huggingface/transformers installed?`);
    process.exit(1);
  }
  copyFileSync(src + file, dest + file);
}
console.log(`copy-ort: ${files.length} files → public/ort/`);
