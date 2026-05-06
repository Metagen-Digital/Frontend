<script setup lang="ts">
import type { BlogApiItem } from "~/types";
const localePath = useLocalePath();
const { t } = useI18n();

const { get } = useApi();
const { data: blogsResponse } = await get<BlogApiItem[]>("/blogs/featured");

function categoryColor(category?: string | null) {
  if (category === "Social Media") return "purple" as const;
  if (category === "Web Dev" || category === "Case Studies") return "cyan" as const;
  return "orange" as const;
}

const posts = computed(() => {
  const apiItems = blogsResponse.value?.data ?? [];
  return apiItems.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category || "Marketing",
    categoryColor: categoryColor(post.category),
    thumbnail: post.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    date: post.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: post.readTimeText,
  }));
});

const hasPosts = computed(() => posts.value.length > 0);
</script>

<template>
  <section
    class="section-padding bg-brand-surface"
    aria-label="Blog and Insights"
  >
    <div class="container-content">
      <!-- Heading row -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <SectionBadge icon="mdi:newspaper-variant-outline" color="purple" class="mb-4">{{ t('blog.badge') }}</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-2">
            {{ t('blog.heading') }}
            <span class="gradient-text"> {{ t('blog.headingHighlight') }}</span>
          </h2>
          <p class="text-brand-text-secondary max-w-lg">
            {{ t('blog.subheading') }}
          </p>
        </div>
        <GradientButton
          :to="localePath('/blog')"
          variant="outline"
          icon-right="mdi:arrow-right"
          class="flex-shrink-0"
        >
          {{ t('blog.viewAll') }}
        </GradientButton>
      </div>

      <!-- Not available -->
      <div v-if="!hasPosts" class="flex items-center justify-center py-16">
        <p class="text-sm text-brand-text-muted italic">
          {{ t('blog.notAvailable') }}
        </p>
      </div>

      <!-- Cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(post, i) in posts"
          :key="post.slug"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 500 } }"
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
