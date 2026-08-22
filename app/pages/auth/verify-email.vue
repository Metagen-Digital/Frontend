<script setup lang="ts">
// Landing page for the confirmation link in the verification email.
//
// The link itself points at the SIGNED backend route, which does the verifying
// and then redirects here with ?status=. That keeps the signature bound to the
// URL it was generated for — reconstructing a valid one on this host would be
// fragile — and still lands the person on a real page rather than raw JSON.
definePageMeta({
  layout: 'minimal',
})

useSeoMeta({
  title: 'Confirm your email | MetaGenDigital',
  description: 'Confirm your MetaGenDigital email address.',
  robots: 'noindex, nofollow',
})

const route = useRoute()
const localePath = useLocalePath()
const { apiFetch } = useApiClient()
const { user, fetchUser } = useAuth()

type Status = 'success' | 'already' | 'invalid' | 'pending'

const status = computed<Status>(() => {
  const value = route.query.status as string
  return (['success', 'already', 'invalid'] as const).includes(value as never)
    ? (value as Status)
    : 'pending'
})

const COPY: Record<Status, { icon: string; tone: string; title: string; body: string }> = {
  success: {
    icon: 'mdi:email-check-outline',
    tone: 'text-brand-success-text',
    title: 'Email confirmed',
    body: 'Your address is verified. Your invoices and hosting orders are now available in your dashboard.',
  },
  already: {
    icon: 'mdi:check-circle-outline',
    tone: 'text-brand-primary',
    title: 'Already confirmed',
    body: 'This address was confirmed previously — there is nothing left to do.',
  },
  invalid: {
    icon: 'mdi:link-variant-off',
    tone: 'text-brand-error-text',
    title: 'This link is no longer valid',
    body: 'Confirmation links expire after an hour and can only be used once. Request a fresh one below.',
  },
  pending: {
    icon: 'mdi:email-outline',
    tone: 'text-brand-primary',
    title: 'Confirm your email address',
    body: 'We sent a confirmation link to your inbox. Open it to unlock your invoices and hosting orders.',
  },
}

const copy = computed(() => COPY[status.value])

// Resending needs a session — the endpoint resends for the signed-in account.
const resending = ref(false)
const resent = ref(false)
const resendError = ref('')

// The link is often opened in a different browser from the one the person
// registered in, so there may be no session here at all.
onMounted(() => {
  if (!user.value) fetchUser()
})

const canResend = computed(() => status.value !== 'success' && status.value !== 'already')

async function resend() {
  resendError.value = ''
  resending.value = true
  try {
    await apiFetch('/auth/email/resend', { method: 'POST' })
    resent.value = true
  }
  catch (e: any) {
    resendError.value = e?.status === 401
      ? 'Please sign in first, then request a new confirmation email.'
      : e?.data?.message || 'Could not send the email. Please try again in a moment.'
  }
  finally {
    resending.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-brand-surface via-white to-[#eef0ff]">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand shadow-glow-primary mb-4">
          <Icon name="mdi:email-fast-outline" class="w-7 h-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-brand-text-primary font-display">Email Confirmation</h1>
      </div>

      <div class="bg-white rounded-2xl shadow-card border border-brand-border p-8 text-center space-y-4">
        <Icon :name="copy.icon" class="w-12 h-12 mx-auto" :class="copy.tone" />

        <p class="text-sm font-semibold text-brand-text-primary">{{ copy.title }}</p>
        <p class="text-xs text-brand-text-secondary leading-relaxed">{{ copy.body }}</p>

        <div v-if="resent" class="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <p class="text-xs text-green-700">
            Sent. Check your inbox — and your spam folder.
          </p>
        </div>
        <p v-else-if="resendError" class="text-xs text-brand-error-text">{{ resendError }}</p>

        <button
          v-if="canResend && !resent"
          type="button"
          :disabled="resending"
          class="w-full py-2.5 rounded-lg bg-gradient-brand text-white text-sm font-semibold shadow-glow-primary transition-opacity disabled:opacity-60"
          @click="resend"
        >
          {{ resending ? 'Sending…' : 'Send a new confirmation email' }}
        </button>

        <NuxtLink
          :to="localePath(status === 'success' ? '/dashboard' : '/auth/login')"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
        >
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
          {{ status === 'success' ? 'Go to dashboard' : 'Back to Sign In' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
