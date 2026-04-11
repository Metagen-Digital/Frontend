import type { ApiResponse } from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const { locale } = useLocale()

  function get<T>(endpoint: string, query: Record<string, any> = {}) {
    return useFetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      query: {
        ...query,
        locale: locale.value,
      },
      headers: {
        Accept: 'application/json',
      },
      key: `${endpoint}:${locale.value}:${JSON.stringify(query)}`,
    })
  }

  async function post<T>(endpoint: string, body: Record<string, any>) {
    return $fetch<ApiResponse<T>>(`${config.public.apiBase}${endpoint}`, {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  return { get, post }
}
