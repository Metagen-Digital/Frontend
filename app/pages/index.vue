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
    <HeroSection />
    <TrustedBySection />
    <ServicesSection />
    <WhyUsSection />
    <ProcessSection />
    <PortfolioSection />
    <TestimonialsSection />
    <BlogSection />
    <CtaSection />
  </div>
</template>
