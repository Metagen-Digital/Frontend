<script setup lang="ts">
const { t } = useI18n()

interface Props {
  icon: string
  title: string
  tagline?: string
  description: string
  features?: string[]
  to: string
  color?: 'orange' | 'purple' | 'cyan'
}

const props = withDefaults(defineProps<Props>(), {
  features: () => [],
  tagline: '',
  color: 'orange',
})

const cardConfig = {
  orange: {
    gradient:  'from-[#FF6B35] to-[#FF9A5C]',
    glow:      'hover:shadow-[0_24px_60px_-8px_rgba(255,107,53,0.40)]',
    border:    'hover:border-brand-orange/40',
    text:      'text-brand-orange-text',
    badge:     'bg-orange-50 text-brand-orange-text border-orange-200',
    dot:       'bg-brand-orange',
    arrow:     'bg-brand-orange hover:bg-orange-600',
    featureBg: 'bg-orange-50/60',
  },
  purple: {
    gradient:  'from-[#7C3AED] to-[#9D5CF5]',
    glow:      'hover:shadow-[0_24px_60px_-8px_rgba(124,58,237,0.40)]',
    border:    'hover:border-brand-purple/40',
    text:      'text-brand-purple-text',
    badge:     'bg-violet-50 text-brand-purple-text border-violet-200',
    dot:       'bg-brand-purple',
    arrow:     'bg-brand-purple hover:bg-violet-700',
    featureBg: 'bg-violet-50/60',
  },
  cyan: {
    gradient:  'from-[#0EA5E9] to-[#38BDF8]',
    glow:      'hover:shadow-[0_24px_60px_-8px_rgba(14,165,233,0.40)]',
    border:    'hover:border-brand-cyan/40',
    text:      'text-brand-cyan-text',
    badge:     'bg-sky-50 text-brand-cyan-text border-sky-200',
    dot:       'bg-brand-cyan',
    arrow:     'bg-brand-cyan hover:bg-sky-600',
    featureBg: 'bg-sky-50/60',
  },
}

const cfg = computed(() => cardConfig[props.color])
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-brand-border shadow-card transition-all duration-300 cursor-pointer hover:-translate-y-2"
    :class="[cfg.glow, cfg.border]"
  >
    <!-- Gradient hero top with floating icon -->
    <div
      class="relative h-44 flex items-center justify-center overflow-hidden bg-gradient-to-br"
      :class="cfg.gradient"
    >
      <!-- Background decorative circles -->
      <div class="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
      <div class="absolute -left-8 bottom-0 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
      <div class="absolute right-8 bottom-5 w-14 h-14 rounded-full bg-white/10 pointer-events-none" />

      <!-- Floating icon box -->
      <div
        class="relative z-10 w-20 h-20 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/30"
      >
        <Icon :name="icon" class="w-10 h-10 text-white drop-shadow" aria-hidden="true" />
      </div>
    </div>

    <!-- Card body -->
    <div class="flex flex-col flex-1 p-6">

      <!-- Tagline pill -->
      <span
        v-if="tagline"
        class="inline-block self-start mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
        :class="cfg.badge"
      >
        {{ tagline }}
      </span>

      <!-- Title -->
      <h3 class="text-[18px] font-bold text-brand-text-primary mb-2.5 leading-snug group-hover:text-brand-primary transition-colors duration-200">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-brand-text-secondary leading-relaxed mb-5 flex-1 line-clamp-3" v-html="description" />

      <!-- Feature chips -->
      <div v-if="features.length" class="flex flex-wrap gap-1.5 mb-5">
        <span
          v-for="feature in features"
          :key="feature"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-brand-border text-[11px] font-medium text-brand-text-secondary transition-colors duration-200 group-hover:border-brand-border/60"
          :class="cfg.featureBg"
        >
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="cfg.dot" />
          {{ feature }}
        </span>
      </div>

      <!-- CTA row -->
      <div class="flex items-center justify-between pt-4 border-t border-brand-border">
        <span class="text-sm font-semibold transition-colors duration-200" :class="cfg.text">
          {{ t('serviceCard.viewDetails') }}
        </span>
        <div
          class="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-250 group-hover:translate-x-1 group-hover:scale-110"
          :class="cfg.arrow"
        >
          <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

    </div>
  </NuxtLink>
</template>
