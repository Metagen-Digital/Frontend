<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

// Desktop-only preload for the hero image.
//
// The <NuxtImg> below is inside a `hidden lg:flex` column, so phones never
// paint it. Its old `preload` prop emitted an unconditional <link rel=preload>
// into every response's head, which meant every mobile visitor fetched it at
// top priority against the fonts and CSS the mobile LCP genuinely waits on.
// A rel=preload accepts `media`, so gating it on the same breakpoint as the
// column keeps the desktop benefit and costs mobile nothing.
//
// useImage() (rather than a hand-written /_ipx/ path) guarantees this URL is
// byte-identical to the one NuxtImg renders — if the two drifted, the preload
// would be a second, wasted download instead of a head start on the first.
// `quality` must be passed explicitly even though nuxt.config sets it
// globally: <NuxtImg> folds the configured default into its own URL (…&q_85&…)
// but useImage() does not, so omitting it here produced a preload href that
// differed from the rendered src by one modifier — which is a whole second
// download of the same image, the exact opposite of what a preload is for.
// Keep this in step with `image.quality` in nuxt.config.ts.
const img = useImage()
const heroImageUrl = img('/images/HeroBg.png', {
  format: 'webp',
  quality: 85,
  width: 500,
  height: 400,
})

useHead({
  link: [{
    rel: 'preload',
    as: 'image',
    href: heroImageUrl,
    media: '(min-width: 1024px)',
    fetchpriority: 'high',
  }],
})

const stats = computed(() => [
  { icon: "mdi:account-group-outline", value: "100+", labelKey: "hero.stats.clients",    color: "text-brand-orange" },
  { icon: "mdi:rocket-launch-outline", value: "100+", labelKey: "hero.stats.projects",   color: "text-brand-purple" },
  { icon: "mdi:star-outline",          value: "5.0★", labelKey: "hero.stats.rating",     color: "text-brand-cyan" },
  { icon: "mdi:calendar-check-outline",value: "5+",   labelKey: "hero.stats.experience", color: "text-brand-primary" },
])

const services = computed(() => [
  { icon: "mdi:trending-up",        labelKey: "hero.serviceChips.digitalMarketing", color: "text-brand-orange",  bg: "bg-brand-orange/10" },
  { icon: "mdi:instagram",          labelKey: "hero.serviceChips.socialMedia",      color: "text-brand-purple",  bg: "bg-brand-purple/10" },
  { icon: "mdi:monitor-shimmer",    labelKey: "hero.serviceChips.webDev",           color: "text-brand-primary", bg: "bg-brand-primary/10" },
  { icon: "mdi:camera-outline",     labelKey: "hero.serviceChips.photography",      color: "text-brand-cyan",    bg: "bg-brand-cyan/10" },
  { icon: "mdi:video-outline",      labelKey: "hero.serviceChips.videoEditing",     color: "text-brand-orange",  bg: "bg-brand-orange/10" },
  { icon: "mdi:palette-outline",    labelKey: "hero.serviceChips.graphicDesign",    color: "text-brand-purple",  bg: "bg-brand-purple/10" },
])

const floatingBubbles = computed(() => [
  {
    icon: "mdi:google-ads",
    labelKey: "hero.bubbles.googleAds",
    subKey: "hero.bubbles.googleAdsSub",
    wrapClass: "-top-4 left-6",
    iconClass: "bg-brand-orange/10 text-brand-orange",
    delay: "0s",
  },
  {
    icon: "mdi:instagram",
    labelKey: "hero.bubbles.socialMedia",
    subKey: "hero.bubbles.socialMediaSub",
    wrapClass: "top-1/3 -right-6",
    iconClass: "bg-brand-purple/10 text-brand-purple",
    delay: "0.7s",
  },
  {
    icon: "mdi:web",
    labelKey: "hero.bubbles.webDev",
    subKey: "hero.bubbles.webDevSub",
    wrapClass: "-bottom-4 left-10",
    iconClass: "bg-brand-primary/10 text-brand-primary",
    delay: "1.4s",
  },
  {
    icon: "mdi:camera",
    labelKey: "hero.bubbles.photoVideo",
    subKey: "hero.bubbles.photoVideoSub",
    wrapClass: "bottom-1/3 -left-6",
    iconClass: "bg-brand-cyan/10 text-brand-cyan",
    delay: "2.1s",
  },
])
</script>

<template>
  <!--
    The three background orbs used to be three absolutely-positioned 400-600px
    divs with `blur-3xl` on them. Each `filter: blur()` forces its own
    composited layer that the GPU has to allocate and blur at full size —
    ~800k blurred pixels between them, on the largest paint area of the page,
    during the exact window LCP is measured in. On a throttled mobile CPU that
    is one of the most expensive things on the homepage, for decoration nobody
    consciously sees.

    They are now radial-gradients painted straight into the section's own
    background. A radial-gradient with a transparent stop IS a soft-edged orb,
    so the look is preserved, but it costs one background paint and zero extra
    layers. Positions/sizes below are the old divs' box centres converted to
    percentages of the section.
  -->
  <section
    class="relative min-h-[100svh] flex items-center overflow-hidden"
    style="background:
      radial-gradient(600px 600px at 8% 55%, rgba(48, 60, 142, 0.10), transparent 70%),
      radial-gradient(500px 500px at 92% 78%, rgba(14, 165, 233, 0.08), transparent 70%),
      radial-gradient(400px 400px at 64% 10%, rgba(45, 60, 147, 0.06), transparent 70%),
      linear-gradient(155deg, #eef3ff 0%, #f3f6ff 45%, #edf6ff 100%)"
    aria-label="Hero"
  >
    <!-- Background grid -->
    <div
      class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"
      aria-hidden="true"
    />

    <div class="container-content relative z-10 pt-28 pb-20">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center"
      >
        <!-- ── LEFT: Content ──────────────────────────── -->
        <div class="flex flex-col">
          <!--
            Everything down to the CTA row renders at full opacity immediately,
            with no entrance animation at all. This is not a style preference:
            the badge, the <h1> and the subheadline are the LCP candidates on
            mobile (the image column beside them is `hidden lg:flex`, so on a
            phone the headline IS the largest contentful paint). Fading them in
            from opacity 0 meant the browser could not record a contentful
            paint until the fade finished — the <h1> alone was held back by its
            180ms delay plus a 700ms fade, so the hero was *animating away*
            close to a second of mobile LCP for decoration.

            The rows below the fold-critical text keep their stagger, but as
            CSS `animate-fade-up` + an animation-delay rather than v-motion.
            Same look, and it drops nine @vueuse/motion directives — nine
            hydration-time style writes on the heaviest above-the-fold
            component — down to zero.
          -->
          <!-- Eyebrow badge -->
          <div class="mb-6">
            <div
              class="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-semibold uppercase tracking-widest"
            >
              <span class="relative flex h-5 w-5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-60" />
                <span class="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-success/20">
                  <span class="w-2 h-2 rounded-full bg-brand-success" />
                </span>
              </span>
              <Icon name="mdi:trophy-outline" class="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
              {{ $t('hero.badge') }}
            </div>
          </div>

          <!-- Headline — the mobile LCP element. Deliberately un-animated. -->
          <div>
            <h1 class="font-display font-extrabold leading-[1.08] text-brand-text-primary mb-5">
              <!-- Branch on the locale, not on the value of a translation.
                   This used to read `v-if="$t('hero.headlineGrow') === 'Grow'"`,
                   so editing the English copy for that key — a perfectly normal
                   content change — would have silently swapped the whole
                   headline into the Bengali layout. -->
              <template v-if="locale === 'en'">
                We <span class="gradient-text">{{ $t('hero.headlineGrow') }}</span> Your<br />
                <!-- The explicit {{ ' ' }} matters. Below `sm` the <br /> is
                     display:none and Vue collapses the whitespace around it, so
                     the headline rendered as "BusinessOnline" — one run-on word
                     in the <h1>, i.e. on the LCP element of every phone visit.
                     At sm and up the space sits at a line break and collapses
                     away, so the desktop wrap is unchanged. -->
                Business{{ ' ' }}<br class="hidden sm:block" />
                <span class="gradient-text">{{ $t('hero.headlineOnline') }}</span>
              </template>
              <template v-else>
                আমরা আপনার ব্যবসা<br />
                <span class="gradient-text">{{ $t('hero.headlineOnline') }} {{ $t('hero.headlineGrow') }}</span>
              </template>
            </h1>
          </div>

          <!-- Subheadline -->
          <div>
            <p class="text-lg text-brand-text-secondary leading-relaxed mb-8 max-w-lg">
              {{ $t('hero.subheadline') }}
            </p>
          </div>

          <!-- CTA buttons -->
          <div
            class="flex flex-col sm:flex-row gap-3 mb-4 animate-fade-up"
            style="animation-delay: 120ms"
          >
            <GradientButton :to="localePath('/services')" size="lg" icon-right="mdi:arrow-right">
              {{ $t('hero.ctaServices') }}
            </GradientButton>
            <GradientButton :to="localePath('/contact')" size="lg" variant="outline" icon="mdi:chat-outline">
              {{ $t('hero.ctaConsult') }}
            </GradientButton>
          </div>

          <!-- WhatsApp quick CTA -->
          <div class="mb-8 animate-fade-up" style="animation-delay: 200ms">
            <a
              href="https://wa.me/8801970222573"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-brand-text-muted hover:text-[#25D366] transition-colors duration-200 group"
            >
              <Icon name="mdi:whatsapp" class="w-4 h-4 text-[#25D366]" aria-hidden="true" />
              {{ $t('hero.whatsapp') }}
              <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>

          <!-- Service chips -->
          <div
            class="flex flex-wrap gap-2 mb-8 animate-fade-up"
            style="animation-delay: 280ms"
          >
            <div
              v-for="svc in services"
              :key="svc.labelKey"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-white/80 backdrop-blur-sm text-xs font-medium text-brand-text-secondary hover:border-brand-border-strong hover:shadow-card transition-all duration-200 cursor-default"
            >
              <span class="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" :class="svc.bg">
                <Icon :name="svc.icon" class="w-3 h-3" :class="svc.color" aria-hidden="true" />
              </span>
              {{ t(svc.labelKey) }}
            </div>
          </div>

          <!-- Stats row -->
          <div
            class="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 border-t border-brand-border animate-fade-up"
            style="animation-delay: 360ms"
          >
            <div v-for="stat in stats" :key="stat.labelKey" class="flex flex-col items-start gap-1">
              <div class="flex items-center gap-1.5">
                <Icon :name="stat.icon" class="w-4 h-4 flex-shrink-0" :class="stat.color" aria-hidden="true" />
                <span class="font-display font-extrabold text-xl md:text-2xl text-brand-text-primary">
                  {{ stat.value }}
                </span>
              </div>
              <span class="text-[11px] text-brand-text-muted leading-tight">{{ t(stat.labelKey) }}</span>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Image ──────────────────────────── -->
        <!-- The desktop LCP element lives in here, so this column is
             un-animated for the same reason the headline is: a 280ms delay
             plus an 800ms fade from opacity 0 postponed the largest
             contentful paint on desktop by up to a second. -->
        <div class="relative hidden lg:flex items-center justify-center py-8 px-8">
          <!-- Glow behind image -->
          <div
            class="absolute inset-0 rounded-3xl blur-2xl opacity-25 pointer-events-none"
            style="background: radial-gradient(circle at 55% 45%, rgba(48, 60, 142, 0.3), rgba(124, 58, 237, 0.2), transparent 70%);"
            aria-hidden="true"
          />

          <!-- Floating service bubbles -->
          <div
            v-for="bubble in floatingBubbles"
            :key="bubble.labelKey"
            class="absolute z-20"
            :class="bubble.wrapClass"
            aria-hidden="true"
          >
            <div
              class="flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-brand-border shadow-card-hover animate-float"
              :style="{ animationDelay: bubble.delay }"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="bubble.iconClass">
                <Icon :name="bubble.icon" class="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">{{ t(bubble.labelKey) }}</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">{{ t(bubble.subKey) }}</p>
              </div>
            </div>
          </div>

          <!-- Main image -->
          <div class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border w-full">
            <!-- The DESKTOP LCP element — note this whole column is
                 `hidden lg:flex`, so on a phone this image is never painted.

                 It used to carry `preload` + fetchpriority="high" anyway.
                 Those are not media-aware: NuxtImg's `preload` emits a
                 <link rel=preload> into the head of every response, so every
                 mobile visitor fetched this image at the highest possible
                 priority, competing with the fonts and CSS that the mobile
                 LCP actually depends on, to paint something `display:none`.
                 The preload now lives in useHead() behind
                 media="(min-width: 1024px)" so only viewports that render it
                 pay for it. loading="eager" is kept — for desktop it must not
                 be lazy — but without the head-level preload a hidden element
                 no longer wins the priority queue.

                 width/height are the source's REAL intrinsic size. They were
                 1280x960, which was wrong twice over: HeroBg.png is 500x400,
                 so IPX was upscaling a 500px source to 1280 (soft on every
                 screen), and 4:3 vs the true 5:4 meant the reserved box had
                 the wrong aspect ratio and shifted when the image landed.
                 `sizes` is gone for the same reason — a srcset asking for
                 640px+ from a 500px source only generates upscales.
                 densities="1x" for the same reason: NuxtImg defaults to
                 emitting a 2x candidate, and on a retina display the browser
                 preferred that one — a 1000px upscale of a 500px source, i.e.
                 a bigger file that is no sharper, and not the URL the preload
                 above warmed. There is no real 2x here to offer.
                 If a higher-resolution HeroBg is ever exported (1200px wide
                 or more), restore sizes="lg:536px", drop densities, and bump
                 these numbers. -->
            <NuxtImg
              src="/images/HeroBg.png"
              alt="MetaGenDigital — Digital marketing and web development agency"
              class="w-full h-auto object-cover"
              format="webp"
              width="500"
              height="400"
              densities="1x"
              loading="eager"
              fetchpriority="high"
            />

            <!-- Badge: Available -->
            <div
              class="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 0.4s"
              aria-hidden="true"
            >
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-60" />
                <span class="relative inline-flex w-2.5 h-2.5 rounded-full bg-brand-success" />
              </span>
              <span class="text-xs font-semibold text-brand-text-primary">{{ $t('hero.available') }}</span>
            </div>

            <!-- Badge: Traffic Growth -->
            <div
              class="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 1.1s"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:trending-up" class="w-4.5 h-4.5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p class="text-sm font-extrabold text-brand-text-primary leading-none">+300%</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">{{ $t('hero.trafficGrowth') }}</p>
              </div>
            </div>

            <!-- Badge: Star rating -->
            <div
              class="absolute top-5 right-5 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 1.8s"
              aria-hidden="true"
            >
              <div class="flex gap-0.5">
                <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-3 h-3 text-brand-warning" aria-hidden="true" />
              </div>
              <span class="text-xs font-bold text-brand-text-primary">5.0</span>
            </div>

            <!-- Badge: Clients count -->
            <div
              class="absolute bottom-5 left-5 flex items-center gap-2.5 px-3.5 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 0.9s"
              aria-hidden="true"
            >
              <!-- Avatar stack -->
              <div class="flex -space-x-2">
                <div
                  v-for="(c, i) in ['bg-brand-orange', 'bg-brand-purple', 'bg-brand-cyan']"
                  :key="i"
                  class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold"
                  :class="c"
                >
                  {{ ["R", "S", "A"][i] }}
                </div>
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">{{ $t('hero.clientsCount') }}</p>
                <p class="text-[10px] text-brand-text-muted">{{ $t('hero.clientsRegion') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="flex flex-col items-center gap-2 mt-14 animate-fade-in"
        style="animation-delay: 500ms"
        aria-hidden="true"
      >
        <span class="text-[11px] text-brand-text-muted tracking-widest uppercase">{{ $t('hero.scroll') }}</span>
        <div class="w-px h-10 bg-gradient-to-b from-brand-primary to-transparent animate-bounce-y" />
      </div>
    </div>
  </section>
</template>
