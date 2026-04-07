<script setup lang="ts">
useSeoMeta({
  title: "Blog & Insights | MetaGenDigital",
  description:
    "Digital marketing tips, case studies, web development guides, and industry insights from the MetaGenDigital team.",
});

const categories = [
  "All",
  "SEO",
  "Social Media",
  "Web Dev",
  "Case Studies",
  "Marketing",
];
const activeCategory = ref("All");

// Placeholder — connect to @nuxt/content in Phase 4
const posts = ref([
  {
    slug: "how-to-grow-on-social-media",
    title: "How to Grow Your Brand on Social Media in 2025",
    excerpt:
      "A practical guide to building a strong social media presence with consistent content and community engagement.",
    category: "Social Media",
    thumbnail: "/images/placeholder.jpg",
    date: "2025-03-15",
    readTime: "5 min read",
  },
  {
    slug: "seo-tips-for-small-businesses",
    title: "10 SEO Tips Every Small Business Should Know",
    excerpt:
      "Simple, actionable SEO strategies to help your business rank higher in search results without a big budget.",
    category: "SEO",
    thumbnail: "/images/placeholder.jpg",
    date: "2025-02-28",
    readTime: "7 min read",
  },
  {
    slug: "ecommerce-store-launch-checklist",
    title: "The Ultimate E-commerce Store Launch Checklist",
    excerpt:
      "Everything you need to check before going live with your online store — from payments to mobile optimization.",
    category: "Web Development",
    thumbnail: "/images/placeholder.jpg",
    date: "2025-02-10",
    readTime: "6 min read",
  },
]);

const filtered = computed(() =>
  activeCategory.value === "All"
    ? posts.value
    : posts.value.filter((p) => p.category === activeCategory.value),
);
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="pt-32 pb-12 bg-brand-surface border-b border-brand-border relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Blog' }]" class="mb-6" />
        <SectionBadge icon="mdi:newspaper-variant-outline" class="mb-5"
          >Insights</SectionBadge
        >
        <h1 class="text-brand-text-primary mb-4 mt-4">
          Blog & <span class="gradient-text">Insights</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl">
          Tips, strategies, and case studies from our digital marketing experts.
        </p>
      </div>
    </section>

    <section class="section-padding">
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
            class="px-4 py-2 rounded-btn text-sm font-medium transition-all duration-150 border"
            :class="
              activeCategory === cat
                ? 'bg-brand-orange border-brand-orange text-white shadow-glow-orange'
                : 'bg-white border-brand-border text-brand-text-secondary hover:border-brand-orange hover:text-brand-orange'
            "
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Posts grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            v-for="post in filtered"
            :key="post.slug"
            :title="post.title"
            :excerpt="post.excerpt"
            :category="post.category"
            :date="post.date"
            :read-time="post.readTime"
            :thumbnail="post.thumbnail"
            :to="`/blog/${post.slug}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>
