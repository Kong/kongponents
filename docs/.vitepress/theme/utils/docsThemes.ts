import { konnectDay, konnectNight, brandA, brandB } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../../../src/types/theme'

export const DOCS_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  Classic: undefined,
  'Konnect Day': defineKongponentsTheme(konnectDay),
  'Konnect Night': defineKongponentsTheme(konnectNight),
  'Brand A': defineKongponentsTheme(brandA),
  'Brand B': defineKongponentsTheme(brandB),
}

export const DOCS_THEME_STORAGE_KEY = 'kongponents-docs-theme'
