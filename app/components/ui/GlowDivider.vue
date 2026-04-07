<script setup lang="ts">
interface Props {
  color?: 'orange' | 'purple' | 'cyan'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'orange',
})

const gradients = {
  orange: 'from-transparent via-brand-orange to-transparent',
  purple: 'from-transparent via-brand-purple to-transparent',
  cyan:   'from-transparent via-brand-cyan to-transparent',
}
</script>

<template>
  <div class="w-full flex items-center justify-center py-2" aria-hidden="true">
    <div
      class="h-px w-full max-w-xs bg-gradient-to-r opacity-60"
      :class="gradients[color]"
    />
  </div>
</template>
