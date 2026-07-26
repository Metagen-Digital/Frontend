<script setup lang="ts">
import type { Service, ServiceApiItem } from "~/types";
const { t } = useI18n()

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "https://metagendigital.com";

useSeoMeta({
  title: "Our Services | MetaGenDigital",
  description:
    "Explore our full range of digital marketing, web development, photography, social media, and brand design services.",
  ogTitle: "Our Services | MetaGenDigital",
  ogDescription:
    "Digital marketing, web development, photography, social media and brand design — built for the Bangladesh market.",
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/home.jpg`,
});

const { get } = useApi();
const { data: servicesResponse } = await get<ServiceApiItem[]>("/services");

const colorPool: Array<Service["color"]> = ["orange", "purple", "cyan"];

const services = computed<Service[]>(() => {
  const apiItems = servicesResponse.value?.data ?? [];
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

useCollectionJsonLd({
  name: "Our Services",
  description: "Digital marketing, web development, photography and brand design services.",
  items: () => services.value.map(service => ({ name: service.name, url: `/services/${service.slug}` })),
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
        <AppBreadcrumb :crumbs="[{ label: $t('servicesPage.breadcrumb') }]" class="mb-6" />
        <SectionBadge icon="mdi:lightning-bolt" class="mb-5">{{ $t('servicesPage.badge') }}</SectionBadge>

        <h1 class="text-brand-text-primary mb-4 max-w-2xl">
          {{ $t('servicesPage.heading') }} <span class="gradient-text">{{ $t('servicesPage.headingHighlight') }}</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl leading-relaxed mb-10">
          {{ $t('servicesPage.subheading') }}
        </p>

        <!-- Quick stats row -->
        <div class="flex flex-wrap items-center gap-8">
          <div
            v-for="s in [
              { v: '50+',  l: t('servicesPage.stats.clients') },
              { v: '200+', l: t('servicesPage.stats.projects') },
              { v: '5+',   l: t('servicesPage.stats.experience') },
              { v: '6',    l: t('servicesPage.stats.coreServices') },
            ]"
            :key="s.l"
            class="flex items-baseline gap-2"
          >
            <span class="text-2xl font-black gradient-text font-display">{{ s.v }}</span>
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
