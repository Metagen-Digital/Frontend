<script setup lang="ts">
import type { CaseStudyApiItem, PortfolioCategory } from "~/types";
const { t } = useI18n()

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "https://metagendigital.com";

useSeoMeta({
  title: "Portfolio | MetaGenDigital",
  description:
    "Explore our work — web development, social media, photography, video, and e-commerce projects that deliver real results.",
  ogTitle: "Portfolio | MetaGenDigital",
  ogDescription:
    "Web development, social media, photography, video and e-commerce projects that deliver real results.",
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/portfolio.jpg`,
});

type TagColor = "orange" | "purple" | "cyan";

interface Item {
  slug: string;
  title: string;
  category: PortfolioCategory;
  thumbnail: string;
  tagColor: TagColor;
  result: string;
  client: string;
  year: number;
}

const route = useRoute();
const router = useRouter();

const activeCategory = computed<"All" | PortfolioCategory>(
  () => ((route.query.category as PortfolioCategory) || "All"),
);

const currentPage = computed(() => {
  const page = Number(route.query.page);
  return Number.isInteger(page) && page > 0 ? page : 1;
});

// NOTE — deliberately requests the maximum page size rather than filtering
// server-side, unlike /blog and /products.
//
// The category tabs here are DISPLAY BUCKETS: normalizeCategory() below folds
// whatever the CMS stores into five fixed labels (Web Dev, Social Media,
// Photography, Video, E-commerce). Those labels do not exist as values in the
// database, so `?category=Web Dev` would match nothing. Loading a full page and
// bucketing in the browser keeps the filter correct.
//
// This holds as long as the portfolio fits in one page of 50 — comfortably true
// today (6 case studies). Past that, the buckets have to become a real column
// on case_studies so the API can filter on them; the pagination control below
// is already wired for it. See docs/ACTION_PLAN.md.
const PER_PAGE = 50;

const { get } = useApi();
const { data: caseStudiesResponse } = await get<CaseStudyApiItem[]>("/case-studies", {
  page: currentPage,
  per_page: PER_PAGE,
});

const meta = computed(() => caseStudiesResponse.value?.meta);
const totalPages = computed(() => meta.value?.last_page ?? 1);
const totalProjects = computed(() => meta.value?.total ?? 0);

function goToPage(page: number) {
  router.push({ query: { ...route.query, page: page > 1 ? String(page) : undefined } });
}

function selectCategory(category: "All" | PortfolioCategory) {
  router.push({ query: { category: category === "All" ? undefined : category } });
}

function normalizeCategory(category?: string | null): PortfolioCategory {
  const normalized = (category || "").toLowerCase();
  if (normalized.includes("social")) return "Social Media";
  if (normalized.includes("photo")) return "Photography";
  if (normalized.includes("video")) return "Video";
  if (normalized.includes("ecommerce") || normalized.includes("e-commerce"))
    return "E-commerce";
  return "Web Dev";
}

function toTagColor(category: PortfolioCategory): TagColor {
  if (category === "Social Media" || category === "E-commerce") return "purple";
  if (category === "Photography") return "cyan";
  return "orange";
}

const items = computed<Item[]>(() => {
  const apiItems = caseStudiesResponse.value?.data ?? [];
  return apiItems.map((item) => {
    const category = normalizeCategory(item.category);
    const metric = item.metrics?.[0];

    return {
      slug: item.slug,
      title: item.title,
      category,
      thumbnail:
        item.image ||
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80&auto=format&fit=crop",
      tagColor: toTagColor(category),
      result: metric
        ? `${metric.value} ${metric.label}`
        : item.type || "Project result",
      client: item.clientName || "MetaGen Client",
      year: item.projectEndDate
        ? new Date(item.projectEndDate).getFullYear()
        : item.createdAt
          ? new Date(item.createdAt).getFullYear()
          : new Date().getFullYear(),
    };
  });
});

// An out-of-range page must not answer 200 with an empty grid — that is a soft
// 404 to a crawler.
if (currentPage.value > 1 && items.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Everything this URL renders. Category filtering is a client-side bucket, so
// the crawler's URL always represents the full page of projects.
useCollectionJsonLd({
  name: "Portfolio",
  description: "Web development, social media, photography and e-commerce case studies.",
  items: () => items.value.map(item => ({ name: item.title, url: `/portfolio/${item.slug}` })),
});

const categories = computed<("All" | PortfolioCategory)[]>(() => {
  const unique = Array.from(
    new Set(items.value.map((item) => item.category)),
  ) as PortfolioCategory[];
  return ["All", ...unique];
});

const filtered = computed(() =>
  activeCategory.value === "All"
    ? items.value
    : items.value.filter((i) => i.category === activeCategory.value),
);

const categoryCount = (cat: "All" | PortfolioCategory) =>
  cat === "All"
    ? items.value.length
    : items.value.filter((i) => i.category === cat).length;
</script>

<template>
  <div>
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <!-- Background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none"
      />
      <div
        class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: $t('portfolioPage.breadcrumb') }]" class="mb-6" />
        <SectionBadge icon="mdi:briefcase-outline" class="mb-5">{{ $t('portfolioPage.badge') }}</SectionBadge>

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 class="text-brand-text-primary mb-4 max-w-2xl">
              {{ $t('portfolioPage.heading') }}
              <span class="gradient-text"> {{ $t('portfolioPage.headingHighlight') }}</span>
            </h1>
            <p class="text-brand-text-secondary text-lg max-w-xl leading-relaxed">
              {{ $t('portfolioPage.subheading') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FILTER + GRID
    ══════════════════════════════════════════════════ -->
    <section class="pb-20 md:pb-28 bg-white">
      <div class="container-content">
        <!-- Filter tabs -->
        <div
          class="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter by category"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border"
            :class="
              activeCategory === cat
                ? 'bg-brand-primary border-brand-primary text-white shadow-glow-primary'
                : 'bg-brand-surface border-brand-border text-brand-text-secondary hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-surface'
            "
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="selectCategory(cat)"
          >
            {{ cat }}
            <span
              class="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-colors duration-200"
              :class="
                activeCategory === cat
                  ? 'bg-white/20 text-white'
                  : 'bg-brand-border text-brand-text-muted'
              "
            >
              {{ categoryCount(cat) }}
            </span>
          </button>
        </div>

        <!-- Project grid -->
        <TransitionGroup
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
          enter-active-class="transition-all duration-400 ease-spring"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 absolute"
          leave-to-class="opacity-0 scale-95"
        >
          <PortfolioCard
            v-for="item in filtered"
            :key="item.slug"
            :title="item.title"
            :category="item.category"
            :thumbnail="item.thumbnail"
            :to="`/portfolio/${item.slug}`"
            :tag-color="item.tagColor"
            :result="item.result"
            :client="item.client"
            :year="item.year"
          />
        </TransitionGroup>

        <!-- Empty state -->
        <div
          v-if="filtered.length === 0"
          class="col-span-full flex flex-col items-center justify-center py-24 text-center"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-brand-surface flex items-center justify-center mb-4"
          >
            <Icon
              name="mdi:folder-open-outline"
              class="w-8 h-8 text-brand-text-muted"
              aria-hidden="true"
            />
          </div>
          <p class="text-brand-text-secondary font-medium mb-1">
            No projects in this category yet
          </p>
          <p class="text-brand-text-muted text-sm">
            Check back soon — more work is being added.
          </p>
        </div>

        <!-- Only appears once the portfolio outgrows a single page. -->
        <div v-if="totalPages > 1" class="mt-14">
          <BasePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:current-page="goToPage"
          />
          <p class="mt-4 text-center text-sm text-brand-text-muted">
            {{ meta?.from ?? 0 }}–{{ meta?.to ?? 0 }} of {{ totalProjects }}
          </p>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
