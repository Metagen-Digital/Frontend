<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>()

useSeoMeta({ title: `${props.error.statusCode} | MetaGenDigital`, robots: 'noindex' })
</script>

<template>
  <div class="min-h-dvh flex items-center justify-center py-24">
    <div class="container-content text-center max-w-lg">
      <div class="font-display font-extrabold text-8xl md:text-9xl gradient-text mb-4" aria-hidden="true">
        {{ error.statusCode }}
      </div>

      <h1 class="text-white text-3xl mb-3">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-brand-text-secondary mb-10">
        {{ error.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : "An unexpected error occurred. Please try again later." }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GradientButton to="/" icon="mdi:home">Go Home</GradientButton>
        <GradientButton to="/services" variant="ghost">Our Services</GradientButton>
        <GradientButton to="/contact" variant="ghost">Contact Us</GradientButton>
      </div>
    </div>
  </div>
</template>
