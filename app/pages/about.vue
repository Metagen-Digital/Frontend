<script setup lang="ts">
import type { TeamApiItem } from '~/types'

const { t } = useI18n()
const { get } = useApi()
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: computed(() => `${t('aboutPage.breadcrumb')} | MetaGenDigital`),
  description: computed(() => t('aboutPage.hero.description')),
  ogTitle: computed(() => `${t('aboutPage.breadcrumb')} | MetaGenDigital`),
  ogDescription: computed(() => t('aboutPage.hero.description')),
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/about.jpg`,
})

// testimonials/stats থেকে average_rating নিয়ে satisfaction % বের করা হয়
const { data: testimonialStats } = await get<{ average_rating: number; total: number }>('/testimonials/stats')
const { data: teamResponse }     = await get<TeamApiItem[]>('/team')

const satisfactionPct = computed(() => {
  const rating = testimonialStats.value?.data?.average_rating ?? 5
  return Math.min(100, Math.round((rating / 5) * 100))
})

const stats = computed(() => [
  { icon: 'mdi:account-group-outline', value: 50,                    suffix: '+', label: t('aboutPage.stats.clients'),      color: 'orange' },
  { icon: 'mdi:rocket-launch-outline', value: 100,                   suffix: '+', label: t('aboutPage.stats.projects'),     color: 'purple' },
  { icon: 'mdi:star-outline',          value: satisfactionPct.value, suffix: '%', label: t('aboutPage.stats.satisfaction'), color: 'cyan' },
  { icon: 'mdi:calendar-check-outline',value: 5,                     suffix: '+', label: t('aboutPage.stats.experience'),   color: 'orange' },
])

const values = computed(() => [
  { icon: 'mdi:target',               key: 'results',     color: 'orange' },
  { icon: 'mdi:handshake-outline',    key: 'partnership', color: 'purple' },
  { icon: 'mdi:lightbulb-on-outline', key: 'creative',    color: 'cyan' },
  { icon: 'mdi:shield-check-outline', key: 'trust',       color: 'orange' },
  { icon: 'mdi:chart-line',           key: 'data',        color: 'purple' },
  { icon: 'mdi:clock-fast',           key: 'time',        color: 'cyan' },
])

const team = computed<TeamApiItem[]>(() => teamResponse.value?.data ?? [])

const chips = computed(() => [
  { icon: 'mdi:trending-up',      key: 'digitalMarketing', color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { icon: 'mdi:instagram',        key: 'socialMedia',      color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  { icon: 'mdi:camera-outline',   key: 'photography',      color: 'text-brand-cyan',   bg: 'bg-brand-cyan/10' },
  { icon: 'mdi:movie-edit-outline', key: 'videoEditing',  color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { icon: 'mdi:monitor-shimmer',  key: 'webDev',           color: 'text-brand-primary',bg: 'bg-brand-primary/10' },
  { icon: 'mdi:shopping-outline', key: 'ecommerce',        color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { icon: 'mdi:palette-outline',  key: 'branding',         color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
])

const contactDetails = computed(() => [
  { key: 'd0', icon: 'mdi:map-marker-outline', href: 'https://maps.google.com/?q=Uttara+10,Dhaka,Bangladesh', color: 'orange', external: true },
  { key: 'd1', icon: 'mdi:phone-outline',      href: 'tel:+8801970222573', color: 'purple' },
  { key: 'd2', icon: 'mdi:email-outline',      href: 'mailto:hello@metagendigital.com', color: 'cyan' },
  { key: 'd3', icon: 'mdi:email-outline',      href: 'mailto:metagendigital@gmail.com', color: 'cyan' },
  { key: 'd4', icon: 'mdi:web',                href: 'https://www.metagendigital.com', color: 'orange', external: true },
  { key: 'd5', icon: 'mdi:clock-outline',      color: 'purple' },
])

const socials = [
  { icon: 'mdi:facebook',  href: 'https://www.facebook.com/MetagenDigital',         label: 'Facebook',  handle: '@MetagenDigital', color: 'hover:text-[#4c76be] hover:border-[#4c76be]/30' },
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/MetagenDigital',        label: 'Instagram', handle: '@MetagenDigital', color: 'hover:text-[#e1306c] hover:border-[#e1306c]/30' },
  { icon: 'mdi:linkedin',  href: 'https://www.linkedin.com/company/MetagenDigital', label: 'LinkedIn',  handle: 'MetagenDigital',  color: 'hover:text-[#0b86ca] hover:border-[#0b86ca]/30' },
  { icon: 'mdi:youtube',   href: 'https://www.youtube.com/@MetagenDigital',         label: 'YouTube',   handle: '@MetagenDigital', color: 'hover:text-[#fd3832] hover:border-[#fd3832]/30' },
]

const iconGradient: Record<string, string> = {
  orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
  cyan:   'from-brand-cyan/20   to-brand-cyan/5   text-brand-cyan',
}

const accentBar: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}

const iconContactBg: Record<string, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  purple: 'bg-brand-purple/10 text-brand-purple',
  cyan:   'bg-brand-cyan/10   text-brand-cyan',
}
</script>

<template>
  <div>

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="relative pt-32 pb-20 bg-brand-surface border-b border-brand-border overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="absolute -left-32 top-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none" style="background:rgba(48,60,142,0.07)" aria-hidden="true" />
      <div class="absolute -right-20 bottom-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style="background:rgba(124,58,237,0.07)" aria-hidden="true" />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: $t('aboutPage.breadcrumb') }]" class="mb-6" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          >
            <SectionBadge icon="mdi:information-outline" color="primary" class="mb-5">{{ $t('aboutPage.hero.badge') }}</SectionBadge>
            <h1 class="text-brand-text-primary mt-4 mb-5">
              {{ $t('aboutPage.hero.heading') }} <span class="gradient-text">{{ $t('aboutPage.hero.headingHighlight') }}</span>
            </h1>
            <p class="text-lg text-brand-text-secondary leading-relaxed mb-6 max-w-lg">
              {{ $t('aboutPage.hero.description') }}
            </p>

            <!-- Service chips -->
            <div class="flex flex-wrap gap-2 mb-8">
              <div
                v-for="chip in chips"
                :key="chip.key"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-white text-xs font-medium text-brand-text-secondary"
              >
                <span class="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" :class="chip.bg">
                  <Icon :name="chip.icon" class="w-3 h-3" :class="chip.color" aria-hidden="true" />
                </span>
                {{ $t(`aboutPage.chips.${chip.key}`) }}
              </div>
            </div>

            <div class="flex gap-3 flex-wrap">
              <GradientButton to="/services" icon-right="mdi:arrow-right">{{ $t('aboutPage.hero.cta1') }}</GradientButton>
              <GradientButton to="/contact" variant="outline" icon="mdi:chat-outline">{{ $t('aboutPage.hero.cta2') }}</GradientButton>
            </div>
          </div>

          <!-- Right: image + floating badges -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 32, scale: 0.96 }"
            :enter="{ opacity: 1, x: 0, scale: 1, transition: { delay: 200, duration: 700 } }"
            class="relative hidden lg:block"
          >
            <div class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop"
                alt="MetaGenDigital team at work"
                class="w-full h-auto object-cover"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>

            <!-- Badge: location -->
            <div
              class="absolute -bottom-5 -left-5 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-card-hover border border-brand-border animate-float"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Icon name="mdi:map-marker" class="w-5 h-5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">{{ $t('aboutPage.hero.basedIn') }}</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">{{ $t('aboutPage.hero.location') }}</p>
              </div>
            </div>

            <!-- Badge: founded -->
            <div
              class="absolute -top-4 -right-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay:1s"
              aria-hidden="true"
            >
              <div class="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Icon name="mdi:trophy-outline" class="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">{{ $t('aboutPage.hero.est') }}</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">{{ $t('aboutPage.hero.yearsStrong') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS BANNER ──────────────────────────────────────── -->
    <section class="py-14 bg-white">
      <div class="container-content">
        <div class="relative overflow-hidden rounded-card bg-gradient-brand p-px">
          <div class="relative rounded-[15px] bg-gradient-brand px-6 py-12">
            <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 rounded-[15px] pointer-events-none" aria-hidden="true" />
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div
                v-for="(stat, i) in stats"
                :key="stat.label"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 500 } }"
                class="text-center"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <Icon :name="stat.icon" class="w-5 h-5 text-white/70" aria-hidden="true" />
                </div>
                <StatCounter
                  :value="stat.value"
                  :suffix="stat.suffix"
                  :label="stat.label"
                  class="[&_.gradient-text]:!text-white [&_.gradient-text]:!bg-none [&_p]:!text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR STORY ─────────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Our Story">
      <div class="container-content">

        <div class="text-center mb-14">
          <SectionBadge icon="mdi:book-open-outline" color="orange" class="mb-4">{{ $t('aboutPage.story.badge') }}</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            {{ $t('aboutPage.story.heading') }}
            <span class="gradient-text"> {{ $t('aboutPage.story.headingHighlight') }}</span>
          </h2>
          <p class="text-brand-text-secondary max-w-2xl mx-auto">
            {{ $t('aboutPage.story.subheading') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <!-- Image side -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
            class="relative"
          >
            <div class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop"
                alt="MetaGenDigital strategy session"
                class="w-full h-auto object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>

            <div
              class="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-card-hover border border-brand-border px-5 py-4 flex items-center gap-4 animate-float"
              aria-hidden="true"
            >
              <div class="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:earth" class="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[13px] font-extrabold text-brand-text-primary leading-none">{{ $t('aboutPage.story.globalReach') }}</p>
                <p class="text-[11px] text-brand-text-muted mt-0.5">{{ $t('aboutPage.story.globalReachSub') }}</p>
              </div>
            </div>

            <div
              class="absolute -top-4 -left-4 bg-white rounded-2xl shadow-card border border-brand-border px-4 py-3 flex items-center gap-3 animate-float"
              style="animation-delay:0.8s"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-success/10 flex items-center justify-center">
                <Icon name="mdi:check-decagram" class="w-5 h-5 text-brand-success" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">{{ $t('aboutPage.hero.est') }}</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">{{ $t('aboutPage.story.yearsExcellence') }}</p>
              </div>
            </div>

            <div class="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl bg-brand-orange/8 -z-10" aria-hidden="true" />
            <div class="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-brand-primary/8 -z-10" aria-hidden="true" />
          </div>

          <!-- Content side -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: 100, duration: 600 } }"
            class="flex flex-col gap-6"
          >
            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-orange/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:flag-outline" class="w-5 h-5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ $t('aboutPage.story.started.title') }}</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ $t('aboutPage.story.started.text') }}</p>
              </div>
            </div>

            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-purple/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-purple/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:earth" class="w-5 h-5 text-brand-purple" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ $t('aboutPage.story.roots.title') }}</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ $t('aboutPage.story.roots.text') }}</p>
              </div>
            </div>

            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-cyan/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-cyan/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:chart-line" class="w-5 h-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ $t('aboutPage.story.today.title') }}</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ $t('aboutPage.story.today.text') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MISSION + VISION ──────────────────────────────────── -->
    <section class="py-16 md:py-20 bg-white" aria-label="Mission and Vision">
      <div class="container-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="relative overflow-hidden rounded-card border border-brand-border bg-white shadow-card p-8 group hover:shadow-card-hover hover:border-brand-primary/30 transition-all duration-300"
          >
            <div class="h-1 absolute top-0 left-0 right-0 bg-brand-primary rounded-t-card" />
            <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 text-brand-primary mb-6 transition-transform duration-300 group-hover:scale-110">
              <Icon name="mdi:flag-outline" class="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-bold text-brand-text-primary mb-3">{{ $t('aboutPage.mission.title') }}</h3>
            <p class="text-brand-text-secondary leading-relaxed">{{ $t('aboutPage.mission.text') }}</p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 120, duration: 600 } }"
            class="relative overflow-hidden rounded-card border border-brand-border bg-white shadow-card p-8 group hover:shadow-card-hover hover:border-brand-purple/30 transition-all duration-300"
          >
            <div class="h-1 absolute top-0 left-0 right-0 bg-brand-purple rounded-t-card" />
            <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 text-brand-purple mb-6 transition-transform duration-300 group-hover:scale-110">
              <Icon name="mdi:eye-outline" class="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-bold text-brand-text-primary mb-3">{{ $t('aboutPage.vision.title') }}</h3>
            <p class="text-brand-text-secondary leading-relaxed">{{ $t('aboutPage.vision.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR VALUES ────────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Our Values">
      <div class="container-content">
        <div class="text-center mb-14">
          <SectionBadge icon="mdi:heart-outline" color="purple" class="mb-4">{{ $t('aboutPage.values.badge') }}</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            {{ $t('aboutPage.values.heading') }}
            <span class="gradient-text"> {{ $t('aboutPage.values.headingHighlight') }}</span>
          </h2>
          <p class="text-brand-text-secondary max-w-xl mx-auto">{{ $t('aboutPage.values.subheading') }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(value, i) in values"
            :key="value.key"
            v-motion
            :initial="{ opacity: 0, y: 28 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
            class="group relative flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card transition-all duration-300"
            :class="{
              'hover:border-brand-orange/30 hover:shadow-glow-orange': value.color === 'orange',
              'hover:border-brand-purple/30 hover:shadow-glow-purple': value.color === 'purple',
              'hover:border-brand-cyan/30   hover:shadow-glow-cyan':   value.color === 'cyan',
            }"
          >
            <div class="h-1 w-full flex-shrink-0" :class="accentBar[value.color]" />
            <div class="p-5 flex gap-4 items-start">
              <div
                class="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                :class="iconGradient[value.color]"
              >
                <Icon :name="value.icon" class="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ $t(`aboutPage.values.${value.key}.title`) }}</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ $t(`aboutPage.values.${value.key}.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR TEAM ───────────────────────────────────────────── -->
    <section class="section-padding bg-white" aria-label="Our Team">
      <div class="container-content">
        <div class="text-center mb-14">
          <SectionBadge icon="mdi:account-group-outline" color="cyan" class="mb-4">{{ $t('aboutPage.team.badge') }}</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            {{ $t('aboutPage.team.heading') }}
            <span class="gradient-text"> {{ $t('aboutPage.team.headingHighlight') }}</span>
          </h2>
          <p class="text-brand-text-secondary max-w-xl mx-auto">{{ $t('aboutPage.team.subheading') }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(member, i) in team"
            :key="member.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 90, duration: 500 } }"
            class="group flex flex-col rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover hover:border-brand-primary/20 transition-all duration-300 overflow-hidden"
          >
            <!-- Photo -->
            <div class="relative aspect-square overflow-hidden bg-brand-surface">
              <NuxtImg
                v-if="member.avatar_url"
                :src="member.avatar_url"
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="50vw sm:33vw lg:280px"
                format="webp"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-primary/20 to-brand-purple/20">
                <Icon name="mdi:account-circle-outline" class="w-20 h-20 text-brand-text-muted/40" />
              </div>

              <!-- Overlay + socials on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <a
                  v-for="(url, platform) in member.socials"
                  :key="platform"
                  :href="url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="String(platform)"
                  class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-primary hover:scale-110 transition-all duration-150"
                >
                  <Icon
                    :name="platform === 'linkedin' ? 'mdi:linkedin' : platform === 'github' ? 'mdi:github' : platform === 'twitter' ? 'mdi:twitter' : 'mdi:facebook'"
                    class="w-4 h-4"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-0.5">{{ member.name }}</h3>
              <p class="text-xs font-semibold text-brand-orange mb-2 uppercase tracking-wide">{{ member.position }}</p>
              <p v-if="member.bio" class="text-xs text-brand-text-secondary leading-relaxed">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT INFO ───────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Contact Information">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          <div class="lg:col-span-2">
            <SectionBadge icon="mdi:map-marker-outline" color="orange" class="mb-5">{{ $t('aboutPage.contact.badge') }}</SectionBadge>
            <h2 class="text-brand-text-primary mt-4 mb-4">
              {{ $t('aboutPage.contact.heading') }}
              <span class="gradient-text"> {{ $t('aboutPage.contact.headingHighlight') }}</span>
            </h2>
            <p class="text-brand-text-secondary mb-8 leading-relaxed">{{ $t('aboutPage.contact.subheading') }}</p>

            <div>
              <p class="text-xs text-brand-text-muted uppercase tracking-widest font-semibold mb-4">{{ $t('aboutPage.contact.followUs') }}</p>
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="social in socials"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-border text-brand-text-secondary text-xs font-semibold transition-all duration-200"
                  :class="social.color"
                >
                  <Icon :name="social.icon" class="w-4 h-4" aria-hidden="true" />
                  {{ social.handle }}
                </a>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(detail, i) in contactDetails"
              :key="detail.key"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 70, duration: 450 } }"
              class="group flex items-start gap-4 p-4 rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-250"
              :class="{
                'hover:border-brand-orange/30': detail.color === 'orange',
                'hover:border-brand-purple/30': detail.color === 'purple',
                'hover:border-brand-cyan/30':   detail.color === 'cyan',
              }"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-250 group-hover:scale-110"
                :class="iconContactBg[detail.color]"
              >
                <Icon :name="detail.icon" class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="min-w-0">
                <p class="text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold mb-0.5">{{ $t(`aboutPage.contact.${detail.key}.label`) }}</p>
                <a
                  v-if="detail.href"
                  :href="detail.href"
                  :target="detail.external ? '_blank' : undefined"
                  :rel="detail.external ? 'noopener noreferrer' : undefined"
                  class="text-sm font-medium text-brand-text-primary hover:text-brand-primary transition-colors duration-150 break-words"
                >
                  {{ $t(`aboutPage.contact.${detail.key}.value`) }}
                </a>
                <p v-else class="text-sm font-medium text-brand-text-primary">{{ $t(`aboutPage.contact.${detail.key}.value`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────── -->
    <CtaSection
      :title="$t('aboutPage.cta.title')"
      :subtitle="$t('aboutPage.cta.subtitle')"
      :primary-label="$t('aboutPage.cta.primary')"
      primary-to="/contact"
      :secondary-label="$t('aboutPage.cta.secondary')"
      secondary-to="/portfolio"
    />

  </div>
</template>
