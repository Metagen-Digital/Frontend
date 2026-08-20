<script setup lang="ts">
import type { ProductApiDetail, ProductApiItem } from '~/types'

const { t } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const { get } = useApi()
const { data: productResponse } = await get<ProductApiDetail>(`/products/${slug}`)
const { data: relatedResponse } = await get<ProductApiItem[]>(`/products/${slug}/related`)

const product = computed(() => productResponse.value?.data ?? null)
const related  = computed(() => relatedResponse.value?.data ?? [])

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: computed(() => product.value?.seo?.meta_title ?? `${product.value?.name} | MetaGenDigital`),
  description: computed(() => product.value?.seo?.meta_description ?? product.value?.short_description ?? ''),
  ogTitle: computed(() => product.value?.name),
  ogDescription: computed(() => product.value?.short_description ?? ''),
  ogImage: computed(() => product.value?.featured_image ?? undefined),
  twitterImage: computed(() => product.value?.featured_image ?? undefined),
})

// Product + Offer + AggregateRating — the combination Google needs to render
// price and stars in the SERP. Rating is only emitted when reviews actually
// exist; faking it is a manual-action risk.
useJsonLd('product', () => {
  const p = product.value
  if (!p) return null

  // plans[] carries the real price points; price_amount is the "from" figure.
  const prices = (p.plans ?? [])
    .map(plan => Number(String(plan.price).replace(/[^\d.]/g, '')))
    .filter(n => Number.isFinite(n) && n > 0)
  const lowPrice = prices.length ? Math.min(...prices) : Number(p.price_amount) || null

  return {
    '@type': 'Product',
    name: p.name,
    description: p.seo?.meta_description ?? p.short_description ?? '',
    image: p.featured_image ? [p.featured_image] : undefined,
    category: p.category ?? undefined,
    brand: { '@type': 'Brand', name: 'MetaGenDigital' },
    url: `${siteUrl}${route.path}`,
    ...(lowPrice
      ? {
          offers: {
            '@type': 'AggregateOffer',
            lowPrice,
            ...(prices.length > 1 ? { highPrice: Math.max(...prices) } : {}),
            offerCount: prices.length || 1,
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            seller: { '@id': `${siteUrl}/#organization` },
          },
        }
      : {}),
    ...(p.rating && p.reviews_count
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: p.rating,
            reviewCount: p.reviews_count,
            bestRating: 5,
          },
        }
      : {}),
  }
})

// Feeds the "viewed a product page" retargeting audience in Ads Manager.
const { trackViewContent } = useAnalytics()
onMounted(() => {
  if (product.value) {
    trackViewContent({ name: product.value.name, category: product.value.category ?? 'Product', id: slug })
  }
})

function categoryLabel(cat: string | null) {
  return (cat ?? '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<template>
  <div v-if="product" class="min-h-screen">

    <!-- ── HERO ──────────────────────────────────────────── -->
    <section
      class="relative pt-24 pb-20 overflow-hidden"
      :class="product.bg_gradient ?? 'bg-gradient-to-br from-brand-primary to-brand-purple'"
    >
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute -left-16 -bottom-8 w-72 h-72 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <div class="mb-8 opacity-80">
          <AppBreadcrumb :crumbs="[{ label: t('productsPage.breadcrumb'), to: '/products' }, { label: product.name }]" />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-start gap-10">
          <!-- Left -->
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg flex-shrink-0">
                <svg v-if="product.icon_path" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="product.icon_path" />
                </svg>
                <Icon v-else name="mdi:package-variant" class="w-8 h-8 text-white" />
              </div>
              <div>
                <span v-if="product.badge" class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1" :class="product.badgeClass">
                  {{ product.badge }}
                </span>
                <p class="text-white/60 text-sm">{{ categoryLabel(product.category) }}</p>
              </div>
            </div>

            <h1 class="text-white leading-tight mb-2">{{ product.name }}</h1>
            <p class="text-white/80 text-lg font-semibold mb-3">{{ product.tagline }}</p>
            <p class="text-white/70 text-base leading-relaxed max-w-xl mb-8">{{ product.short_description }}</p>

            <div class="flex flex-wrap gap-3">
              <a
                v-if="product.purchase_link"
                :href="product.purchase_link"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold text-sm rounded-btn shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-brand-primary"
              >
                {{ t('productDetail.getStarted') }}
                <Icon name="mdi:arrow-right" class="w-4 h-4" />
              </a>
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold text-sm rounded-btn hover:bg-white/15 backdrop-blur-sm transition-all duration-200">
                {{ t('productDetail.talkToSales') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Right: price + stats card -->
          <div class="w-full lg:w-72 flex-shrink-0">
            <div class="bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-2xl overflow-hidden">
              <div class="px-6 pt-6 pb-5 space-y-4">
                <!-- Price -->
                <div>
                  <p class="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">{{ t('productDetail.startingAt') }}</p>
                  <div class="flex items-baseline gap-1">
                    <span class="text-white text-3xl font-black font-display">{{ product.price_display ?? 'Custom' }}</span>
                    <span v-if="product.price_period" class="text-white/55 text-sm">/ {{ product.price_period }}</span>
                  </div>
                </div>

                <!-- Rating -->
                <div v-if="product.rating" class="flex items-center gap-2">
                  <div class="flex gap-0.5">
                    <Icon v-for="n in 5" :key="n" name="mdi:star" class="w-4 h-4" :class="n <= Math.round(product.rating) ? 'text-amber-400' : 'text-white/20'" />
                  </div>
                  <span class="text-white/60 text-xs">{{ t('productDetail.ratingOutOf', { rating: product.rating, count: product.reviews_count }) }}</span>
                </div>

                <!-- Stats -->
                <div v-if="product.stats?.length" class="space-y-2 pt-2 border-t border-white/15">
                  <div v-for="stat in product.stats" :key="stat.label" class="flex items-center justify-between">
                    <span class="text-white/60 text-sm">{{ stat.label }}</span>
                    <span class="text-white font-bold text-sm">{{ stat.value }}</span>
                  </div>
                </div>
              </div>

              <div v-if="product.purchase_link" class="px-6 py-4 bg-white/10 border-t border-white/15">
                <a :href="product.purchase_link" target="_blank" rel="noopener" class="flex items-center justify-between text-white/80 hover:text-white transition-colors text-sm font-medium group/cta">
                  <span>{{ t('productDetail.getThisProduct') }}</span>
                  <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ────────────────────────────────────────── -->
    <section v-if="product.features?.length" class="section-padding bg-white">
      <div class="container-content">
        <div class="text-center mb-10">
          <h2 class="text-brand-text-primary mb-3">{{ t('productDetail.whatsIncluded') }}</h2>
          <p class="text-brand-text-secondary text-lg max-w-xl mx-auto">{{ t('productDetail.whatsIncludedSubheading') }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="feature in product.features" :key="feature" class="flex items-center gap-3 p-4 rounded-xl border border-brand-border bg-brand-surface">
            <div class="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:check-bold" class="w-4 h-4 text-brand-primary" />
            </div>
            <span class="text-sm font-medium text-brand-text-secondary">{{ feature }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── DESCRIPTION ────────────────────────────────────── -->
    <section v-if="product.description" class="section-padding bg-brand-surface">
      <div class="container-content max-w-3xl">
        <h2 class="text-brand-text-primary mb-6">{{ t('productDetail.aboutThisProduct') }}</h2>
        <div class="prose prose-sm max-w-none text-brand-text-secondary leading-relaxed" v-html="product.description" />
      </div>
    </section>

    <!-- ── HIGHLIGHTS ─────────────────────────────────────── -->
    <section v-if="product.highlights?.length" class="section-padding bg-white">
      <div class="container-content max-w-3xl">
        <h2 class="text-brand-text-primary mb-6">{{ t('productDetail.whyChooseThis') }}</h2>
        <ul class="space-y-3">
          <li v-for="highlight in product.highlights" :key="highlight" class="flex items-start gap-3">
            <Icon name="mdi:check-decagram" class="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
            <span class="text-sm text-brand-text-secondary leading-relaxed">{{ highlight }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ── PRICING PLANS ──────────────────────────────────── -->
    <section v-if="product.plans?.length" class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-10">
          <h2 class="text-brand-text-primary mb-3">{{ t('productDetail.chooseYourPlan') }}</h2>
          <p v-if="product.pricing_note" class="text-brand-text-secondary text-sm">{{ product.pricing_note }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            v-for="plan in product.plans"
            :key="plan.name"
            class="relative flex flex-col rounded-2xl border p-6 bg-white"
            :class="plan.is_popular ? 'border-brand-primary shadow-card-hover ring-2 ring-brand-primary/20' : 'border-brand-border shadow-card'"
          >
            <div v-if="plan.is_popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest">{{ t('pricingCard.mostPopular') }}</span>
            </div>
            <h3 class="text-base font-bold text-brand-text-primary mb-1">{{ plan.name }}</h3>
            <div class="flex items-baseline gap-1 mb-2">
              <span class="text-2xl font-black text-brand-text-primary">{{ plan.price }}</span>
              <span v-if="plan.period" class="text-xs text-brand-text-muted">/ {{ plan.period }}</span>
            </div>
            <p v-if="plan.description" class="text-sm text-brand-text-secondary mb-4">{{ plan.description }}</p>
            <ul class="space-y-2 flex-1">
              <li v-for="f in plan.features" :key="f" class="flex items-center gap-2 text-sm text-brand-text-secondary">
                <Icon name="mdi:check-bold" class="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                {{ f }}
              </li>
            </ul>
            <a v-if="product.purchase_link" :href="product.purchase_link" target="_blank" rel="noopener"
              class="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              :class="plan.is_popular ? 'bg-brand-primary text-white hover:opacity-90' : 'border border-brand-border text-brand-text-secondary hover:bg-brand-surface'"
            >
              {{ t('productDetail.getStarted') }} <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── RELATED ─────────────────────────────────────────── -->
    <section v-if="related.length" class="section-padding bg-white">
      <div class="container-content">
        <h2 class="text-brand-text-primary mb-8 text-center">{{ t('productDetail.relatedProducts') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="item in related"
            :key="item.slug"
            :to="`/products/${item.slug}`"
            class="group flex items-center gap-4 p-4 rounded-2xl border border-brand-border bg-brand-surface hover:bg-white hover:shadow-card transition-all duration-200"
          >
            <div class="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" :class="item.bg_gradient ?? 'bg-brand-primary'">
              <svg v-if="item.icon_path" class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path :d="item.icon_path" />
              </svg>
              <Icon v-else name="mdi:package-variant" class="w-6 h-6 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors truncate">{{ item.name }}</h4>
              <p class="text-xs text-brand-text-muted">{{ item.price_display }} <span v-if="item.price_period">/ {{ item.price_period }}</span></p>
            </div>
            <Icon name="mdi:arrow-right" class="w-4 h-4 text-brand-text-muted group-hover:text-brand-primary transition-colors flex-shrink-0" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
