<script setup lang="ts">
interface Props {
  icon?: string
  color?: 'orange' | 'purple' | 'cyan' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'orange',
})

// The badge label is real text, so the text colour has to be the AA-safe
// accent variant — the vivid accents are 2.8:1 here and fail WCAG. Borders
// and the 10% background keep the vivid accent: contrast rules do not apply
// to them, and they are what carries the colour visually.
// purple/primary need no variant; they already clear 4.5:1 (see tailwind.config.js).
const colorClasses = {
  orange:  'border-brand-orange/30 text-brand-orange-text bg-brand-orange/10',
  purple:  'border-brand-purple/30 text-brand-purple-text bg-brand-purple/10',
  cyan:    'border-brand-cyan/30 text-brand-cyan-text bg-brand-cyan/10',
  primary: 'border-brand-primary/30 text-brand-primary bg-brand-primary/10',
}
</script>

<template>
  <div
    class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest"
    :class="colorClasses[color]"
  >
    <Icon v-if="icon" :name="icon" class="w-3.5 h-3.5" aria-hidden="true" />
    <slot />
  </div>
</template>
