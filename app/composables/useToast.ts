export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

const toasts = ref<Toast[]>([])

export function useToast() {
  function addToast(type: ToastType, title: string, message?: string, duration = 4000) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, type, title, message })
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) toasts.value.splice(index, 1)
  }

  return {
    toasts: readonly(toasts),
    removeToast,
    success: (title: string, message?: string) => addToast('success', title, message),
    error:   (title: string, message?: string) => addToast('error',   title, message),
    warning: (title: string, message?: string) => addToast('warning', title, message),
    info:    (title: string, message?: string) => addToast('info',    title, message),
  }
}
