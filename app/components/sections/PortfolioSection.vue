<script setup lang="ts">
import type { CaseStudyApiItem, PortfolioCategory } from "~/types";

const { get } = useApi();
const { data: caseStudiesResponse, status } = await get<CaseStudyApiItem[]>("/case-studies/featured");

function normalizeCategory(category?: string | null): PortfolioCategory {
  const normalized = (category || "").toLowerCase();
  if (normalized.includes("social")) return "Social Media";
  if (normalized.includes("photo")) return "Photography";
  if (normalized.includes("video")) return "Video";
  if (normalized.includes("ecommerce") || normalized.includes("e-commerce")) return "E-commerce";
  return "Web Dev";
}

function toTagColor(category: PortfolioCategory) {
  if (category === "Social Media" || category === "E-commerce") return "purple" as const;
  if (category === "Photography") return "cyan" as const;
  return "orange" as const;
}

const isLoading = computed(() => status.value === "pending");

const items = computed(() => {
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
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop",
      tagColor: toTagColor(category),
      result: metric ? `${metric.value} ${metric.label}` : item.type || "Case study",
      client: item.clientName || "MetaGen Client",
      year: item.projectEndDate
        ? new Date(item.projectEndDate).getFullYear()
        : item.createdAt
          ? new Date(item.createdAt).getFullYear()
          : new Date().getFullYear(),
    };
  });
});

const activeCategory = ref<"All" | PortfolioCategory>("All");

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

const isEmpty = computed(() => !isLoading.value && items.value.length === 0);
</script>

<template>
  <section class="section-padding bg-white" aria-label="Our Portfolio">
    <div class="container-content">

      <!-- Heading -->
      <div class="text-center mb-6">
        <SectionBadge icon="mdi:briefcase-outline" color="primary" class="mb-4">Our Work</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          Projects That
          <span class="gradient-text"> Speak for Themselves</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          A selection of our best work — web development, photography, social
          media and digital campaigns.
        </p>
      </div>

      <!-- Skeleton loading -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-2xl bg-white border border-brand-border shadow-card overflow-hidden animate-pulse"
        >
          <div class="aspect-[16/10] bg-gray-200" />
          <div class="p-5 space-y-2">
            <div class="h-4 w-3/4 bg-gray-200 rounded" />
            <div class="h-3 w-1/2 bg-gray-100 rounded" />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="isEmpty"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="w-20 h-20 rounded-2xl bg-brand-border/60 flex items-center justify-center mb-6 shadow-sm">
          <Icon name="mdi:folder-open-outline" class="w-10 h-10 text-brand-text-secondary" aria-hidden="true" />
        </div>
        <h3 class="text-xl font-bold text-brand-text-primary mb-2">No Projects Available</h3>
        <p class="text-sm text-brand-text-secondary max-w-xs">
          We're adding our latest work. Check back soon.
        </p>
      </div>

      <!-- Filter tabs + Grid -->
      <template v-else>
        <!-- Filter tabs -->
        <div
          class="flex flex-wrap justify-center gap-2 mb-6"
          role="tablist"
          aria-label="Filter portfolio by category"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 rounded-btn text-sm font-medium transition-all duration-200 border"
            :class="
              activeCategory === cat
                ? 'bg-brand-primary border-brand-primary text-white shadow-glow-primary'
                : 'bg-brand-surface border-brand-border text-brand-text-secondary hover:border-brand-primary hover:text-brand-primary'
            "
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <TransitionGroup
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          enter-active-class="transition-all duration-400 ease-spring"
          enter-from-class="opacity-0 scale-95"
          leave-active-class="transition-all duration-250 absolute"
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
      </template>

      <!-- View all -->
      <div v-if="!isEmpty && !isLoading" class="flex justify-center mt-6">
        <GradientButton to="/portfolio" variant="outline" icon-right="mdi:arrow-right">
          View Full Portfolio
        </GradientButton>
      </div>

    </div>
  </section>
</template>
