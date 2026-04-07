<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: computed(() => `Case Study: ${route.params.slug} | MetaGenDigital`),
})
</script>

<template>
  <div>
    <section class="pt-32 pb-16">
      <div class="container-content">
        <AppBreadcrumb :crumbs="[{ label: 'Portfolio', to: '/portfolio' }, { label: 'Case Study' }]" class="mb-6" />
        <h1 class="text-white mb-4">Case Study</h1>
        <p class="text-brand-text-muted">Full case study content coming in Phase 3.</p>
        <GradientButton to="/portfolio" variant="ghost" icon="mdi:arrow-left" class="mt-6">
          Back to Portfolio
        </GradientButton>
      </div>
    </section>
  </div>
</template>
