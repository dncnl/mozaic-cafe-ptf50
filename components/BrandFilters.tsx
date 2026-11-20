/**
 * SVG filter definitions referenced from globals.css.
 *
 * Rendered once, layout-level. Kept as real markup rather than a data: URI so
 * the duotone ramp stays readable and editable, and so nothing here depends on
 * the CSP's img-src.
 */
export default function BrandFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/*
          Blue duotone — the photo treatment used across the pubmats. Collapses
          the image to luminance, then maps that single channel onto a ramp
          running from --moz-ink (#1e40a0) in the shadows to a near-white
          (#f5f5f5) in the highlights.

          tableValues are those two hex colors as 0–1 channel pairs, so any
          phone photo dropped into the site lands on-brand without retouching.
        */}
        <filter id="moz-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.118 0.961" />
            <feFuncG type="table" tableValues="0.251 0.949" />
            <feFuncB type="table" tableValues="0.627 0.925" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
