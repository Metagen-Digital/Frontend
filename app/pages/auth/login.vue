<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'minimal',
})

const { t } = useI18n()
useSeoMeta({
  title: computed(() => t('auth.login.metaTitle')),
  description: computed(() => t('auth.login.metaDescription')),
  robots: 'noindex, nofollow',
})

const { login, loading } = useAuth()
const localePath = useLocalePath()

const form = reactive({ email: '', password: '' })
const errors = ref<Record<string, string[]>>({})
const showPassword = ref(false)

async function handleSubmit() {
  errors.value = {}
  const result = await login(form.email, form.password)
  if (!result.success) {
    errors.value = result.errors
  } else {
    await navigateTo(localePath('/dashboard'))
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-brand-surface via-white to-[#eef0ff]">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand shadow-glow-primary mb-4">
          <Icon name="mdi:account-lock" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-brand-text-primary font-display">{{ t('auth.login.heading') }}</h1>
        <p class="mt-1 text-sm text-brand-text-secondary">{{ t('auth.login.subheading') }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-card border border-brand-border p-8">
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">
              {{ t('auth.shared.emailAddress') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-brand-primary/20"
              :class="errors.email ? 'border-red-400 bg-red-50' : 'border-brand-border focus:border-brand-primary'"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email[0] }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-sm font-semibold text-brand-text-primary">{{ t('auth.shared.password') }}</label>
              <NuxtLink :to="localePath('/auth/forgot-password')" class="text-xs text-brand-primary hover:underline">
                {{ t('auth.login.forgotPassword') }}
              </NuxtLink>
            </div>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-brand-primary/20 pr-10"
                :class="errors.password ? 'border-red-400 bg-red-50' : 'border-brand-border focus:border-brand-primary'"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-primary transition-colors"
                @click="showPassword = !showPassword"
              >
                <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password[0] }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.99] transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon v-if="loading" name="mdi:loading" class="w-4 h-4 animate-spin" />
            <span>{{ loading ? t('auth.login.submitLoading') : t('auth.login.submitIdle') }}</span>
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-brand-text-secondary">
          {{ t('auth.login.noAccount') }}
          <NuxtLink :to="localePath('/auth/register')" class="font-semibold text-brand-primary hover:underline">
            {{ t('auth.login.createOne') }}
          </NuxtLink>
        </p>
      </div>

      <p class="mt-4 text-center text-xs text-brand-text-muted">
        {{ t('auth.login.crossPortal') }}
        <a href="https://hosting.metagendigital.com/auth/login" class="text-brand-primary hover:underline">
          {{ t('auth.login.hostingPortal') }}
        </a>
      </p>
    </div>
  </div>
</template>
