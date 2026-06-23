import { classicDay, classicNight, konnectDay, konnectNight, brandA, brandB, paper } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../../../src/types/theme'

export const DOCS_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  'Classic Day': classicDay,
  'Classic Night': classicNight,
  'Konnect Day': defineKongponentsTheme(konnectDay),
  'Konnect Night': defineKongponentsTheme(konnectNight),
  'Brand A': defineKongponentsTheme(brandA),
  'Brand B': defineKongponentsTheme(brandB),
  'Paper': defineKongponentsTheme(paper),
}

export const DOCS_THEME_STORAGE_KEY = 'kongponents-docs-theme'
