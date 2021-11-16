import { ref, watchEffect } from '@vue/composition-api'

const swrvState = {
  VALIDATING: 'VALIDATING',
  VALIDATING_HAS_DATA: 'VALIDATING_HAS_DATA',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  SUCCESS_HAS_DATA: 'SUCCESS_HAS_DATA',
  ERROR: 'ERROR',
  STALE_IF_ERROR: 'STALE_IF_ERROR'
}

export default function useSwrvStates (response, error, isValidating) {
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
    swrvState
  }
}
