<script setup lang="ts">
import type { BlogApiItem } from "~/types";

useSeoMeta({
  title: "Blog & Insights | MetaGenDigital",
  description:
    "Digital marketing tips, web development guides, social media strategies, and industry insights from the MetaGenDigital team.",
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

const fallbackPosts: Post[] = [
  {
    slug: "digital-marketing-trends-2025",
    title: "Digital Marketing Trends You Cannot Ignore in 2025",
    excerpt:
      "AI-driven campaigns, zero-click search, and hyper-personalised content are reshaping how brands connect with customers. Here's what to prioritise.",
    category: "Marketing",
    categoryColor: "orange",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
    date: "2025-04-01",
    readTime: "8 min read",
    author: "Meem Chowdhury",
  },
  {
    slug: "how-to-grow-on-social-media",
    title: "How to Grow Your Brand on Social Media in 2025",
    excerpt:
      "A practical guide to building a strong social media presence with consistent content, genuine community engagement, and data-driven iteration.",
    category: "Social Media",
    categoryColor: "purple",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616305-c69d394736a4?w=900&q=80&auto=format&fit=crop",
    date: "2025-03-15",
    readTime: "5 min read",
    author: "Nafisa Hossain",
  },
  {
    slug: "seo-tips-for-small-businesses",
    title: "10 SEO Tips Every Small Business Should Know",
    excerpt:
      "Simple, actionable SEO strategies to help your business rank higher in search results without a big budget or technical expertise.",
    category: "SEO",
    categoryColor: "orange",
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80&auto=format&fit=crop",
    date: "2025-02-28",
    readTime: "7 min read",
    author: "Rakib Hassan",
  },
  {
    slug: "ecommerce-store-launch-checklist",
    title: "The Ultimate E-commerce Store Launch Checklist",
    excerpt:
      "Everything you need to verify before going live — payments, mobile UX, SEO, speed, and the small details that make a big difference.",
    category: "Web Dev",
    categoryColor: "cyan",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&auto=format&fit=crop",
    date: "2025-02-10",
    readTime: "6 min read",
    author: "Rifat Ahmed",
  },
  {
    slug: "instagram-reels-guide",
    title: "Instagram Reels Strategy That Actually Grows Your Account",
    excerpt:
      "Short-form video is dominating organic reach. Learn how to hook viewers in 2 seconds, structure a winning reel, and post consistently.",
    category: "Social Media",
    categoryColor: "purple",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop",
    date: "2025-01-22",
    readTime: "5 min read",
    author: "Nafisa Hossain",
  },
  {
    slug: "website-speed-and-seo",
    title: "Why Website Speed is Your Most Important SEO Factor",
    excerpt:
      "Google's Core Web Vitals directly impact where you rank. Here's exactly how to measure, diagnose, and fix your site's speed issues.",
    category: "Web Dev",
    categoryColor: "cyan",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=crop",
    date: "2025-01-08",
    readTime: "6 min read",
    author: "Rifat Ahmed",
  },
  {
    slug: "google-ads-beginners-guide",
    title: "Google Ads for Beginners: Get Results Without Wasting Budget",
    excerpt:
      "Most businesses burn through their first Google Ads budget with nothing to show for it. This guide shows you how to avoid the most common mistakes.",
    category: "Marketing",
    categoryColor: "orange",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80&auto=format&fit=crop",
    date: "2024-12-18",
    readTime: "9 min read",
    author: "Meem Chowdhury",
  },
  {
    slug: "brand-photography-tips",
    title: "How Great Photography Doubles Your Conversion Rate",
    excerpt:
      "Poor product photos are silently killing your sales. Learn what makes scroll-stopping imagery and how to brief a photographer for maximum ROI.",
    category: "Case Studies",
    categoryColor: "cyan",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80&auto=format&fit=crop",
    date: "2024-11-30",
    readTime: "4 min read",
    author: "Nazia Islam",
  },
];

const { get } = useApi();
const { data: blogsResponse } = await get<BlogApiItem[]>("/blogs");

function categoryColor(category?: string | null): CategoryColor {
  if (category === "Social Media") return "purple";
  if (category === "Web Dev" || category === "Case Studies") return "cyan";
  return "orange";
}

const posts = computed<Post[]>(() => {
  const apiItems = blogsResponse.value?.data ?? [];
  if (!apiItems.length) {
    return fallbackPosts;
  }

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
        <AppBreadcrumb :crumbs="[{ label: 'Blog' }]" class="mb-6" />
        <SectionBadge icon="mdi:newspaper-variant-outline" class="mb-5"
          >Insights</SectionBadge
        >

        <div
          class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <h1 class="text-brand-text-primary mb-4 max-w-2xl">
              Blog &amp; <span class="gradient-text">Insights</span>
            </h1>
            <p
              class="text-brand-text-secondary text-lg max-w-xl leading-relaxed"
            >
              Tips, strategies, and deep dives from our digital marketing and
              web development team — updated every week.
            </p>
          </div>
          <div class="flex flex-wrap gap-6 lg:gap-8 flex-shrink-0">
            <div
              v-for="s in [
                { v: '8+', l: 'Articles' },
                { v: '5', l: 'Topics' },
                { v: 'Weekly', l: 'Updates' },
              ]"
              :key="s.l"
              class="text-center"
            >
              <div class="text-2xl font-black gradient-text font-display">
                {{ s.v }}
              </div>
              <div class="text-xs text-brand-text-muted mt-0.5">{{ s.l }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FEATURED POST
    ══════════════════════════════════════════════════ -->
    <section class="pb-12 bg-white">
      <div class="container-content">
        <p
          class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-5"
        >
          Featured Article
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
