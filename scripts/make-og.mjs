// Generates the 1200x630 Open Graph share images from the brand logo + palette.
//
//   node scripts/make-og.mjs        (run from the MetagenFrontend root)
//
// Writes public/og/home.jpg here, and ../Hosting/public/og-hosting.png when the
// sibling Hosting checkout exists — same sibling-folder convention nuxt.config
// uses for MetagenShared. Re-run after changing the headline copy or prices;
// the Hosting subtitle quotes the Starter price from MetagenBackend's
// config/hosting.php, so keep the two in step.
import sharp from 'sharp'
import { existsSync, readFileSync } from 'node:fs'

const W = 1200
const H = 630

// Brand palette, from tailwind.config.js in both apps.
const NAVY = '#1D1D47' // footer-bg
const PRIMARY = '#303c8e'
const ORANGE = '#FF6B35'
const PURPLE = '#7C3AED'
const CYAN = '#0EA5E9'

function background({ accentA, accentB }) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="55%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentA}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${accentA}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentB}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${accentB}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${W - 120}" cy="90" r="380" fill="url(#glowA)"/>
  <circle cx="80" cy="${H - 40}" r="340" fill="url(#glowB)"/>
  <!-- thin accent rule along the bottom edge -->
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${accentA}"/>
</svg>`)
}

/** SVG is XML — a bare & or < in copy is a parse error, not a literal. */
const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

function textLayer({ headline, sub, domain, accent }) {
  // Two-line headlines are passed pre-split so line breaks stay deliberate.
  const lines = Array.isArray(headline) ? headline : [headline]
  const startY = 330 - (lines.length - 1) * 34

  const headlineTspans = lines
    .map((line, i) => `<tspan x="90" y="${startY + i * 68}">${esc(line)}</tspan>`)
    .join('')

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <text font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="58"
        fill="#FFFFFF" letter-spacing="-1">${headlineTspans}</text>
  <text x="90" y="${startY + lines.length * 68 + 6}" font-family="Helvetica, Arial, sans-serif"
        font-size="28" fill="#FFFFFF" fill-opacity="0.78">${esc(sub)}</text>
  <text x="90" y="${H - 62}" font-family="Helvetica, Arial, sans-serif" font-weight="bold"
        font-size="24" fill="${accent}" letter-spacing="1">${esc(domain)}</text>
</svg>`)
}

async function build({ out, logoPath, logoWidth, headline, sub, domain, accentA, accentB, format }) {
  const logo = await sharp(readFileSync(logoPath), { density: 400 })
    .resize({ width: logoWidth })
    .png()
    .toBuffer()

  const image = sharp(background({ accentA, accentB })).composite([
    { input: logo, top: 78, left: 90 },
    { input: textLayer({ headline, sub, domain, accent: accentA }), top: 0, left: 0 },
  ])

  const output = format === 'jpg'
    ? image.jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    : image.png({ compressionLevel: 9 })

  await output.toFile(out)
  const meta = await sharp(out).metadata()
  console.log(`${out} → ${meta.width}x${meta.height} ${meta.format}`)
}

await build({
  out: 'public/og/home.jpg',
  logoPath: 'public/images/MetaGen-Logo-w.svg',
  logoWidth: 300,
  headline: ['We Grow Your Business', 'Online'],
  sub: 'Digital marketing, web development & e-commerce — Bangladesh',
  domain: 'metagendigital.com',
  accentA: ORANGE,
  accentB: PURPLE,
  format: 'jpg',
})

// Sibling checkout only — skipped silently when Hosting isn't alongside.
if (existsSync('../Hosting/public')) {
  await build({
    out: '../Hosting/public/og-hosting.png',
    logoPath: 'public/images/MetaGen-Logo-w.svg',
    logoWidth: 300,
    headline: ['Domain & Hosting', 'Bangladesh'],
    sub: 'From BDT 300/month · bKash, Nagad, Rocket · 24h setup',
    domain: 'hosting.metagendigital.com',
    accentA: CYAN,
    accentB: PURPLE,
    format: 'png',
  })
}
else {
  console.log('../Hosting/public not found — skipped og-hosting.png')
}
