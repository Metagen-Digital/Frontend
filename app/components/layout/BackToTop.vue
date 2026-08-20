<script setup lang="ts">
const { t } = useI18n()
const { y: scrollY } = useWindowScroll()
const visible = computed(() => scrollY.value > 300)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-250 ease-spring"
    enter-from-class="opacity-0 translate-y-4"
    leave-active-class="transition-all duration-250 ease-spring"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="visible"
      class="fixed bottom-6 left-6 z-[100] w-11 h-11 flex items-center justify-center bg-brand-orange rounded-btn shadow-glow-orange hover:scale-110 hover:shadow-glow-orange transition-all duration-250 ease-spring"
      :aria-label="t('backToTop.ariaLabel')"
      @click="scrollToTop"
    >
      <Icon name="mdi:chevron-up" class="w-5 h-5 text-white" aria-hidden="true" />
    </button>
  </Transition>
</template>
