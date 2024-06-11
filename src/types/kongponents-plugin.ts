import { v4 as uuidv4 } from 'uuid'

export const kongponentsGetUniqueId = 'kongponents-id' as const

export interface KongponentsPlugin {
  uniqueIdFn: () => string
}

export const defaultKongponentsPlugin: KongponentsPlugin = {
  uniqueIdFn: uuidv4,
} as const

