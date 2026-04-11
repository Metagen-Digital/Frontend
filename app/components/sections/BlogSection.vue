<script setup lang="ts">
import type { BlogApiItem } from "~/types";

const fallbackPosts = [
  {
    slug: "how-to-grow-on-social-media",
    title: "How to Grow Your Brand on Social Media in 2025",
    excerpt:
      "A practical guide to building a strong social media presence with consistent content and genuine community engagement.",
    category: "Social Media",
    categoryColor: "purple" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1611162616305-c69d394736a4?w=800&q=80&auto=format&fit=crop",
    date: "2025-03-15",
    readTime: "5 min read",
  },
  {
    slug: "seo-tips-for-small-businesses",
    title: "10 SEO Tips Every Small Business Should Know",
    excerpt:
      "Simple, actionable SEO strategies to help your business rank higher in search results without breaking the bank.",
    category: "SEO",
    categoryColor: "orange" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format&fit=crop",
    date: "2025-02-28",
    readTime: "7 min read",
  },
  {
    slug: "ecommerce-store-launch-checklist",
    title: "The Ultimate E-commerce Store Launch Checklist",
    excerpt:
      "Everything you need to check before going live with your online store — payments, mobile optimisation, and beyond.",
    category: "Web Dev",
    categoryColor: "cyan" as const,
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop",
    date: "2025-02-10",
    readTime: "6 min read",
  },
];

const { get } = useApi();
const { data: blogsResponse } = await get<BlogApiItem[]>("/blogs/featured");

function categoryColor(category?: string | null) {
  if (category === "Social Media") return "purple" as const;
  if (category === "Web Dev" || category === "Case Studies")
    return "cyan" as const;
  return "orange" as const;
}

const posts = computed(() => {
  const apiItems = blogsResponse.value?.data ?? [];
  if (!apiItems.length) {
    return fallbackPosts;
  }

  return apiItems.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category || "Marketing",
    categoryColor: categoryColor(post.category),
    thumbnail:
      post.featuredImage ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    date: post.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: post.readTimeText,
  }));
});
</script>

<template>
  <section
    class="section-padding bg-brand-surface"
    aria-label="Blog and Insights"
  >
    <div class="container-content">
      <!-- Heading row -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <SectionBadge
            icon="mdi:newspaper-variant-outline"
            color="purple"
            class="mb-4"
            >Blog & Insights</SectionBadge
          >
          <h2 class="text-brand-text-primary mt-4 mb-2">
            Tips & Insights From
            <span class="gradient-text"> Our Team</span>
          </h2>
          <p class="text-brand-text-secondary max-w-lg">
            Stay ahead with the latest in digital marketing, web development,
            and growth strategies.
          </p>
        </div>
        <GradientButton
          to="/blog"
          variant="outline"
          icon-right="mdi:arrow-right"
          class="flex-shrink-0"
        >
          View All Posts
        </GradientButton>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(post, i) in posts"
          :key="post.slug"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: i * 100, duration: 500 },
          }"
        >
          <BlogCard
            :title="post.title"
            :excerpt="post.excerpt"
            :category="post.category"
            :category-color="post.categoryColor"
            :date="post.date"
            :read-time="post.readTime"
            :thumbnail="post.thumbnail"
            :to="`/blog/${post.slug}`"
            class="h-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
