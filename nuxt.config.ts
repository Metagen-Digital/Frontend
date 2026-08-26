export default defineNuxtConfig({
  // Shared auth/API layer. For local co-development against a checkout, swap to
  // extends: ['../MetagenShared'] — but keep the Git URL committed (Vercel repos
  // don't have the sibling folder). See MetagenShared/README.md.
  extends: ['github:Metagen-Digital/Shared#main'],

  compatibilityDate: '2025-07-15',
  // metagendigital.com — deployed on Vercel (Metagen-Digital org).
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    'nuxt-gtag',
  ],

  // Google Analytics 4 for metagendigital.com. A GA Measurement ID is not a
  // secret (it ships in the browser anyway), so the site's own ID is the
  // default; NUXT_PUBLIC_GTAG_ID can still override it. Loads in production only.
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-L26L10C4V1',
    enabled: process.env.NODE_ENV === 'production',
    // The dataLayer/gtag() queue is still created synchronously (module
    // behavior, unaffected by this), so useTrackEvent() calls before the
    // real script arrives are buffered, not lost. 'manual' only skips
    // auto-injecting the gtag.js <script> — see app/plugins/analytics-defer.client.ts,
    // which calls initialize() once idle/interaction, keeping it off the
    // initial mobile-throttled load's critical path (Lighthouse Performance).
    initMode: 'manual',
  },

  // Absolute site URL for sitemap, canonical and og tags.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://metagendigital.com',
    name: 'MetaGen Digital',
  },

  css: ['~/assets/css/main.css'],

  // Register all components without directory prefix
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // Weights below were audited against actual `font-*` utility usage across
  // app/ (2026-08-20) rather than trimmed by guess:
  //   Inter (default body font)  — 400/500/600/700 all genuinely used
  //     (400: 5×, 500: 31×, 600: 155×, 700: 123×); 800 dropped (2 uses only).
  //   Plus Jakarta Sans (`.font-display`, headings) — only ever paired with
  //     font-bold/font-extrabold (700/800); the declared 600 had zero uses.
  //   Space Grotesk (`.font-mono`) — used exactly once (dashboard invoice
  //     number, noindex page) and only at font-bold; 400/500 were dead weight.
  //   Hind Siliguri — all five weights, and they are now actually reachable:
  //     it is appended to the `sans` and `display` stacks (tailwind.config.js
  //     + app/assets/css/main.css) so Bengali glyphs, which exist in neither
  //     Inter nor Plus Jakarta Sans, fall through to it per glyph. Until that
  //     was wired the family was downloaded and never rendered — Bangla came
  //     out in whatever the OS substituted.
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'Plus Jakarta Sans': [700, 800],
      'Space Grotesk': [700],
      'Hind Siliguri': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    // Self-host: without this every page pays a separate DNS + TLS handshake
    // to fonts.googleapis.com/fonts.gstatic.com before the fonts can even
    // start downloading — pure latency on the LCP-critical path.
    download: true,
    preload: true,
    subsets: ['latin', 'bengali'],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'bn', language: 'bn-BD', name: 'বাংলা', dir: 'ltr', file: 'bn.json' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: './i18n.config.ts',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { charset: 'utf-8' },
        // Google Search Console verification. Set NUXT_PUBLIC_GSC_VERIFICATION
        // to the token Search Console gives you (HTML-tag method).
        ...(process.env.NUXT_PUBLIC_GSC_VERIFICATION
          ? [{ name: 'google-site-verification', content: process.env.NUXT_PUBLIC_GSC_VERIFICATION }]
          : []),
        // Bing Webmaster Tools. Worth having: Bing's index also backs DuckDuckGo
        // and ChatGPT search. Token from bing.com/webmasters (HTML-meta method).
        ...(process.env.NUXT_PUBLIC_BING_VERIFICATION
          ? [{ name: 'msvalidate.01', content: process.env.NUXT_PUBLIC_BING_VERIFICATION }]
          : []),
        // Meta domain verification — required for iOS 14+ Aggregated Event
        // Measurement, without which Purchase/Lead optimisation is degraded.
        // Token from Events Manager → Brand Safety → Domains.
        ...(process.env.NUXT_PUBLIC_FB_DOMAIN_VERIFICATION
          ? [{ name: 'facebook-domain-verification', content: process.env.NUXT_PUBLIC_FB_DOMAIN_VERIFICATION }]
          : []),
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    },
  },

  image: {
    // NOTE: `format` here only orders the candidates <NuxtPicture> negotiates.
    // <NuxtImg> does NOT read it — it needs an explicit format="webp" prop, and
    // without one it emits /_ipx/…/foo.png, i.e. a resized original in the
    // source format. Every <NuxtImg> in app/ passes the prop for that reason;
    // this stays for the picture path and as the documented default.
    format: ['webp'],
    quality: 85,
    // Allow-list for REMOTE sources. Anything outside it is rendered untouched
    // rather than proxied, so CMS uploads are optimised while third-party
    // stock URLs (unsplash on /about) pass straight through — deliberate: we
    // do not want our own server transcoding someone else's CDN images.
    domains: ['localhost', 'api.bytestacklab.com', 'api.metagendigital.com'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      cookieDomain: process.env.COOKIE_DOMAIN || '',
      // Meta (Facebook) Pixel ID from Events Manager. Not a secret — it ships
      // in the browser. Empty means the pixel plugin stays inert, so previews
      // and local dev never pollute ad reporting. See app/plugins/meta-pixel.client.ts
      fbPixelId: process.env.NUXT_PUBLIC_FB_PIXEL_ID || '',
      // Sentry DSN — not a secret (it ships in the browser). Empty means the
      // error-monitoring plugin stays inert. See app/plugins/sentry.client.ts
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
    },
  },

  icon: {
    // 'local' bundles @iconify-json/mdi (installed as a devDependency) into
    // the server build, so every icon literal in app/ — the overwhelming
    // majority — resolves with no network round-trip at all.
    //
    // Content editors can also type ANY Iconify name into the free-text
    // "Service Icon" field in Filament (see ServiceResource.php — it is not
    // restricted to mdi:*), so this must NOT be an exclusive local set: the
    // module's default `fallbackToApi` (left on, not overridden here) sends
    // an icon to api.iconify.design only when it is not in the local bundle —
    // exactly the old always-remote behavior, but now only for the rare case
    // instead of every request.
    serverBundle: 'local',
    // Pre-bundles icons the client can statically find in app/ so they are
    // present on first paint rather than fetched after hydration. Dynamic,
    // DB-driven icon names (Service.icon, category icons, …) are not
    // discoverable by static scanning and fall through to the server route
    // above — this is a prefetch optimization, not a restriction.
    clientBundle: {
      scan: true,
    },
  },

  sitemap: {
    // Pull dynamic slugs (blog/services/portfolio/products/careers) from the API.
    sources: ['/api/__sitemap__/urls'],
  },

  hooks: {
    // Stop Nuxt prefetching the Sentry chunk on every page load.
    //
    // sentry.client.ts imports @sentry/browser dynamically and only when a DSN
    // is configured, which keeps it out of the entry bundle — but Vite still
    // registers the resulting chunk as a dynamic entry, and Nuxt emits a
    // <link rel="prefetch"> for it in the head of EVERY response. That is
    // 445 KB (~130 KB gzipped) — by a wide margin the largest asset on the
    // site — pulled down on first paint for every visitor, including when
    // NUXT_PUBLIC_SENTRY_DSN is empty and the code can never run at all.
    //
    // Dropping the prefetch does not change behaviour: the plugin still
    // imports Sentry on idle/first-interaction, it just fetches the chunk then
    // instead of racing the LCP for it. Error monitoring starts a few hundred
    // ms later; that is the whole cost.
    // Also drop the i18n locale bundles from prefetch. @nuxtjs/i18n is set to
    // `lazy`, but Vite still marks both compiled locale chunks as prefetchable,
    // so an English visitor pulled the Bengali messages (128 KB raw) — and a
    // Bengali visitor the English ones — on every page load, for a locale they
    // have not selected. The active locale does not come from these chunks
    // anyway; it is fetched from /_i18n/<hash>/<locale>/messages.json at
    // runtime, which is the request that actually matters and is untouched.
    'build:manifest'(manifest) {
      const NEVER_PREFETCH = [
        '@sentry/',
        'i18n/locales/',
      ]
      for (const [id, entry] of Object.entries(manifest)) {
        if (NEVER_PREFETCH.some(frag => id.includes(frag))) {
          entry.prefetch = false
          entry.preload = false
        }
      }
    },
  },

  routeRules: {
    // Global security headers on every route
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Content-Security-Policy': [
          "default-src 'self'",
          // connect.facebook.net serves fbevents.js (Meta Pixel); the tracking
          // beacons themselves go to www.facebook.com/tr, covered by img-src.
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' data: https://fonts.gstatic.com",
          "img-src 'self' data: blob: https:",
          // *.ingest.*.sentry.io covers Sentry's regional ingest hosts (us/de/
          // default) — only used once NUXT_PUBLIC_SENTRY_DSN is actually set.
          "connect-src 'self' https://api.metagendigital.com https://api.bytestacklab.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.facebook.com https://connect.facebook.net https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io https://*.ingest.sentry.io",
          // Hero's intro-video modal embeds a YouTube iframe. Without this,
          // frame-src falls back to default-src 'self' and the browser
          // blocks the embed outright ("This content is blocked").
          "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join('; '),
      },
    },
    // ── Static asset caching ───────────────────────────────────────────
    // Vercel serves everything under /public with
    // `cache-control: public, max-age=0, must-revalidate` — verified against
    // production. Hashed build output in /_nuxt gets a year of `immutable`
    // automatically, but the logo, the hero source, the favicons and the OG
    // images do not, so every repeat visitor re-validates all of them on every
    // single page load. That is a round-trip each, on a connection where
    // round-trips are the expensive part.
    //
    // These filenames are NOT content-hashed, so `immutable` would be wrong —
    // a re-exported logo could stay stale for a year. stale-while-revalidate
    // is the right shape instead: serve from cache instantly, refresh in the
    // background, so an updated asset propagates within a day without ever
    // making a visitor wait.
    //
    // Note this improves REPEAT visits, not the first-load Lighthouse score
    // (uses-long-cache-ttl is a weight-0 diagnostic).
    '/images/**':  { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=2592000' } },
    '/og/**':      { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=2592000' } },
    // Favicons genuinely never change; a week of hard caching is safe.
    '/favicon/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000' } },

    // Private dashboard — client-only, never indexed
    '/dashboard':    { ssr: false, robots: false },
    '/bn/dashboard': { ssr: false, robots: false },
    // Auth pages — keep out of the index
    '/auth/**':    { robots: false },
    '/bn/auth/**': { robots: false },

    // ── ISR (Incremental Static Regeneration) ──────────────────────────
    // Every route below is public, content-driven and identical for every
    // visitor — no session, no per-user data, nothing read from a cookie or
    // header. That is exactly what ISR requires: Vercel serves a cached copy
    // to everyone and regenerates it in the background once the TTL expires,
    // instead of every single visitor triggering a fresh SSR render + full
    // API round-trip (the homepage alone fires 6+ upstream calls per load).
    //
    // TTLs match how often the underlying content actually changes — a
    // shorter window costs more regenerations, a longer one shows stale
    // content longer after a Filament edit:
    //   short (10–30 min): index/blog/careers, edited fairly often
    //   medium (1 hr):     services/portfolio/products, edited occasionally
    //   long (24 hr):      about/pricing/contact/terms/privacy, rarely change
    //
    // Both the default-locale and the /bn-prefixed path need their own entry
    // — @nuxtjs/i18n's `prefix_except_default` strategy means "/bn/blog" is a
    // fully separate route from "/blog" as far as routeRules matching goes
    // (see the /dashboard and /auth/** pairs above, already following this).
    //
    // ⚠️ Nothing that is per-visitor may ever get an isr rule here: no
    // /dashboard, no /auth/**, no cart/checkout-style page. Caching a page
    // that differs per visitor means visitor B gets served visitor A's
    // response until the TTL expires — this is a data-leak class of bug, not
    // a cosmetic one. Hosting's /status/** and /order carry the same
    // constraint — see Hosting/nuxt.config.ts.
    '/':               { isr: 600 },
    '/bn':             { isr: 600 },
    '/blog/**':        { isr: 1800 },
    '/bn/blog/**':     { isr: 1800 },
    '/careers/**':     { isr: 1800 },
    '/bn/careers/**':  { isr: 1800 },
    '/services/**':    { isr: 3600 },
    '/bn/services/**': { isr: 3600 },
    '/portfolio/**':   { isr: 3600 },
    '/bn/portfolio/**':{ isr: 3600 },
    '/products/**':    { isr: 3600 },
    '/bn/products/**': { isr: 3600 },
    '/about':          { isr: 86400 },
    '/bn/about':       { isr: 86400 },
    '/pricing':        { isr: 86400 },
    '/bn/pricing':     { isr: 86400 },
    '/contact':        { isr: 86400 },
    '/bn/contact':     { isr: 86400 },
    '/terms':          { isr: 86400 },
    '/bn/terms':       { isr: 86400 },
    '/privacy-policy':    { isr: 86400 },
    '/bn/privacy-policy': { isr: 86400 },
  },
})
