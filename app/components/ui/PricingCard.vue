<script setup lang="ts">
const { t } = useI18n()

interface Feature {
  text: string
  included: boolean
}

interface Props {
  name: string
  price: number | string
  period?: string
  description?: string
  features: Feature[]
  featured?: boolean
  ctaLabel?: string
  ctaTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  period: '/mo',
  featured: false,
  ctaLabel: 'Get Started',
  ctaTo: '/contact',
})
</script>

<template>
  <div
    class="relative flex flex-col rounded-card border p-7 transition-all duration-250"
    :class="featured
      ? 'bg-gradient-card border-brand-orange shadow-glow-orange scale-105'
      : 'bg-brand-card border-brand-border hover:border-brand-border-strong hover:shadow-card-hover'"
  >
    <!-- Popular badge -->
    <div
      v-if="featured"
      class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-brand rounded-full text-xs font-bold text-white whitespace-nowrap"
    >
      {{ t('pricingCard.mostPopular') }}
    </div>

    <!-- Plan name -->
    <h3 class="text-lg font-bold text-white mb-1">{{ name }}</h3>
    <p v-if="description" class="text-sm text-brand-text-secondary mb-5">{{ description }}</p>

    <!-- Price -->
    <div class="flex items-end gap-1 mb-6">
      <span class="font-display font-extrabold text-4xl text-white">
        {{ typeof price === 'number' ? `$${price}` : price }}
      </span>
      <span v-if="typeof price === 'number'" class="text-sm text-brand-text-secondary mb-1">{{ period }}</span>
    </div>

    <!-- Features -->
    <ul class="space-y-3 flex-1 mb-7">
      <li
        v-for="feature in features"
        :key="feature.text"
        class="flex items-start gap-3 text-sm"
        :class="feature.included ? 'text-brand-text-secondary' : 'text-brand-text-muted line-through'"
      >
        <Icon
          :name="feature.included ? 'mdi:check-circle' : 'mdi:close-circle'"
          class="w-4 h-4 flex-shrink-0 mt-0.5"
          :class="feature.included ? 'text-brand-success' : 'text-brand-text-muted'"
          aria-hidden="true"
        />
        {{ feature.text }}
      </li>
    </ul>

    <!-- CTA -->
    <GradientButton
      :to="ctaTo"
      :variant="featured ? 'primary' : 'ghost'"
      size="md"
      class="w-full justify-center"
    >
      {{ ctaLabel }}
    </GradientButton>
  </div>
</template>
