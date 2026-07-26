// Dynamic sitemap URLs — pulls every published slug from the backend API so
// blog posts, services, portfolio, products and jobs land in the sitemap.
// Wired via nuxt.config `sitemap.sources`. Static pages are added automatically.
interface CollectionItem {
  slug?: string
  updatedAt?: string
  updated_at?: string
  publishedAt?: string
  published_at?: string
  created_at?: string
}

export default defineSitemapEventHandler(async () => {
  const { public: pub } = useRuntimeConfig()
  const apiBase = (pub.apiBase as string) || 'http://localhost:8000/api'

  // API index endpoints return { success, data: [ { slug, ... } ] } (flat).
  // `priority` is relative within our own sitemap: services and products are
  // the pages that convert, so they outrank archive-style content.
  const collections = [
    { endpoint: '/blogs',        prefix: '/blog',      priority: 0.7, changefreq: 'weekly' },
    { endpoint: '/services',     prefix: '/services',  priority: 0.9, changefreq: 'monthly' },
    { endpoint: '/case-studies', prefix: '/portfolio', priority: 0.7, changefreq: 'monthly' },
    { endpoint: '/products',     prefix: '/products',  priority: 0.9, changefreq: 'weekly' },
    { endpoint: '/career-jobs',  prefix: '/careers',   priority: 0.6, changefreq: 'weekly' },
  ] as const

  /** First usable timestamp, normalised to ISO — Google leans on lastmod to decide what to recrawl. */
  function lastmodOf(item: CollectionItem): string | undefined {
    const raw = item.updatedAt || item.updated_at || item.publishedAt || item.published_at || item.created_at
    if (!raw) return undefined
    const date = new Date(raw)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
  }

  const urls: Array<Record<string, unknown>> = []

  await Promise.all(
    collections.map(async ({ endpoint, prefix, priority, changefreq }) => {
      try {
        const res = await $fetch<{ data?: CollectionItem[] }>(`${apiBase}${endpoint}`)
        for (const item of res?.data ?? []) {
          if (!item?.slug) continue
          const path = `${prefix}/${item.slug}`
          const lastmod = lastmodOf(item)

          // Both locales, each declaring the other as its alternate. Without
          // the /bn entries the Bengali pages rely on crawl discovery alone.
          const alternatives = [
            { hreflang: 'en-US',     href: path },
            { hreflang: 'bn-BD',     href: `/bn${path}` },
            { hreflang: 'x-default', href: path },
          ]

          urls.push({ loc: path, lastmod, priority, changefreq, alternatives })
          urls.push({ loc: `/bn${path}`, lastmod, priority: priority - 0.1, changefreq, alternatives })
        }
      }
      catch {
        // A failing collection must not break the whole sitemap — skip it.
      }
    }),
  )

  return urls
})
