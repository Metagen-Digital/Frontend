<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: 'minimal',
})

useSeoMeta({
  title: 'Set a new password | MetaGenDigital',
  description: 'Choose a new password for your MetaGenDigital account.',
  robots: 'noindex, nofollow',
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string
const route = useRoute()
const localePath = useLocalePath()

const token = String(route.query.token || '')
const email = ref(String(route.query.email || ''))
const password = ref('')
const passwordConfirmation = ref('')
const showPw = ref(false)

const loading = ref(false)
const done = ref(false)
const errors = ref<Record<string, string[]>>({})
const generalError = ref('')

const invalidLink = computed(() => !token || !email.value)

async function handleSubmit() {
  errors.value = {}
  generalError.value = ''
  loading.value = true
  try {
    await $fetch(`${apiBase}/auth/reset-password`, {
      method: 'POST',
      body: {
        token,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
      headers: { Accept: 'application/json' },
    })
    done.value = true
  } catch (e: any) {
    if (e?.data?.errors) errors.value = e.data.errors
    else generalError.value = e?.data?.message || 'Reset failed. The link may have expired — request a new one.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-brand-bg px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand shadow-glow-primary mb-4">
          <Icon name="mdi:lock-reset" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-brand-text-primary font-display">Set a new password</h1>
        <p class="mt-1 text-sm text-brand-text-secondary">Choose a strong password for your account</p>
      </div>

      <div class="bg-white rounded-2xl shadow-card border border-brand-border p-8">
        <!-- Invalid link -->
        <div v-if="invalidLink" class="text-center py-4 space-y-3">
          <Icon name="mdi:link-off" class="w-12 h-12 text-red-400 mx-auto" />
          <p class="text-sm font-semibold text-brand-text-primary">Invalid or incomplete link</p>
          <p class="text-xs text-brand-text-secondary">Please request a new password reset link.</p>
          <NuxtLink :to="localePath('/auth/forgot-password')" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline mt-2">
            <Icon name="mdi:arrow-left" class="w-4 h-4" /> Request new link
          </NuxtLink>
        </div>

        <!-- Success -->
        <div v-else-if="done" class="text-center py-4 space-y-3">
          <Icon name="mdi:check-circle-outline" class="w-12 h-12 text-green-500 mx-auto" />
          <p class="text-sm font-semibold text-brand-text-primary">Password updated</p>
          <p class="text-xs text-brand-text-secondary">Your password has been reset. You can now sign in.</p>
          <NuxtLink :to="localePath('/auth/login')" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline mt-2">
            <Icon name="mdi:arrow-right" class="w-4 h-4" /> Go to Sign In
          </NuxtLink>
        </div>

        <!-- Form -->
        <form v-else class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Email address</label>
            <input
              v-model="email" type="email" required autocomplete="email"
              class="w-full px-4 py-2.5 rounded-lg border border-brand-border focus:border-brand-primary text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">New password</label>
            <div class="relative">
              <input
                v-model="password" :type="showPw ? 'text' : 'password'" required minlength="8" autocomplete="new-password"
                placeholder="At least 8 characters"
                class="w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
                :class="errors.password ? 'border-red-400 bg-red-50' : 'border-brand-border focus:border-brand-primary'"
              />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-secondary" @click="showPw = !showPw">
                <Icon :name="showPw ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Confirm password</label>
            <input
              v-model="passwordConfirmation" :type="showPw ? 'text' : 'password'" required autocomplete="new-password"
              placeholder="Re-enter your password"
              class="w-full px-4 py-2.5 rounded-lg border border-brand-border focus:border-brand-primary text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <p v-if="generalError" class="text-xs text-red-500">{{ generalError }}</p>

          <button
            type="submit" :disabled="loading"
            class="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.99] transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon v-if="loading" name="mdi:loading" class="w-4 h-4 animate-spin" />
            <span>{{ loading ? 'Updating…' : 'Reset password' }}</span>
          </button>

          <p class="text-center text-sm text-brand-text-secondary">
            <NuxtLink :to="localePath('/auth/login')" class="font-semibold text-brand-primary hover:underline">Back to Sign In</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
