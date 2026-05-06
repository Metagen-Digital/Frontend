<script setup lang="ts">
const { t } = useI18n()
const { post } = useApi()

const email           = ref('')
const status          = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message         = ref('')

async function subscribe() {
  const val = email.value.trim()
  if (!val) return
  status.value = 'loading'
  try {
    const res = await post('/newsletter/subscribe', { email: val })
    if (res.success) {
      status.value = 'success'
      message.value = t('footer.newsletter.success')
      email.value = ''
    }
  } catch (err: any) {
    status.value = 'error'
    message.value = err?.status === 400
      ? t('footer.newsletter.alreadySubscribed')
      : t('footer.newsletter.error')
  }
}
</script>

<template>
  <section
    class="relative overflow-hidden"
    style="background: linear-gradient(135deg, #1b2761 0%, #303c8e 55%, #2d3c93 100%)"
    aria-label="Newsletter subscription"
  >
    <!-- Subtle orb accents -->
    <div
      class="absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-15"
      style="background: radial-gradient(circle, #7C3AED, transparent)"
      aria-hidden="true"
    />
    <div
      class="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-10"
      style="background: radial-gradient(circle, #0EA5E9, transparent)"
      aria-hidden="true"
    />

    <div class="container-content relative z-10 py-10 md:py-12">
      <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">

        <!-- Left: copy -->
        <div class="flex-1 text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75" />
              <span class="relative inline-flex w-2 h-2 rounded-full bg-brand-success" />
            </span>
            <span class="text-xs font-semibold uppercase tracking-widest text-white/60">
              {{ $t('newsletterSection.badge') }}
            </span>
          </div>
          <p class="text-white font-display font-bold text-xl md:text-2xl leading-snug mb-1">
            {{ $t('footer.newsletter.title') }}
          </p>
          <p class="text-white/60 text-sm">{{ $t('footer.newsletter.subtitle') }}</p>
        </div>

        <!-- Center: trust pills — hidden on small screens -->
        <div class="hidden xl:flex items-center gap-5 text-xs text-white/50 flex-shrink-0">
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:shield-check-outline" class="w-3.5 h-3.5 text-brand-success" aria-hidden="true" />
            {{ $t('newsletterSection.noSpam') }}
          </span>
          <span class="w-px h-3 bg-white/20" />
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:email-check-outline" class="w-3.5 h-3.5 text-brand-cyan" aria-hidden="true" />
            {{ $t('newsletterSection.weeklyOnly') }}
          </span>
          <span class="w-px h-3 bg-white/20" />
          <span class="flex items-center gap-1.5">
            <Icon name="mdi:account-group-outline" class="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
            {{ $t('newsletterSection.joinCount') }}
          </span>
        </div>

        <!-- Right: form -->
        <div class="w-full md:w-auto md:flex-shrink-0">
          <!-- Success state -->
          <div
            v-if="status === 'success'"
            class="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-brand-success/15 border border-brand-success/30 text-brand-success text-sm font-semibold"
          >
            <Icon name="mdi:check-circle" class="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {{ message }}
          </div>

          <!-- Form state -->
          <div v-else>
            <form class="flex gap-2" @submit.prevent="subscribe">
              <div class="relative">
                <Icon
                  name="mdi:email-outline"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  v-model="email"
                  type="email"
                  :placeholder="$t('footer.newsletter.placeholder')"
                  required
                  class="w-60 sm:w-72 pl-10 pr-4 py-2.5 rounded-btn text-sm text-brand-text-primary bg-white outline-none focus:ring-2 focus:ring-white/40 placeholder:text-brand-text-muted"
                />
              </div>
              <button
                type="submit"
                :disabled="status === 'loading'"
                class="px-5 py-2.5 rounded-btn bg-brand-orange text-white text-sm font-bold hover:bg-brand-orange/90 active:scale-95 transition-all duration-150 disabled:opacity-60 whitespace-nowrap flex items-center gap-1.5"
              >
                <Icon v-if="status === 'loading'" name="mdi:loading" class="w-4 h-4 animate-spin" aria-hidden="true" />
                <template v-else>
                  {{ $t('footer.newsletter.subscribe') }}
                  <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" aria-hidden="true" />
                </template>
              </button>
            </form>

            <p v-if="status === 'error'" class="mt-1.5 text-xs text-red-300 flex items-center gap-1">
              <Icon name="mdi:alert-circle-outline" class="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {{ message }}
            </p>
            <p v-else class="mt-1.5 text-[11px] text-white/35">
              {{ $t('newsletterSection.privacyNote') }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
