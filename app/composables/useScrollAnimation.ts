/**
 * Scroll-triggered animation composable using IntersectionObserver.
 * Attach `ref` to an element to trigger the animation when it enters the viewport.
 */
export function useScrollAnimation(options?: IntersectionObserverInit) {
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
      ...options,
    }
  )

  return { el, isVisible }
}

/**
 * Stagger children visibility — returns per-item delay classes.
 */
export function useStaggerAnimation(count: number, delayStep = 100) {
  return Array.from({ length: count }, (_, i) => ({
    style: { transitionDelay: `${i * delayStep}ms` },
  }))
}
