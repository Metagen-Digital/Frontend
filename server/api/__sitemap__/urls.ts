// Dynamic sitemap URLs — pulls every published slug from the backend API so
// blog posts, services, portfolio, products and jobs land in the sitemap.
// Wired via nuxt.config `sitemap.sources`. Static pages are added automatically.
//
// Source is /api/sitemap-urls, a single dedicated endpoint that returns slug +
// lastmod for every published record across all five collections. It replaced
// five calls to the ordinary listing endpoints, which broke the moment those
// paginated: the sitemap would silently have shrunk to the first page of each
// collection, quietly de-listing most of the site.

interface SlugEntry {
  slug: string
  updated_at?: string | null
}

type SitemapPayload = {
  data?: Record<string, SlugEntry[]>
}

/** API collection key -> the frontend route it lives under. */
const ROUTES = [
  { key: 'blogs', prefix: '/blog', priority: 0.7, changefreq: 'weekly' },
  { key: 'services', prefix: '/services', priority: 0.9, changefreq: 'monthly' },
  { key: 'case-studies', prefix: '/portfolio', priority: 0.7, changefreq: 'monthly' },
  { key: 'products', prefix: '/products', priority: 0.9, changefreq: 'weekly' },
  { key: 'career-jobs', prefix: '/careers', priority: 0.6, changefreq: 'weekly' },
] as const

/** Normalise to ISO — Google leans on lastmod to decide what to recrawl. */
function lastmodOf(entry: SlugEntry): string | undefined {
  if (!entry.updated_at) return undefined
  const date = new Date(entry.updated_at)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export default defineSitemapEventHandler(async () => {
  const { public: pub } = useRuntimeConfig()
  const apiBase = (pub.apiBase as string) || 'http://localhost:8000/api'

  const urls: Array<Record<string, unknown>> = []

  let payload: SitemapPayload['data'] = {}

  try {
    const res = await $fetch<SitemapPayload>(`${apiBase}/sitemap-urls`)
    payload = res?.data ?? {}
  }
  catch {
    // A backend hiccup must not produce a broken sitemap. Returning no dynamic
    // URLs leaves the static pages intact, which is far better than emitting a
    // partial file that tells Google the rest of the site no longer exists.
    return urls
  }

  for (const { key, prefix, priority, changefreq } of ROUTES) {
    for (const entry of payload[key] ?? []) {
      if (!entry?.slug) continue

      const path = `${prefix}/${entry.slug}`
      const lastmod = lastmodOf(entry)

      // Both locales, each declaring the other as its alternate. Without the
      // /bn entries the Bengali pages rely on crawl discovery alone.
      const alternatives = [
        { hreflang: 'en-US', href: path },
        { hreflang: 'bn-BD', href: `/bn${path}` },
        { hreflang: 'x-default', href: path },
      ]

      urls.push({ loc: path, lastmod, priority, changefreq, alternatives })
      urls.push({ loc: `/bn${path}`, lastmod, priority: priority - 0.1, changefreq, alternatives })
    }
  }

  return urls
})
