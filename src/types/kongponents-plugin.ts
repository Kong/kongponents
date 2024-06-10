import { v4 as uuidv4 } from 'uuid'

export const kongponentsRandomIdFunction = 'kongponents-id' as const

export interface KongponentsPlugin {
  'kongponents-id': () => string
}

export const defaultKongponentsPlugin: KongponentsPlugin = {
  'kongponents-id': uuidv4,
} as const

