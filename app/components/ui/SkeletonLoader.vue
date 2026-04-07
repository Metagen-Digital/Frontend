<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: string
  lines?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 'w-full',
  height: 'h-6',
  rounded: 'rounded-md',
  lines: 1,
})
</script>

<template>
  <div v-if="lines === 1" :class="[width, height, rounded, 'bg-brand-surface animate-pulse']" aria-hidden="true" />
  <div v-else class="space-y-3" aria-hidden="true">
    <div
      v-for="i in lines"
      :key="i"
      :class="[
        'h-4 bg-brand-surface animate-pulse rounded-md',
        i === lines ? 'w-3/4' : 'w-full',
      ]"
    />
  </div>
</template>
