<script setup lang="ts">
import type { Stat } from '~/types'

const { el, isVisible } = useScrollAnimation()
const { t } = useI18n()

const stats = computed<Stat[]>(() => [
  { value: 50,  suffix: '+', label: t('whyUs.stats.clients'),      prefix: '' },
  { value: 100, suffix: '+', label: t('whyUs.stats.projects'),     prefix: '' },
  { value: 98,  suffix: '%', label: t('whyUs.stats.satisfaction'), prefix: '' },
  { value: 3,   suffix: '+', label: t('whyUs.stats.experience'),   prefix: '' },
])

const features = computed(() => [
  { icon: 'mdi:target',        titleKey: 'whyUs.features.results.title',       descKey: 'whyUs.features.results.description',       color: 'orange' },
  { icon: 'mdi:chart-line',    titleKey: 'whyUs.features.data.title',          descKey: 'whyUs.features.data.description',          color: 'purple' },
  { icon: 'mdi:account-group', titleKey: 'whyUs.features.team.title',          descKey: 'whyUs.features.team.description',          color: 'cyan' },
  { icon: 'mdi:clock-fast',    titleKey: 'whyUs.features.delivery.title',      descKey: 'whyUs.features.delivery.description',      color: 'orange' },
  { icon: 'mdi:headset',       titleKey: 'whyUs.features.communication.title', descKey: 'whyUs.features.communication.description', color: 'purple' },
  { icon: 'mdi:currency-usd',  titleKey: 'whyUs.features.pricing.title',       descKey: 'whyUs.features.pricing.description',       color: 'cyan' },
])

const iconGradient: Record<string, string> = {
  orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
  cyan:   'from-brand-cyan/20   to-brand-cyan/5   text-brand-cyan',
}

const accentBar: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}
</script>

<template>
  <section class="section-padding bg-white" aria-label="Why Choose Us">
    <div class="container-content">

      <!-- Heading -->
      <div class="text-center mb-14">
        <SectionBadge icon="mdi:shield-star" color="purple" class="mb-4">{{ $t('whyUs.badge') }}</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          {{ $t('whyUs.heading') }}
          <span class="gradient-text"> {{ $t('whyUs.headingHighlight') }}</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          {{ $t('whyUs.subheading') }}
        </p>
      </div>

      <!-- Gradient stats banner -->
      <div
        ref="el"
        class="relative overflow-hidden rounded-card mb-14 bg-gradient-brand p-px"
      >
        <div class="relative rounded-[15px] bg-gradient-brand px-6 py-10 md:py-12">
          <!-- subtle dot grid overlay -->
          <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 rounded-[15px] pointer-events-none" aria-hidden="true" />
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <StatCounter
                :value="stat.value"
                :suffix="stat.suffix"
                :label="stat.label"
                class="[&_.gradient-text]:text-white [&_p]:text-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(feature, i) in features"
          :key="feature.titleKey"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
          class="group relative flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
          :class="{
            'hover:border-brand-orange/30': feature.color === 'orange',
            'hover:border-brand-purple/30': feature.color === 'purple',
            'hover:border-brand-cyan/30':   feature.color === 'cyan',
          }"
        >
          <!-- Top accent bar -->
          <div class="h-1 w-full flex-shrink-0" :class="accentBar[feature.color]" />

          <div class="p-5 flex gap-4 items-start">
            <!-- Icon -->
            <div
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              :class="iconGradient[feature.color]"
            >
              <Icon :name="feature.icon" class="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ t(feature.titleKey) }}</h3>
              <p class="text-sm text-brand-text-secondary leading-relaxed">{{ t(feature.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
