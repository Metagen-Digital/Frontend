// Emit a schema.org JSON-LD block for the current page.
//
// Pass a getter that returns null while data is still loading — the script tag
// is then simply omitted rather than shipping a half-empty graph. `key` keeps
// unhead from merging separate blocks into one; use a distinct key per type.
export function useJsonLd(
  key: string,
  data: MaybeRefOrGetter<Record<string, unknown> | null | undefined>,
) {
  useHead(computed(() => {
    const value = toValue(data)
    if (!value) return {}
    return {
      script: [{
        key: `ld-${key}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...value }),
      }],
    }
  }))
}

/**
 * CollectionPage + ItemList for an index page (blog, services, products…).
 *
 * Tells Google the page is a listing and what it links to, which helps it
 * discover and group the detail pages instead of treating the index as one
 * more content page competing with its own children.
 */
export function useCollectionJsonLd(options: {
  name: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string | undefined>
  /** Listed entries, in the order they appear on the page. */
  items: MaybeRefOrGetter<Array<{ name: string, url: string }>>
}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = (config.public.siteUrl as string) || 'https://metagendigital.com'

  useJsonLd('collection', () => {
    const items = toValue(options.items)
    if (!items.length) return null

    return {
      '@type': 'CollectionPage',
      name: toValue(options.name),
      description: toValue(options.description),
      url: `${siteUrl}${route.path}`,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
        })),
      },
    }
  })
}

/** Strip HTML and collapse whitespace — for turning rich text into a meta description. */
export function toPlainText(html: string | null | undefined, max = 160): string {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  // Cut on a word boundary so descriptions don't end mid-word.
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}
