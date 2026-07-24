import type { ApiResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const { locale } = useLocale()
  const { apiFetch } = useApiClient()

  // Public reads stay on useFetch (SSR-cacheable). `credentials: 'include'`
  // is harmless for public data and lets authenticated GETs use the session
  // cookie without any bearer token.
  function get<T>(endpoint: string, query: Record<string, any> = {}) {
    return useFetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      query: {
        ...query,
        locale: locale.value,
      },
      headers: { Accept: 'application/json' },
      credentials: 'include',
      key: `${endpoint}:${locale.value}:${JSON.stringify(query)}`,
    })
  }

  // Mutations go through apiFetch, which adds the CSRF header + credentials.
  function post<T>(endpoint: string, body: Record<string, any>) {
    return apiFetch<ApiResponse<T>>(endpoint, { method: 'POST', body })
  }

  function put<T>(endpoint: string, body: Record<string, any>) {
    return apiFetch<ApiResponse<T>>(endpoint, { method: 'PUT', body })
  }

  function del<T>(endpoint: string) {
    return apiFetch<ApiResponse<T>>(endpoint, { method: 'DELETE' })
  }

  return { get, post, put, del }
}
