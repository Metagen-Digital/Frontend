import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  name:    yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email:   yup.string().required('Email is required').email('Invalid email address'),
  phone:   yup.string().optional(),
  service: yup.string().required('Please select a service'),
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

export function useContactForm() {
  const { success, error } = useToast()

  const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema: schema })

  const name    = useField<string>('name')
  const email   = useField<string>('email')
  const phone   = useField<string>('phone')
  const service = useField<string>('service')
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
    fields: { name, email, phone, service, message },
    isSubmitting,
    submit,
    services,
  }
}
