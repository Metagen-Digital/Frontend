/**
 * Animated counter that runs when the element enters the viewport.
 */
export function useCounter(targetValue: number, duration = 2000) {
  const el = ref<HTMLElement | null>(null)
  const displayValue = ref(0)
  const started = ref(false)

  const { stop } = useIntersectionObserver(el, ([entry]) => {
    if (entry?.isIntersecting && !started.value) {
      started.value = true
      animate()
      stop()
    }
  })

  function animate() {
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      displayValue.value = Math.round(eased * targetValue)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return { el, displayValue }
}
