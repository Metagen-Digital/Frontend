<script setup lang="ts">
import type { PartnerApiItem } from "~/types";

interface LogoItem {
  name: string
  logo: string | null
  icon: string
  website_url?: string | null
}

const { get } = useApi();
const { data: partnersResponse } =
  await get<PartnerApiItem[]>("/partners/featured");

const logos = computed<LogoItem[]>(() => {
  const partners = partnersResponse.value?.data ?? [];
  return partners.map((partner) => ({
    name: partner.name,
    logo: partner.logo ?? null,
    icon: "mdi:domain",
    website_url: partner.website_url,
  }));
});

const hasLogos = computed(() => logos.value.length > 0);

// Duplicate for seamless marquee loop
const row1 = computed(() => [...logos.value, ...logos.value]);
// Reversed order for row 2 to add visual variety
const row2 = computed(() => {
  const reversed = [...logos.value].reverse();
  return [...reversed, ...reversed];
});
</script>

<template>
  <section
    class="py-10 border-y border-brand-border overflow-hidden bg-brand-surface"
    aria-label="Trusted by clients"
  >
    <p
      class="text-center text-xs text-brand-text-muted uppercase tracking-widest font-medium mb-6"
    >
      {{ $t('trustedBy.tagline') }}
    </p>

    <!-- Not available state -->
    <div
      v-if="!hasLogos"
      class="flex items-center justify-center py-6"
    >
      <p class="text-sm text-brand-text-muted italic">
        {{ $t('trustedBy.notAvailable') }}
      </p>
    </div>

    <!-- 2-row marquee -->
    <div v-else class="flex flex-col gap-4">
      <!-- Row 1: right → left -->
      <div class="relative flex overflow-hidden">
        <div
          class="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-brand-surface to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-brand-surface to-transparent"
          aria-hidden="true"
        />
        <div
          class="flex gap-4 animate-marquee hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <component
            :is="logo.website_url ? 'a' : 'div'"
            v-for="(logo, i) in row1"
            :key="`r1-${i}`"
            v-bind="logo.website_url ? { href: logo.website_url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            class="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-card bg-white border border-brand-border text-brand-text-secondary shadow-card hover:shadow-card-hover hover:border-brand-border-strong transition-all duration-200"
          >
            <img
              v-if="logo.logo"
              :src="logo.logo"
              :alt="logo.name"
              class="h-6 w-auto max-w-[80px] object-contain"
              loading="lazy"
            />
            <Icon
              v-else
              :name="logo.icon"
              class="w-4 h-4 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <span class="text-sm font-medium whitespace-nowrap">{{ logo.name }}</span>
          </component>
        </div>
      </div>

      <!-- Row 2: left → right (reverse) -->
      <div class="relative flex overflow-hidden">
        <div
          class="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-brand-surface to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-brand-surface to-transparent"
          aria-hidden="true"
        />
        <div
          class="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <component
            :is="logo.website_url ? 'a' : 'div'"
            v-for="(logo, i) in row2"
            :key="`r2-${i}`"
            v-bind="logo.website_url ? { href: logo.website_url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            class="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-card bg-white border border-brand-border text-brand-text-secondary shadow-card hover:shadow-card-hover hover:border-brand-border-strong transition-all duration-200"
          >
            <img
              v-if="logo.logo"
              :src="logo.logo"
              :alt="logo.name"
              class="h-6 w-auto max-w-[80px] object-contain"
              loading="lazy"
            />
            <Icon
              v-else
              :name="logo.icon"
              class="w-4 h-4 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <span class="text-sm font-medium whitespace-nowrap">{{ logo.name }}</span>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
