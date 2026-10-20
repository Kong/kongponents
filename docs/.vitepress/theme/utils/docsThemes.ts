import {
  classicDay,
  classicNight,
  electricLimeDay,
  electricLimeDayHighContrast,
  electricLimeNight,
  electricLimeNightHighContrast,
  monoLimeDay,
  monoLimeDayHighContrast,
  monoLimeNight,
  monoLimeNightHighContrast,
} from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../../../src/types/theme'

export const DOCS_THEME_OPTIONS: Record<string, KongponentsTheme> = {
  'Classic Day': classicDay,
  'Classic Night': classicNight,
  'Electric Lime Day': defineKongponentsTheme(electricLimeDay),
  'Electric Lime Night': defineKongponentsTheme(electricLimeNight),
  'Electric Lime Day High Contrast': defineKongponentsTheme(electricLimeDayHighContrast),
  'Electric Lime Night High Contrast': defineKongponentsTheme(electricLimeNightHighContrast),
  'Mono Lime Day': defineKongponentsTheme(monoLimeDay),
  'Mono Lime Night': defineKongponentsTheme(monoLimeNight),
  'Mono Lime Day High Contrast': defineKongponentsTheme(monoLimeDayHighContrast),
  'Mono Lime Night High Contrast': defineKongponentsTheme(monoLimeNightHighContrast),
}

export const DOCS_THEME_STORAGE_KEY = 'kongponents-docs-theme'
export const DOCS_COLOR_MODE_STORAGE_KEY = 'kongponents-docs-color-mode'
