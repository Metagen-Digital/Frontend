<script setup lang="ts">
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

const accent: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}

const iconGradient: Record<string, string> = {
  orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
  cyan:   'from-brand-cyan/20 to-brand-cyan/5 text-brand-cyan',
}

const taglinePill: Record<string, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  purple: 'bg-brand-purple/10 text-brand-purple',
  cyan:   'bg-brand-cyan/10 text-brand-cyan',
}

const hoverGlow: Record<string, string> = {
  orange: 'hover:shadow-glow-orange hover:border-brand-orange/30',
  purple: 'hover:shadow-glow-purple hover:border-brand-purple/30',
  cyan:   'hover:shadow-glow-cyan hover:border-brand-cyan/30',
}

const ctaColor: Record<string, string> = {
  orange: 'text-brand-orange group-hover:bg-brand-orange',
  purple: 'text-brand-purple group-hover:bg-brand-purple',
  cyan:   'text-brand-cyan group-hover:bg-brand-cyan',
}

const featureDot: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card transition-all duration-300 cursor-pointer"
    :class="hoverGlow[color]"
  >
    <!-- Top color accent bar -->
    <div class="h-1 w-full flex-shrink-0" :class="accent[color]" />

    <!-- Card body -->
    <div class="flex flex-col flex-1 p-6">

      <!-- Icon + tagline row -->
      <div class="flex items-start justify-between gap-3 mb-5">
        <!-- Icon circle with gradient bg -->
        <div
          class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
          :class="iconGradient[color]"
        >
          <Icon :name="icon" class="w-7 h-7" aria-hidden="true" />
        </div>

        <!-- Tagline pill -->
        <span
          v-if="tagline"
          class="mt-1 inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider flex-shrink-0"
          :class="taglinePill[color]"
        >
          {{ tagline }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-[17px] font-bold text-brand-text-primary mb-2.5 leading-snug">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-brand-text-secondary leading-relaxed mb-5 flex-1">
        {{ description }}
      </p>

      <!-- Feature chips -->
      <div v-if="features.length" class="flex flex-wrap gap-1.5 mb-6">
        <span
          v-for="feature in features"
          :key="feature"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border text-[11px] font-medium text-brand-text-secondary"
        >
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="featureDot[color]" />
          {{ feature }}
        </span>
      </div>

      <!-- CTA row -->
      <div class="flex items-center justify-between pt-4 border-t border-brand-border">
        <span
          class="text-sm font-semibold transition-colors duration-200"
          :class="ctaColor[color].split(' ')[0]"
        >
          Learn More
        </span>
        <div
          class="w-8 h-8 rounded-full border border-current flex items-center justify-center transition-all duration-250 group-hover:text-white group-hover:border-transparent"
          :class="ctaColor[color]"
        >
          <Icon
            name="mdi:arrow-right"
            class="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>

    </div>
  </NuxtLink>
</template>
