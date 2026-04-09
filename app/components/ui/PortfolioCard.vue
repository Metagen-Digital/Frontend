<script setup lang="ts">
interface Props {
  title: string
  category: string
  thumbnail: string
  to: string
  tagColor?: 'orange' | 'purple' | 'cyan'
  result?: string
  client?: string
  year?: number
}

const props = withDefaults(defineProps<Props>(), {
  tagColor: 'orange',
  result: '',
  client: '',
  year: 0,
})

const categoryIcon: Record<string, string> = {
  'Web Dev':      'mdi:web',
  'Social Media': 'mdi:instagram',
  'Photography':  'mdi:camera',
  'Video':        'mdi:video-outline',
  'E-commerce':   'mdi:shopping-outline',
}

const categoryBg: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}

const hoverShadow: Record<string, string> = {
  orange: 'hover:shadow-[0_20px_60px_-10px_rgba(255,107,53,0.35)]',
  purple: 'hover:shadow-[0_20px_60px_-10px_rgba(124,58,237,0.35)]',
  cyan:   'hover:shadow-[0_20px_60px_-10px_rgba(14,165,233,0.35)]',
}

const overlayBg: Record<string, string> = {
  orange: 'bg-brand-orange/80',
  purple: 'bg-brand-purple/80',
  cyan:   'bg-brand-cyan/80',
}

const resultText: Record<string, string> = {
  orange: 'text-brand-orange',
  purple: 'text-brand-purple',
  cyan:   'text-brand-cyan',
}

const arrowBg: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-brand-border shadow-card transition-all duration-300 hover:-translate-y-2"
    :class="hoverShadow[tagColor]"
  >
    <!-- Image wrapper -->
    <div class="relative aspect-[16/10] overflow-hidden bg-brand-surface">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Bottom gradient always visible -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      <!-- Category tag — top left -->
      <div class="absolute top-3 left-3">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
          :class="categoryBg[tagColor]"
        >
          <Icon :name="categoryIcon[category] ?? 'mdi:folder'" class="w-3 h-3" aria-hidden="true" />
          {{ category }}
        </span>
      </div>

      <!-- Result badge — top right -->
      <div v-if="result" class="absolute top-3 right-3">
        <span
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm shadow-sm"
          :class="resultText[tagColor]"
        >
          <Icon name="mdi:trending-up" class="w-3 h-3" aria-hidden="true" />
          {{ result }}
        </span>
      </div>

      <!-- Hover overlay with CTA -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
        :class="overlayBg[tagColor]"
      >
        <div class="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-semibold shadow-lg -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" :class="resultText[tagColor]">
          <Icon name="mdi:eye-outline" class="w-4 h-4" aria-hidden="true" />
          View Case Study
        </div>
      </div>
    </div>

    <!-- Card footer -->
    <div class="p-5 flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <h3 class="text-[15px] font-bold text-brand-text-primary leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors duration-200 mb-1">
          {{ title }}
        </h3>
        <p v-if="client || year" class="text-[11px] text-brand-text-muted font-medium">
          <span v-if="client">{{ client }}</span>
          <span v-if="client && year"> · </span>
          <span v-if="year">{{ year }}</span>
        </p>
      </div>
      <div
        class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white transition-all duration-250 group-hover:translate-x-1 group-hover:scale-110"
        :class="arrowBg[tagColor]"
      >
        <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  </NuxtLink>
</template>
