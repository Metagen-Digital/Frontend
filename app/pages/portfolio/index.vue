<script setup lang="ts">
import type { PortfolioCategory } from '~/types'

useSeoMeta({
  title: 'Portfolio | MetaGenDigital',
  description: 'Explore our work — web development, social media, photography, video, and e-commerce projects.',
})

const categories: ('All' | PortfolioCategory)[] = ['All', 'Web Dev', 'Social Media', 'Photography', 'Video', 'E-commerce']
const activeCategory = ref<'All' | PortfolioCategory>('All')

// Placeholder items — replace with CMS/API data in Phase 3
const items = ref([
  { slug: 'project-1', title: 'Brand Website Redesign', category: 'Web Dev' as PortfolioCategory, thumbnail: '/images/placeholder.jpg' },
  { slug: 'project-2', title: 'Product Photography Campaign', category: 'Photography' as PortfolioCategory, thumbnail: '/images/placeholder.jpg' },
  { slug: 'project-3', title: 'Social Media Growth Campaign', category: 'Social Media' as PortfolioCategory, thumbnail: '/images/placeholder.jpg' },
])

const filtered = computed(() =>
  activeCategory.value === 'All' ? items.value : items.value.filter(i => i.category === activeCategory.value)
)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-12 bg-brand-surface border-b border-brand-border relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Portfolio' }]" class="mb-6" />
        <SectionBadge icon="mdi:briefcase-outline" class="mb-5">Our Work</SectionBadge>
        <h1 class="text-brand-text-primary mb-4 mt-4">Projects That <span class="gradient-text">Speak for Themselves</span></h1>
      </div>
    </section>

    <!-- Filter tabs -->
    <section class="section-padding">
      <div class="container-content">
        <div class="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter portfolio by category">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 rounded-btn text-sm font-medium transition-all duration-150 border"
            :class="activeCategory === cat
              ? 'bg-brand-orange border-brand-orange text-white shadow-glow-orange'
              : 'bg-white border-brand-border text-brand-text-secondary hover:border-brand-orange hover:text-brand-orange'"
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PortfolioCard
            v-for="item in filtered"
            :key="item.slug"
            :title="item.title"
            :category="item.category"
            :thumbnail="item.thumbnail"
            :to="`/portfolio/${item.slug}`"
          />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
