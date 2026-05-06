<script setup lang="ts">
import type { Service, ServiceApiItem } from "~/types";

const { el, isVisible } = useScrollAnimation();
const localePath = useLocalePath();

const { get } = useApi();
const { data: servicesResponse, status } = await get<ServiceApiItem[]>("/services/featured");

const colorPool: Array<Service["color"]> = ["orange", "purple", "cyan"];

const isLoading = computed(() => status.value === "pending");

const services = computed<Service[]>(() => {
  const apiItems = servicesResponse.value?.data ?? [];
  return apiItems.map((service, index) => ({
    slug: service.slug,
    name: service.title,
    icon: service.icon || "mdi:briefcase-outline",
    tagline: service.short_description || "",
    description: service.description || service.short_description || "",
    features: (service.features || []).slice(0, 3),
    color: colorPool[index % colorPool.length],
  }));
});

const isEmpty = computed(() => !isLoading.value && services.value.length === 0);
</script>

<template>
  <section class="section-padding bg-brand-surface" aria-label="Our Services">
    <div class="container-content">

      <!-- Heading -->
      <div ref="el" class="text-center mb-6">
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

      <!-- Skeleton loading — 6 placeholder cards -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-2xl bg-white border border-brand-border shadow-card overflow-hidden animate-pulse"
        >
          <div class="h-44 bg-gray-200" />
          <div class="p-6 space-y-3">
            <div class="h-4 w-20 bg-gray-200 rounded-full" />
            <div class="h-5 w-48 bg-gray-200 rounded-lg" />
            <div class="h-3 w-full bg-gray-100 rounded" />
            <div class="h-3 w-4/5 bg-gray-100 rounded" />
            <div class="flex gap-2 pt-2">
              <div class="h-7 w-24 bg-gray-100 rounded-lg" />
              <div class="h-7 w-24 bg-gray-100 rounded-lg" />
              <div class="h-7 w-24 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="isEmpty"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="w-20 h-20 rounded-2xl bg-brand-border/60 flex items-center justify-center mb-6 shadow-sm">
          <Icon name="mdi:briefcase-off-outline" class="w-10 h-10 text-brand-text-secondary" aria-hidden="true" />
        </div>
        <h3 class="text-xl font-bold text-brand-text-primary mb-2">
          No Services Available
        </h3>
        <p class="text-sm text-brand-text-secondary max-w-xs">
          We're updating our service offerings. Check back soon.
        </p>
      </div>

      <!-- Cards grid — 3 cols on lg, odd last card centred -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
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

      <!-- View all — hidden on empty/loading -->
      <div v-if="!isEmpty && !isLoading" class="flex justify-center mt-6">
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
