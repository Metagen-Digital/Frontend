<script setup lang="ts">
useSeoMeta({
  title: 'Thank You | MetaGenDigital',
  robots: 'noindex',
})
</script>

<template>
  <div class="min-h-dvh flex items-center justify-center py-24">
    <div class="container-content text-center max-w-lg">
      <!-- Animated check -->
      <div class="w-20 h-20 flex items-center justify-center bg-brand-success/10 border border-brand-success/30 rounded-full mx-auto mb-6">
        <Icon name="mdi:check-circle" class="w-10 h-10 text-brand-success" aria-hidden="true" />
      </div>

      <h1 class="text-white mb-3">Message Received!</h1>
      <p class="text-brand-text-secondary text-lg mb-2">Thank you for reaching out.</p>
      <p class="text-brand-text-muted text-sm mb-10">
        We'll review your message and get back to you within <strong class="text-white">24 hours</strong>.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GradientButton to="/" icon="mdi:home">Return Home</GradientButton>
        <GradientButton to="/portfolio" variant="ghost">View Our Work</GradientButton>
      </div>
    </div>
  </div>
</template>
