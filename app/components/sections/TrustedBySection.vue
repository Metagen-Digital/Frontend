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

// Partner logo images that failed to load fall back to the generic icon the
// LogoItem already carries. Worth having as a permanent guard, not a one-off:
// as of this writing every /storage/partners/logos/*.svg the API hands out is
// a 404 on production, so the live marquee renders a row of broken-image
// glyphs. That is a backend/storage problem to fix separately, but the section
// should never look broken because one upload is missing.
const failedLogos = ref(new Set<string>());
function onLogoError(name: string) {
  failedLogos.value = new Set(failedLogos.value).add(name);
}
const showImage = (logo: LogoItem) => !!logo.logo && !failedLogos.value.has(logo.name);

// The @error binding alone is not enough here. This markup is server-rendered,
// so the browser starts fetching the logos while parsing the HTML — a 404 can
// (and here does) resolve before Vue hydrates and attaches the listener, so the
// event fires into the void and the broken-image glyph stays on screen. A
// post-hydration sweep catches exactly those: an <img> that has finished
// loading with a zero intrinsic width is a failed one.
const marqueeRoot = ref<HTMLElement | null>(null);
onMounted(() => {
  const broken = new Set(failedLogos.value);
  marqueeRoot.value?.querySelectorAll('img[alt]').forEach((node) => {
    const img = node as HTMLImageElement;
    if (img.complete && img.naturalWidth === 0) broken.add(img.alt);
  });
  if (broken.size !== failedLogos.value.size) failedLogos.value = broken;
});

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

    <!-- Accessible copy of the client list.
         The two marquee tracks below are aria-hidden: each renders the logo
         list TWICE (that duplication is how the loop is made seamless), so
         exposing them would read every client name four times over. This list
         carries the same information once, in source order, for screen readers.
         sr-only keeps it out of the visual design. -->
    <ul v-else-if="hasLogos" class="sr-only">
      <li v-for="logo in logos" :key="`a11y-${logo.name}`">{{ logo.name }}</li>
    </ul>

    <!-- 2-row marquee — decorative; see the sr-only list above. -->
    <div v-if="hasLogos" ref="marqueeRoot" class="flex flex-col gap-4">
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
            v-bind="logo.website_url ? { href: logo.website_url, target: '_blank', rel: 'noopener noreferrer', tabindex: -1 } : {}"
            class="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-card bg-white border border-brand-border text-brand-text-secondary shadow-card hover:shadow-card-hover hover:border-brand-border-strong transition-all duration-200"
          >
            <img
              v-if="showImage(logo)"
              :src="logo.logo!"
              :alt="logo.name"
              class="h-6 w-auto max-w-[80px] object-contain"
              loading="lazy"
              @error="onLogoError(logo.name)"
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
            v-bind="logo.website_url ? { href: logo.website_url, target: '_blank', rel: 'noopener noreferrer', tabindex: -1 } : {}"
            class="flex items-center gap-2.5 flex-shrink-0 px-5 py-2.5 rounded-card bg-white border border-brand-border text-brand-text-secondary shadow-card hover:shadow-card-hover hover:border-brand-border-strong transition-all duration-200"
          >
            <img
              v-if="showImage(logo)"
              :src="logo.logo!"
              :alt="logo.name"
              class="h-6 w-auto max-w-[80px] object-contain"
              loading="lazy"
              @error="onLogoError(logo.name)"
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
