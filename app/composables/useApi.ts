import type { ApiResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const { locale } = useLocale()
  const { apiFetch } = useApiClient()

  // Public reads stay on useFetch (SSR-cacheable). `credentials: 'include'`
  // is harmless for public data and lets authenticated GETs use the session
  // cookie without any bearer token.
  //
  // Query values may be refs or getters. They are unwrapped inside a computed
  // rather than read once, so a paginated or filtered listing refetches when
  // its `page` / `category` changes instead of freezing on whatever the values
  // happened to be during setup. `undefined` entries are stripped so an
  // inactive filter does not become `?category=undefined`.
  function get<T>(endpoint: string, query: Record<string, MaybeRefOrGetter<any>> = {}) {
    const resolvedQuery = computed(() => {
      const out: Record<string, any> = { locale: locale.value }

      for (const [name, value] of Object.entries(query)) {
        const resolved = toValue(value)
        if (resolved !== undefined && resolved !== null && resolved !== '') {
          out[name] = resolved
        }
      }

      return out
    })

    return useFetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      query: resolvedQuery,
      headers: { Accept: 'application/json' },
      credentials: 'include',
      // Identifies the request for SSR payload transfer. useFetch watches
      // `resolvedQuery` itself, so refetching does not depend on this changing.
      key: `${endpoint}:${locale.value}:${JSON.stringify(resolvedQuery.value)}`,
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
