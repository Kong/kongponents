import type { Ref } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import type { IConfig } from 'swrv'
import useSWRV from 'swrv'
import type { AxiosResponse, AxiosError } from 'axios'
import type { IKey, fetcherFn } from 'swrv/dist/types'

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
          // must return refs for consistent return types
          data: ref({}),
          error: ref(),
          isValidating: ref(false),
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
      // @ts-ignore: data exists on the response
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
   * @returns a debounced function with default delay and a debounced function generator
   */
  const useDebounce = <F extends (...args: any[]) => any>(
    fn: F,
    defaultDelay = 300,
  ): {
    debouncedFn: (...args: Parameters<F>) => void
    generateDebouncedFn: (delay: number) => (...args: Parameters<F>) => void
  } => {
    let timeout: any
    const wrapDebouncedWithDelay = (delay: number) => {
      return async (...args: Parameters<F>) => {
        clearTimeout(timeout)

        if (delay > 0) {
          // use a promise to allow us to properly await the debounced fn call
          await new Promise<void>(resolve => {
            timeout = setTimeout(async () => {
              await fn(...args)
              resolve()
            }, delay)
          })
        } else {
          // no debounce, just await the fn
          await fn(...args)
        }
      }
    }

    return {
      debouncedFn: wrapDebouncedWithDelay(defaultDelay),
      generateDebouncedFn: wrapDebouncedWithDelay,
    }
  }

  /**
   * @param {String} key - the current key to sort by
   * @param {String} previousKey - the previous key used to sort by
   * @param {String} sortOrder - either ascending or descending
   * @param {Array} items - the list of items to sort
   * @return {Object} an object containing the previousKey and sortOrder
   */
  const clientSideSorter = (key: string, previousKey: string, sortOrder: string, items: Record<string, any>[]) => {
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

  const useSwrvState = (response: Ref<any>, error: Ref<any>, isValidating: Ref<boolean>) => {
    const state = ref(swrvState.PENDING)
    const hasData = ref(false)

    watchEffect(() => {
      hasData.value = response.value && !!(
        Object.keys(response.value)?.length ||
        response.value.data?.length ||
        response.value.data?.data?.length ||
        (!response.value.data?.data &&
          typeof response.value.data === 'object' &&
          Object.keys(response.value?.data).length)
      )

      if (response.value && hasData.value && isValidating.value) {
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

      if (response.value && !error.value && hasData.value) {
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
      hasData,
      state,
      swrvState,
    }
  }

  /**
   * Convert a given string to a height with units. If pure number, append `px`.
   * @param sizeStr A string that can be used for the height of an element.
   * @returns A string to be used for the height of an element.
   */
  const getSizeFromString = (sizeStr: string): string => {
    const numeric = Number(sizeStr)
    return !Number.isNaN(numeric) ? `${numeric}px` : sizeStr
  }

  /**
   * Create a deep clone of an object
   * @param val Object to be cloned
   * @returns Cloned object
   */
  const cloneDeep = (val: Record<string, any>) => {
    if (!val) {
      return
    }

    return JSON.parse(JSON.stringify(val))
  }

  /**
   * For the label of a `required` input.
   * If the field is required and the label ends with an '*', strip it out.
   *
   * @param label the label to strip
   * @param required whether or not the field is required
   * @returns the stripped label
   */
  const stripRequiredLabel = (label: string, required: boolean): string => {
    if (!required || !label) {
      return label || ''
    }

    if (/( )?\*$/gi.test(label)) {
      return label.replace(/\*$/gi, '').trim()
    }

    return label
  }

  return {
    useRequest,
    useDebounce,
    clientSideSorter,
    useSwrvState,
    getSizeFromString,
    cloneDeep,
    stripRequiredLabel,
  }
}
