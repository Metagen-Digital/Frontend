<script setup lang="ts">
import type { Service, ServiceApiItem } from "~/types";

const { el, isVisible } = useScrollAnimation();
const localePath = useLocalePath();

const fallbackServices: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "mdi:trending-up",
    tagline: "ROI-focused",
    description:
      "Data-driven paid ads, SEO, and analytics strategies that maximise your return on every dollar spent.",
    features: [
      "Google & Meta Ads",
      "SEO Optimisation",
      "Analytics & Reporting",
    ],
    color: "orange",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: "mdi:instagram",
    tagline: "Grow & Engage",
    description:
      "Creative content, community management, and growth strategies across all major social platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Influencer Outreach",
    ],
    color: "purple",
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    icon: "mdi:camera",
    tagline: "Visual Stories",
    description:
      "Professional product shoots, brand films, and social reels that make your brand impossible to ignore.",
    features: ["Product Photography", "Brand Films", "Social Reels"],
    color: "cyan",
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: "mdi:monitor-shimmer",
    tagline: "Fast & SEO-ready",
    description:
      "Custom-designed, high-performance websites built with modern tech and optimised for search engines.",
    features: ["Custom Design", "Mobile Responsive", "CMS Integration"],
    color: "orange",
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    icon: "mdi:shopping-outline",
    tagline: "Sell 24/7",
    description:
      "Full-featured Shopify, WooCommerce, and custom e-commerce solutions with seamless payment setup.",
    features: [
      "Shopify & WooCommerce",
      "Payment Integration",
      "Full Setup & Launch",
    ],
    color: "purple",
  },
  {
    slug: "branding-design",
    name: "Branding & Graphic Design",
    icon: "mdi:palette-outline",
    tagline: "Stand Out",
    description:
      "From logo to full brand identity — we design visuals that make your business instantly recognisable and trusted.",
    features: ["Logo & Identity", "Brand Guidelines", "Marketing Creatives"],
    color: "cyan",
  },
];

const { get } = useApi();
const { data: servicesResponse } =
  await get<ServiceApiItem[]>("/services/featured");

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
    tagline: service.short_description || "Growth-focused service",
    description: service.short_description || service.description || "",
    features: (service.features || []).slice(0, 3),
    color: colorPool[index % colorPool.length],
  }));
});
</script>

<template>
  <section class="section-padding bg-brand-surface" aria-label="Our Services">
    <div class="container-content">
      <!-- Heading -->
      <div ref="el" class="text-center mb-14">
        <Transition
          enter-active-class="transition-all duration-600 ease-spring"
          enter-from-class="opacity-0 translate-y-6"
        >
          <div v-if="isVisible">
            <SectionBadge icon="mdi:lightning-bolt" class="mb-4">{{ $t('services.badge') }}</SectionBadge>
            <h2 class="text-brand-text-primary mt-4 mb-4">
              {{ $t('services.heading') }}
              <span class="gradient-text"> {{ $t('services.headingHighlight') }}</span>
            </h2>
            <p class="text-brand-text-secondary max-w-xl mx-auto">
              {{ $t('services.subheading') }}
            </p>
          </div>
        </Transition>
      </div>

      <!-- Cards grid — 3 cols on lg, last card centred on 5-item grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(service, i) in services"
          :key="service.slug"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: i * 90, duration: 500 },
          }"
          :class="{
            'md:col-span-2 lg:col-span-1':
              services.length % 2 !== 0 && i === services.length - 1,
          }"
        >
          <ServiceCard
            :icon="service.icon"
            :title="service.name"
            :tagline="service.tagline"
            :description="service.description"
            :features="service.features"
            :to="`/services/${service.slug}`"
            :color="service.color"
            class="h-full"
          />
        </div>
      </div>

      <!-- View all -->
      <div class="flex justify-center mt-12">
        <GradientButton
          :to="localePath('/services')"
          variant="outline"
          icon-right="mdi:arrow-right"
        >
          {{ $t('services.viewAll') }}
        </GradientButton>
      </div>
    </div>
  </section>
</template>
