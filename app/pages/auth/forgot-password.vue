<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'minimal',
})

const { t } = useI18n()
useSeoMeta({
  title: computed(() => t('auth.forgotPassword.metaTitle')),
  description: computed(() => t('auth.forgotPassword.metaDescription')),
  robots: 'noindex, nofollow',
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string
const localePath = useLocalePath()

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch(`${apiBase}/auth/forgot-password`, {
      method: 'POST',
      body: { email: email.value },
      headers: { Accept: 'application/json' },
    })
    sent.value = true
  } catch (e: any) {
    error.value = e?.data?.message || t('auth.forgotPassword.genericError')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-brand-surface via-white to-[#eef0ff]">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand shadow-glow-primary mb-4">
          <Icon name="mdi:lock-reset" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-brand-text-primary font-display">{{ t('auth.forgotPassword.heading') }}</h1>
        <p class="mt-1 text-sm text-brand-text-secondary">{{ t('auth.forgotPassword.subheading') }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-card border border-brand-border p-8">
        <!-- Success state -->
        <div v-if="sent" class="text-center py-4 space-y-3">
          <Icon name="mdi:email-check-outline" class="w-12 h-12 text-brand-success-text mx-auto" />
          <p class="text-sm font-semibold text-brand-text-primary">{{ t('auth.forgotPassword.checkInbox') }}</p>
          <p class="text-xs text-brand-text-secondary">
            {{ t('auth.forgotPassword.sentMessage', { email }) }}
          </p>
          <NuxtLink
            :to="localePath('/auth/login')"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline mt-2"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            {{ t('auth.forgotPassword.backToSignIn') }}
          </NuxtLink>
        </div>

        <!-- Form -->
        <form v-else class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">{{ t('auth.shared.emailAddress') }}</label>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-brand-primary/20"
              :class="error ? 'border-red-400 bg-red-50' : 'border-brand-border focus:border-brand-primary'"
            />
            <p v-if="error" class="mt-1 text-xs text-brand-error-text">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.99] transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon v-if="loading" name="mdi:loading" class="w-4 h-4 animate-spin" />
            <span>{{ loading ? t('auth.forgotPassword.submitLoading') : t('auth.forgotPassword.submitIdle') }}</span>
          </button>

          <p class="text-center text-sm text-brand-text-secondary">
            <NuxtLink :to="localePath('/auth/login')" class="font-semibold text-brand-primary hover:underline">
              {{ t('auth.forgotPassword.backToSignIn') }}
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
