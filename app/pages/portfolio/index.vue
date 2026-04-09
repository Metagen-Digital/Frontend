<script setup lang="ts">
import type { PortfolioCategory } from '~/types'

useSeoMeta({
  title: 'Portfolio | MetaGenDigital',
  description: 'Explore our work — web development, social media, photography, video, and e-commerce projects that deliver real results.',
})

type TagColor = 'orange' | 'purple' | 'cyan'

interface Item {
  slug: string
  title: string
  category: PortfolioCategory
  thumbnail: string
  tagColor: TagColor
  result: string
  client: string
  year: number
}

const categories: ('All' | PortfolioCategory)[] = ['All', 'Web Dev', 'Social Media', 'Photography', 'Video', 'E-commerce']
const activeCategory = ref<'All' | PortfolioCategory>('All')

const items: Item[] = [
  {
    slug: 'techcorp-website',
    title: 'TechCorp BD Website Redesign',
    category: 'Web Dev',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80&auto=format&fit=crop',
    tagColor: 'orange',
    result: '+180% traffic',
    client: 'TechCorp BD',
    year: 2024,
  },
  {
    slug: 'shopbd-social',
    title: 'ShopBD Social Media Campaign',
    category: 'Social Media',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop',
    tagColor: 'purple',
    result: '+400% engagement',
    client: 'ShopBD',
    year: 2024,
  },
  {
    slug: 'greengrow-photos',
    title: 'GreenGrow Product Photography',
    category: 'Photography',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80&auto=format&fit=crop',
    tagColor: 'cyan',
    result: '+60% conversion',
    client: 'GreenGrow',
    year: 2024,
  },
  {
    slug: 'urbaneats-brand-film',
    title: 'UrbanEats Cinematic Brand Film',
    category: 'Video',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&auto=format&fit=crop',
    tagColor: 'orange',
    result: '2M+ views',
    client: 'UrbanEats',
    year: 2024,
  },
  {
    slug: 'stylehouse-store',
    title: 'StyleHouse E-commerce Platform',
    category: 'E-commerce',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
    tagColor: 'purple',
    result: '3× revenue',
    client: 'StyleHouse',
    year: 2024,
  },
  {
    slug: 'eduprime-marketing',
    title: 'EduPrime Digital Marketing Campaign',
    category: 'Web Dev',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
    tagColor: 'cyan',
    result: '5× ROI',
    client: 'EduPrime',
    year: 2023,
  },
  {
    slug: 'naturabd-photography',
    title: 'NaturaBD Lifestyle Photography',
    category: 'Photography',
    thumbnail: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&q=80&auto=format&fit=crop',
    tagColor: 'orange',
    result: '+90% CTR',
    client: 'NaturaBD',
    year: 2023,
  },
  {
    slug: 'nexatech-social',
    title: 'NexaTech LinkedIn Growth Strategy',
    category: 'Social Media',
    thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=900&q=80&auto=format&fit=crop',
    tagColor: 'purple',
    result: '+5K followers',
    client: 'NexaTech',
    year: 2023,
  },
]

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? items
    : items.filter(i => i.category === activeCategory.value)
)

const categoryCount = (cat: 'All' | PortfolioCategory) =>
  cat === 'All' ? items.length : items.filter(i => i.category === cat).length
</script>

<template>
  <div>
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none" />
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div class="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Portfolio' }]" class="mb-6" />
        <SectionBadge icon="mdi:briefcase-outline" class="mb-5">Our Work</SectionBadge>

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 class="text-brand-text-primary mb-4 max-w-2xl">
              Projects That
              <span class="gradient-text"> Speak for Themselves</span>
            </h1>
            <p class="text-brand-text-secondary text-lg max-w-xl leading-relaxed">
              Real results for real businesses — explore our best work across web, social, photography, video, and e-commerce.
            </p>
          </div>

          <!-- Stats row -->
          <div class="flex flex-wrap gap-6 lg:gap-8 flex-shrink-0">
            <div v-for="s in [{ v: '50+', l: 'Projects' }, { v: '40+', l: 'Clients' }, { v: '5', l: 'Categories' }]" :key="s.l" class="text-center">
              <div class="text-2xl font-black gradient-text font-display">{{ s.v }}</div>
              <div class="text-xs text-brand-text-muted mt-0.5">{{ s.l }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FILTER + GRID
    ══════════════════════════════════════════════════ -->
    <section class="pb-20 md:pb-28 bg-white">
      <div class="container-content">

        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by category">
          <button
            v-for="cat in categories"
            :key="cat"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border"
            :class="activeCategory === cat
              ? 'bg-brand-primary border-brand-primary text-white shadow-glow-primary'
              : 'bg-brand-surface border-brand-border text-brand-text-secondary hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-surface'"
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ cat }}
            <span
              class="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-colors duration-200"
              :class="activeCategory === cat ? 'bg-white/20 text-white' : 'bg-brand-border text-brand-text-muted'"
            >
              {{ categoryCount(cat) }}
            </span>
          </button>
        </div>

        <!-- Project grid -->
        <TransitionGroup
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
          enter-active-class="transition-all duration-400 ease-spring"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 absolute"
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
            :client="item.client"
            :year="item.year"
          />
        </TransitionGroup>

        <!-- Empty state -->
        <div
          v-if="filtered.length === 0"
          class="col-span-full flex flex-col items-center justify-center py-24 text-center"
        >
          <div class="w-16 h-16 rounded-2xl bg-brand-surface flex items-center justify-center mb-4">
            <Icon name="mdi:folder-open-outline" class="w-8 h-8 text-brand-text-muted" aria-hidden="true" />
          </div>
          <p class="text-brand-text-secondary font-medium mb-1">No projects in this category yet</p>
          <p class="text-brand-text-muted text-sm">Check back soon — more work is being added.</p>
        </div>

      </div>
    </section>

    <CtaSection />
  </div>
</template>
