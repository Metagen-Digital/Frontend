<script setup lang="ts">
const { t } = useI18n()

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:currentPage': [page: number] }>()

const pages = computed(() => {
  const range: (number | '...')[] = []
  const delta = 2
  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || (i >= props.currentPage - delta && i <= props.currentPage + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
})

function go(page: number | '...') {
  if (typeof page === 'number') emit('update:currentPage', page)
}
</script>

<template>
  <nav class="flex items-center justify-center gap-2" :aria-label="t('basePagination.ariaLabel')">
    <button
      class="w-9 h-9 flex items-center justify-center rounded-btn border border-brand-border text-brand-text-secondary hover:border-brand-orange hover:text-brand-orange transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="currentPage <= 1"
      :aria-label="t('basePagination.previousPage')"
      @click="go(currentPage - 1)"
    >
      <Icon name="mdi:chevron-left" class="w-5 h-5" aria-hidden="true" />
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="min-w-9 h-9 px-2 flex items-center justify-center rounded-btn border text-sm font-medium transition-all duration-150"
      :class="page === currentPage
        ? 'bg-brand-orange border-brand-orange text-white'
        : page === '...'
          ? 'border-transparent text-brand-text-muted cursor-default'
          : 'border-brand-border text-brand-text-secondary hover:border-brand-orange hover:text-brand-orange'"
      :aria-label="page === '...' ? t('basePagination.morePages') : t('basePagination.page', { n: page })"
      :aria-current="page === currentPage ? 'page' : undefined"
      :disabled="page === '...'"
      @click="go(page)"
    >
      {{ page }}
    </button>

    <button
      class="w-9 h-9 flex items-center justify-center rounded-btn border border-brand-border text-brand-text-secondary hover:border-brand-orange hover:text-brand-orange transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="currentPage >= totalPages"
      :aria-label="t('basePagination.nextPage')"
      @click="go(currentPage + 1)"
    >
      <Icon name="mdi:chevron-right" class="w-5 h-5" aria-hidden="true" />
    </button>
  </nav>
</template>
