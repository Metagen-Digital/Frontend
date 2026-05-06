<script setup lang="ts">
import type { Testimonial, TestimonialApiItem } from "~/types";

const { get } = useApi();
const { data: testimonialsResponse } = await get<TestimonialApiItem[]>(
  "/testimonials/featured",
);

const testimonials = computed<Testimonial[]>(() => {
  const apiItems = testimonialsResponse.value?.data ?? [];
  return apiItems.map((item) => ({
    name: item.name,
    company: item.company,
    rating: item.rating,
    quote: item.quote,
    avatar: item.image || undefined,
  }));
});

const hasTestimonials = computed(() => testimonials.value.length > 0);

const row1 = computed(() => [...testimonials.value, ...testimonials.value]);
const row2 = computed(() => {
  const reversed = [...testimonials.value].reverse();
  return [...reversed, ...reversed];
});
</script>

<template>
  <section
    class="section-padding overflow-hidden bg-white"
    aria-label="Client Testimonials"
  >
    <div class="container-content mb-6">
      <div class="text-center">
        <SectionBadge icon="mdi:star" color="orange" class="mb-4">{{ $t('testimonials.badge') }}</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          {{ $t('testimonials.heading') }}
          <span class="gradient-text"> {{ $t('testimonials.headingHighlight') }}</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          {{ $t('testimonials.subheading') }}
        </p>
      </div>
    </div>

    <!-- Not available state -->
    <div
      v-if="!hasTestimonials"
      class="flex items-center justify-center py-10"
    >
      <p class="text-sm text-brand-text-muted italic">
        {{ $t('testimonials.notAvailable') }}
      </p>
    </div>

    <!-- 2-row marquee -->
    <template v-else>
      <!-- Row 1: right → left -->
      <div class="relative flex mb-4">
        <div
          class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />
        <div
          class="flex gap-4 animate-marquee hover:[animation-play-state:paused]"
          role="list"
          aria-label="Client testimonials"
        >
          <TestimonialCard
            v-for="(t, i) in row1"
            :key="`a-${i}`"
            v-bind="t"
            role="listitem"
          />
        </div>
      </div>

      <!-- Row 2: left → right -->
      <div class="relative flex">
        <div
          class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />
        <div
          class="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <TestimonialCard v-for="(t, i) in row2" :key="`b-${i}`" v-bind="t" />
        </div>
      </div>
    </template>
  </section>
</template>
