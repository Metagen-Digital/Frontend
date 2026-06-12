import type { ApiResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const { locale } = useLocale()
  const { authToken } = useAuth()

  function authHeaders(): Record<string, string> {
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (authToken.value) {
      headers['Authorization'] = `Bearer ${authToken.value}`
    }
    return headers
  }

  function get<T>(endpoint: string, query: Record<string, any> = {}) {
    return useFetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      query: {
        ...query,
        locale: locale.value,
      },
      headers: authHeaders(),
      key: `${endpoint}:${locale.value}:${JSON.stringify(query)}`,
    })
  }

  async function post<T>(endpoint: string, body: Record<string, any>) {
    return $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      method: 'POST',
      body,
      headers: authHeaders(),
    })
  }

  async function put<T>(endpoint: string, body: Record<string, any>) {
    return $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      method: 'PUT',
      body,
      headers: authHeaders(),
    })
  }

  async function del<T>(endpoint: string) {
    return $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
  }

  return { get, post, put, del }
}
