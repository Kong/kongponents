import useSWRV from 'swrv'
import { computed } from '@vue/composition-api'

export const useRequest = (cacheKey, fetcherFn, config) => {
  const { data: response, error, isValidating, mutate: revalidate } = useSWRV(
    cacheKey,
    fetcherFn,
    { revalidateDebounce: 500, dedupingInterval: 100, ...config }
  )

  const data = computed(() => {
    return (response && response.value && response.value.data) || []
  })

  return {
    data,
    response,
    error,
    isValidating,
    revalidate
  }
}

export default {
  useRequest
}
