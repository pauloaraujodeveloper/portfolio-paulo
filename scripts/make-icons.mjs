/**
 * Regenerates the raster icons from the vector mark.
 *
 *   node scripts/make-icons.mjs
 *
 * The social preview (public/og.png, 1200×630) is produced from
 * scripts/og-card.html with a browser screenshot and cropped with sharp:
 *
 *   sharp("screenshot.png")
 *     .extract({ left: 0, top: 0, width: 1200, height: 630 })
 *     .png({ compressionLevel: 9 })
 *     .toFile("public/og.png");
 */
import sharp from "sharp";

const fullBleed = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5b8cff" />
      <stop offset="1" stop-color="#2557e0" />
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="url(#tile)" />
  <text x="90" y="94" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif"
        font-size="72" font-weight="700" letter-spacing="-3"
        text-anchor="middle" dominant-baseline="central">PA</text>
</svg>`;

await sharp(Buffer.from(fullBleed)).png().toFile("public/apple-touch-icon.png");
await sharp("public/favicon.svg", { density: 384 }).resize(32, 32).png().toFile("public/favicon-32.png");

console.log("icons written: public/apple-touch-icon.png, public/favicon-32.png");
