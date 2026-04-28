import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import type { ServiceApiItem } from '~/types'

const schema = yup.object({
  name:    yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email:   yup.string().required('Email is required').email('Invalid email address'),
  phone:   yup.string().optional(),
  service: yup.string().required('Please select a service'),
  message: yup.string().required('Message is required').min(10, 'Please write at least 10 characters'),
})

export function useContactForm() {
  const { success, error } = useToast()
  const { get, post } = useApi()

  const { data: servicesResponse } = get<ServiceApiItem[]>('/services')
  const services = computed<string[]>(() => {
    const titles = (servicesResponse.value?.data ?? []).map(s => s.title)
    return [...titles, 'Other']
  })

  const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: schema })

  const name    = useField<string>('name')
  const email   = useField<string>('email')
  const phone   = useField<string>('phone')
  const service = useField<string>('service')
  const message = useField<string>('message')

  const submit = handleSubmit(async (values) => {
    try {
      // Split "Full Name" → first_name + last_name for Laravel API
      const parts = values.name.trim().split(/\s+/)
      const firstName = parts[0] ?? ''
      const lastName  = parts.slice(1).join(' ') || firstName

      const res = await post('/contact/submit', {
        first_name: firstName,
        last_name:  lastName,
        email:      values.email,
        phone:      values.phone || undefined,
        service:    values.service,
        message:    values.message,
        subscribe_newsletter: false,
      })

      if (res.success) {
        success('Message sent!', "We'll reply within 24 hours.")
        resetForm()
        await navigateTo('/thank-you')
      }
    }
    catch (err: any) {
      if (err?.status === 422) {
        const errors = err?.data?.errors ?? {}
        const first = Object.values(errors).flat()[0] as string
        error('Validation error', first || 'Please check your input.')
      } else if (err?.status === 429) {
        error('Too many attempts', 'Please wait a while and try again.')
      } else {
        error('Something went wrong', 'Please try again or email us directly.')
      }
    }
  })

  return {
    fields: { name, email, phone, service, message },
    isSubmitting,
    submit,
    services,
  }
}
