// Dynamic sitemap URLs — pulls every published slug from the backend API so
// blog posts, services, portfolio, products and jobs land in the sitemap.
// Wired via nuxt.config `sitemap.sources`. Static pages are added automatically.
export default defineSitemapEventHandler(async () => {
  const { public: pub } = useRuntimeConfig()
  const apiBase = (pub.apiBase as string) || 'http://localhost:8000/api'

  // API index endpoints return { success, data: [ { slug, ... } ] } (flat).
  const collections: Array<{ endpoint: string; prefix: string }> = [
    { endpoint: '/blogs',        prefix: '/blog' },
    { endpoint: '/services',     prefix: '/services' },
    { endpoint: '/case-studies', prefix: '/portfolio' },
    { endpoint: '/products',     prefix: '/products' },
    { endpoint: '/career-jobs',  prefix: '/careers' },
  ]

  const urls: Array<{ loc: string }> = []

  await Promise.all(
    collections.map(async ({ endpoint, prefix }) => {
      try {
        const res = await $fetch<{ data?: Array<{ slug?: string }> }>(`${apiBase}${endpoint}`)
        for (const item of res?.data ?? []) {
          if (item?.slug) urls.push({ loc: `${prefix}/${item.slug}` })
        }
      } catch {
        // A failing collection must not break the whole sitemap — skip it.
      }
    }),
  )

  return urls
})
