<script setup lang="ts">
const { t } = useI18n()
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: computed(() => t('homePage.meta.title')),
  description: computed(() => t('homePage.meta.description')),
  ogTitle: computed(() => t('homePage.meta.title')),
  ogDescription: computed(() => t('homePage.meta.ogDescription')),
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/home.jpg`,
  twitterImage: `${siteUrl}/og/home.jpg`,
})
</script>

<template>
  <div>
    <!-- Only the hero hydrates eagerly. Everything below it is server-rendered
         exactly as before — `Lazy` + `hydrate-on-visible` changes WHEN the
         client attaches Vue to that markup, not whether the markup exists — so
         the HTML, the content and the SEO are identical either way.
         What it removes is the reason mobile LCP was 5.7s: the whole homepage
         used to hydrate in one pass before the browser could get back to
         painting, and on a 4x-throttled CPU that main-thread block was ~87% of
         the LCP time (network was never the bottleneck — the CSS is 14 KB
         gzipped and nothing render-blocks). Each section now costs its own
         chunk only once it actually scrolls into view. -->
    <HeroSection />
    <LazyTrustedBySection hydrate-on-visible />
    <LazyServicesSection hydrate-on-visible />
    <LazyWhyUsSection hydrate-on-visible />
    <LazyProcessSection hydrate-on-visible />
    <LazyPortfolioSection hydrate-on-visible />
    <LazyTestimonialsSection hydrate-on-visible />
    <LazyBlogSection hydrate-on-visible />
    <LazyCtaSection hydrate-on-visible />
  </div>
</template>
