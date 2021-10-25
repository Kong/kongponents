import useSWRV from 'swrv'
import { computed, ref } from '@vue/composition-api'

export const useRequest = (cacheKey, fetcherFn, config) => {
  const { data: response, error, isValidating, mutate: revalidate } = useSWRV(
    cacheKey,
    fetcherFn,
    { revalidateDebounce: 500, dedupingInterval: 100, ...config }
  )

  const data = computed(() => {
    return response.value?.data
  })

  return {
    data,
    response,
    error,
    isValidating,
    revalidate
  }
}

export const useDebounce = (initialQuery, delay = 300) => {
  let timeout
  const query = ref(initialQuery)

  function search (q) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      query.value = q
    }, delay)
  }

  return {
    query,
    search
  }
}

export default {
  useRequest,
  useDebounce
}
