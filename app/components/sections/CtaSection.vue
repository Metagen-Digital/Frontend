<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface Props {
  titleKey?: string
  subtitleKey?: string
  primaryLabelKey?: string
  primaryTo?: string
  secondaryLabelKey?: string
  secondaryTo?: string
  // Direct string overrides — take precedence over *Key props
  title?: string
  subtitle?: string
  primaryLabel?: string
  secondaryLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  titleKey:         'cta.title',
  subtitleKey:      'cta.subtitle',
  primaryLabelKey:  'cta.primary',
  primaryTo:        '/contact',
  secondaryLabelKey:'cta.secondary',
  secondaryTo:      '/portfolio',
})

const displayTitle         = computed(() => props.title         || t(props.titleKey!))
const displaySubtitle      = computed(() => props.subtitle      || t(props.subtitleKey!))
const displayPrimaryLabel  = computed(() => props.primaryLabel  || t(props.primaryLabelKey!))
const displaySecondaryLabel= computed(() => props.secondaryLabel || t(props.secondaryLabelKey!))
</script>

<template>
  <!--
    The gradient stops are darker than they look like they should be, on
    purpose. Every piece of copy in this section is white, and against the old
    stops (#d94f1a / #FF6B35 / #e8850a) white sat at 4.13:1, 2.84:1 and 2.70:1
    — below the 4.5:1 AA floor across most of the section, worst exactly in the
    middle where the heading is. It reads as a bright brand block either way,
    but axe/Lighthouse can only mark text over a CSS gradient "incomplete"
    rather than failing it, so this was an accessibility hole the audit could
    never have pointed at.
    New stops give white 5.45:1 / 5.32:1 / 4.92:1. The mid stop is the same
    value as the brand-orange-text token, so the section and the AA-safe orange
    used for text elsewhere are literally the same colour.
  -->
  <section
    class="relative overflow-hidden py-16 md:py-20"
    style="background: linear-gradient(135deg, #B8431A 0%, #B34B25 45%, #A85E07 100%)"
    aria-label="Call to action"
  >
    <!-- Subtle grid overlay -->
    <div
      class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none"
      aria-hidden="true"
    />

    <!-- Glow orbs -->
    <div
      class="absolute -top-20 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
      style="background: rgba(255,255,255,0.08)"
      aria-hidden="true"
    />
    <div
      class="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
      style="background: rgba(255,255,255,0.06)"
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="container-content relative z-10 text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-widest mb-5">
          <Icon name="mdi:rocket-launch-outline" class="w-3.5 h-3.5" aria-hidden="true" />
          {{ t('cta.badge') }}
        </div>

        <h2 class="text-white font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mb-4 drop-shadow">
          {{ displayTitle }}
        </h2>
        <p class="text-white text-lg max-w-xl mx-auto mb-9">
          {{ displaySubtitle }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <!-- White primary button -->
          <NuxtLink
            :to="localePath(primaryTo)"
            class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-orange-text font-bold rounded-btn hover:scale-105 hover:shadow-xl transition-all duration-250 ease-spring text-base"
          >
            {{ displayPrimaryLabel }}
            <Icon name="mdi:arrow-right" class="w-5 h-5" aria-hidden="true" />
          </NuxtLink>

          <!-- Ghost secondary -->
          <NuxtLink
            :to="localePath(secondaryTo)"
            class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-btn hover:border-white hover:bg-white/10 transition-all duration-250 text-base"
          >
            {{ displaySecondaryLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
