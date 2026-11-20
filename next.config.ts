import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Next.js App Router streams RSC payload chunks via inline <script> tags,
// so script-src can't be locked down to 'self' alone without a per-request
// nonce (which needs middleware, not this static config) — 'unsafe-inline'
// is a practical necessity here, not an oversight. 'unsafe-eval' is dev-only
// (Turbopack HMR needs it) and is dropped in production builds.
//
// AI matcher (/match) additions — remove any of these and the matcher breaks:
//  - 'wasm-unsafe-eval': lets the browser compile WebAssembly (ONNX Runtime).
//    It does NOT allow JS eval(); it's the narrow, wasm-only permission.
//  - worker-src 'self' blob:: the model runs in our own module Web Worker.
//  - connect-src huggingface.co + *.hf.co: the model weights (~23 MB, once,
//    then browser-cached) download from the free Hugging Face Hub, which
//    redirects to its CDN subdomains. No API key involved.
//  The ONNX Runtime engine itself is self-hosted under /ort/ (copy-ort.ts),
//  so no third-party script origin is needed.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isProd ? "" : " 'unsafe-eval'"}`,
  "worker-src 'self' blob:",
  "connect-src 'self' https://huggingface.co https://*.huggingface.co https://*.hf.co",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;
