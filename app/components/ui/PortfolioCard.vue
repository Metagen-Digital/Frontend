<script setup lang="ts">
interface Props {
  title: string
  category: string
  thumbnail: string
  to: string
  tagColor?: 'orange' | 'purple' | 'cyan'
  result?: string
}

const props = withDefaults(defineProps<Props>(), {
  tagColor: 'orange',
  result: '',
})

const hoverGlow: Record<string, string> = {
  orange: 'hover:shadow-glow-orange hover:border-brand-orange/30',
  purple: 'hover:shadow-glow-purple hover:border-brand-purple/30',
  cyan:   'hover:shadow-glow-cyan   hover:border-brand-cyan/30',
}

const resultBg: Record<string, string> = {
  orange: 'bg-brand-orange text-white',
  purple: 'bg-brand-purple text-white',
  cyan:   'bg-brand-cyan text-white',
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col rounded-card overflow-hidden bg-white border border-brand-border shadow-card transition-all duration-300"
    :class="hoverGlow[tagColor]"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-[4/3] overflow-hidden bg-brand-surface">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Gradient overlay always visible at bottom -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <!-- Category tag top left -->
      <div class="absolute top-3 left-3">
        <TagBadge :label="category" :color="tagColor" />
      </div>

      <!-- Result badge top right -->
      <div
        v-if="result"
        class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
        :class="resultBg[tagColor]"
      >
        {{ result }}
      </div>

      <!-- Hover CTA -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-btn text-brand-text-primary text-sm font-semibold shadow-card">
          <Icon name="mdi:eye-outline" class="w-4 h-4" aria-hidden="true" />
          View Case Study
        </div>
      </div>
    </div>

    <!-- Meta -->
    <div class="p-4 flex items-center justify-between gap-3">
      <h3 class="text-[14px] font-bold text-brand-text-primary leading-snug group-hover:text-brand-primary transition-colors duration-200 line-clamp-2">
        {{ title }}
      </h3>
      <div
        class="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center flex-shrink-0 transition-all duration-250 group-hover:border-transparent group-hover:text-white"
        :class="{
          'group-hover:bg-brand-orange': tagColor === 'orange',
          'group-hover:bg-brand-purple': tagColor === 'purple',
          'group-hover:bg-brand-cyan':   tagColor === 'cyan',
        }"
      >
        <Icon name="mdi:arrow-right" class="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </div>
  </NuxtLink>
</template>
