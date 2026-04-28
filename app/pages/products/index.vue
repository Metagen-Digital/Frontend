<script setup lang="ts">
import type { ProductApiItem } from '~/types'

useSeoMeta({
  title: 'Products | MetaGenDigital',
  description: 'Explore MetaGenDigital digital products — tools and solutions built to grow your business.',
})

const { get } = useApi()

const { data: productsResponse } = await get<ProductApiItem[]>('/products')
const { data: catsResponse }     = await get<string[]>('/products/categories')

const allProducts = computed<ProductApiItem[]>(() => productsResponse.value?.data ?? [])
const categories  = computed<string[]>(() => ['All', ...(catsResponse.value?.data ?? [])])

const activeFilter = ref('All')

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? allProducts.value
    : allProducts.value.filter(p => p.categoryId === activeFilter.value),
)

function categoryLabel(cat: string) {
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
        <AppBreadcrumb :crumbs="[{ label: 'Products' }]" class="mb-6" />
        <SectionBadge icon="mdi:package-variant-outline" class="mb-5">Digital Products</SectionBadge>

        <h1 class="text-brand-text-primary mb-4 max-w-2xl">
          Tools Built to <span class="gradient-text">Grow Your Business</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl leading-relaxed">
          Standalone digital products and SaaS tools crafted for modern businesses — ready to use, built to scale.
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
            :key="cat"
            class="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
            :class="activeFilter === cat
              ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
              : 'bg-white text-brand-text-secondary border-brand-border hover:border-brand-primary/40 hover:text-brand-primary'"
            @click="activeFilter = cat"
          >
            {{ categoryLabel(cat) }}
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="py-20 text-center text-brand-text-muted">
          <Icon name="mdi:package-variant-outline" class="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p class="text-lg font-medium">No products in this category yet.</p>
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
                <Icon v-else name="mdi:package-variant-outline" class="w-8 h-8 text-white" />
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

      </div>
    </section>

    <CtaSection />
  </div>
</template>
