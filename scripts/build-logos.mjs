// Rasterises the brand logo SVGs to WebP for the header and footer.
//
//   node scripts/build-logos.mjs    (run from the MetagenFrontend root)
//
// Why this exists: MetaGen-Logo.svg and MetaGen-Logo-w.svg are ~105 KB each,
// not because of sloppy float precision but because the mark's gradient was
// traced from a raster — it is stored as ~30,000 hairline 0.1px scanline
// slivers packed into two <path> elements (one is 29 KB by itself). SVGO
// reports 0% savings on them, because that is all real geometry.
//
// The logo renders at 32-40 CSS px. Paying 105 KB of XML parse plus a very
// expensive rasterize on a throttled mobile CPU, on every page, for a 36px
// mark is a bad trade, so we ship a 3x WebP instead (~7 KB) and keep the SVGs
// as the source of truth.
//
// If the logo is ever re-exported from the design file with a real
// <linearGradient> instead of the traced slivers, the SVG becomes a couple of
// KB and this script — plus the <img> swaps in AppHeader.vue / AppFooter.vue —
// can be dropped.
//
// `density` is what the SVG is rendered at before downscaling; 900 gives
// librsvg enough resolution that the slivers resolve into a smooth gradient
// rather than banding.
import sharp from 'sharp'

// height = 3x the largest CSS height each logo is displayed at:
//   header  h-8 / md:h-9  -> 36 CSS px  (AppHeader.vue)
//   footer  h-10          -> 40 CSS px  (AppFooter.vue)
// Keep these in step with those classes, and with the width/height attributes
// on the <img> tags — those attrs are what reserve the box against CLS.
const LOGOS = [
  { src: 'public/images/MetaGen-Logo.svg',   out: 'public/images/MetaGen-Logo.webp',   height: 108 },
  { src: 'public/images/MetaGen-Logo-w.svg', out: 'public/images/MetaGen-Logo-w.webp', height: 120 },
]

for (const { src, out, height } of LOGOS) {
  const buf = await sharp(src, { density: 900 })
    .resize({ height })
    .webp({ quality: 92, effort: 6 })
    .toBuffer()

  await sharp(buf).toFile(out)
  const { width, height: h } = await sharp(buf).metadata()
  console.log(`${out}  ${width}x${h}  ${(buf.length / 1024).toFixed(1)} KB`)
}
