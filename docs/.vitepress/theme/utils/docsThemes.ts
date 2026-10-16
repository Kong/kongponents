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

export type DocsColorMode = 'light' | 'dark'

export const DOCS_THEME_OPTIONS: Record<string, Record<DocsColorMode, KongponentsTheme>> = {
  'Electric Lime': {
    light: defineKongponentsTheme(electricLimeDay),
    dark: defineKongponentsTheme(electricLimeNight),
  },
  Classic: { light: classicDay, dark: classicNight },
  'Electric Lime High Contrast': {
    light: defineKongponentsTheme(electricLimeDayHighContrast),
    dark: defineKongponentsTheme(electricLimeNightHighContrast),
  },
  'Mono Lime': {
    light: defineKongponentsTheme(monoLimeDay),
    dark: defineKongponentsTheme(monoLimeNight),
  },
  'Mono Lime High Contrast': {
    light: defineKongponentsTheme(monoLimeDayHighContrast),
    dark: defineKongponentsTheme(monoLimeNightHighContrast),
  },
}

export const DOCS_THEME_STORAGE_KEY = 'kongponents-docs-theme'
export const DOCS_COLOR_MODE_STORAGE_KEY = 'kongponents-docs-color-mode'
