export type SwrvState = 'VALIDATING' | 'VALIDATING_HAS_DATA' | 'PENDING' | 'SUCCESS' | 'SUCCESS_HAS_DATA' | 'ERROR' | 'STALE_IF_ERROR'

export interface SwrvStateData {
  hasData: boolean
  state: SwrvState
}
