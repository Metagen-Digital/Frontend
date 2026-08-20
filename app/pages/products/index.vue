<script setup lang="ts">
import type { ProductApiItem } from '~/types'

interface CategoryItem {
  slug: string
  name: string
  count: number
}

const { t } = useI18n()
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: computed(() => t('productsPage.meta.title')),
  description: computed(() => t('productsPage.meta.description')),
  ogTitle: computed(() => t('productsPage.meta.title')),
  ogDescription: computed(() => t('productsPage.meta.ogDescription')),
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/products.jpg`,
})

const route = useRoute()
const router = useRouter()

const PER_PAGE = 12

// Page and filter live in the URL. /products is paginated server-side now, so
// filtering in the browser would only ever filter the page in front of you —
// and each page needs to be its own crawlable URL anyway.
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return Number.isInteger(page) && page > 0 ? page : 1
})

const activeFilter = computed(() => (route.query.category as string) || 'All')

const { get } = useApi()

const { data: productsResponse, status } = await get<ProductApiItem[]>('/products', {
  page: currentPage,
  per_page: PER_PAGE,
  category: computed(() => (activeFilter.value === 'All' ? undefined : activeFilter.value)),
})
const { data: catsResponse } = await get<CategoryItem[]>('/products/categories')

const allProducts = computed<ProductApiItem[]>(() => productsResponse.value?.data ?? [])

const isLoading = computed(() => status.value === 'pending')
const meta = computed(() => productsResponse.value?.meta)
const totalPages = computed(() => meta.value?.last_page ?? 1)
const totalProducts = computed(() => meta.value?.total ?? 0)

function goToPage(page: number) {
  router.push({ query: { ...route.query, page: page > 1 ? String(page) : undefined } })
}

function selectCategory(slug: string) {
  // Always back to page 1 — page 3 of a filter with one page renders nothing.
  router.push({ query: { category: slug === 'All' ? undefined : slug } })
}

// An out-of-range page must not answer 200 with an empty grid — to a crawler
// that is a soft 404, and it lets ?page=9999 mint unlimited thin URLs.
if (currentPage.value > 1 && allProducts.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useCollectionJsonLd({
  name: computed(() => t('productsPage.breadcrumb')),
  description: computed(() => t('productsPage.collectionDescription')),
  items: () => allProducts.value.map(product => ({ name: product.name, url: `/products/${product.slug}` })),
})

const categories = computed<CategoryItem[]>(() => [
  // slug stays 'All' — it's the internal filter value compared against
  // route.query.category and written into the URL, not display text. Only
  // `name` (what actually renders) needs to be localized.
  { slug: 'All', name: t('productsPage.allCategory'), count: totalProducts.value },
  ...(catsResponse.value?.data ?? []),
])

// The API already applied the category filter, so this is just the page.
const filtered = computed(() => allProducts.value)

function categoryLabel(cat: string | null | undefined) {
  if (!cat || typeof cat !== 'string') return ''
  return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<template>
  <div>
    <!-- ── HERO ──────────────────────────────────────────── -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none" />
      <div class="absolute top-16 right-0 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: t('productsPage.breadcrumb') }]" class="mb-6" />
        <SectionBadge icon="mdi:package-variant" class="mb-5">{{ t('productsPage.badge') }}</SectionBadge>

        <h1 class="text-brand-text-primary mb-4 max-w-2xl">
          {{ t('productsPage.heading') }} <span class="gradient-text">{{ t('productsPage.headingHighlight') }}</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl leading-relaxed">
          {{ t('productsPage.subheading') }}
        </p>
      </div>
    </section>

    <!-- ── PRODUCTS GRID ─────────────────────────────────── -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">

        <!-- Category filter -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            v-for="cat in categories"
            :key="cat.slug"
            class="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
            :class="activeFilter === cat.slug
              ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
              : 'bg-white text-brand-text-secondary border-brand-border hover:border-brand-primary/40 hover:text-brand-primary'"
            @click="selectCategory(cat.slug)"
          >
            {{ cat.name }}
            <span v-if="cat.slug !== 'All'" class="ml-1 opacity-60 text-[11px]">({{ cat.count }})</span>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0 && !isLoading" class="py-20 text-center text-brand-text-muted">
          <Icon name="mdi:package-variant" class="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p class="text-lg font-medium">{{ t('productsPage.empty') }}</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <NuxtLink
            v-for="product in filtered"
            :key="product.slug"
            :to="`/products/${product.slug}`"
            class="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
          >
            <!-- Gradient top -->
            <div
              class="relative h-40 flex items-center justify-center overflow-hidden"
              :class="product.bg_gradient ?? 'bg-gradient-to-br from-brand-primary to-brand-purple'"
            >
              <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
              <div class="absolute -left-6 bottom-0 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />

              <!-- SVG icon from icon_path -->
              <div class="relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg v-if="product.icon_path" class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="product.icon_path" />
                </svg>
                <Icon v-else name="mdi:package-variant" class="w-8 h-8 text-white" />
              </div>

              <!-- Badge -->
              <span
                v-if="product.badge"
                class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                :class="product.badgeClass"
              >
                {{ product.badge }}
              </span>
            </div>

            <!-- Body -->
            <div class="flex flex-col flex-1 p-5">
              <!-- Category pill -->
              <span v-if="product.category" class="inline-block self-start mb-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-surface border border-brand-border text-brand-text-muted">
                {{ categoryLabel(product.category) }}
              </span>

              <h3 class="text-[16px] font-bold text-brand-text-primary mb-1.5 leading-snug group-hover:text-brand-primary transition-colors duration-200">
                {{ product.name }}
              </h3>
              <p class="text-xs text-brand-text-secondary italic mb-2">{{ product.tagline }}</p>
              <p class="text-sm text-brand-text-secondary leading-relaxed mb-4 flex-1">
                {{ product.short_description }}
              </p>

              <!-- Features -->
              <div v-if="product.features?.length" class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="f in product.features.slice(0, 3)"
                  :key="f"
                  class="px-2 py-1 rounded-lg text-[11px] font-medium bg-brand-surface border border-brand-border text-brand-text-secondary"
                >
                  {{ f }}
                </span>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-3.5 border-t border-brand-border">
                <div>
                  <span v-if="product.price_display" class="text-lg font-black text-brand-text-primary">{{ product.price_display }}</span>
                  <span v-if="product.price_period" class="text-xs text-brand-text-muted ml-1">{{ product.price_period }}</span>
                </div>
                <div class="flex items-center gap-1 text-brand-text-muted">
                  <Icon name="mdi:star" class="w-3.5 h-3.5 text-amber-400" />
                  <span class="text-xs font-semibold">{{ product.rating ?? '—' }}</span>
                  <span class="text-[11px]">({{ product.reviews_count }})</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Server-side pagination — every page is its own URL. -->
        <div v-if="totalPages > 1" class="mt-14">
          <BasePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:current-page="goToPage"
          />
          <p class="mt-4 text-center text-sm text-brand-text-muted">
            {{ t('productsPage.showingOf', { from: meta?.from ?? 0, to: meta?.to ?? 0, total: totalProducts }) }}
          </p>
        </div>

      </div>
    </section>

    <CtaSection />
  </div>
</template>
