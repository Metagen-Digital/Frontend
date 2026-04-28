<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()

const siteUrl = computed(() => (config.public.siteUrl as string) || 'https://metagendigital.com')

useHead(computed(() => ({
  htmlAttrs: {
    lang: locale.value === 'bn' ? 'bn' : 'en',
  },
  link: [
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${siteUrl.value}${route.path.replace(/^\/bn/, '') || '/'}`,
    },
    {
      rel: 'alternate',
      hreflang: 'bn',
      href: `${siteUrl.value}/bn${route.path.replace(/^\/bn/, '') || '/'}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl.value}${route.path.replace(/^\/bn/, '') || '/'}`,
    },
  ],
})))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
