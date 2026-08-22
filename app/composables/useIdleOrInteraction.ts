/**
 * Runs `callback` once the browser is idle, or immediately on the visitor's
 * first pointer/touch/key/scroll interaction — whichever happens first.
 *
 * Built for third-party analytics scripts (GA, Meta Pixel): their own
 * command queues (`dataLayer`, `fbq.queue`) already buffer calls made before
 * the real script arrives, so delaying the network fetch loses no events —
 * it just keeps that download off the critical path for LCP/TBT on the
 * initial (especially mobile-throttled) load.
 */
export function useIdleOrInteraction(callback: () => void, idleTimeout = 4000) {
  if (!import.meta.client) return

  let done = false
  const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

  const run = () => {
    if (done) return
    done = true
    events.forEach(e => window.removeEventListener(e, run))
    callback()
  }

  events.forEach(e => window.addEventListener(e, run, { once: true, passive: true }))

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: idleTimeout })
  }
  else {
    setTimeout(run, idleTimeout)
  }
}
