<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()

const siteUrl = computed(() => (config.public.siteUrl as string) || 'https://metagendigital.com')

// Global Organization + WebSite structured data (rich results / knowledge panel)
const jsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      // ProfessionalService (a LocalBusiness subtype) rather than plain
      // Organization: it carries address/hours/phone, which is what Google
      // needs to consider the agency for the local pack on "agency in Dhaka"
      // style queries.
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${siteUrl.value}/#organization`,
      name: 'MetaGenDigital',
      url: siteUrl.value,
      logo: `${siteUrl.value}/images/MetaGen-Logo.svg`,
      image: `${siteUrl.value}/og/home.jpg`,
      description: 'Marketing & software web service agency building websites, apps and digital products for the Bangladesh market.',
      email: 'hello@metagendigital.com',
      telephone: '+8801970222573',
      foundingDate: '2021',
      priceRange: '৳৳',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Uttara 10',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      areaServed: [
        { '@type': 'Country', name: 'Bangladesh' },
      ],
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+8801970222573',
        email: 'hello@metagendigital.com',
        areaServed: 'BD',
        availableLanguage: ['en', 'bn'],
      }],
      // Saturday–Thursday, per the contact page.
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '19:00',
      }],
      sameAs: [
        'https://www.facebook.com/metagendigital',
        'https://www.linkedin.com/company/metagendigital',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl.value}/#website`,
      url: siteUrl.value,
      name: 'MetaGenDigital',
      publisher: { '@id': `${siteUrl.value}/#organization` },
      inLanguage: locale.value === 'bn' ? 'bn-BD' : 'en-US',
    },
  ],
}))

// Locale-neutral path ("/services/seo"), the basis for both the hreflang pair
// and the canonical URL.
const basePath = computed(() => route.path.replace(/^\/bn/, '') || '/')

// Query string handling for the canonical URL.
//
// Almost everything is dropped — ?ref=fb and friends must not read as separate
// pages. `page` is the one exception: Google retired rel=prev/next as an
// indexing signal in 2019 and now expects each page of a series to canonicalise
// to ITSELF. Folding /blog?page=2 into /blog told the crawler page 2 was a
// duplicate of page 1, which is the opposite of what we want.
//
// A category facet is NOT canonical: /blog?category=seo is a filtered view of
// the same collection, so it points at the unfiltered list rather than
// multiplying indexable category x page combinations.
const canonicalQuery = computed(() => {
  if (route.query.category) return ''
  const page = Number(route.query.page)
  return Number.isInteger(page) && page > 1 ? `?page=${page}` : ''
})

useHead(computed(() => ({
  htmlAttrs: {
    lang: locale.value === 'bn' ? 'bn' : 'en',
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: jsonLd.value,
    },
  ],
  link: [
    // Self-referencing canonical. Without this the i18n prefix strategy plus
    // query params let the same content be indexed under several URLs.
    {
      rel: 'canonical',
      href: `${siteUrl.value}${locale.value === 'bn' ? `/bn${basePath.value === '/' ? '' : basePath.value}` : basePath.value}${canonicalQuery.value}`,
    },
    {
      rel: 'alternate',
      hreflang: 'en-US',
      href: `${siteUrl.value}${basePath.value}`,
    },
    {
      // bn-BD, not bare bn — the audience is Bangladesh specifically, and the
      // region signal is what wins the BD SERP over other Bengali variants.
      rel: 'alternate',
      hreflang: 'bn-BD',
      href: `${siteUrl.value}/bn${basePath.value === '/' ? '' : basePath.value}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl.value}${basePath.value}`,
    },
    // Third-party origins used on every page — resolving DNS/TLS early shaves
    // a chunk off LCP for the font and analytics requests.
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: 'https://connect.facebook.net' },
  ],
})))

// Site-wide SEO defaults. Individual pages override title/description/ogImage;
// this guarantees every page ships an OG/Twitter card even if it forgets to.
useSeoMeta({
  ogSiteName: 'MetaGen Digital',
  ogType: 'website',
  ogImage: computed(() => `${siteUrl.value}/og/home.jpg`),
  twitterCard: 'summary_large_image',
  twitterImage: computed(() => `${siteUrl.value}/og/home.jpg`),
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
