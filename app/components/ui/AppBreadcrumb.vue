<script setup lang="ts">
const { t } = useI18n()

interface Crumb {
  label: string
  to?: string
}

interface Props {
  crumbs: Crumb[]
}

defineProps<Props>()
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
