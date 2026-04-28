<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: 'Thank You | MetaGenDigital',
  robots: 'noindex',
})
</script>

<template>
  <div class="min-h-dvh flex items-center justify-center py-24">
    <div class="container-content text-center max-w-lg">
      <div class="w-20 h-20 flex items-center justify-center bg-brand-success/10 border border-brand-success/30 rounded-full mx-auto mb-6">
        <Icon name="mdi:check-circle" class="w-10 h-10 text-brand-success" aria-hidden="true" />
      </div>

      <h1 class="text-white mb-3">{{ $t('thankYouPage.title') }}</h1>
      <p class="text-brand-text-muted text-sm mb-10">{{ $t('thankYouPage.subtitle') }}</p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GradientButton to="/" icon="mdi:home">{{ $t('thankYouPage.back') }}</GradientButton>
        <GradientButton to="/portfolio" variant="ghost">{{ $t('portfolioPage.badge') }}</GradientButton>
      </div>
    </div>
  </div>
</template>
