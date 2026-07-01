import { classicDay, classicNight, konnectDay, konnectNight } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../src/types/theme'

export const SANDBOX_THEME_STORAGE_KEY = 'kong-sandbox-theme'

export const SANDBOX_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  'Classic Day': classicDay,
  'Classic Night': classicNight,
  'Konnect Day': defineKongponentsTheme(konnectDay),
  'Konnect Night': defineKongponentsTheme(konnectNight),
}
