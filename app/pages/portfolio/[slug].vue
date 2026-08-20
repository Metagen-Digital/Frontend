<script setup lang="ts">
import type { CaseStudyApiDetail, CaseStudyApiItem } from "~/types";

const route = useRoute();

type TagColor = "orange" | "purple" | "cyan";

interface Phase {
  icon: string;
  title: string;
  duration: string;
  tasks: string[];
}
interface BeforeAfter {
  label: string;
  before: string;
  after: string;
  icon: string;
}
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface ProjectData {
  title: string;
  category: string;
  client: string;
  industry: string;
  year: number;
  duration: string;
  teamSize: string;
  color: TagColor;
  thumbnail: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  services: string[];
  deliverables: string[];
  results: { label: string; value: string; icon: string }[];
  beforeAfter: BeforeAfter[];
  phases: Phase[];
  testimonial: Testimonial;
  tags: string[];
  gallery: string[];
  nextSlug: string;
  nextTitle: string;
}


const { t, locale } = useI18n()
const { get } = useApi();
const slug = route.params.slug as string;
const { data: caseStudyResponse } = await get<CaseStudyApiDetail>(
  `/case-studies/${slug}`,
);
const { data: caseStudiesResponse } =
  await get<CaseStudyApiItem[]>("/case-studies");

function normalizeCategory(category?: string | null): string {
  const normalized = (category || "").toLowerCase();
  if (normalized.includes("social")) return "Social Media";
  if (normalized.includes("photo")) return "Photography";
  if (normalized.includes("video")) return "Video";
  if (normalized.includes("ecommerce") || normalized.includes("e-commerce"))
    return "E-commerce";
  return "Web Dev";
}

function colorFromCategory(category: string): TagColor {
  if (category === "Social Media" || category === "E-commerce") return "purple";
  if (category === "Photography") return "cyan";
  return "orange";
}

const apiProject = computed<ProjectData | null>(() => {
  const data = caseStudyResponse.value?.data;
  if (!data) {
    return null;
  }

  const normalizedCategory = normalizeCategory(data.category);
  const allStudies = caseStudiesResponse.value?.data ?? [];
  const currentIndex = allStudies.findIndex((item) => item.slug === data.slug);
  const nextProject =
    currentIndex >= 0 && allStudies.length > 1
      ? allStudies[(currentIndex + 1) % allStudies.length]
      : null;

  const challengeText =
    (data.challenges || [])
      .map((item) => Object.values(item).join(" "))
      .join(" ") ||
    data.summary ||
    "The client needed a measurable improvement in digital outcomes.";
  const approachText =
    (data.solutions || [])
      .map((item) => Object.values(item).join(" "))
      .join(" ") ||
    data.detailedDescription ||
    "We planned and executed a focused implementation aligned with business goals.";
  const outcomeText =
    (data.results || [])
      .map((item) => Object.values(item).join(" "))
      .join(" ") ||
    data.description ||
    "The project delivered clear business impact and better user outcomes.";

  return {
    title: data.title,
    category: normalizedCategory,
    client: data.clientName || "MetaGen Client",
    industry: data.industry || data.type || "Business Services",
    year: data.projectEndDate
      ? new Date(data.projectEndDate).getFullYear()
      : data.createdAt
        ? new Date(data.createdAt).getFullYear()
        : new Date().getFullYear(),
    duration: data.projectDuration || "Flexible timeline",
    teamSize: "Dedicated team",
    color: colorFromCategory(normalizedCategory),
    thumbnail:
      data.image ||
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85&auto=format&fit=crop",
    summary: data.summary || data.description,
    challenge: challengeText,
    approach: approachText,
    outcome: outcomeText,
    services: (data.technologies || []).length
      ? data.technologies
      : ["Strategy", "Implementation", "Optimization"],
    deliverables: (data.technologies || []).length
      ? data.technologies.map((tech) => `${tech} implementation`)
      : [
          "Research and planning",
          "Execution and QA",
          "Post-launch optimization",
        ],
    results: (data.metrics || []).length
      ? data.metrics.map((metric) => ({
          label: metric.label,
          value: metric.value,
          icon: metric.icon || "mdi:trending-up",
        }))
      : [
          {
            label: "Outcome",
            value: "Delivered",
            icon: "mdi:check-circle-outline",
          },
        ],
    beforeAfter: (data.metrics || []).slice(0, 3).map((metric) => ({
      label: metric.label,
      before: "Baseline",
      after: metric.value,
      icon: "mdi:chart-line",
    })),
    phases: [
      {
        icon: "mdi:magnify",
        title: "Discovery",
        duration: "Phase 1",
        tasks: [
          "Requirements alignment",
          "Current-state analysis",
          "Goal definition",
        ],
      },
      {
        icon: "mdi:map-outline",
        title: "Strategy",
        duration: "Phase 2",
        tasks: [
          "Solution planning",
          "Execution roadmap",
          "Stakeholder alignment",
        ],
      },
      {
        icon: "mdi:rocket-launch-outline",
        title: "Delivery",
        duration: "Phase 3",
        tasks: ["Implementation", "Quality assurance", "Launch support"],
      },
      {
        icon: "mdi:chart-line",
        title: "Optimization",
        duration: "Phase 4",
        tasks: [
          "Performance monitoring",
          "Iteration cycle",
          "Outcome reporting",
        ],
      },
    ],
    testimonial: {
      quote:
        data.summary ||
        "MetaGenDigital delivered a strong result-focused project execution.",
      author: data.clientName || "Client Team",
      role: `${data.type || "Business"} stakeholder`,
    },
    tags: data.technologies || [],
    gallery: (data.galleryImages || []).length
      ? data.galleryImages || []
      : [
          data.image ||
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80&auto=format&fit=crop",
        ],
    nextSlug: nextProject?.slug || data.slug,
    nextTitle: nextProject?.title || data.title,
  };
});

// Content comes from the CMS and nowhere else. This used to fall back to a
// hardcoded `projectMap` of eight sample case studies — invented clients,
// invented metrics ("+180% organic traffic", "3× leads"), stock photography —
// which rendered as real published work for any slug the API did not know.
// It also shipped ~1,000 lines of English-only copy into the client bundle
// that no bn visitor could read and no editor could correct. A slug with no
// case study behind it is a 404, which is what it always should have been.
const project = apiProject;

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

/* ─── SEO ───────────────────────────────────────────────────── */
const apiData = computed(() => caseStudyResponse.value?.data);
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl as string) || "https://metagendigital.com";

const seoDescription = computed(() =>
  apiData.value?.seo?.meta_description || toPlainText(project.value?.summary),
);

useSeoMeta({
  title: computed(() => apiData.value?.seo?.meta_title || `${project.value?.title} | MetaGenDigital`),
  description: seoDescription,
  ogTitle: computed(() => project.value?.title),
  ogDescription: seoDescription,
  ogImage: computed(() => apiData.value?.image || undefined),
  twitterImage: computed(() => apiData.value?.image || undefined),
});

// CreativeWork for the case study itself — signals "portfolio piece by this
// agency for this client", which is what ties the work back to the brand.
useJsonLd("case-study", () => {
  const p = project.value;
  const data = apiData.value;
  if (!p || !data) return null;
  return {
    "@type": "CreativeWork",
    name: p.title,
    headline: p.title,
    description: seoDescription.value,
    image: data.image ? [data.image] : undefined,
    url: `${siteUrl}${route.path}`,
    creator: { "@id": `${siteUrl}/#organization` },
    ...(data.clientName ? { sourceOrganization: { "@type": "Organization", name: data.clientName } } : {}),
    ...(data.projectStartDate ? { dateCreated: data.projectStartDate } : {}),
    ...(data.projectEndDate ? { datePublished: data.projectEndDate } : {}),
    ...(data.technologies?.length ? { keywords: data.technologies.join(", ") } : {}),
    about: data.industry || data.category,
    inLanguage: locale.value === "bn" ? "bn-BD" : "en-US",
  };
});

const colorConfig = {
  orange: {
    heroBg: "from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]",
    textAccent: "text-brand-orange",
    badgeBg: "bg-orange-100 text-orange-700",
    iconBg: "bg-orange-50",
    iconText: "text-brand-orange",
    resultCard: "border-orange-200 bg-orange-50/50",
    resultValue: "text-brand-orange",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200",
    btnBg: "bg-brand-orange hover:bg-orange-600",
    afterBg: "bg-orange-50 border-orange-200",
    afterValue: "text-brand-orange",
    testimonialBg: "from-[#FF6B35] to-[#FF9A5C]",
    phaseDot: "bg-brand-orange",
    serviceChip: "bg-orange-100 text-orange-700 border-orange-200",
  },
  purple: {
    heroBg: "from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]",
    textAccent: "text-brand-purple",
    badgeBg: "bg-violet-100 text-violet-700",
    iconBg: "bg-violet-50",
    iconText: "text-brand-purple",
    resultCard: "border-violet-200 bg-violet-50/50",
    resultValue: "text-brand-purple",
    tagBg: "bg-violet-50 text-violet-700 border-violet-200",
    btnBg: "bg-brand-purple hover:bg-violet-700",
    afterBg: "bg-violet-50 border-violet-200",
    afterValue: "text-brand-purple",
    testimonialBg: "from-[#7C3AED] to-[#6D28D9]",
    phaseDot: "bg-brand-purple",
    serviceChip: "bg-violet-100 text-violet-700 border-violet-200",
  },
  cyan: {
    heroBg: "from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]",
    textAccent: "text-brand-cyan",
    badgeBg: "bg-sky-100 text-sky-700",
    iconBg: "bg-sky-50",
    iconText: "text-brand-cyan",
    resultCard: "border-sky-200 bg-sky-50/50",
    resultValue: "text-brand-cyan",
    tagBg: "bg-sky-50 text-sky-700 border-sky-200",
    btnBg: "bg-brand-cyan hover:bg-sky-600",
    afterBg: "bg-sky-50 border-sky-200",
    afterValue: "text-brand-cyan",
    testimonialBg: "from-[#0EA5E9] to-[#0284C7]",
    phaseDot: "bg-brand-cyan",
    serviceChip: "bg-sky-100 text-sky-700 border-sky-200",
  },
};

const cfg = computed(() => colorConfig[project.value?.color ?? "orange"]);

const categoryIcon: Record<string, string> = {
  "Web Dev": "mdi:web",
  "Social Media": "mdi:instagram",
  Photography: "mdi:camera",
  Video: "mdi:video-outline",
  "E-commerce": "mdi:shopping-outline",
};
</script>

<template>
  <div v-if="project" class="min-h-screen">
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section
      class="relative pt-24 pb-0 overflow-hidden bg-gradient-to-br"
      :class="cfg.heroBg"
    >
      <div
        class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute right-1/3 top-1/3 w-32 h-32 rounded-full bg-white/5 pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10 pb-12">
        <div class="mb-8 opacity-75">
          <AppBreadcrumb
            :crumbs="[
              { label: t('portfolioPage.breadcrumb'), to: '/portfolio' },
              { label: project.title },
            ]"
          />
        </div>

        <!-- Meta badges -->
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
          >
            <Icon
              :name="categoryIcon[project.category] ?? 'mdi:folder'"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ project.category }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm"
          >
            <Icon
              name="mdi:office-building-outline"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ project.industry }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm"
          >
            <Icon
              name="mdi:calendar-outline"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ project.year }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm"
          >
            <Icon
              name="mdi:clock-outline"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ project.duration }}
          </span>
        </div>

        <h1 class="text-white mb-3 max-w-3xl">{{ project.title }}</h1>
        <p class="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">
          {{ project.summary }}
        </p>

        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Icon
              name="mdi:office-building-outline"
              class="w-4 h-4 text-white"
              aria-hidden="true"
            />
          </div>
          <span class="text-white/75 text-sm font-medium">{{
            project.client
          }}</span>
        </div>
      </div>

      <!-- Hero image overlapping -->
      <div class="container-content relative z-10">
        <div
          class="rounded-t-2xl overflow-hidden shadow-2xl aspect-[21/9] bg-brand-surface"
        >
          <NuxtImg
            :src="project.thumbnail"
            :alt="project.title"
            class="w-full h-full object-cover"
            sizes="100vw lg:1000px"
            format="webp"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         KEY RESULTS
    ══════════════════════════════════════════════════ -->
    <section class="bg-white py-16 md:py-20">
      <div class="container-content">
        <div class="text-center mb-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
            :class="cfg.badgeBg"
            >{{ $t('portfolioDetail.keyResults') }}</span
          >
          <h2 class="text-brand-text-primary">{{ $t('portfolioDetail.keyResults') }}</h2>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          <div
            v-for="result in project.results"
            :key="result.label"
            class="group p-6 rounded-2xl border text-center hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-default"
            :class="cfg.resultCard"
          >
            <div
              class="w-10 h-10 flex items-center justify-center rounded-xl mx-auto mb-3"
              :class="cfg.iconBg"
            >
              <Icon
                :name="result.icon"
                class="w-5 h-5"
                :class="cfg.iconText"
                aria-hidden="true"
              />
            </div>
            <div
              class="text-3xl md:text-4xl font-black font-display mb-1"
              :class="cfg.resultValue"
            >
              {{ result.value }}
            </div>
            <div class="text-xs text-brand-text-muted font-medium leading-snug">
              {{ result.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FULL STORY + SIDEBAR
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="grid lg:grid-cols-[1fr_320px] gap-8 xl:gap-12 items-start">
          <!-- ── Main content ── -->
          <div>
            <div class="text-center lg:text-left mb-10">
              <span
                class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
                :class="cfg.badgeBg"
                >Case Study</span
              >
              <h2 class="text-brand-text-primary">The Full Story</h2>
            </div>

            <div class="space-y-5">
              <div
                class="bg-white rounded-2xl border border-brand-border p-7 shadow-card"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:alert-circle-outline"
                      class="w-5 h-5"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">
                    {{ $t('portfolioDetail.challenge') }}
                  </h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">
                  {{ project.challenge }}
                </p>
              </div>

              <div
                class="bg-white rounded-2xl border border-brand-border p-7 shadow-card"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:lightbulb-outline"
                      class="w-5 h-5"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">
                    {{ $t('portfolioDetail.approach') }}
                  </h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">
                  {{ project.approach }}
                </p>
              </div>

              <div
                class="bg-white rounded-2xl border border-brand-border p-7 shadow-card"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:trophy-outline"
                      class="w-5 h-5"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">
                    {{ $t('portfolioDetail.outcome') }}
                  </h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">
                  {{ project.outcome }}
                </p>
              </div>
            </div>
          </div>

          <!-- ── Sticky sidebar ── -->
          <div class="lg:sticky lg:top-24 space-y-4">
            <!-- Project details card -->
            <div
              class="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden"
            >
              <div class="px-5 py-4 border-b border-brand-border">
                <p
                  class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest"
                >
                  Project Details
                </p>
              </div>
              <div class="p-5 space-y-4">
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:office-building-outline"
                      class="w-4 h-4"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5"
                    >
                      Client
                    </p>
                    <p class="text-sm font-bold text-brand-text-primary">
                      {{ project.client }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:tag-outline"
                      class="w-4 h-4"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5"
                    >
                      Industry
                    </p>
                    <p class="text-sm font-bold text-brand-text-primary">
                      {{ project.industry }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:clock-outline"
                      class="w-4 h-4"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5"
                    >
                      Timeline
                    </p>
                    <p class="text-sm font-bold text-brand-text-primary">
                      {{ project.duration }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:account-group-outline"
                      class="w-4 h-4"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5"
                    >
                      Team
                    </p>
                    <p class="text-sm font-bold text-brand-text-primary">
                      {{ project.teamSize }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Services used -->
            <div
              class="bg-white rounded-2xl border border-brand-border shadow-card p-5"
            >
              <p
                class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3"
              >
                Services Used
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="svc in project.services"
                  :key="svc"
                  class="inline-block px-3 py-1.5 rounded-lg text-[11px] font-semibold border"
                  :class="cfg.serviceChip"
                >
                  {{ svc }}
                </span>
              </div>
            </div>

            <!-- Deliverables -->
            <div
              class="bg-white rounded-2xl border border-brand-border shadow-card p-5"
            >
              <p
                class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3"
              >
                {{ $t('portfolioDetail.deliverables') }}
              </p>
              <ul class="space-y-2.5">
                <li
                  v-for="item in project.deliverables"
                  :key="item"
                  class="flex items-start gap-2.5"
                >
                  <div
                    class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    :class="cfg.iconBg"
                  >
                    <Icon
                      name="mdi:check-bold"
                      class="w-3 h-3"
                      :class="cfg.iconText"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    class="text-[12px] text-brand-text-secondary leading-snug"
                    >{{ item }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         BEFORE → AFTER
    ══════════════════════════════════════════════════ -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">
        <div class="text-center mb-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
            :class="cfg.badgeBg"
            >Transformation</span
          >
          <h2 class="text-brand-text-primary">{{ $t('portfolioDetail.beforeAfter') }}</h2>
          <p class="text-brand-text-secondary mt-2 max-w-xl mx-auto">
            The measurable difference MetaGenDigital made across key metrics.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="item in project.beforeAfter"
            :key="item.label"
            class="rounded-2xl border border-brand-border overflow-hidden shadow-card"
          >
            <!-- Label bar -->
            <div
              class="px-5 py-3 bg-brand-surface border-b border-brand-border flex items-center gap-2"
            >
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center"
                :class="cfg.iconBg"
              >
                <Icon
                  :name="item.icon"
                  class="w-3.5 h-3.5"
                  :class="cfg.iconText"
                  aria-hidden="true"
                />
              </div>
              <span class="text-xs font-bold text-brand-text-primary">{{
                item.label
              }}</span>
            </div>

            <!-- Before / After comparison -->
            <div class="grid grid-cols-2 divide-x divide-brand-border">
              <!-- Before -->
              <div class="p-5 text-center bg-white">
                <p
                  class="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider mb-2"
                >
                  Before
                </p>
                <p
                  class="text-2xl font-black text-brand-text-muted/60 font-display"
                >
                  {{ item.before }}
                </p>
              </div>
              <!-- After -->
              <div class="p-5 text-center" :class="cfg.afterBg">
                <p
                  class="text-[10px] font-bold uppercase tracking-wider mb-2"
                  :class="cfg.afterValue"
                >
                  After
                </p>
                <p
                  class="text-2xl font-black font-display"
                  :class="cfg.afterValue"
                >
                  {{ item.after }}
                </p>
              </div>
            </div>

            <!-- Improvement arrow -->
            <div
              class="px-5 py-3 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2"
            >
              <Icon
                name="mdi:arrow-up-circle"
                class="w-4 h-4"
                :class="cfg.iconText"
                aria-hidden="true"
              />
              <span class="text-[11px] font-semibold" :class="cfg.iconText"
                >Significant improvement</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         PROJECT PHASES / TIMELINE
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-12">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
            :class="cfg.badgeBg"
            >Process</span
          >
          <h2 class="text-brand-text-primary">{{ $t('portfolioDetail.timeline') }}</h2>
          <p class="text-brand-text-secondary mt-2 max-w-xl mx-auto">
            How we structured this project from kickoff to delivery.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(phase, i) in project.phases"
            :key="i"
            class="relative bg-white rounded-2xl border border-brand-border shadow-card p-6 flex flex-col"
          >
            <!-- Step number + connector -->
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                :class="cfg.btnBg"
              >
                {{ String(i + 1).padStart(2, "0") }}
              </div>
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                :class="cfg.iconBg"
              >
                <Icon
                  :name="phase.icon"
                  class="w-4.5 h-4.5"
                  :class="cfg.iconText"
                  aria-hidden="true"
                />
              </div>
              <!-- Connector line -->
              <div
                v-if="i < project.phases.length - 1"
                class="hidden lg:block absolute right-0 top-10 translate-x-1/2 z-10"
              >
                <div
                  class="w-5 h-5 rounded-full bg-brand-border flex items-center justify-center"
                >
                  <Icon
                    name="mdi:chevron-right"
                    class="w-3 h-3 text-brand-text-muted"
                  />
                </div>
              </div>
            </div>

            <!-- Title + duration -->
            <div class="mb-3">
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">
                {{ phase.title }}
              </h3>
              <span
                class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                :class="cfg.tagBg"
              >
                {{ phase.duration }}
              </span>
            </div>

            <!-- Task list -->
            <ul class="space-y-1.5 flex-1">
              <li
                v-for="task in phase.tasks"
                :key="task"
                class="flex items-start gap-2 text-[12px] text-brand-text-secondary"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  :class="cfg.phaseDot"
                />
                {{ task }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         CLIENT TESTIMONIAL
    ══════════════════════════════════════════════════ -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content max-w-4xl">
        <div
          class="relative rounded-3xl overflow-hidden shadow-card-hover bg-gradient-to-br p-8 md:p-12"
          :class="cfg.heroBg"
        >
          <!-- Decorative circles -->
          <div
            class="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            class="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none"
            aria-hidden="true"
          />

          <div class="relative z-10">
            <!-- Quote icon -->
            <div
              class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
            >
              <Icon
                name="mdi:format-quote-open"
                class="w-6 h-6 text-white"
                aria-hidden="true"
              />
            </div>

            <!-- Quote text -->
            <blockquote
              class="text-white text-xl md:text-2xl font-semibold leading-relaxed mb-8 max-w-3xl"
            >
              "{{ project.testimonial.quote }}"
            </blockquote>

            <!-- Stars -->
            <div class="flex items-center gap-1 mb-5">
              <Icon
                v-for="n in 5"
                :key="n"
                name="mdi:star"
                class="w-5 h-5 text-yellow-300"
                aria-hidden="true"
              />
            </div>

            <!-- Author -->
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg"
              >
                {{ project.testimonial.author.charAt(0) }}
              </div>
              <div>
                <p class="text-white font-bold text-base">
                  {{ project.testimonial.author }}
                </p>
                <p class="text-white/70 text-sm">
                  {{ project.testimonial.role }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         GALLERY
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
            :class="cfg.badgeBg"
            >{{ $t('portfolioDetail.gallery') }}</span
          >
          <h2 class="text-brand-text-primary">Project Visuals</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div
            v-for="(img, i) in project.gallery"
            :key="i"
            class="group overflow-hidden rounded-2xl border border-brand-border shadow-card aspect-[4/3] bg-brand-surface"
          >
            <img
              :src="img"
              :alt="`${project.title} — gallery image ${i + 1}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         TOOLS & TECH
    ══════════════════════════════════════════════════ -->
    <section class="py-10 bg-white border-t border-brand-border">
      <div class="container-content">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span
            class="text-sm font-bold text-brand-text-primary whitespace-nowrap flex-shrink-0"
            >Tools & Tech Used:</span
          >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
              :class="cfg.tagBg"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         NEXT PROJECT
    ══════════════════════════════════════════════════ -->
    <section class="py-14 bg-brand-surface border-t border-brand-border">
      <div class="container-content">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 group"
          >
            <Icon
              name="mdi:arrow-left"
              class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All Projects
          </NuxtLink>

          <NuxtLink
            :to="`/portfolio/${project.nextSlug}`"
            class="group flex items-center gap-4 p-4 rounded-2xl border border-brand-border bg-white hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250"
          >
            <div class="text-right">
              <p
                class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-widest mb-0.5"
              >
                {{ $t('portfolioDetail.nextProject') }}
              </p>
              <p
                class="text-sm font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors duration-200"
              >
                {{ project.nextTitle }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 group-hover:translate-x-1"
              :class="cfg.btnBg"
            >
              <Icon name="mdi:arrow-right" class="w-5 h-5" aria-hidden="true" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
