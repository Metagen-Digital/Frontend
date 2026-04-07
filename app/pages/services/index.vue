<script setup lang="ts">
import type { Service } from '~/types'

useSeoMeta({
  title: 'Our Services | MetaGenDigital',
  description: 'Explore our full range of digital marketing, web development, photography, and social media services.',
})

const services: Service[] = [
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'mdi:trending-up',
    tagline: 'ROI-focused campaigns that scale',
    description: 'Data-driven digital marketing strategies including paid ads, SEO, and analytics to maximize your return on investment.',
    features: ['Google & Meta Ads', 'SEO Optimization', 'Analytics & Reporting', 'Conversion Rate Optimization'],
    color: 'orange',
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    icon: 'mdi:instagram',
    tagline: 'Build community, drive engagement',
    description: 'Creative content creation, community management, and growth strategies across all major social platforms.',
    features: ['Content Strategy', 'Community Management', 'Influencer Outreach', 'Performance Tracking'],
    color: 'purple',
  },
  {
    slug: 'photography-videography',
    name: 'Photography & Videography',
    icon: 'mdi:camera',
    tagline: 'Visual storytelling that converts',
    description: 'Professional product photography, brand films, and social media reels that make your brand stand out.',
    features: ['Product Photography', 'Brand Films', 'Social Media Reels', 'Photo Editing'],
    color: 'cyan',
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    icon: 'mdi:web',
    tagline: 'Fast, beautiful, SEO-ready websites',
    description: 'Custom-designed, high-performance websites built with modern technologies and optimized for search engines.',
    features: ['Custom Design', 'Mobile Responsive', 'SEO-Ready', 'CMS Integration'],
    color: 'orange',
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce Development',
    icon: 'mdi:shopping',
    tagline: 'Stores that sell around the clock',
    description: 'Full-featured e-commerce solutions on Shopify, WooCommerce, and custom platforms with seamless payment integration.',
    features: ['Shopify & WooCommerce', 'Payment Integration', 'Inventory Management', 'Full Setup & Launch'],
    color: 'purple',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-16 bg-brand-surface border-b border-brand-border relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Services' }]" class="mb-6" />
        <SectionBadge icon="mdi:lightning-bolt" class="mb-5">What We Offer</SectionBadge>
        <h1 class="text-brand-text-primary mb-4 mt-4">Services That <span class="gradient-text">Drive Results</span></h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl">
          From strategy to execution — everything your business needs to grow online.
        </p>
      </div>
    </section>

    <!-- Cards grid -->
    <section class="section-padding">
      <div class="container-content">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in services"
            :key="service.slug"
            :icon="service.icon"
            :title="service.name"
            :description="service.description"
            :features="service.features"
            :to="`/services/${service.slug}`"
            :color="service.color"
          />
        </div>
      </div>
    </section>

    <ProcessSection />
    <CtaSection />
  </div>
</template>
