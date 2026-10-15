import { classicDay, classicNight, electricLimeDay, electricLimeNight, electricLimeDayHighContrast, electricLimeNightHighContrast, monoLimeDay, monoLimeNight, monoLimeDayHighContrast, monoLimeNightHighContrast } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../../../src/types/theme'

export const DOCS_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  'Classic Day': classicDay,
  'Classic Night': classicNight,
  'Electric Lime Day': defineKongponentsTheme(electricLimeDay),
  'Electric Lime Day High Contrast': defineKongponentsTheme(electricLimeDayHighContrast),
  'Electric Lime Night': defineKongponentsTheme(electricLimeNight),
  'Electric Lime Night High Contrast': defineKongponentsTheme(electricLimeNightHighContrast),
  'Mono Lime Day': defineKongponentsTheme(monoLimeDay),
  'Mono Lime Day High Contrast': defineKongponentsTheme(monoLimeDayHighContrast),
  'Mono Lime Night': defineKongponentsTheme(monoLimeNight),
  'Mono Lime Night High Contrast': defineKongponentsTheme(monoLimeNightHighContrast),
}

export const DOCS_THEME_STORAGE_KEY = 'kongponents-docs-theme'
