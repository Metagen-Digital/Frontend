<script setup lang="ts">
interface Props {
  label: string
  color?: 'orange' | 'purple' | 'cyan' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
})

const colorClasses = {
  default: 'bg-brand-surface text-brand-text-secondary border-brand-border',
  orange:  'bg-brand-orange/10 text-brand-orange-text border-brand-orange/20',
  purple:  'bg-brand-purple/10 text-brand-purple-text border-brand-purple/20',
  cyan:    'bg-brand-cyan/10 text-brand-cyan-text border-brand-cyan/20',
}
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
    :class="colorClasses[color]"
  >
    {{ label }}
  </span>
</template>
