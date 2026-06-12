<script setup lang="ts">
import type { ServiceApiItem, ServicePackageApiItem } from '~/types'

const { t } = useI18n()
const { get } = useApi()

useSeoMeta({
  title: computed(() => `${t('pricingPage.breadcrumb')} | MetaGenDigital`),
  description: computed(() => t('pricingPage.subheading')),
})

// 1. Fetch all services (for tabs)
const { data: servicesResponse } = await get<ServiceApiItem[]>('/services')
const services = computed<ServiceApiItem[]>(() => servicesResponse.value?.data ?? [])

// 2. Active service slug
const activeSlug = ref(services.value[0]?.slug ?? '')

// 3. Package cache — lazy load per service
const packageCache = reactive<Record<string, ServicePackageApiItem[]>>({})
const loadingPackages = ref(false)

async function loadPackages(slug: string) {
  if (packageCache[slug] !== undefined) return
  loadingPackages.value = true
  const { data } = await get<ServiceApiItem>(`/services/${slug}`)
  packageCache[slug] = data.value?.data?.packages ?? []
  loadingPackages.value = false
}

// Preload first service packages on SSR
await loadPackages(activeSlug.value)

async function selectService(slug: string) {
  activeSlug.value = slug
  await loadPackages(slug)
}

const activePackages = computed<ServicePackageApiItem[]>(
  () => packageCache[activeSlug.value] ?? [],
)

const activeService = computed(
  () => services.value.find(s => s.slug === activeSlug.value) ?? null,
)

// Popular plan is the middle one or marked is_popular
const popularIndex = computed(() => {
  const idx = activePackages.value.findIndex(p => p.is_popular)
  return idx >= 0 ? idx : Math.floor(activePackages.value.length / 2)
})

// Service icon map
const iconBySlug: Record<string, string> = {
  'digital-marketing':      'mdi:trending-up',
  'social-media-marketing': 'mdi:instagram',
  'photography-videography':'mdi:camera',
  'website-development':    'mdi:web',
  'web-design-development': 'mdi:web',
  'ecommerce-development':  'mdi:shopping',
  'brand-design':           'mdi:palette',
}

function serviceIcon(slug: string) {
  return iconBySlug[slug] ?? 'mdi:briefcase-outline'
}

// Color scheme for packages
const tierColors = ['orange', 'purple', 'cyan'] as const
type TierColor = typeof tierColors[number]

const cardConfig: Record<TierColor, {
  gradient: string; glow: string; border: string; badge: string; checkBg: string; checkText: string; btn: string
}> = {
  orange: {
    gradient:  'from-[#FF6B35] to-[#FF9A5C]',
    glow:      'hover:shadow-[0_20px_50px_-8px_rgba(255,107,53,0.35)]',
    border:    'border-brand-orange/30',
    badge:     'bg-orange-50 text-orange-700 border-orange-200',
    checkBg:   'bg-orange-50',
    checkText: 'text-brand-orange',
    btn:       'bg-brand-orange hover:bg-orange-600 text-white',
  },
  purple: {
    gradient:  'from-[#7C3AED] to-[#9D5CF5]',
    glow:      'hover:shadow-[0_20px_50px_-8px_rgba(124,58,237,0.35)]',
    border:    'border-brand-purple/30',
    badge:     'bg-violet-50 text-violet-700 border-violet-200',
    checkBg:   'bg-violet-50',
    checkText: 'text-brand-purple',
    btn:       'bg-brand-purple hover:bg-violet-700 text-white',
  },
  cyan: {
    gradient:  'from-[#0EA5E9] to-[#38BDF8]',
    glow:      'hover:shadow-[0_20px_50px_-8px_rgba(14,165,233,0.35)]',
    border:    'border-brand-cyan/30',
    badge:     'bg-sky-50 text-sky-700 border-sky-200',
    checkBg:   'bg-sky-50',
    checkText: 'text-brand-cyan',
    btn:       'bg-brand-cyan hover:bg-sky-600 text-white',
  },
}

function cfg(index: number) {
  return cardConfig[tierColors[index % tierColors.length]]
}
</script>

<template>
  <div>

    <!-- ══ HERO ══════════════════════════════════════════════ -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none" />
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="absolute top-16 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10 text-center">
        <AppBreadcrumb :crumbs="[{ label: $t('pricingPage.breadcrumb') }]" class="mb-6 justify-center" />
        <SectionBadge icon="mdi:tag-outline" class="mb-5">{{ $t('pricingPage.badge') }}</SectionBadge>

        <h1 class="text-brand-text-primary mb-4">
          {{ $t('pricingPage.heading') }}
          <span class="gradient-text">{{ $t('pricingPage.headingHighlight') }}</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl mx-auto mb-4">
          {{ $t('pricingPage.subheading') }}
        </p>
        <p class="text-sm text-brand-text-muted max-w-xl mx-auto">
          Select a service below to see its available packages and pricing.
        </p>
      </div>
    </section>

    <!-- ══ SERVICE TABS ══════════════════════════════════════ -->
    <section class="sticky top-16 z-30 bg-white border-b border-brand-border shadow-sm">
      <div class="container-content overflow-x-auto">
        <div class="flex items-center gap-1 py-3 min-w-max">
          <button
            v-for="svc in services"
            :key="svc.slug"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0"
            :class="activeSlug === svc.slug
              ? 'bg-brand-primary text-white shadow-sm'
              : 'text-brand-text-secondary hover:text-brand-primary hover:bg-brand-surface'"
            @click="selectService(svc.slug)"
          >
            <Icon :name="serviceIcon(svc.slug)" class="w-4 h-4 flex-shrink-0" />
            {{ svc.title }}
          </button>
        </div>
      </div>
    </section>

    <!-- ══ PACKAGES ══════════════════════════════════════════ -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">

        <!-- Service description -->
        <div v-if="activeService" class="text-center mb-12">
          <div class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-brand-surface border border-brand-border mb-5">
            <Icon :name="serviceIcon(activeService.slug)" class="w-5 h-5 text-brand-primary" />
            <span class="font-bold text-brand-text-primary">{{ activeService.title }}</span>
          </div>
          <p class="text-brand-text-secondary max-w-xl mx-auto text-base leading-relaxed">
            {{ activeService.short_description }}
          </p>
        </div>

        <!-- Loading state -->
        <div v-if="loadingPackages" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="h-96 rounded-2xl bg-brand-surface animate-pulse" />
        </div>

        <!-- No packages -->
        <div v-else-if="activePackages.length === 0" class="py-16 text-center">
          <Icon name="mdi:package-variant" class="w-12 h-12 mx-auto mb-4 text-brand-text-muted opacity-40" />
          <p class="text-brand-text-secondary font-medium mb-2">No packages defined yet for this service.</p>
          <NuxtLink to="/contact" class="text-sm text-brand-primary hover:underline">
            Contact us for a custom quote →
          </NuxtLink>
        </div>

        <!-- Package cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div
            v-for="(pkg, index) in activePackages"
            :key="pkg.id"
            class="relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            :class="[
              index === popularIndex ? ['ring-2 ring-brand-primary/50 shadow-card-hover', cfg(index).glow] : ['border-brand-border shadow-card', cfg(index).glow],
            ]"
          >
            <!-- Popular badge -->
            <div v-if="index === popularIndex" class="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r" :class="cfg(index).gradient" />
            <div v-if="index === popularIndex" class="absolute top-3 right-3">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border" :class="cfg(index).badge">
                Most Popular
              </span>
            </div>

            <!-- Gradient header -->
            <div class="h-2 w-full bg-gradient-to-r" :class="cfg(index).gradient" />

            <!-- Body -->
            <div class="p-6 flex flex-col flex-1">
              <!-- Package name -->
              <h3 class="text-lg font-bold text-brand-text-primary mb-1">{{ pkg.name }}</h3>
              <p class="text-sm text-brand-text-secondary mb-5 leading-relaxed">{{ pkg.description }}</p>

              <!-- Price -->
              <div class="flex items-baseline gap-1.5 mb-6">
                <span class="text-4xl font-black font-display text-brand-text-primary">
                  {{ pkg.formatted_price }}
                </span>
                <span class="text-sm text-brand-text-muted">one-time</span>
              </div>

              <!-- Meta info -->
              <div class="flex flex-wrap gap-3 mb-6 pb-5 border-b border-brand-border">
                <div class="flex items-center gap-1.5 text-xs text-brand-text-secondary">
                  <Icon name="mdi:clock-outline" class="w-3.5 h-3.5" />
                  {{ pkg.formatted_delivery_time }}
                </div>
                <div class="flex items-center gap-1.5 text-xs text-brand-text-secondary">
                  <Icon name="mdi:refresh" class="w-3.5 h-3.5" />
                  {{ pkg.formatted_revisions }}
                </div>
              </div>

              <!-- Features -->
              <ul class="space-y-2.5 flex-1 mb-6">
                <li
                  v-for="feature in pkg.features"
                  :key="feature"
                  class="flex items-start gap-2.5"
                >
                  <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg(index).checkBg">
                    <Icon name="mdi:check-bold" class="w-3 h-3" :class="cfg(index).checkText" />
                  </div>
                  <span class="text-sm text-brand-text-secondary">{{ feature }}</span>
                </li>
                <li
                  v-for="feature in (pkg.extra_features ?? [])"
                  :key="'extra-' + feature"
                  class="flex items-start gap-2.5"
                >
                  <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg(index).checkBg">
                    <Icon name="mdi:plus" class="w-3 h-3" :class="cfg(index).checkText" />
                  </div>
                  <span class="text-sm text-brand-text-secondary italic">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA -->
              <NuxtLink
                to="/contact"
                class="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                :class="index === popularIndex ? cfg(index).btn : 'border border-brand-border text-brand-text-secondary hover:border-brand-primary/40 hover:text-brand-primary hover:bg-brand-surface'"
              >
                Get Started
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Note -->
        <p class="text-center text-sm text-brand-text-muted mt-10">
          {{ $t('pricingPage.note') }}
          <NuxtLink to="/contact" class="text-brand-primary hover:underline font-medium">
            {{ $t('pricingPage.letsTalk') }}
          </NuxtLink>
        </p>

      </div>
    </section>

    <!-- ══ STARTING PRICES OVERVIEW ══════════════════════════ -->
    <section class="py-14 bg-brand-surface border-t border-brand-border">
      <div class="container-content">
        <div class="text-center mb-10">
          <h2 class="text-brand-text-primary text-2xl font-bold mb-2">All Services at a Glance</h2>
          <p class="text-brand-text-secondary text-sm">Starting prices for each service — click to explore packages.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="svc in services"
            :key="svc.slug"
            class="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border text-center transition-all duration-200"
            :class="activeSlug === svc.slug
              ? 'bg-brand-primary border-brand-primary text-white shadow-lg'
              : 'bg-white border-brand-border hover:border-brand-primary/40 hover:shadow-card text-brand-text-secondary'"
            @click="selectService(svc.slug); window?.scrollTo({ top: 0, behavior: 'smooth' })"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-200"
              :class="activeSlug === svc.slug ? 'bg-white/20' : 'bg-brand-surface group-hover:bg-brand-primary/10'"
            >
              <Icon :name="serviceIcon(svc.slug)" class="w-5 h-5 transition-colors duration-200" :class="activeSlug === svc.slug ? 'text-white' : 'text-brand-primary'" />
            </div>
            <div>
              <p class="text-xs font-bold leading-tight mb-1 transition-colors" :class="activeSlug === svc.slug ? 'text-white' : 'text-brand-text-primary'">
                {{ svc.title }}
              </p>
              <p class="text-[11px] font-semibold" :class="activeSlug === svc.slug ? 'text-white/70' : 'text-brand-primary'">
                From {{ svc.formatted_price ?? 'Custom' }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
