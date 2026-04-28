<script setup lang="ts">
import type { PricingPlan } from '~/types'

const { t } = useI18n()

useSeoMeta({
  title: computed(() => `${t('pricingPage.breadcrumb')} | MetaGenDigital`),
  description: computed(() => t('pricingPage.subheading')),
})

const billing = ref<'monthly' | 'yearly'>('monthly')

const plans = computed<PricingPlan[]>(() => [
  {
    name: t('pricingPage.starter.name'),
    price: 299,
    description: t('pricingPage.starter.description'),
    features: [
      { text: t('pricingPage.starter.f0'), included: true },
      { text: t('pricingPage.starter.f1'), included: true },
      { text: t('pricingPage.starter.f2'), included: true },
      { text: t('pricingPage.starter.f3'), included: true },
      { text: t('pricingPage.starter.f4'), included: false },
      { text: t('pricingPage.starter.f5'), included: false },
    ],
  },
  {
    name: t('pricingPage.growth.name'),
    price: 699,
    description: t('pricingPage.growth.description'),
    featured: true,
    features: [
      { text: t('pricingPage.growth.f0'), included: true },
      { text: t('pricingPage.growth.f1'), included: true },
      { text: t('pricingPage.growth.f2'), included: true },
      { text: t('pricingPage.growth.f3'), included: true },
      { text: t('pricingPage.growth.f4'), included: true },
      { text: t('pricingPage.growth.f5'), included: false },
    ],
  },
  {
    name: t('pricingPage.enterprise.name'),
    price: 'Custom',
    description: t('pricingPage.enterprise.description'),
    features: [
      { text: t('pricingPage.enterprise.f0'), included: true },
      { text: t('pricingPage.enterprise.f1'), included: true },
      { text: t('pricingPage.enterprise.f2'), included: true },
      { text: t('pricingPage.enterprise.f3'), included: true },
      { text: t('pricingPage.enterprise.f4'), included: true },
      { text: t('pricingPage.enterprise.f5'), included: true },
    ],
    ctaLabel: t('pricingPage.enterprise.cta'),
  },
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-14 bg-brand-surface border-b border-brand-border relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content text-center relative z-10">
        <AppBreadcrumb :crumbs="[{ label: $t('pricingPage.breadcrumb') }]" class="mb-6 justify-center" />
        <SectionBadge icon="mdi:tag-outline" class="mb-5">{{ $t('pricingPage.badge') }}</SectionBadge>
        <h1 class="text-brand-text-primary mb-4 mt-4">
          {{ $t('pricingPage.heading') }} <span class="gradient-text">{{ $t('pricingPage.headingHighlight') }}</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-xl mx-auto mb-8">
          {{ $t('pricingPage.subheading') }}
        </p>

        <!-- Billing toggle -->
        <div class="inline-flex items-center gap-3 bg-white border border-brand-border rounded-full px-1.5 py-1.5 shadow-card">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
            :class="billing === 'monthly' ? 'bg-brand-orange text-white shadow-glow-orange' : 'text-brand-text-secondary hover:text-brand-text-primary'"
            @click="billing = 'monthly'"
          >
            {{ $t('pricingPage.monthly') }}
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-2"
            :class="billing === 'yearly' ? 'bg-brand-orange text-white shadow-glow-orange' : 'text-brand-text-secondary hover:text-brand-text-primary'"
            @click="billing = 'yearly'"
          >
            {{ $t('pricingPage.yearly') }}
            <span class="text-xs font-bold px-1.5 py-0.5 rounded-full bg-brand-success/20 text-brand-success">
              {{ $t('pricingPage.save20') }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section class="section-padding">
      <div class="container-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <PricingCard
            v-for="plan in plans"
            :key="plan.name"
            v-bind="plan"
            :price="billing === 'yearly' && typeof plan.price === 'number'
              ? Math.round(plan.price * 0.8)
              : plan.price"
          />
        </div>

        <p class="text-center text-sm text-brand-text-muted mt-10">
          {{ $t('pricingPage.note') }}
          <NuxtLink to="/contact" class="text-brand-orange hover:underline">{{ $t('pricingPage.letsTalk') }}</NuxtLink>
        </p>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
