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
      '@type': 'Organization',
      '@id': `${siteUrl.value}/#organization`,
      name: 'MetaGenDigital',
      url: siteUrl.value,
      logo: `${siteUrl.value}/images/MetaGen-Logo.svg`,
      description: 'Marketing & software web service agency building websites, apps and digital products for the Bangladesh market.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BD',
      },
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
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${siteUrl.value}${route.path.replace(/^\/bn/, '') || '/'}`,
    },
    {
      rel: 'alternate',
      hreflang: 'bn',
      href: `${siteUrl.value}/bn${route.path.replace(/^\/bn/, '') || '/'}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl.value}${route.path.replace(/^\/bn/, '') || '/'}`,
    },
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
