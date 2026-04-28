<script setup lang="ts">
import type { CareerJobApiDetail } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

const { get } = useApi()
const config = useRuntimeConfig()
const { locale } = useLocale()

const { data: jobResponse } = await get<CareerJobApiDetail>(`/career-jobs/${slug}`)
const job = computed(() => jobResponse.value?.data ?? null)

if (!job.value) {
  throw createError({ statusCode: 404, statusMessage: 'Job not found' })
}

useSeoMeta({
  title: computed(() => `${job.value?.title} | Careers | MetaGenDigital`),
  description: computed(() => job.value?.meta_description ?? job.value?.description ?? ''),
})

// ── Apply Form ───────────────────────────────────────────
const showForm = ref(false)
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  cover_letter: '',
  portfolio_url: '',
  linkedin_url: '',
  github_url: '',
  additional_info: '',
  resume: null as File | null,
})

const errors = reactive<Record<string, string>>({})

function validateForm() {
  Object.keys(errors).forEach(k => delete errors[k])
  let valid = true
  if (!form.first_name.trim()) { errors.first_name = 'First name is required'; valid = false }
  if (!form.last_name.trim())  { errors.last_name = 'Last name is required'; valid = false }
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Valid email is required'; valid = false }
  return valid
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  form.resume = input.files?.[0] ?? null
}

async function submitApplication() {
  if (!validateForm()) return
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const body = new FormData()
    body.append('first_name', form.first_name)
    body.append('last_name', form.last_name)
    body.append('email', form.email)
    if (form.phone)          body.append('phone', form.phone)
    if (form.cover_letter)   body.append('cover_letter', form.cover_letter)
    if (form.portfolio_url)  body.append('portfolio_url', form.portfolio_url)
    if (form.linkedin_url)   body.append('linkedin_url', form.linkedin_url)
    if (form.github_url)     body.append('github_url', form.github_url)
    if (form.additional_info) body.append('additional_info', form.additional_info)
    if (form.resume)         body.append('resume', form.resume)

    await $fetch(
      `${config.public.apiBase}/career-jobs/${slug}/apply?locale=${locale.value}`,
      { method: 'POST', body, headers: { Accept: 'application/json' } },
    )

    submitStatus.value = 'success'
    showForm.value = false
  }
  catch (err: any) {
    submitStatus.value = 'error'
    if (err?.status === 422) {
      const apiErrors = err?.data?.errors ?? {}
      Object.entries(apiErrors).forEach(([k, v]) => {
        errors[k] = (v as string[])[0] ?? ''
      })
      errorMessage.value = 'Please fix the errors below.'
    } else if (err?.data?.message) {
      errorMessage.value = err.data.message
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  }
  finally {
    isSubmitting.value = false
  }
}

const typeLabel: Record<string, string> = {
  'full-time': 'Full Time', 'part-time': 'Part Time',
  'contract': 'Contract', 'internship': 'Internship', 'remote': 'Remote',
}
</script>

<template>
  <div v-if="job" class="min-h-screen">

    <!-- ── HERO ──────────────────────────────────────────── -->
    <section class="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]">
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute -left-16 -bottom-8 w-72 h-72 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <div class="mb-8 opacity-80">
          <AppBreadcrumb :crumbs="[{ label: 'Careers', to: '/careers' }, { label: job.title }]" />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-start gap-10">
          <!-- Left -->
          <div class="flex-1">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Icon name="mdi:briefcase-outline" class="w-3.5 h-3.5" />
              Open Position
            </div>

            <h1 class="text-white leading-tight mb-4">{{ job.title }}</h1>

            <div class="flex flex-wrap gap-x-5 gap-y-2 text-white/75 text-sm mb-8">
              <span class="flex items-center gap-1.5">
                <Icon name="mdi:office-building-outline" class="w-4 h-4" />
                {{ job.department }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="mdi:map-marker-outline" class="w-4 h-4" />
                {{ job.location }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="mdi:clock-outline" class="w-4 h-4" />
                {{ typeLabel[job.type] ?? job.type }}
              </span>
              <span v-if="job.experience_level" class="flex items-center gap-1.5">
                <Icon name="mdi:star-outline" class="w-4 h-4" />
                {{ job.experience_level }}
              </span>
              <span v-if="job.salary_range" class="flex items-center gap-1.5 text-white font-semibold">
                <Icon name="mdi:currency-usd" class="w-4 h-4" />
                {{ job.salary_range }}
              </span>
            </div>

            <button
              class="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-semibold text-sm rounded-btn shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              @click="showForm = true; submitStatus = 'idle'"
            >
              Apply Now
              <Icon name="mdi:arrow-right" class="w-4 h-4" />
            </button>
          </div>

          <!-- Right: meta card -->
          <div class="w-full lg:w-64 flex-shrink-0">
            <div class="bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 p-5 space-y-4">
              <p class="text-white/50 text-[10px] font-bold uppercase tracking-widest">Job Details</p>
              <div v-for="item in [
                { icon: 'mdi:office-building-outline', label: 'Department', val: job.department },
                { icon: 'mdi:map-marker-outline',      label: 'Location',   val: job.location },
                { icon: 'mdi:clock-outline',           label: 'Type',       val: typeLabel[job.type] ?? job.type },
                { icon: 'mdi:star-outline',            label: 'Experience', val: job.experience_level },
                { icon: 'mdi:currency-usd',            label: 'Salary',     val: job.salary_range },
              ].filter(i => i.val)" :key="item.label" class="flex items-start gap-3">
                <Icon :name="item.icon" class="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-white/50 text-[10px] uppercase tracking-wide">{{ item.label }}</p>
                  <p class="text-white text-sm font-medium">{{ item.val }}</p>
                </div>
              </div>
              <div v-if="job.application_deadline" class="pt-3 border-t border-white/15">
                <p class="text-white/50 text-[10px] uppercase tracking-wide mb-1">Deadline</p>
                <p class="text-white text-sm font-semibold">
                  {{ new Date(job.application_deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTENT ────────────────────────────────────────── -->
    <section class="py-16 bg-white">
      <div class="container-content max-w-3xl">

        <!-- Success banner -->
        <div v-if="submitStatus === 'success'" class="mb-8 p-5 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
          <Icon name="mdi:check-circle-outline" class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-semibold text-green-800">Application submitted!</p>
            <p class="text-sm text-green-700 mt-0.5">Thank you for applying. We'll review your application and reach out within 5–7 business days.</p>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-10">
          <h2 class="text-brand-text-primary text-xl font-bold mb-4">About the Role</h2>
          <div class="prose prose-sm max-w-none text-brand-text-secondary leading-relaxed" v-html="job.description" />
        </div>

        <!-- Requirements -->
        <div v-if="job.requirements?.length" class="mb-10">
          <h2 class="text-brand-text-primary text-xl font-bold mb-4">Requirements</h2>
          <ul class="space-y-2.5">
            <li v-for="req in job.requirements" :key="req" class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="mdi:check-bold" class="w-3 h-3 text-brand-purple" />
              </div>
              <span class="text-sm text-brand-text-secondary leading-relaxed">{{ req }}</span>
            </li>
          </ul>
        </div>

        <!-- Responsibilities -->
        <div v-if="job.responsibilities?.length" class="mb-10">
          <h2 class="text-brand-text-primary text-xl font-bold mb-4">Responsibilities</h2>
          <ul class="space-y-2.5">
            <li v-for="res in job.responsibilities" :key="res" class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="mdi:arrow-right" class="w-3 h-3 text-brand-orange" />
              </div>
              <span class="text-sm text-brand-text-secondary leading-relaxed">{{ res }}</span>
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div v-if="job.benefits?.length" class="mb-10">
          <h2 class="text-brand-text-primary text-xl font-bold mb-4">Benefits</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div v-for="benefit in job.benefits" :key="benefit" class="flex items-center gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border">
              <Icon name="mdi:gift-outline" class="w-4 h-4 text-brand-purple flex-shrink-0" />
              <span class="text-sm text-brand-text-secondary">{{ benefit }}</span>
            </div>
          </div>
        </div>

        <!-- Apply CTA -->
        <div class="pt-6 border-t border-brand-border">
          <button
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-purple text-white font-semibold rounded-btn shadow-lg hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
            @click="showForm = true; submitStatus = 'idle'"
          >
            Apply for this Position
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- ── APPLY MODAL ────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showForm"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);"
        @click.self="showForm = false"
      >
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-brand-border px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h3 class="font-bold text-brand-text-primary text-lg">Apply for this Position</h3>
              <p class="text-sm text-brand-text-secondary">{{ job.title }}</p>
            </div>
            <button
              class="w-8 h-8 rounded-lg flex items-center justify-center text-brand-text-muted hover:bg-brand-surface hover:text-brand-text-primary transition-colors"
              @click="showForm = false"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <!-- Form -->
          <form class="p-6 space-y-5" @submit.prevent="submitApplication">

            <!-- Error banner -->
            <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {{ errorMessage }}
            </div>

            <!-- Name row -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">First Name <span class="text-red-500">*</span></label>
                <input
                  v-model="form.first_name"
                  type="text"
                  placeholder="John"
                  class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-brand-purple"
                  :class="errors.first_name ? 'border-red-400 bg-red-50' : 'border-brand-border bg-white'"
                />
                <p v-if="errors.first_name" class="text-xs text-red-500 mt-1">{{ errors.first_name }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Last Name <span class="text-red-500">*</span></label>
                <input
                  v-model="form.last_name"
                  type="text"
                  placeholder="Doe"
                  class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-brand-purple"
                  :class="errors.last_name ? 'border-red-400 bg-red-50' : 'border-brand-border bg-white'"
                />
                <p v-if="errors.last_name" class="text-xs text-red-500 mt-1">{{ errors.last_name }}</p>
              </div>
            </div>

            <!-- Email + Phone -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  class="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-brand-purple"
                  :class="errors.email ? 'border-red-400 bg-red-50' : 'border-brand-border bg-white'"
                />
                <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Phone <span class="text-brand-text-muted font-normal">(optional)</span></label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+880 1700-000000"
                  class="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>

            <!-- Resume upload -->
            <div>
              <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">
                Resume / CV <span class="text-brand-text-muted font-normal">(PDF, DOC, DOCX — max 5 MB)</span>
              </label>
              <label
                class="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-brand-border bg-brand-surface cursor-pointer hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all duration-200"
              >
                <Icon name="mdi:upload-outline" class="w-6 h-6 text-brand-text-muted" />
                <span class="text-sm text-brand-text-muted">
                  {{ form.resume ? form.resume.name : 'Click to upload or drag & drop' }}
                </span>
                <input type="file" accept=".pdf,.doc,.docx" class="hidden" @change="onFileChange" />
              </label>
            </div>

            <!-- Cover letter -->
            <div>
              <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Cover Letter <span class="text-brand-text-muted font-normal">(optional)</span></label>
              <textarea
                v-model="form.cover_letter"
                rows="4"
                placeholder="Tell us why you're a great fit for this role..."
                class="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors resize-none"
              />
            </div>

            <!-- Links row -->
            <div class="grid sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-brand-text-secondary mb-1.5">Portfolio URL</label>
                <input v-model="form.portfolio_url" type="url" placeholder="https://..." class="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors" />
                <p v-if="errors.portfolio_url" class="text-xs text-red-500 mt-1">{{ errors.portfolio_url }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-brand-text-secondary mb-1.5">LinkedIn URL</label>
                <input v-model="form.linkedin_url" type="url" placeholder="https://linkedin.com/in/..." class="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors" />
                <p v-if="errors.linkedin_url" class="text-xs text-red-500 mt-1">{{ errors.linkedin_url }}</p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-brand-text-secondary mb-1.5">GitHub URL</label>
                <input v-model="form.github_url" type="url" placeholder="https://github.com/..." class="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors" />
                <p v-if="errors.github_url" class="text-xs text-red-500 mt-1">{{ errors.github_url }}</p>
              </div>
            </div>

            <!-- Additional info -->
            <div>
              <label class="block text-sm font-semibold text-brand-text-primary mb-1.5">Additional Info <span class="text-brand-text-muted font-normal">(optional)</span></label>
              <textarea
                v-model="form.additional_info"
                rows="2"
                placeholder="Anything else you'd like us to know..."
                class="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm outline-none focus:border-brand-purple transition-colors resize-none"
              />
            </div>

            <!-- Submit -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                class="px-5 py-2.5 rounded-xl border border-brand-border text-sm font-semibold text-brand-text-secondary hover:bg-brand-surface transition-colors"
                @click="showForm = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-purple text-white font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Icon v-if="isSubmitting" name="mdi:loading" class="w-4 h-4 animate-spin" />
                <Icon v-else name="mdi:send-outline" class="w-4 h-4" />
                {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <CtaSection />
  </div>
</template>
