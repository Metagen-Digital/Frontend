// nuxt.config.ts sets gtag.initMode to 'manual', which skips auto-injecting
// gtag.js. This is the other half: kick off the real script once idle or on
// first interaction, instead of on every initial page load. Safe because the
// dataLayer queue nuxt-gtag creates synchronously still buffers any
// useTrackEvent() calls made before this fires — see useIdleOrInteraction.
export default defineNuxtPlugin(() => {
  useIdleOrInteraction(() => useGtag().initialize())
})
