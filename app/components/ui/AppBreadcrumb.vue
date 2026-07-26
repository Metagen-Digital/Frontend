<script setup lang="ts">
const { t } = useI18n()

interface Crumb {
  label: string
  to?: string
}

interface Props {
  crumbs: Crumb[]
}

const props = defineProps<Props>()

// BreadcrumbList structured data, emitted wherever this component renders.
// Google draws the breadcrumb trail in place of the raw URL in results, which
// lifts CTR — and it costs nothing beyond the crumbs already being passed in.
const config = useRuntimeConfig()
const localePath = useLocalePath()
const siteUrl = (config.public.siteUrl as string) || 'https://metagendigital.com'

const absolute = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

const breadcrumbJsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: t('nav.home'), item: absolute(localePath('/')) },
    ...props.crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: crumb.label,
      // The last crumb is the current page: schema.org wants it without an
      // item URL, so only linked ancestors carry one.
      ...(crumb.to && i < props.crumbs.length - 1 ? { item: absolute(crumb.to) } : {}),
    })),
  ],
}))

useHead({
  script: [{
    key: 'ld-breadcrumb',
    type: 'application/ld+json',
    innerHTML: breadcrumbJsonLd,
  }],
})
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-brand-text-muted flex-wrap">
      <li>
        <NuxtLink to="/" class="hover:text-brand-orange transition-colors duration-150 flex items-center gap-1">
          <Icon name="mdi:home" class="w-4 h-4" aria-hidden="true" />
          <span>{{ t('nav.home') }}</span>
        </NuxtLink>
      </li>
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center gap-2">
        <Icon name="mdi:chevron-right" class="w-4 h-4" aria-hidden="true" />
        <NuxtLink
          v-if="crumb.to && i < crumbs.length - 1"
          :to="crumb.to"
          class="hover:text-brand-orange transition-colors duration-150"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-brand-text-secondary" aria-current="page">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
