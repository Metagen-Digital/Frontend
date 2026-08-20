<script setup lang="ts">
const { t } = useI18n()

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

function close() {
  emit('update:modelValue', false)
}

// Close on Escape key
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) close()
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})

// Prevent scroll
watch(() => props.modelValue, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-250"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-250"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        role="dialog"
        :aria-modal="true"
        :aria-label="title"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition-all duration-250 ease-spring"
          enter-from-class="opacity-0 scale-95"
          leave-active-class="transition-all duration-250 ease-spring"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            class="relative w-full bg-brand-surface border border-brand-border rounded-card shadow-card-hover overflow-hidden"
            :class="sizeClasses[size]"
          >
            <!-- Header -->
            <div v-if="title || $slots.header" class="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <slot name="header">
                <h2 class="text-lg font-semibold text-white">{{ title }}</h2>
              </slot>
              <button
                class="p-1.5 text-brand-text-muted hover:text-white transition-colors duration-150 rounded-md"
                :aria-label="t('baseModal.closeModal')"
                @click="close"
              >
                <Icon name="mdi:close" class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-brand-border">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
