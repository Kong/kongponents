import { v4 as uuidv4 } from 'uuid'

export const kongponentsRandomIdFunction = 'kongponents-id' as const

export interface KongponentsPlugin {
  kongponentsId: () => string
}

export const defaultKongponentsPlugin: KongponentsPlugin = {
  kongponentsId: uuidv4,
} as const

