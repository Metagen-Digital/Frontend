<script setup lang="ts">
const route = useRoute()

// Service data map — will be replaced with CMS/content later
const serviceMap: Record<string, any> = {
  'digital-marketing': {
    name: 'Digital Marketing',
    icon: 'mdi:trending-up',
    tagline: 'ROI-focused campaigns that scale your business.',
    description: 'We design and execute data-driven digital marketing strategies that deliver measurable results.',
    color: 'orange',
  },
  'social-media-marketing': {
    name: 'Social Media Marketing',
    icon: 'mdi:instagram',
    tagline: 'Build community, drive engagement, grow your brand.',
    description: 'From content creation to community management — we handle everything across all major platforms.',
    color: 'purple',
  },
  'photography-videography': {
    name: 'Photography & Videography',
    icon: 'mdi:camera',
    tagline: 'Visual storytelling that captures and converts.',
    description: 'Professional photography and videography services for products, brands, and social media content.',
    color: 'cyan',
  },
  'website-development': {
    name: 'Website Development',
    icon: 'mdi:web',
    tagline: 'Fast, beautiful, SEO-ready websites.',
    description: 'Custom websites built with modern technologies, designed to convert visitors into customers.',
    color: 'orange',
  },
  'ecommerce-development': {
    name: 'E-commerce Development',
    icon: 'mdi:shopping',
    tagline: 'Online stores built to sell around the clock.',
    description: 'Full-featured e-commerce solutions on Shopify, WooCommerce, and custom platforms.',
    color: 'purple',
  },
}

const service = computed(() => serviceMap[route.params.slug as string])

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

useSeoMeta({
  title: computed(() => `${service.value?.name} | MetaGenDigital`),
  description: computed(() => service.value?.description),
})
</script>

<template>
  <div v-if="service">
    <!-- Hero -->
    <section class="pt-32 pb-16 bg-grid-pattern bg-grid">
      <div class="container-content">
        <AppBreadcrumb :crumbs="[{ label: 'Services', to: '/services' }, { label: service.name }]" class="mb-6" />
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 flex items-center justify-center rounded-xl bg-brand-orange/10">
            <Icon :name="service.icon" class="w-7 h-7 text-brand-orange" aria-hidden="true" />
          </div>
          <div>
            <h1 class="text-white">{{ service.name }}</h1>
            <p class="text-brand-text-secondary">{{ service.tagline }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Placeholder content — to be built in Phase 3 -->
    <section class="section-padding">
      <div class="container-content max-w-3xl">
        <p class="text-brand-text-secondary text-lg leading-relaxed">{{ service.description }}</p>
        <div class="mt-8">
          <GradientButton to="/contact" icon-right="mdi:arrow-right">Start a Project</GradientButton>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
