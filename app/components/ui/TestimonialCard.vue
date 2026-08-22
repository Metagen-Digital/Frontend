<script setup lang="ts">
interface Props {
  name: string
  company: string
  avatar?: string
  rating?: number
  quote: string
}

const props = withDefaults(defineProps<Props>(), {
  rating: 5,
})
</script>

<template>
  <div class="card-base p-6 flex flex-col gap-4 min-w-72 max-w-sm flex-shrink-0">
    <!-- Stars -->
    <div class="flex items-center gap-0.5" role="img" :aria-label="`${rating} out of 5 stars`">
      <Icon
        v-for="i in 5"
        :key="i"
        name="mdi:star"
        class="w-4 h-4"
        :class="i <= rating ? 'text-brand-warning' : 'text-brand-border'"
        aria-hidden="true"
      />
    </div>

    <!-- Quote -->
    <blockquote class="text-sm text-brand-text-secondary leading-relaxed flex-1">
      "{{ quote }}"
    </blockquote>

    <!-- Author -->
    <div class="flex items-center gap-3 pt-2 border-t border-brand-border">
      <div class="w-10 h-10 rounded-full bg-brand-surface border border-brand-border overflow-hidden flex-shrink-0">
        <NuxtImg
          v-if="avatar"
          :src="avatar"
          :alt="name"
          class="w-full h-full object-cover"
          loading="lazy"
          format="webp"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-brand-orange font-bold text-sm bg-orange-50">
          {{ name.charAt(0) }}
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold text-brand-text-primary">{{ name }}</p>
        <p class="text-xs text-brand-text-muted">{{ company }}</p>
      </div>
    </div>
  </div>
</template>
