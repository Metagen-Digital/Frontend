// Sentry error monitoring — loads only when a DSN is configured, so a missing
// NUXT_PUBLIC_SENTRY_DSN simply means "no monitoring" rather than a broken
// app. The DSN is not a secret (it ships in the browser anyway); it lives in
// env so previews/local dev stay unmonitored (or can point at a separate
// Sentry project).
//
// Dynamic import keeps @sentry/browser out of the main bundle entirely when
// no DSN is set. Client-only and intentionally minimal: no tracing, no
// session replay — just uncaught exceptions and unhandled promise rejections.
//
// The plugin is deliberately NOT async and does NOT await the import. Nuxt
// awaits async plugins as part of hydration, so `await import('@sentry/browser')`
// parked the whole app behind a 448 KB chunk (~130 KB gzipped — by far the
// largest in the build) on every single page load whenever a DSN was set.
// That is pure Total Blocking Time on a throttled mobile CPU, and it bought
// nothing: monitoring an already-hydrated page is exactly as useful.
//
// Instead it follows analytics-defer.client.ts — fire the import on idle or
// first interaction. The only gap is errors thrown in the few hundred ms
// before Sentry arrives, which the handlers below capture and replay once it
// does, so nothing is actually lost.
//
// Note: Sentry's ingest endpoint must be allowed in the CSP connect-src — see
// the routeRules block in nuxt.config.ts.
export default defineNuxtPlugin(() => {
  const dsn = useRuntimeConfig().public.sentryDsn as string
  if (!dsn || !import.meta.client) return

  // Buffer anything that blows up during the deferral window. Without this,
  // moving Sentry off the critical path would create a real blind spot right
  // where early-boot errors happen.
  const early: unknown[] = []
  const onError = (e: ErrorEvent) => early.push(e.error ?? e.message)
  const onRejection = (e: PromiseRejectionEvent) => early.push(e.reason)
  window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onRejection)

  useIdleOrInteraction(() => {
    import('@sentry/browser')
      .then((Sentry) => {
        Sentry.init({
          dsn,
          environment: import.meta.dev ? 'development' : 'production',
        })
        window.removeEventListener('error', onError)
        window.removeEventListener('unhandledrejection', onRejection)
        early.forEach(err => Sentry.captureException(err))
        early.length = 0
      })
      .catch(() => {
        // Monitoring failing to load must never take the app with it.
        window.removeEventListener('error', onError)
        window.removeEventListener('unhandledrejection', onRejection)
      })
  })
})
