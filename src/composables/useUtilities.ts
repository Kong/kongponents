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
  const useRequest = <Data = unknown, Error = { message: string }>(
    key: IKey,
    fn?: fetcherFn<AxiosResponse<Data>>,
    config?: IConfig,
  ) => {
    const useSwrvFn =
      typeof useSWRV === 'function'
        ? useSWRV
        : () => ({
          data: {},
          error: null,
          isValidating: false,
          mutate: () => ({}),
        })

    const {
      data: response,
      error,
      isValidating,
      mutate: revalidate,
    } = useSwrvFn<AxiosResponse<Data>, AxiosError<Error>>(key, fn, {
      revalidateDebounce: 500,
      dedupingInterval: 100,
      ...config,
    })

    const data = computed(() => {
      // @ts-ignore
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

  /**
   * useDebounce accepts a function and a default delay.
   * It returns a debounced function with the default delay and a debounced function
   * wrapper which can be used to generate a debounced function with any delay.
   * @param fn the function to wrap
   * @param defaultDelay the default delay in milliseconds to use
   * @returns a debounced function with default delay and a debounced function wrapper
   */
  const useDebounce = <F extends (...args: any[]) => any>(
    fn: F,
    defaultDelay = 300,
  ): [(...args: Parameters<F>) => void, (delay: number) => (...args: Parameters<F>) => void] => {
    let timeout: any

    const wrapDebouncedWithDelay =
      (delay: number) =>
        (...args: Parameters<F>) => {
          clearTimeout(timeout)
          if (delay > 0) {
            timeout = setTimeout(() => {
              fn(...args)
            }, delay)
          } else {
            timeout = undefined
            fn(...args)
          }
        }

    return [wrapDebouncedWithDelay(defaultDelay), wrapDebouncedWithDelay]
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

    const numberComparator = (a: number, b: number | string) => {
      if (typeof b === 'number' && !Number.isNaN(a) && !Number.isNaN(b)) {
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
        (!response.value?.data?.data &&
          typeof response.value?.data === 'object' &&
          Object.keys(response.value?.data).length)

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

  /**
   * Convert a given string to a height with units. If no units are provided, append `px`.
   * @param sizeStr A string that can be used for the height of an element.
   * @returns A string to be used for the height of an element.
   */
  const getSizeFromString = (sizeStr: string): string => {
    return sizeStr === 'auto' ||
      sizeStr.endsWith('%') ||
      sizeStr.endsWith('vw') ||
      sizeStr.endsWith('vh') ||
      sizeStr.endsWith('px')
      ? sizeStr
      : sizeStr + 'px'
  }

  /**
   * Create a deep clone of an object
   * @param val Object to be cloned
   * @returns Cloned object
   */
  const cloneDeep = (val: Object) => {
    if (!val) {
      return
    }

    return JSON.parse(JSON.stringify(val))
  }

  return {
    useRequest,
    useDebounce,
    clientSideSorter,
    useSwrvStates,
    getSizeFromString,
    cloneDeep,
  }
}
