<script setup lang="ts">
import type { PortfolioCategory } from '~/types'

const categories: ('All' | PortfolioCategory)[] = ['All', 'Web Dev', 'Social Media', 'Photography', 'Video', 'E-commerce']
const activeCategory = ref<'All' | PortfolioCategory>('All')

const items = [
  {
    slug: 'techcorp-website',
    title: 'TechCorp BD Website Redesign',
    category: 'Web Dev' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop',
    tagColor: 'orange' as const,
    result: '+180% organic traffic',
  },
  {
    slug: 'shopbd-social',
    title: 'ShopBD Social Media Campaign',
    category: 'Social Media' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&auto=format&fit=crop',
    tagColor: 'purple' as const,
    result: '+400% engagement',
  },
  {
    slug: 'greengrow-photos',
    title: 'GreenGrow Product Photography',
    category: 'Photography' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80&auto=format&fit=crop',
    tagColor: 'cyan' as const,
    result: '+60% conversion rate',
  },
  {
    slug: 'urbanEats-brand-film',
    title: 'UrbanEats Brand Film',
    category: 'Video' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop',
    tagColor: 'orange' as const,
    result: '2M+ video views',
  },
  {
    slug: 'stylehouse-store',
    title: 'StyleHouse E-commerce Store',
    category: 'E-commerce' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop',
    tagColor: 'purple' as const,
    result: '3x revenue growth',
  },
  {
    slug: 'eduprime-campaign',
    title: 'EduPrime Digital Marketing',
    category: 'Web Dev' as PortfolioCategory,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    tagColor: 'cyan' as const,
    result: '5x ROI on ad spend',
  },
]

const filtered = computed(() =>
  activeCategory.value === 'All' ? items : items.filter(i => i.category === activeCategory.value)
)
</script>

<template>
  <section class="section-padding bg-white" aria-label="Our Portfolio">
    <div class="container-content">

      <!-- Heading -->
      <div class="text-center mb-10">
        <SectionBadge icon="mdi:briefcase-outline" color="primary" class="mb-4">Our Work</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          Projects That
          <span class="gradient-text"> Speak for Themselves</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          A selection of our best work — web development, photography, social media and digital campaigns.
        </p>
      </div>

      <!-- Filter tabs -->
      <div
        class="flex flex-wrap justify-center gap-2 mb-10"
        role="tablist"
        aria-label="Filter portfolio by category"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-2 rounded-btn text-sm font-medium transition-all duration-200 border"
          :class="activeCategory === cat
            ? 'bg-brand-primary border-brand-primary text-white shadow-glow-primary'
            : 'bg-brand-surface border-brand-border text-brand-text-secondary hover:border-brand-primary hover:text-brand-primary'"
          role="tab"
          :aria-selected="activeCategory === cat"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        enter-active-class="transition-all duration-400 ease-spring"
        enter-from-class="opacity-0 scale-95"
        leave-active-class="transition-all duration-250 absolute"
        leave-to-class="opacity-0 scale-95"
      >
        <PortfolioCard
          v-for="item in filtered"
          :key="item.slug"
          :title="item.title"
          :category="item.category"
          :thumbnail="item.thumbnail"
          :to="`/portfolio/${item.slug}`"
          :tag-color="item.tagColor"
          :result="item.result"
        />
      </TransitionGroup>

      <div class="flex justify-center mt-12">
        <GradientButton to="/portfolio" variant="outline" icon-right="mdi:arrow-right">
          View Full Portfolio
        </GradientButton>
      </div>

    </div>
  </section>
</template>
