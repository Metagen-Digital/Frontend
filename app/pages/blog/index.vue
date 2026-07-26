<script setup lang="ts">
import type { BlogApiItem } from "~/types";
const { t } = useI18n()

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "https://metagendigital.com";

useSeoMeta({
  title: "Blog & Insights | MetaGenDigital",
  description:
    "Digital marketing tips, web development guides, social media strategies, and industry insights from the MetaGenDigital team.",
  ogTitle: "Blog & Insights | MetaGenDigital",
  ogDescription:
    "Digital marketing tips, web development guides, social media strategies, and industry insights.",
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/home.jpg`,
});

type CategoryColor = "orange" | "purple" | "cyan";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: CategoryColor;
  thumbnail: string;
  date: string;
  readTime: string;
  author: string;
}

const activeCategory = ref("All");

const { get } = useApi();
const { data: blogsResponse } = await get<BlogApiItem[]>("/blogs");

function categoryColor(category?: string | null): CategoryColor {
  if (category === "Social Media") return "purple";
  if (category === "Web Dev" || category === "Case Studies") return "cyan";
  return "orange";
}

const posts = computed<Post[]>(() => {
  const apiItems = blogsResponse.value?.data ?? [];
  return apiItems.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category || "Marketing",
    categoryColor: categoryColor(post.category),
    thumbnail:
      post.featuredImage ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
    date: post.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: post.readTimeText,
    author: post.authorName,
  }));
});

const categories = computed(() => {
  const uniqueCategories = Array.from(
    new Set(posts.value.map((post) => post.category).filter(Boolean)),
  );
  return ["All", ...uniqueCategories];
});

// Every post, not just the currently filtered view — category filtering is a
// client-side ref, so the crawler's URL always represents the full list.
useCollectionJsonLd({
  name: "Blog & Insights",
  description: "Digital marketing, web development and social media insights from MetaGenDigital.",
  items: () => posts.value.map(post => ({ name: post.title, url: `/blog/${post.slug}` })),
});

const featured = computed(() => posts.value[0] as Post);
const filtered = computed(() => {
  const rest = posts.value.slice(1);
  return activeCategory.value === "All"
    ? rest
    : rest.filter((p) => p.category === activeCategory.value);
});

const categoryCount = (cat: string) =>
  cat === "All"
    ? posts.value.length
    : posts.value.filter((p) => p.category === cat).length;
</script>

<template>
  <div>
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none"
      />
      <div
        class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: $t('blogPage.breadcrumb') }]" class="mb-6" />
        <SectionBadge icon="mdi:newspaper-variant-outline" class="mb-5">{{ $t('blogPage.badge') }}</SectionBadge>

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 class="text-brand-text-primary mb-4 max-w-2xl">
              {{ $t('blogPage.heading') }} <span class="gradient-text">{{ $t('blogPage.headingHighlight') }}</span>
            </h1>
            <p class="text-brand-text-secondary text-lg max-w-xl leading-relaxed">
              {{ $t('blogPage.subheading') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FEATURED POST
    ══════════════════════════════════════════════════ -->
    <section class="pb-12 bg-white">
      <div class="container-content">
        <p class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-5">
          {{ $t('blogPage.featured') }}
        </p>
        <BlogCard
          :title="featured.title"
          :excerpt="featured.excerpt"
          :category="featured.category"
          :category-color="featured.categoryColor"
          :date="featured.date"
          :read-time="featured.readTime"
          :thumbnail="featured.thumbnail"
          :to="`/blog/${featured.slug}`"
          :author="featured.author"
          :featured="true"
          class="md:grid md:grid-cols-2 md:[&>div:first-child]:aspect-auto md:[&>div:first-child]:h-full"
        />
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
          aria-label="Filter blog by category"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border"
            :class="
              activeCategory === cat
                ? 'bg-brand-primary border-brand-primary text-white shadow-glow-primary'
                : 'bg-brand-surface border-brand-border text-brand-text-secondary hover:border-brand-primary/50 hover:text-brand-primary'
            "
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
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

        <!-- Posts grid -->
        <TransitionGroup
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          enter-active-class="transition-all duration-400 ease-spring"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 absolute"
          leave-to-class="opacity-0 scale-95"
        >
          <BlogCard
            v-for="post in filtered"
            :key="post.slug"
            :title="post.title"
            :excerpt="post.excerpt"
            :category="post.category"
            :category-color="post.categoryColor"
            :date="post.date"
            :read-time="post.readTime"
            :thumbnail="post.thumbnail"
            :to="`/blog/${post.slug}`"
            :author="post.author"
          />
        </TransitionGroup>

        <div
          v-if="filtered.length === 0"
          class="flex flex-col items-center py-24 text-center"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-brand-surface flex items-center justify-center mb-4"
          >
            <Icon
              name="mdi:newspaper-variant-outline"
              class="w-8 h-8 text-brand-text-muted"
              aria-hidden="true"
            />
          </div>
          <p class="text-brand-text-secondary font-medium mb-1">
            No articles in this category yet
          </p>
          <p class="text-brand-text-muted text-sm">
            More content is being published weekly — check back soon.
          </p>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
