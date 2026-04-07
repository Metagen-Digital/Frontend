import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  name:    yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email:   yup.string().required('Email is required').email('Invalid email address'),
  service: yup.string().required('Please select a service'),
  budget:  yup.string().optional(),
  message: yup.string().required('Message is required').min(10, 'Please write at least 10 characters'),
})

export const services = [
  'Digital Marketing',
  'Social Media Marketing',
  'Photography & Videography',
  'Website Development',
  'E-commerce Development',
  'Other',
]

export const budgets = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $3,000',
  '$3,000 – $5,000',
  '$5,000+',
  'Custom / Not sure',
]

export function useContactForm() {
  const { toast } = useNuxtApp().$toast ?? {}
  const { success, error } = useToast()

  const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: schema })

  const name    = useField<string>('name')
  const email   = useField<string>('email')
  const service = useField<string>('service')
  const budget  = useField<string>('budget')
  const message = useField<string>('message')

  const submit = handleSubmit(async (values) => {
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: values,
      })
      success('Message sent!', "We'll reply within 24 hours.")
      resetForm()
    }
    catch {
      error('Something went wrong', 'Please try again or email us directly.')
    }
  })

  return {
    fields: { name, email, service, budget, message },
    isSubmitting,
    submit,
    services,
    budgets,
  }
}
