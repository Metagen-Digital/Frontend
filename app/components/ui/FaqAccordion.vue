<script setup lang="ts">
interface FaqItem {
  question: string
  answer: string
}

interface Props {
  items: FaqItem[]
}

defineProps<Props>()

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="border border-brand-border rounded-card overflow-hidden transition-all duration-250"
      :class="openIndex === i ? 'border-brand-orange/40' : ''"
    >
      <button
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-white hover:text-brand-orange transition-colors duration-150"
        :aria-expanded="openIndex === i"
        @click="toggle(i)"
      >
        <span>{{ item.question }}</span>
        <Icon
          name="mdi:chevron-down"
          class="w-5 h-5 flex-shrink-0 text-brand-text-secondary transition-transform duration-250"
          :class="openIndex === i ? 'rotate-180' : ''"
          aria-hidden="true"
        />
      </button>

      <Transition
        enter-active-class="transition-all duration-250 ease-in-out overflow-hidden"
        leave-active-class="transition-all duration-250 ease-in-out overflow-hidden"
      >
        <div v-if="openIndex === i" class="px-5 pb-4">
          <p class="text-sm text-brand-text-secondary leading-relaxed">{{ item.answer }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
