import type { Ref } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import type { IConfig } from 'swrv'
import useSWRV from 'swrv'
import type { IKey, fetcherFn } from 'swrv/dist/types'
import type { SwrvState } from '@/types'

const swrvState = {
  VALIDATING: 'VALIDATING',
  VALIDATING_HAS_DATA: 'VALIDATING_HAS_DATA',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  SUCCESS_HAS_DATA: 'SUCCESS_HAS_DATA',
  ERROR: 'ERROR',
  STALE_IF_ERROR: 'STALE_IF_ERROR',
} as const satisfies Record<string, SwrvState>

export default function useUtilities() {
  const useRequest = <Response = { data: unknown }, Error = { message: string }>(
    key: IKey,
    fn?: fetcherFn<Response>,
    config?: IConfig,
  ) => {
    const {
      data: response,
      error,
      isValidating,
      isLoading,
      mutate: revalidate,
    } = useSWRV<Response, Error>(key, fn, {
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
      isLoading,
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
  const clientSideSorter = (key: string, previousKey: string, sortOrder: string, items: Array<Record<string, any>>) => {
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
    const state = ref<SwrvState>(swrvState.PENDING)
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
    cloneDeep,
    stripRequiredLabel,
  }
}
