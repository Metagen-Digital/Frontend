<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: string
  iconRight?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const variantClasses = {
  primary:   'bg-gradient-brand text-white hover:shadow-glow-primary',
  secondary: 'bg-gradient-cyan text-white hover:shadow-glow-cyan',
  ghost:     'bg-transparent text-brand-primary border border-brand-border hover:border-brand-primary hover:bg-brand-surface',
  outline:   'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white',
}

const baseClasses = computed(() =>
  [
    'inline-flex items-center justify-center font-semibold rounded-btn',
    'transition-all duration-250 ease-spring',
    'hover:scale-105 active:scale-95',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2',
    sizeClasses[props.size],
    variantClasses[props.variant],
  ].join(' ')
)
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="baseClasses">
    <Icon v-if="icon" :name="icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
    <slot />
    <Icon v-if="iconRight" :name="iconRight" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
  </NuxtLink>

  <a v-else-if="href" :href="href" target="_blank" rel="noopener noreferrer" :class="baseClasses">
    <Icon v-if="icon" :name="icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
    <slot />
    <Icon v-if="iconRight" :name="iconRight" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    :class="baseClasses"
  >
    <svg
      v-if="loading"
      class="w-4 h-4 animate-spin flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <Icon v-if="icon && !loading" :name="icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
    <slot />
    <Icon v-if="iconRight && !loading" :name="iconRight" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
  </button>
</template>
