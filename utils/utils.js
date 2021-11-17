import useSWRV from 'swrv'
import { computed, ref } from '@vue/composition-api'

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

/**
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export const clientSideSorter = (key, previousKey, sortOrder, items) => {
  let comparator = null

  const numberComparator = (a, b) => {
    if (a && b) {
      return a - b
    }

    return 0
  }
  const stringComparator = (a, b) => {
    return a.localeCompare(b)
  }

  if (key !== previousKey) {
    comparator = (a, b) => {
      const transformer = (val) => {
        if (val === undefined || val === null) {
          return ''
        }

        if (typeof val === 'number') {
          return val
        }

        if (Array.isArray(val) && val.length && typeof val[0] === 'number') {
          return val[0]
        }

        return String(val)
      }

      const newValA = transformer(a[key])
      const newValB = transformer(b[key])

      switch (typeof newValA) {
        case 'number':
          return numberComparator(newValA, newValB)
        default:
          return stringComparator(newValA, newValB)
      }
    }

    items.sort(comparator)
    previousKey = key
    sortOrder = 'ascending'
  } else {
    items.reverse()
    if (sortOrder === 'descending') {
      sortOrder = 'ascending'
    } else {
      sortOrder = 'descending'
    }
  }

  return { previousKey, sortOrder }
}

export default {
  clientSideSorter,
  useRequest,
  useDebounce
}
