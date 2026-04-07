<script setup lang="ts">
useSeoMeta({
  title: 'About Us | MetaGenDigital',
  description: 'Learn about MetaGenDigital — our story, team, values, and mission to help businesses grow online.',
})
</script>

<template>
  <div>
    <!-- Page hero -->
    <section class="pt-32 pb-16 bg-brand-surface border-b border-brand-border relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'About Us' }]" class="mb-6" />
        <SectionBadge icon="mdi:information-outline" color="primary" class="mb-5">About Us</SectionBadge>
        <h1 class="text-brand-text-primary mb-4 mt-4">About <span class="gradient-text">MetaGenDigital</span></h1>
        <p class="text-brand-text-secondary text-lg max-w-2xl">
          Your trusted growth partner for digital marketing, web development, and creative content.
        </p>
      </div>
    </section>

    <!-- Content coming in Phase 3 -->
    <section class="section-padding">
      <div class="container-content">
        <p class="text-brand-text-muted text-center">Page content coming soon.</p>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
