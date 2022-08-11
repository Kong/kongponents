import { ref, Ref, computed, watchEffect } from 'vue'
import useSWRV, { IConfig } from 'swrv'
import { AxiosResponse, AxiosError } from 'axios'
import { IKey, fetcherFn } from 'swrv/dist/types'

const swrvState = {
  VALIDATING: 'VALIDATING',
  VALIDATING_HAS_DATA: 'VALIDATING_HAS_DATA',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  SUCCESS_HAS_DATA: 'SUCCESS_HAS_DATA',
  ERROR: 'ERROR',
  STALE_IF_ERROR: 'STALE_IF_ERROR',
}

export default function useUtilities() {
  const useRequest = <Data = unknown, Error = { message: string }> (key: IKey, fn?: fetcherFn<AxiosResponse<Data>>, config?: IConfig) => {
    const { data: response, error, isValidating, mutate: revalidate } = useSWRV<
    AxiosResponse<Data>,
    AxiosError<Error>
    >(key, fn, { revalidateDebounce: 500, dedupingInterval: 100, ...config })

    const data = computed(() => {
      return response.value?.data
    })

    return {
      data,
      response,
      error,
      isValidating,
      revalidate,
    }
  }

  const useDebounce = (initialQuery: string, delay = 300) => {
    let timeout: any
    const query = ref(initialQuery)

    function search(q: string) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        query.value = q
      }, delay)
    }

    return {
      query,
      search,
    }
  }

  /**
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
  const clientSideSorter = (key: string, previousKey: string, sortOrder: string, items: []) => {
    let comparator = null

    const numberComparator = (a: number, b: number) => {
      if (a && b) {
        return a - b
      }

      return 0
    }
    const stringComparator = (a: string, b: string) => {
      return a.localeCompare(b)
    }

    if (key !== previousKey) {
      comparator = (a: any, b: any) => {
        const transformer = (val: string | number) => {
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

        const newValA: any = transformer(a[key])
        const newValB: any = transformer(b[key])

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
      if (sortOrder === 'descending' || sortOrder === 'desc') {
        sortOrder = 'ascending'
      } else {
        sortOrder = 'descending'
      }
    }

    return { previousKey, sortOrder }
  }

  const useSwrvStates = (response: Ref<any>, error: Ref<any>, isValidating: Ref<boolean>) => {
    const state = ref(swrvState.PENDING)

    watchEffect(() => {
      const hasData =
      response.value?.data?.length ||
      response.value?.data?.data?.length ||
      (!response.value?.data?.data && typeof response.value?.data === 'object' && Object.keys(response.value?.data).length)

      if (response.value && hasData && isValidating.value) {
        state.value = swrvState.VALIDATING_HAS_DATA

        return
      }

      if (response.value && isValidating.value) {
        state.value = swrvState.VALIDATING

        return
      }

      if (response.value && error.value) {
        state.value = swrvState.STALE_IF_ERROR

        return
      }

      if (response.value === undefined && !error.value) {
        state.value = swrvState.PENDING

        return
      }

      if (response.value && !error.value && hasData) {
        state.value = swrvState.SUCCESS_HAS_DATA

        return
      }

      if (response.value && !error.value) {
        state.value = swrvState.SUCCESS

        return
      }

      if (response.value === undefined && error) {
        state.value = swrvState.ERROR
      }
    })

    return {
      state,
      swrvState,
    }
  }

  const getSizeFromString = (sizeStr: string) => {
    return sizeStr === 'auto' || sizeStr.endsWith('%') || sizeStr.endsWith('vw') || sizeStr.endsWith('vh') || sizeStr.endsWith('px') ? sizeStr : sizeStr + 'px'
  }

  return {
    useRequest,
    useDebounce,
    clientSideSorter,
    useSwrvStates,
    getSizeFromString,
  }
}
