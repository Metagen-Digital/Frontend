<script setup lang="ts">
import type { ServiceApiItem } from "~/types";

const route = useRoute();

interface ServiceFeature {
  icon: string;
  title: string;
  desc: string;
}
interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  desc: string;
}
interface FaqItem {
  q: string;
  a: string;
}
interface ServiceData {
  name: string;
  icon: string;
  tagline: string;
  overview: string;
  color: "orange" | "purple" | "cyan";
  heroStats: { value: string; label: string }[];
  features: ServiceFeature[];
  process: ProcessStep[];
  benefits: string[];
  faq: FaqItem[];
}


const { t } = useI18n()
const { get } = useApi();
const slug = route.params.slug as string;
const { data: serviceResponse } = await get<ServiceApiItem>(
  `/services/${slug}`,
);

const iconBySlug: Record<string, string> = {
  "digital-marketing": "mdi:trending-up",
  "social-media-marketing": "mdi:instagram",
  "photography-videography": "mdi:camera",
  "website-development": "mdi:web",
  "ecommerce-development": "mdi:shopping",
  "brand-design": "mdi:palette",
};

function colorFromSlug(serviceSlug: string): "orange" | "purple" | "cyan" {
  if (serviceSlug.includes("social") || serviceSlug.includes("ecommerce"))
    return "purple";
  if (
    serviceSlug.includes("photo") ||
    serviceSlug.includes("video") ||
    serviceSlug.includes("brand")
  )
    return "cyan";
  return "orange";
}

const apiService = computed<ServiceData | null>(() => {
  const data = serviceResponse.value?.data;
  if (!data) {
    return null;
  }

  const priceStat =
    data.formatted_price ||
    (data.starting_price ? `${data.starting_price}` : "Custom");
  const deliveryStat = data.delivery_time
    ? `${data.delivery_time}d`
    : "Flexible";
  const revisionStat = data.revisions ? `${data.revisions}` : "Unlimited";

  return {
    name: data.title,
    icon: data.icon || iconBySlug[data.slug] || "mdi:briefcase-outline",
    tagline:
      data.short_description ||
      "Strategy and execution built for measurable growth",
    overview: data.description || data.short_description || "",
    color: colorFromSlug(data.slug),
    heroStats: [
      { value: priceStat, label: "Starting Price" },
      { value: deliveryStat, label: "Delivery Time" },
      { value: revisionStat, label: "Revisions" },
    ],
    features: (data.features || []).map((feature, index) => ({
      icon: (["mdi:check-decagram", "mdi:star-four-points", "mdi:rocket-launch-outline", "mdi:shield-check-outline"] as string[])[index % 4] ?? "mdi:check-decagram",
      title: feature,
      desc: `Delivered as part of our ${data.title} service package.`,
    })),
    process: [
      {
        step: "01",
        icon: "mdi:magnify",
        title: "Discovery",
        desc: "We align scope, goals, and baseline metrics before execution starts.",
      },
      {
        step: "02",
        icon: "mdi:map-outline",
        title: "Strategy",
        desc: "A clear action plan with timeline, priorities, and success KPIs.",
      },
      {
        step: "03",
        icon: "mdi:rocket-launch-outline",
        title: "Execution",
        desc: "Hands-on implementation with transparent collaboration and updates.",
      },
      {
        step: "04",
        icon: "mdi:chart-line",
        title: "Optimization",
        desc: "Iterative improvement based on data, user behavior, and outcomes.",
      },
    ],
    benefits: (data.technologies || []).length
      ? (data.technologies || []).map((tech) => `Proven with ${tech}`)
      : [
          "Clear communication throughout delivery",
          "Performance-focused implementation",
          "Scalable setup for future growth",
        ],
    faq: (data.faqs || []).map((faq) => ({ q: faq.question, a: faq.answer })),
  };
});

// CMS-only, same reasoning as portfolio/[slug].vue: the removed `serviceMap`
// fallback carried invented proof points ("3× Average ROI", "95% Client
// Retention") that rendered as fact whenever the API had no matching service,
// in English only, and duplicated copy that editors were already maintaining
// in Filament. An unknown slug is a 404.
const service = apiService;

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: "Service not found" });
}

/* ─── SEO ───────────────────────────────────────────────────── */
const apiData = computed(() => serviceResponse.value?.data);
const config = useRuntimeConfig();
const siteUrl = (config.public.siteUrl as string) || "https://metagendigital.com";

const seoDescription = computed(() =>
  apiData.value?.seo?.meta_description || toPlainText(service.value?.overview),
);

useSeoMeta({
  title: computed(() => apiData.value?.seo?.meta_title || `${service.value?.name} | MetaGenDigital`),
  description: seoDescription,
  ogTitle: computed(() => service.value?.name),
  ogDescription: seoDescription,
  ogImage: computed(() => apiData.value?.featured_image || undefined),
});

// Service + Offer: lets Google show the starting price in the result, which is
// the single biggest CTR lever on a commercial page.
useJsonLd("service", () => {
  const s = service.value;
  if (!s) return null;
  const price = apiData.value?.starting_price;
  return {
    "@type": "Service",
    name: s.name,
    description: seoDescription.value,
    serviceType: apiData.value?.category || s.name,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    url: `${siteUrl}${route.path}`,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "BDT",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}${route.path}`,
          },
        }
      : {}),
  };
});

// The service FAQs come straight from the backend, so the FAQ rich result is
// free here — no extra content to write.
useJsonLd("faq", () => {
  const faqs = service.value?.faq ?? [];
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
});

// Feeds the "viewed a service page" retargeting audience in Ads Manager.
const { trackViewContent } = useAnalytics();
onMounted(() => {
  if (service.value) {
    trackViewContent({
      name: service.value.name,
      category: apiData.value?.category ?? "Service",
      id: slug,
    });
  }
});

const openFaq = ref<number | null>(null);
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i;
}

// Pre-defined color configs — all classes must be complete strings for Tailwind JIT
const colorConfig = {
  orange: {
    heroBg: "from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]",
    textAccent: "text-brand-orange",
    badgeBg: "bg-orange-100 text-orange-700",
    featureIconBg: "bg-orange-50",
    featureIconText: "text-brand-orange",
    stepBg: "bg-brand-orange text-white",
    checkBg: "bg-orange-50",
    checkText: "text-brand-orange",
    borderAccent: "border-brand-orange/40",
    btnBg: "bg-brand-orange hover:bg-orange-600",
    dividerColor: "bg-brand-orange",
  },
  purple: {
    heroBg: "from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]",
    textAccent: "text-brand-purple",
    badgeBg: "bg-violet-100 text-violet-700",
    featureIconBg: "bg-violet-50",
    featureIconText: "text-brand-purple",
    stepBg: "bg-brand-purple text-white",
    checkBg: "bg-violet-50",
    checkText: "text-brand-purple",
    borderAccent: "border-brand-purple/40",
    btnBg: "bg-brand-purple hover:bg-violet-700",
    dividerColor: "bg-brand-purple",
  },
  cyan: {
    heroBg: "from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]",
    textAccent: "text-brand-cyan",
    badgeBg: "bg-sky-100 text-sky-700",
    featureIconBg: "bg-sky-50",
    featureIconText: "text-brand-cyan",
    stepBg: "bg-brand-cyan text-white",
    checkBg: "bg-sky-50",
    checkText: "text-brand-cyan",
    borderAccent: "border-brand-cyan/40",
    btnBg: "bg-brand-cyan hover:bg-sky-600",
    dividerColor: "bg-brand-cyan",
  },
};

const cfg = computed(() => colorConfig[service.value?.color ?? "orange"]);
</script>

<template>
  <div v-if="service" class="min-h-screen">
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section
      class="relative pt-24 pb-24 overflow-hidden bg-gradient-to-br"
      :class="cfg.heroBg"
    >
      <!-- Decorative blobs -->
      <div
        class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute -left-16 -bottom-8 w-72 h-72 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute right-1/3 top-1/2 w-40 h-40 rounded-full bg-white/5 pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10">
        <!-- Breadcrumb -->
        <div class="mb-8 opacity-80">
          <AppBreadcrumb
            :crumbs="[
              { label: t('servicesPage.breadcrumb'), to: '/services' },
              { label: service.name },
            ]"
          />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-start gap-10 xl:gap-16">
          <!-- ── Left ── -->
          <div class="flex-1 min-w-0">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Icon
                :name="service.icon"
                class="w-3.5 h-3.5"
                aria-hidden="true"
              />
              MetaGenDigital Service
            </div>

            <!-- Service icon + Title -->
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg flex-shrink-0"
              >
                <Icon
                  :name="service.icon"
                  class="w-8 h-8 text-white"
                  aria-hidden="true"
                />
              </div>
              <h1 class="text-white leading-tight">{{ service.name }}</h1>
            </div>

            <p class="text-white/80 text-xl font-semibold mb-3 leading-snug">
              {{ service.tagline }}
            </p>
            <p class="text-white/70 text-base leading-relaxed max-w-xl mb-8" v-html="service.overview" />

            <!-- CTA buttons -->
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold text-sm rounded-btn shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                :class="cfg.textAccent"
              >
                Start a Project
                <Icon
                  name="mdi:arrow-right"
                  class="w-4 h-4"
                  aria-hidden="true"
                />
              </NuxtLink>
              <NuxtLink
                to="/portfolio"
                class="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold text-sm rounded-btn hover:bg-white/15 backdrop-blur-sm transition-all duration-200"
              >
                View Our Work
              </NuxtLink>
            </div>
          </div>

          <!-- ── Right: stats card ── -->
          <div class="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div
              class="bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-2xl overflow-hidden"
            >
              <div class="px-6 pt-6 pb-5">
                <p
                  class="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-5"
                >
                  By The Numbers
                </p>
                <div class="space-y-5">
                  <div
                    v-for="stat in service.heroStats"
                    :key="stat.label"
                    class="flex items-center justify-between"
                  >
                    <span class="text-white/65 text-sm">{{ stat.label }}</span>
                    <span class="text-white text-2xl font-black font-display">{{
                      stat.value
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="px-6 py-4 bg-white/10 border-t border-white/15">
                <div class="flex items-center gap-2">
                  <div class="flex -space-x-1.5">
                    <div
                      v-for="n in 3"
                      :key="n"
                      class="w-6 h-6 rounded-full bg-white/30 ring-2 ring-white/20 flex items-center justify-center text-white text-[8px] font-bold"
                    >
                      {{ ["A", "B", "C"][n - 1] }}
                    </div>
                  </div>
                  <p class="text-white/60 text-xs">Trusted by 50+ businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FEATURES GRID
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <!-- Section header -->
        <div class="text-center mb-12">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            :class="cfg.badgeBg"
          >
            What's Included
          </span>
          <h2 class="text-brand-text-primary mb-4">
            Everything You Need to Succeed
          </h2>
          <p
            class="text-brand-text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A comprehensive set of deliverables designed to give your business a
            real competitive edge.
          </p>
        </div>

        <!-- Feature cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(feature, i) in service.features"
            :key="i"
            class="group p-6 rounded-2xl border border-brand-border bg-brand-surface hover:bg-white hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-default"
          >
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
              :class="cfg.featureIconBg"
            >
              <Icon
                :name="feature.icon"
                class="w-6 h-6"
                :class="cfg.featureIconText"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-[15px] font-bold text-brand-text-primary mb-2 leading-snug"
            >
              {{ feature.title }}
            </h3>
            <p class="text-sm text-brand-text-secondary leading-relaxed">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         PROCESS
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-12">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            :class="cfg.badgeBg"
          >
            How We Work
          </span>
          <h2 class="text-brand-text-primary mb-4">Our Proven Process</h2>
          <p class="text-brand-text-secondary text-lg max-w-xl mx-auto">
            A structured, transparent approach that keeps you informed and in
            control at every step.
          </p>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(step, i) in service.process"
            :key="i"
            class="relative bg-white rounded-2xl p-6 border border-brand-border shadow-card flex flex-col"
          >
            <!-- Step number + icon row -->
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black font-display flex-shrink-0 shadow-sm"
                :class="cfg.stepBg"
              >
                {{ step.step }}
              </div>
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl"
                :class="cfg.featureIconBg"
              >
                <Icon
                  :name="step.icon"
                  class="w-5 h-5"
                  :class="cfg.featureIconText"
                  aria-hidden="true"
                />
              </div>
              <!-- Connector arrow on larger screens -->
              <div
                v-if="i < service.process.length - 1"
                class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
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

            <h3 class="text-[15px] font-bold text-brand-text-primary mb-2">
              {{ step.title }}
            </h3>
            <p class="text-sm text-brand-text-secondary leading-relaxed flex-1">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         WHY CHOOSE US
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <!-- Left: benefits -->
          <div>
            <span
              class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
              :class="cfg.badgeBg"
            >
              Why MetaGenDigital
            </span>
            <h2 class="text-brand-text-primary mb-3">
              Why 50+ Brands Choose Us
            </h2>
            <p class="text-brand-text-secondary text-lg mb-8 leading-relaxed">
              We're not just a vendor — we're a growth partner who cares about
              your results as much as you do.
            </p>

            <ul class="space-y-4 mb-8">
              <li
                v-for="benefit in service.benefits"
                :key="benefit"
                class="flex items-start gap-3.5"
              >
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  :class="cfg.checkBg"
                >
                  <Icon
                    name="mdi:check-bold"
                    class="w-3.5 h-3.5"
                    :class="cfg.checkText"
                    aria-hidden="true"
                  />
                </div>
                <span
                  class="text-brand-text-secondary text-sm leading-relaxed"
                  >{{ benefit }}</span
                >
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-btn transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              :class="cfg.btnBg"
            >
              Let's Get Started
              <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
            </NuxtLink>
          </div>

          <!-- Right: visual card -->
          <div class="relative">
            <!-- Decorative glow blob -->
            <div
              class="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br"
              :class="cfg.heroBg"
            />

            <div
              class="relative rounded-2xl overflow-hidden border border-brand-border shadow-card-hover bg-gradient-to-br"
              :class="cfg.heroBg"
            >
              <!-- Decorative circles inside -->
              <div
                class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none"
              />
              <div
                class="absolute -left-8 bottom-0 w-36 h-36 rounded-full bg-white/10 pointer-events-none"
              />

              <div class="relative z-10 p-8">
                <!-- Icon -->
                <div
                  class="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-5"
                >
                  <Icon
                    :name="service.icon"
                    class="w-7 h-7 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 class="text-white text-xl font-bold mb-1">
                  {{ service.name }}
                </h3>
                <p class="text-white/65 text-sm mb-6">{{ service.tagline }}</p>

                <!-- Stats grid -->
                <div class="grid grid-cols-3 gap-3">
                  <div
                    v-for="stat in service.heroStats"
                    :key="stat.label"
                    class="text-center bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                  >
                    <div
                      class="text-white font-black text-lg font-display leading-none mb-1"
                    >
                      {{ stat.value }}
                    </div>
                    <div class="text-white/55 text-[10px] leading-tight">
                      {{ stat.label }}
                    </div>
                  </div>
                </div>

                <!-- CTA inside card -->
                <div class="mt-6 pt-5 border-t border-white/15">
                  <NuxtLink
                    to="/contact"
                    class="flex items-center justify-between text-white/80 hover:text-white transition-colors duration-200 group/cta text-sm font-medium"
                  >
                    <span>Talk to our team</span>
                    <Icon
                      name="mdi:arrow-right"
                      class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                      aria-hidden="true"
                    />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content max-w-3xl">
        <div class="text-center mb-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            :class="cfg.badgeBg"
          >
            FAQ
          </span>
          <h2 class="text-brand-text-primary mb-3">Common Questions</h2>
          <p class="text-brand-text-secondary">
            Everything you might want to know before we get started.
          </p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, i) in service.faq"
            :key="i"
            class="bg-white rounded-2xl border transition-all duration-200 overflow-hidden"
            :class="
              openFaq === i
                ? ['shadow-card-hover', cfg.borderAccent]
                : 'border-brand-border'
            "
          >
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
              :aria-expanded="openFaq === i"
              @click="toggleFaq(i)"
            >
              <span class="text-sm font-semibold text-brand-text-primary">{{
                item.q
              }}</span>
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                :class="
                  openFaq === i
                    ? [cfg.btnBg, 'text-white']
                    : 'bg-brand-surface text-brand-text-muted'
                "
              >
                <Icon
                  name="mdi:chevron-down"
                  class="w-4 h-4 transition-transform duration-200"
                  :class="openFaq === i ? 'rotate-180' : ''"
                  aria-hidden="true"
                />
              </div>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === i" class="px-6 pb-5">
                <div class="h-px w-full bg-brand-border mb-4" />
                <p class="text-sm text-brand-text-secondary leading-relaxed">
                  {{ item.a }}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
