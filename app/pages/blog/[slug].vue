<script setup lang="ts">
definePageMeta({ layout: 'minimal' })

const route = useRoute()

// Reading progress bar
const progress = ref(0)

onMounted(() => {
  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
  }
  window.addEventListener('scroll', updateProgress, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', updateProgress))
})

useSeoMeta({
  title: computed(() => `Blog | MetaGenDigital`),
})
</script>

<template>
  <div>
    <!-- Reading progress bar -->
    <div
      class="fixed top-0 left-0 z-[500] h-0.5 bg-brand-orange transition-all duration-100"
      :style="{ width: `${progress}%` }"
      aria-hidden="true"
    />

    <article class="pt-16 pb-24">
      <div class="container-content max-w-3xl">
        <AppBreadcrumb :crumbs="[{ label: 'Blog', to: '/blog' }, { label: 'Article' }]" class="mb-8" />
        <p class="text-brand-text-muted text-center py-16">
          Blog post content will be loaded via Nuxt Content in Phase 4.
        </p>
        <GradientButton to="/blog" variant="ghost" icon="mdi:arrow-left">Back to Blog</GradientButton>
      </div>
    </article>
  </div>
</template>
