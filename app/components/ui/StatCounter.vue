<script setup lang="ts">
interface Props {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  prefix: '',
  duration: 2000,
})

const displayValue = ref(0)
const el = ref<HTMLElement | null>(null)
const started = ref(false)

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (entry?.isIntersecting && !started.value) {
    started.value = true
    animateCount()
    stop()
  }
})

function animateCount() {
  const startTime = performance.now()
  const tick = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(eased * props.value)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
</script>

<template>
  <div ref="el" class="text-center">
    <div class="font-display font-extrabold text-4xl md:text-5xl gradient-text mb-2">
      {{ prefix }}{{ displayValue.toLocaleString() }}{{ suffix }}
    </div>
    <p class="text-sm text-brand-text-secondary font-medium">{{ label }}</p>
  </div>
</template>
