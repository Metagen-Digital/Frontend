<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

withDefaults(defineProps<Props>(), {
  title:         'Ready to Scale Your Business?',
  subtitle:      "Let's build something great together. Tell us about your project and we'll get back to you within 24 hours.",
  primaryLabel:  "Let's Talk",
  primaryTo:     '/contact',
  secondaryLabel:'View Our Work',
  secondaryTo:   '/portfolio',
})
</script>

<template>
  <section
    class="relative overflow-hidden py-20 md:py-28"
    aria-label="Call to action"
  >
    <!-- Gradient background -->
    <div
      class="absolute inset-0 bg-gradient-brand opacity-90"
      aria-hidden="true"
    />

    <!-- Subtle grid overlay -->
    <div
      class="absolute inset-0 bg-grid-pattern bg-grid opacity-10"
      aria-hidden="true"
    />

    <!-- Glow orbs -->
    <div class="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" aria-hidden="true" />
    <div class="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" aria-hidden="true" />

    <!-- Content -->
    <div class="container-content relative z-10 text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2 class="text-white font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mb-5 drop-shadow">
          {{ title }}
        </h2>
        <p class="text-white/80 text-lg max-w-xl mx-auto mb-10">
          {{ subtitle }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- White primary button -->
          <NuxtLink
            :to="primaryTo"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-orange font-bold rounded-btn hover:scale-105 hover:shadow-xl transition-all duration-250 ease-spring text-base"
          >
            {{ primaryLabel }}
            <Icon name="mdi:arrow-right" class="w-5 h-5" aria-hidden="true" />
          </NuxtLink>

          <!-- Ghost secondary -->
          <NuxtLink
            :to="secondaryTo"
            class="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-btn hover:border-white hover:bg-white/10 transition-all duration-250 text-base"
          >
            {{ secondaryLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
