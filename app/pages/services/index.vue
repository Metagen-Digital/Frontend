<script setup lang="ts">
import type { Service, ServiceApiItem } from "~/types";

useSeoMeta({
  title: "Our Services | MetaGenDigital",
  description:
    "Explore our full range of digital marketing, web development, photography, social media, and brand design services.",
});

const fallbackServices: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "mdi:trending-up",
    tagline: "ROI-focused campaigns",
    description:
      "Data-driven paid ads, SEO, and analytics strategies that maximize your return and scale your brand consistently.",
    features: [
      "Google & Meta Ads",
      "SEO Optimization",
      "Analytics & Reporting",
      "Conversion Rate Optimization",
    ],
    color: "orange",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: "mdi:instagram",
    tagline: "Build community & drive growth",
    description:
      "Creative content creation, daily community management, and growth strategies across all major social platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Influencer Outreach",
      "Performance Tracking",
    ],
    color: "purple",
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    icon: "mdi:camera",
    tagline: "Visual storytelling that converts",
    description:
      "Professional product photography, cinematic brand films, and scroll-stopping reels that make your brand unforgettable.",
    features: [
      "Product Photography",
      "Brand Films",
      "Social Media Reels",
      "Photo & Video Editing",
    ],
    color: "cyan",
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: "mdi:web",
    tagline: "Fast, beautiful & SEO-ready",
    description:
      "Custom-designed, high-performance websites built with modern technologies and optimized for speed and conversions.",
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO Architecture",
      "CMS Integration",
    ],
    color: "orange",
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    icon: "mdi:shopping",
    tagline: "Stores that sell 24/7",
    description:
      "Full-featured e-commerce solutions on Shopify, WooCommerce, and custom platforms with seamless payment integration.",
    features: [
      "Shopify & WooCommerce",
      "Payment Integration",
      "Inventory Management",
      "Launch & Support",
    ],
    color: "purple",
  },
  {
    slug: "brand-design",
    name: "Brand & Graphic Design",
    icon: "mdi:palette",
    tagline: "Identities people remember",
    description:
      "Logo design, brand guidelines, and complete visual identity systems that make you instantly recognizable and trusted.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Marketing Materials",
      "UI/UX Design",
    ],
    color: "cyan",
  },
];

const { get } = useApi();
const { data: servicesResponse } = await get<ServiceApiItem[]>("/services");

const colorPool: Array<Service["color"]> = ["orange", "purple", "cyan"];

const services = computed<Service[]>(() => {
  const apiItems = servicesResponse.value?.data ?? [];
  if (!apiItems.length) {
    return fallbackServices;
  }

  return apiItems.map((service, index) => ({
    slug: service.slug,
    name: service.title,
    icon: service.icon || "mdi:briefcase-outline",
    tagline:
      service.short_description ||
      "Professional service tailored to your goals",
    description: service.description || service.short_description || "",
    features: (service.features || []).slice(0, 4),
    color: colorPool[index % colorPool.length],
  }));
});
</script>

<template>
  <div>
    <!-- ── HERO ─────────────────────────────────────── -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none"
      />
      <div
        class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute top-16 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Services' }]" class="mb-6" />
        <SectionBadge icon="mdi:lightning-bolt" class="mb-5"
          >What We Offer</SectionBadge
        >

        <h1 class="text-brand-text-primary mb-4 max-w-2xl">
          Services That <span class="gradient-text">Drive Real Results</span>
        </h1>
        <p
          class="text-brand-text-secondary text-lg max-w-2xl leading-relaxed mb-10"
        >
          From strategy to execution — everything your business needs to grow
          online, all under one roof.
        </p>

        <!-- Quick stats row -->
        <div class="flex flex-wrap items-center gap-8">
          <div
            v-for="s in [
              { v: '50+', l: 'Happy Clients' },
              { v: '200+', l: 'Projects Delivered' },
              { v: '5+', l: 'Years Experience' },
              { v: '6', l: 'Core Services' },
            ]"
            :key="s.l"
            class="flex items-baseline gap-2"
          >
            <span class="text-2xl font-black gradient-text font-display">{{
              s.v
            }}</span>
            <span class="text-sm text-brand-text-secondary">{{ s.l }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SERVICE CARDS ──────────────────────────── -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <ServiceCard
            v-for="service in services"
            :key="service.slug"
            :icon="service.icon"
            :title="service.name"
            :tagline="service.tagline"
            :description="service.description"
            :features="service.features"
            :to="`/services/${service.slug}`"
            :color="service.color"
          />
        </div>
      </div>
    </section>

    <ProcessSection />
    <CtaSection />
  </div>
</template>
