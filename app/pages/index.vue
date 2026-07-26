<script setup lang="ts">
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: 'MetaGenDigital — We Grow Your Business Online',
  description: 'Bangladesh\'s leading digital marketing agency. Expert in web development, social media, photography & videography, and e-commerce solutions.',
  ogTitle: 'MetaGenDigital — We Grow Your Business Online',
  ogDescription: 'Bangladesh\'s leading digital marketing agency.',
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
