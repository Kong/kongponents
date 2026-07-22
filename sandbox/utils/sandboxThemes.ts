import { classicDay, classicNight, electricLimeDay, electricLimeNight } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../src/types/theme'

export const SANDBOX_THEME_STORAGE_KEY = 'kong-sandbox-theme'

export const SANDBOX_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  'Classic Day': classicDay,
  'Classic Night': classicNight,
  'Electric Lime Day': defineKongponentsTheme(electricLimeDay),
  'Electric Lime Night': defineKongponentsTheme(electricLimeNight),
}
