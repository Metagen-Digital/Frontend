<script setup lang="ts">
import type { PartnerApiItem } from "~/types";

const fallbackLogos = [
  { name: "TechCorp BD", icon: "mdi:domain" },
  { name: "ShopBD", icon: "mdi:shopping" },
  { name: "GreenGrow", icon: "mdi:leaf" },
  { name: "UrbanEats", icon: "mdi:food" },
  { name: "BuildRight", icon: "mdi:hammer" },
  { name: "MediCare BD", icon: "mdi:hospital-box" },
  { name: "EduPrime", icon: "mdi:school" },
  { name: "StyleHouse", icon: "mdi:hanger" },
];

const { get } = useApi();
const { data: partnersResponse } =
  await get<PartnerApiItem[]>("/partners/featured");

const logos = computed(() => {
  const partners = partnersResponse.value?.data ?? [];
  if (!partners.length) {
    return fallbackLogos;
  }

  return partners.map((partner) => ({
    name: partner.name,
    icon: "mdi:domain",
  }));
});

const doubled = computed(() => [...logos.value, ...logos.value]);
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

    <div class="relative flex overflow-hidden">
      <!-- Fade masks -->
      <div
        class="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-brand-surface to-transparent"
        aria-hidden="true"
      />
      <div
        class="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-brand-surface to-transparent"
        aria-hidden="true"
      />

      <!-- Scrolling track -->
      <div
        class="flex gap-4 animate-marquee hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        <div
          v-for="(logo, i) in doubled"
          :key="i"
          class="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-card bg-white border border-brand-border text-brand-text-secondary shadow-card"
        >
          <Icon
            :name="logo.icon"
            class="w-4 h-4 text-brand-orange"
            aria-hidden="true"
          />
          <span class="text-sm font-medium whitespace-nowrap">{{
            logo.name
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
