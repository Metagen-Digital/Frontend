export default defineNuxtConfig({
  // Shared auth/API layer. For local co-development against a checkout, swap to
  // extends: ['../MetagenShared'] — but keep the Git URL committed (Vercel repos
  // don't have the sibling folder). See MetagenShared/README.md.
  extends: ['github:Metagen-Digital/Shared#main'],

  compatibilityDate: '2025-07-15',
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
    '@nuxt/content',
    '@nuxtjs/i18n',
    'nuxt-gtag',
  ],

  // Google Analytics 4. Set NUXT_PUBLIC_GTAG_ID (G-XXXXXXXXXX) in the env.
  // Empty id = analytics simply doesn't load, so dev/preview stay clean.
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    enabled: process.env.NODE_ENV === 'production',
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

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'Plus Jakarta Sans': [600, 700, 800],
      'Space Grotesk': [400, 500],
      'Hind Siliguri': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
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
    format: ['webp'],
    quality: 85,
    domains: ['localhost', 'api.bytestacklab.com', 'api.metagendigital.com'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      cookieDomain: process.env.COOKIE_DOMAIN || '',
    },
  },

  icon: {
    serverBundle: 'remote',
  },

  sitemap: {},

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
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' data: https://fonts.gstatic.com",
          "img-src 'self' data: blob: https:",
          "connect-src 'self' https://api.metagendigital.com https://api.bytestacklab.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join('; '),
      },
    },
    // Private dashboard — client-only, never indexed
    '/dashboard':    { ssr: false, robots: false },
    '/bn/dashboard': { ssr: false, robots: false },
    // Auth pages — keep out of the index
    '/auth/**':    { robots: false },
    '/bn/auth/**': { robots: false },
  },
})
