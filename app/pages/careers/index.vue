<script setup lang="ts">
import type { CareerJobApiItem } from '~/types'

const { t } = useI18n()
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://metagendigital.com'

useSeoMeta({
  title: computed(() => t('careersPage.meta.title')),
  description: computed(() => t('careersPage.meta.description')),
  ogTitle: computed(() => t('careersPage.meta.title')),
  ogDescription: computed(() => t('careersPage.meta.ogDescription')),
  // Absolute — Facebook/LinkedIn crawlers do not resolve relative OG paths.
  ogImage: `${siteUrl}/og/careers.jpg`,
})

const { get } = useApi()

const { data: jobsResponse } = await get<CareerJobApiItem[]>('/career-jobs')
const { data: depsResponse } = await get<string[]>('/career-jobs/departments')

const allJobs = computed<CareerJobApiItem[]>(() => jobsResponse.value?.data ?? [])
const departments = computed<string[]>(() => ['All', ...(depsResponse.value?.data ?? [])])

// 'All' stays the internal filter VALUE (compared against activeFilter and
// department strings from the API); only the rendered label is translated.
function departmentLabel(dep: string) {
  return dep === 'All' ? t('careersPage.allDepartments') : dep
}

useCollectionJsonLd({
  name: computed(() => t('careersPage.breadcrumb')),
  description: computed(() => t('careersPage.collectionDescription')),
  items: () => allJobs.value.map(job => ({ name: job.title, url: `/careers/${job.slug}` })),
})

const activeFilter = ref('All')

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? allJobs.value
    : allJobs.value.filter(j => j.department === activeFilter.value),
)

const typeLabel = computed<Record<string, string>>(() => ({
  'full-time':  t('careersPage.jobType.full-time'),
  'part-time':  t('careersPage.jobType.part-time'),
  'contract':   t('careersPage.jobType.contract'),
  'internship': t('careersPage.jobType.internship'),
  'remote':     t('careersPage.jobType.remote'),
}))

const typeBadge: Record<string, string> = {
  'full-time':  'bg-green-50 text-green-700 border-green-200',
  'part-time':  'bg-sky-50 text-sky-700 border-sky-200',
  'contract':   'bg-amber-50 text-amber-700 border-amber-200',
  'internship': 'bg-violet-50 text-violet-700 border-violet-200',
  'remote':     'bg-teal-50 text-teal-700 border-teal-200',
}
</script>

<template>
  <div>
    <!-- ── HERO ──────────────────────────────────────────── -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-surface via-white to-brand-surface pointer-events-none" />
      <div class="absolute top-16 right-0 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: t('careersPage.breadcrumb') }]" class="mb-6" />
        <SectionBadge icon="mdi:briefcase-outline" class="mb-5">{{ t('careersPage.badge') }}</SectionBadge>

        <h1 class="text-brand-text-primary mb-4 max-w-2xl">
          {{ t('careersPage.heading') }} <span class="gradient-text">MetaGenDigital</span>
        </h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl leading-relaxed mb-10">
          {{ t('careersPage.subheading') }}
        </p>

        <div class="flex flex-wrap items-center gap-8">
          <div v-for="s in [
            { v: allJobs.length + '+', l: t('careersPage.statOpenPositions') },
            { v: t('careersPage.statRemote'),  l: t('careersPage.statFriendlyCulture') },
            { v: '100%',    l: t('careersPage.statGrowthFocused') },
          ]" :key="s.l" class="flex items-baseline gap-2">
            <span class="text-2xl font-black gradient-text font-display">{{ s.v }}</span>
            <span class="text-sm text-brand-text-secondary">{{ s.l }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── JOB LIST ──────────────────────────────────────── -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">

        <!-- Department filter tabs -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            v-for="dep in departments"
            :key="dep"
            class="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
            :class="activeFilter === dep
              ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
              : 'bg-white text-brand-text-secondary border-brand-border hover:border-brand-primary/40 hover:text-brand-primary'"
            @click="activeFilter = dep"
          >
            {{ departmentLabel(dep) }}
          </button>
        </div>

        <!-- No jobs -->
        <div v-if="filtered.length === 0" class="py-20 text-center text-brand-text-muted">
          <Icon name="mdi:briefcase-off-outline" class="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p class="text-lg font-medium">{{ t('careersPage.empty') }}</p>
          <p class="text-sm mt-1">{{ t('careersPage.emptyHint') }}</p>
        </div>

        <!-- Job cards -->
        <div v-else class="space-y-4">
          <NuxtLink
            v-for="job in filtered"
            :key="job.slug"
            :to="`/careers/${job.slug}`"
            class="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 rounded-2xl bg-white border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            <!-- Icon -->
            <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-brand-primary/10">
              <Icon name="mdi:briefcase-outline" class="w-6 h-6 text-brand-primary" />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h3 class="text-[16px] font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors duration-200">
                  {{ job.title }}
                </h3>
                <span v-if="job.is_featured" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-orange/10 text-brand-orange border border-brand-orange/20 uppercase tracking-wide">
                  {{ t('careersPage.featured') }}
                </span>
              </div>

              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-text-secondary">
                <span class="flex items-center gap-1">
                  <Icon name="mdi:office-building-outline" class="w-3.5 h-3.5" />
                  {{ job.department }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="mdi:map-marker-outline" class="w-3.5 h-3.5" />
                  {{ job.location }}
                </span>
                <span v-if="job.experience_level" class="flex items-center gap-1">
                  <Icon name="mdi:star-outline" class="w-3.5 h-3.5" />
                  {{ job.experience_level }}
                </span>
                <span v-if="job.salary_range" class="flex items-center gap-1 text-brand-primary font-medium">
                  <Icon name="mdi:currency-usd" class="w-3.5 h-3.5" />
                  {{ job.salary_range }}
                </span>
              </div>
            </div>

            <!-- Right: type badge + arrow -->
            <div class="flex items-center gap-3 flex-shrink-0">
              <span
                class="px-3 py-1 rounded-full text-[11px] font-bold border capitalize"
                :class="typeBadge[job.type] ?? 'bg-gray-50 text-gray-600 border-gray-200'"
              >
                {{ typeLabel[job.type] ?? job.type }}
              </span>
              <div class="w-8 h-8 rounded-xl bg-brand-surface flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all duration-200">
                <Icon name="mdi:arrow-right" class="w-4 h-4 text-brand-text-muted group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────── -->
    <CtaSection />
  </div>
</template>
