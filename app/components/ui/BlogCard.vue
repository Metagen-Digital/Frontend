<script setup lang="ts">
const { t } = useI18n()

interface Props {
  title: string
  excerpt: string
  category: string
  categoryColor?: 'orange' | 'purple' | 'cyan'
  date: string
  readTime: string
  thumbnail: string
  to: string
  author?: string
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  categoryColor: 'orange',
  author: 'MetaGenDigital Team',
  featured: false,
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const categoryIcon: Record<string, string> = {
  'SEO':          'mdi:magnify',
  'Social Media': 'mdi:instagram',
  'Web Dev':      'mdi:web',
  'Marketing':    'mdi:trending-up',
  'Case Studies': 'mdi:briefcase-outline',
}

const cardConfig = {
  orange: {
    glow:    'hover:shadow-[0_20px_60px_-10px_rgba(255,107,53,0.35)]',
    border:  'hover:border-brand-orange/40',
    badge:   'bg-brand-orange',
    text:    'text-brand-orange',
    arrow:   'bg-brand-orange',
    overlay: 'bg-brand-orange/80',
  },
  purple: {
    glow:    'hover:shadow-[0_20px_60px_-10px_rgba(124,58,237,0.35)]',
    border:  'hover:border-brand-purple/40',
    badge:   'bg-brand-purple',
    text:    'text-brand-purple',
    arrow:   'bg-brand-purple',
    overlay: 'bg-brand-purple/80',
  },
  cyan: {
    glow:    'hover:shadow-[0_20px_60px_-10px_rgba(14,165,233,0.35)]',
    border:  'hover:border-brand-cyan/40',
    badge:   'bg-brand-cyan',
    text:    'text-brand-cyan',
    arrow:   'bg-brand-cyan',
    overlay: 'bg-brand-cyan/80',
  },
}

const cfg = computed(() => cardConfig[props.categoryColor])
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2"
    :class="[cfg.glow, cfg.border]"
  >
    <!-- Thumbnail -->
    <div class="relative overflow-hidden bg-brand-surface flex-shrink-0" :class="featured ? 'aspect-[16/8]' : 'aspect-[16/9]'">
      <!-- See PortfolioCard: grid thumbnails need a srcset, not the full
           CMS upload at every breakpoint. -->
      <NuxtImg
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="100vw sm:50vw lg:33vw"
        format="webp"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      <!-- Category badge -->
      <div class="absolute top-3 left-3">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
          :class="cfg.badge"
        >
          <Icon :name="categoryIcon[category] ?? 'mdi:newspaper-variant-outline'" class="w-3 h-3" aria-hidden="true" />
          {{ category }}
        </span>
      </div>

      <!-- Read time badge -->
      <div class="absolute bottom-3 right-3">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-sm text-brand-text-primary shadow-sm">
          <Icon name="mdi:clock-outline" class="w-3 h-3" aria-hidden="true" />
          {{ readTime }}
        </span>
      </div>

      <!-- Hover overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
        :class="cfg.overlay"
      >
        <div class="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-semibold shadow-lg -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" :class="cfg.text">
          <Icon name="mdi:book-open-outline" class="w-4 h-4" aria-hidden="true" />
          {{ t('blogCard.readArticle') }}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Date + author -->
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span class="flex items-center gap-1 text-[11px] text-brand-text-muted">
          <Icon name="mdi:calendar-outline" class="w-3.5 h-3.5" aria-hidden="true" />
          {{ formatDate(date) }}
        </span>
        <span class="w-1 h-1 rounded-full bg-brand-border flex-shrink-0" />
        <span class="text-[11px] text-brand-text-muted truncate">{{ author }}</span>
      </div>

      <!-- Title -->
      <h3
        class="font-bold text-brand-text-primary leading-snug group-hover:text-brand-primary transition-colors duration-200 mb-2.5"
        :class="featured ? 'text-[18px] line-clamp-2' : 'text-[15px] line-clamp-2'"
      >
        {{ title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-[13px] text-brand-text-secondary leading-relaxed flex-1 mb-4" :class="featured ? 'line-clamp-4' : 'line-clamp-3'">
        {{ excerpt }}
      </p>

      <!-- CTA row -->
      <div class="flex items-center justify-between pt-4 border-t border-brand-border">
        <span class="text-sm font-semibold transition-colors duration-200" :class="cfg.text">{{ t('blogCard.readArticle') }}</span>
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all duration-250 group-hover:translate-x-1 group-hover:scale-110"
          :class="cfg.arrow"
        >
          <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
