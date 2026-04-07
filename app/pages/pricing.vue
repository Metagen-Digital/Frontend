<script setup lang="ts">
import type { PricingPlan } from '~/types'

useSeoMeta({
  title: 'Pricing | MetaGenDigital',
  description: 'Simple, transparent pricing for digital marketing, web development, and creative services.',
})

const billing = ref<'monthly' | 'yearly'>('monthly')

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 299,
    description: 'Perfect for small businesses getting started online.',
    features: [
      { text: 'Social Media Management (2 platforms)', included: true },
      { text: '8 Posts per month', included: true },
      { text: 'Monthly Analytics Report', included: true },
      { text: 'Email Support', included: true },
      { text: 'Paid Ad Management', included: false },
      { text: 'Website Development', included: false },
    ],
  },
  {
    name: 'Growth',
    price: 699,
    description: 'For growing businesses that want to scale fast.',
    featured: true,
    features: [
      { text: 'Social Media Management (4 platforms)', included: true },
      { text: '20 Posts per month', included: true },
      { text: 'Paid Ad Management ($500 budget)', included: true },
      { text: 'Weekly Analytics Report', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Website (1 page)', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-service digital marketing for large teams.',
    features: [
      { text: 'All platforms, unlimited posts', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Paid Ads (unlimited budget)', included: true },
      { text: 'Website + E-commerce setup', included: true },
      { text: 'Photography & Videography', included: true },
      { text: '24/7 Priority Support', included: true },
    ],
    ctaLabel: 'Contact Us',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-14 bg-brand-surface border-b border-brand-border relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content text-center relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Pricing' }]" class="mb-6 justify-center" />
        <SectionBadge icon="mdi:tag-outline" class="mb-5">Transparent Pricing</SectionBadge>
        <h1 class="text-brand-text-primary mb-4 mt-4">Simple, <span class="gradient-text">Honest Pricing</span></h1>
        <p class="text-brand-text-secondary text-lg max-w-xl mx-auto mb-8">
          No hidden fees. Pick the plan that fits your goals.
        </p>

        <!-- Billing toggle -->
        <div class="inline-flex items-center gap-3 bg-white border border-brand-border rounded-full px-1.5 py-1.5 shadow-card">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
            :class="billing === 'monthly' ? 'bg-brand-orange text-white shadow-glow-orange' : 'text-brand-text-secondary hover:text-brand-text-primary'"
            @click="billing = 'monthly'"
          >
            Monthly
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-2"
            :class="billing === 'yearly' ? 'bg-brand-orange text-white shadow-glow-orange' : 'text-brand-text-secondary hover:text-brand-text-primary'"
            @click="billing = 'yearly'"
          >
            Yearly
            <span class="text-xs font-bold px-1.5 py-0.5 rounded-full bg-brand-success/20 text-brand-success">
              Save 20%
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
          All prices in USD. Need something custom?
          <NuxtLink to="/contact" class="text-brand-orange hover:underline">Let's talk →</NuxtLink>
        </p>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
