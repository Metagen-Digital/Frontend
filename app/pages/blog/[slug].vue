<script setup lang="ts">
import type { BlogApiDetail, BlogApiItem } from "~/types";

const route = useRoute();
const { t, locale } = useI18n();

type CategoryColor = "orange" | "purple" | "cyan";

interface TocItem  { id: string; title: string }
interface AuthorInfo { name: string; role: string; bio: string; avatar: string }
interface PostData {
  title: string
  category: string
  categoryColor: CategoryColor
  date: string
  readTime: string
  thumbnail: string
  author: AuthorInfo
  tags: string[]
  toc: TocItem[]
  body: string
}

/* ─── Fetch ─────────────────────────────────────────────────── */
const { get } = useApi();
const slug = route.params.slug as string;
const { data: blogResponse, error: blogError } = await get<BlogApiDetail>(`/blogs/${slug}`);
const { data: relatedResponse } = await get<BlogApiItem[]>(`/blogs/${slug}/related`);

function categoryColor(category?: string | null): CategoryColor {
  if (category === "Social Media") return "purple";
  if (category === "Web Dev" || category === "Case Studies") return "cyan";
  return "orange";
}

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h2\s+id="([^"]+)">([^<]+)<\/h2>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    items.push({ id: match[1], title: match[2] });
  }
  return items;
}

const post = computed<PostData | null>(() => {
  const data = blogResponse.value?.data;
  if (!data) return null;
  return {
    title:         data.title,
    category:      data.category || "Marketing",
    categoryColor: categoryColor(data.category),
    date:          data.publishedAt || new Date().toISOString().slice(0, 10),
    readTime:      data.readTimeText,
    thumbnail:     data.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
    author: {
      name:   data.authorName,
      role:   data.category || "Content Team",
      bio:    data.authorBio || "Content contributor at MetaGenDigital.",
      avatar: data.authorName?.charAt(0) || "M",
    },
    tags:     data.tags || [],
    toc:      extractToc(data.content || ""),
    body:     data.content || "",
  };
});

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

/* ─── SEO ───────────────────────────────────────────────────── */
const detail = computed(() => blogResponse.value?.data);
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl as string) || "https://metagendigital.com";

// Prefer the meta fields authored in the backend; fall back to the excerpt, and
// only then to stripped body text (which tends to cut mid-sentence).
const metaDescription = computed(() =>
  detail.value?.metaDescription
  || toPlainText(detail.value?.excerpt)
  || toPlainText(post.value?.body),
);

useSeoMeta({
  title:       computed(() => detail.value?.metaTitle || `${post.value?.title} | MetaGenDigital Blog`),
  description: metaDescription,
  ogTitle:     computed(() => post.value?.title),
  ogDescription: metaDescription,
  ogType:      "article",
  ogImage:     computed(() => post.value?.thumbnail),
  twitterImage: computed(() => post.value?.thumbnail),
  articlePublishedTime: computed(() => detail.value?.publishedAt || undefined),
  articleAuthor: computed(() => (post.value ? [post.value.author.name] : undefined)),
});

// Article rich result — feeds Google Discover and the "top stories" surfaces,
// which is where a bilingual agency blog picks up most of its organic reach.
useJsonLd("article", () => {
  const p = post.value;
  if (!p) return null;
  return {
    "@type": "BlogPosting",
    headline: p.title.slice(0, 110), // Google ignores headlines beyond ~110 chars
    description: metaDescription.value,
    image: [p.thumbnail],
    datePublished: p.date,
    dateModified: detail.value?.publishedAt || p.date,
    author: { "@type": "Person", name: p.author.name, description: p.author.bio },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${route.path}` },
    articleSection: p.category,
    keywords: p.tags?.join(", ") || undefined,
    wordCount: p.body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length,
    inLanguage: locale.value === "bn" ? "bn-BD" : "en-US",
  };
});

/* ─── Related posts ─────────────────────────────────────────── */
const relatedPosts = computed(() => {
  const items = relatedResponse.value?.data ?? [];
  return items.map((item) => ({
    slug:          item.slug,
    title:         item.title,
    thumbnail:     item.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70",
    category:      item.category || "Marketing",
    categoryColor: categoryColor(item.category),
    date:          item.publishedAt || new Date().toISOString().slice(0, 10),
    readTime:      item.readTimeText,
  }));
});

/* ─── Active TOC ────────────────────────────────────────────── */
const activeToc = ref("");
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => { entries.forEach((e) => { if (e.isIntersecting) activeToc.value = e.target.id; }); },
    { rootMargin: "-80px 0px -60% 0px" },
  );
  post.value?.toc.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });
  onUnmounted(() => observer.disconnect());
});

/* ─── Share ─────────────────────────────────────────────────── */
const shareUrl = computed(() => (typeof window !== "undefined" ? window.location.href : ""));
const copied   = ref(false);
function copyLink() {
  navigator.clipboard.writeText(shareUrl.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

/* ─── Helpers ───────────────────────────────────────────────── */
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const colorConfig = {
  orange: {
    heroBg:    "from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]",
    badge:     "bg-brand-orange",
    text:      "text-brand-orange",
    iconBg:    "bg-orange-50",
    iconText:  "text-brand-orange",
    tagBg:     "bg-orange-50 text-orange-700 border-orange-200",
    tocActive: "text-brand-orange border-l-2 border-brand-orange",
    btnBg:     "bg-brand-orange hover:bg-orange-600",
  },
  purple: {
    heroBg:    "from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]",
    badge:     "bg-brand-purple",
    text:      "text-brand-purple",
    iconBg:    "bg-violet-50",
    iconText:  "text-brand-purple",
    tagBg:     "bg-violet-50 text-violet-700 border-violet-200",
    tocActive: "text-brand-purple border-l-2 border-brand-purple",
    btnBg:     "bg-brand-purple hover:bg-violet-700",
  },
  cyan: {
    heroBg:    "from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]",
    badge:     "bg-brand-cyan",
    text:      "text-brand-cyan",
    iconBg:    "bg-sky-50",
    iconText:  "text-brand-cyan",
    tagBg:     "bg-sky-50 text-sky-700 border-sky-200",
    tocActive: "text-brand-cyan border-l-2 border-brand-cyan",
    btnBg:     "bg-brand-cyan hover:bg-sky-600",
  },
};

const cfg = computed(() => colorConfig[post.value?.categoryColor ?? "orange"]);

const categoryIcon: Record<string, string> = {
  SEO:            "mdi:magnify",
  "Social Media": "mdi:instagram",
  "Web Dev":      "mdi:web",
  Marketing:      "mdi:trending-up",
  "Case Studies": "mdi:briefcase-outline",
};
</script>

<template>
  <div v-if="post" class="min-h-screen">
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section
      class="relative pt-24 pb-0 overflow-hidden bg-gradient-to-br"
      :class="cfg.heroBg"
    >
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute left-0 -bottom-8 w-64 h-64 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10 pb-12">
        <div class="mb-8 opacity-75">
          <AppBreadcrumb :crumbs="[{ label: $t('blogDetail.breadcrumb'), to: '/blog' }, { label: post.category }]" />
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <Icon :name="categoryIcon[post.category] ?? 'mdi:newspaper'" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ post.category }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm">
            <Icon name="mdi:clock-outline" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ post.readTime }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm">
            <Icon name="mdi:calendar-outline" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ formatDate(post.date) }}
          </span>
        </div>

        <h1 class="text-white mb-5 max-w-3xl leading-tight">{{ post.title }}</h1>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-bold">
            {{ post.author.avatar }}
          </div>
          <div>
            <p class="text-white font-semibold text-sm">{{ post.author.name }}</p>
            <p class="text-white/60 text-xs">{{ post.author.role }}</p>
          </div>
        </div>
      </div>

      <div class="container-content relative z-10">
        <div class="rounded-t-2xl overflow-hidden shadow-2xl aspect-[21/8] bg-brand-surface">
          <img :src="post.thumbnail" :alt="post.title" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         ARTICLE + SIDEBAR
    ══════════════════════════════════════════════════ -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-content">
        <div class="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 xl:gap-16 items-start">

          <!-- Article body -->
          <article>
            <div class="prose-brand max-w-none" v-html="post.body" />

            <!-- Tags -->
            <div class="mt-10 pt-8 border-t border-brand-border">
              <p class="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-3">{{ $t('blogDetail.tags') }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  :class="cfg.tagBg"
                >{{ tag }}</span>
              </div>
            </div>

            <!-- Author bio -->
            <div class="mt-10 rounded-2xl border border-brand-border bg-brand-surface p-6 flex items-start gap-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                :class="cfg.btnBg.split(' ')[0]"
              >
                {{ post.author.avatar }}
              </div>
              <div>
                <p class="font-bold text-brand-text-primary mb-0.5">{{ post.author.name }}</p>
                <p class="text-xs font-semibold mb-2" :class="cfg.text">{{ post.author.role }} · MetaGenDigital</p>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ post.author.bio }}</p>
              </div>
            </div>

            <!-- Share -->
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <span class="text-sm font-bold text-brand-text-primary">{{ $t('blogDetail.share') }}</span>
              <button
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-brand-primary hover:text-brand-primary transition-all duration-200"
                @click="copyLink"
              >
                <Icon :name="copied ? 'mdi:check' : 'mdi:link-variant'" class="w-4 h-4" aria-hidden="true" />
                {{ copied ? $t('blogDetail.copied') : $t('blogDetail.copyLink') }}
              </button>
              <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all duration-200">
                <Icon name="mdi:linkedin" class="w-4 h-4" aria-hidden="true" /> LinkedIn
              </a>
              <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-black hover:text-black transition-all duration-200">
                <Icon name="mdi:twitter" class="w-4 h-4" aria-hidden="true" /> X / Twitter
              </a>
            </div>
          </article>

          <!-- Sticky sidebar -->
          <aside class="lg:sticky lg:top-24 space-y-5">
            <!-- TOC -->
            <div class="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden">
              <div class="px-5 py-4 border-b border-brand-border flex items-center gap-2">
                <Icon name="mdi:format-list-bulleted" class="w-4 h-4" :class="cfg.text" aria-hidden="true" />
                <p class="text-[12px] font-bold text-brand-text-primary uppercase tracking-widest">{{ $t('blogDetail.tableOfContents') }}</p>
              </div>
              <nav class="p-4 space-y-1">
                <a
                  v-for="item in post.toc"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="block px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200"
                  :class="activeToc === item.id
                    ? ['bg-brand-surface font-semibold', cfg.text]
                    : 'text-brand-text-secondary hover:text-brand-primary hover:bg-brand-surface'"
                >{{ item.title }}</a>
              </nav>
            </div>

            <!-- Read time -->
            <div class="bg-brand-surface rounded-2xl border border-brand-border p-5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="cfg.iconBg">
                <Icon name="mdi:clock-outline" class="w-5 h-5" :class="cfg.iconText" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider mb-0.5">{{ $t('blogDetail.readingTime') }}</p>
                <p class="text-sm font-bold text-brand-text-primary">{{ post.readTime }}</p>
              </div>
            </div>

            <!-- CTA widget -->
            <div
              class="rounded-2xl border border-brand-border overflow-hidden shadow-card bg-gradient-to-br"
              :class="cfg.heroBg"
            >
              <div class="absolute inset-0 bg-white/5" />
              <div class="relative p-5">
                <p class="text-white font-bold text-sm mb-1">Need help with {{ post.category }}?</p>
                <p class="text-white/70 text-xs mb-4 leading-relaxed">Our team is ready to implement these strategies for your business.</p>
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white text-sm font-semibold rounded-btn transition-all duration-200 hover:bg-white/90"
                  :class="cfg.text"
                >
                  Get a Free Consultation
                  <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         RELATED POSTS
    ══════════════════════════════════════════════════ -->
    <section v-if="relatedPosts.length" class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="mb-10">
          <h2 class="text-brand-text-primary">{{ $t('blogDetail.relatedPosts') }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <BlogCard
            v-for="related in relatedPosts"
            :key="related.slug"
            :title="related.title"
            excerpt=""
            :category="related.category"
            :category-color="related.categoryColor"
            :date="related.date"
            :read-time="related.readTime + ' read'"
            :thumbnail="related.thumbnail"
            :to="`/blog/${related.slug}`"
          />
        </div>
      </div>
    </section>

    <!-- Back to blog -->
    <section class="py-10 bg-white border-t border-brand-border">
      <div class="container-content">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 group"
        >
          <Icon name="mdi:arrow-left" class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          {{ $t('blogDetail.backToBlog') }}
        </NuxtLink>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
