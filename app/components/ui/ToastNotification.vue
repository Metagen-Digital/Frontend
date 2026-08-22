<script setup lang="ts">
const { toasts, removeToast } = useToast()

const iconMap = {
  success: 'mdi:check-circle',
  error:   'mdi:alert-circle',
  warning: 'mdi:alert',
  info:    'mdi:information',
}

const colorMap = {
  success: 'border-brand-success text-brand-success-text',
  error:   'border-brand-error text-brand-error-text',
  warning: 'border-brand-warning text-brand-warning-text',
  info:    'border-brand-cyan text-brand-cyan-text',
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-6 right-6 z-[400] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-250 ease-spring"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        leave-active-class="transition-all duration-250 ease-spring"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 min-w-64 max-w-sm px-4 py-3 bg-brand-surface border rounded-card shadow-card"
          :class="colorMap[toast.type]"
          role="alert"
        >
          <Icon :name="iconMap[toast.type]" class="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white">{{ toast.title }}</p>
            <p v-if="toast.message" class="text-xs text-brand-text-secondary mt-0.5">{{ toast.message }}</p>
          </div>
          <button
            class="text-brand-text-muted hover:text-white transition-colors duration-150 flex-shrink-0"
            :aria-label="`Dismiss ${toast.title} notification`"
            @click="removeToast(toast.id)"
          >
            <Icon name="mdi:close" class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
