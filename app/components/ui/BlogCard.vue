<script setup lang="ts">
interface Props {
  title: string
  excerpt: string
  category: string
  categoryColor?: 'orange' | 'purple' | 'cyan'
  date: string
  readTime: string
  thumbnail: string
  to: string
}

const props = withDefaults(defineProps<Props>(), {
  categoryColor: 'orange',
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const hoverGlow: Record<string, string> = {
  orange: 'hover:shadow-glow-orange hover:border-brand-orange/30',
  purple: 'hover:shadow-glow-purple hover:border-brand-purple/30',
  cyan:   'hover:shadow-glow-cyan   hover:border-brand-cyan/30',
}

const readMoreColor: Record<string, string> = {
  orange: 'text-brand-orange',
  purple: 'text-brand-purple',
  cyan:   'text-brand-cyan',
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card transition-all duration-300"
    :class="hoverGlow[categoryColor]"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-[16/9] overflow-hidden bg-brand-surface flex-shrink-0">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      <!-- Category badge -->
      <div class="absolute top-3 left-3">
        <TagBadge :label="category" :color="categoryColor" />
      </div>

      <!-- Read time badge -->
      <div class="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-brand-text-primary">
        <Icon name="mdi:clock-outline" class="w-3 h-3" aria-hidden="true" />
        {{ readTime }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Date -->
      <p class="flex items-center gap-1.5 text-xs text-brand-text-muted mb-3">
        <Icon name="mdi:calendar-outline" class="w-3.5 h-3.5" aria-hidden="true" />
        {{ formatDate(date) }}
      </p>

      <!-- Title -->
      <h3 class="text-[15px] font-bold text-brand-text-primary mb-2 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors duration-200">
        {{ title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-sm text-brand-text-secondary leading-relaxed line-clamp-3 flex-1">
        {{ excerpt }}
      </p>

      <!-- Read more -->
      <div
        class="flex items-center gap-1.5 mt-4 pt-4 border-t border-brand-border text-sm font-semibold transition-colors duration-200"
        :class="readMoreColor[categoryColor]"
      >
        Read Article
        <Icon
          name="mdi:arrow-right"
          class="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </div>
  </NuxtLink>
</template>
