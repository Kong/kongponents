import { konnectDay, konnectNight, brandA, brandB } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '../../src/theme/defineKongponentsTheme'
import type { KongponentsTheme } from '../../src/types/theme'

export const SANDBOX_THEME_STORAGE_KEY = 'kong-sandbox-theme'

/** Inverts the neutral surface and text tokens to a dark palette. */
const darkTheme = defineKongponentsTheme({
  '--kui-color-background': '#16161d',
  '--kui-color-background-neutral-weakest': '#1f1f29',
  '--kui-color-background-neutral-weaker': '#26262f',
  '--kui-color-background-neutral-weak': '#33333f',
  '--kui-color-background-neutral': '#3d3d4d',
  '--kui-color-background-neutral-strong': '#4a4a5a',
  '--kui-color-background-disabled': '#2a2a33',
  '--kui-color-text': '#f2f3f5',
  '--kui-color-text-neutral': '#a7adba',
  '--kui-color-text-neutral-strong': '#c8ccd6',
  '--kui-color-text-neutral-stronger': '#dde0e6',
  '--kui-color-text-neutral-strongest': '#f2f3f5',
  '--kui-color-text-neutral-weak': '#878da0',
  '--kui-color-text-neutral-weaker': '#6b7185',
  '--kui-color-text-neutral-weakest': '#52576a',
  '--kui-color-text-disabled': '#5c6172',
  '--kui-color-border': '#6b6b80',
  '--kui-color-border-disabled': '#2a2a33',
  '--kui-color-background-primary-weakest': '#1a2540',
  '--kui-color-text-primary': '#5f9aff',
  '--kui-color-text-primary-strong': '#7aadff',
  '--kui-color-text-primary-stronger': '#99c0ff',
  '--kui-color-text-primary-strongest': '#bee2ff',
  '--kui-color-text-primary-weak': '#4080f0',
  '--kui-color-text-primary-weaker': '#2860d0',
  '--kui-color-text-primary-weakest': '#1a44a8',
  '--kui-navigation-color-background': '#16161d',
  '--kui-navigation-color-background-selected': '#1f1f29',
  '--kui-navigation-color-text': '#f2f3f5',
  '--kui-navigation-color-text-selected': '#5f9aff',
  '--kui-navigation-color-text-hover': '#7aadff',
  '--kui-navigation-color-text-focus': '#5f9aff',
  '--kui-navigation-color-border': '#2a2a33',
  '--kui-navigation-color-border-child': '#2a2a33',
  '--kui-navigation-color-border-divider': '#33333f',
  '--kui-navigation-shadow-border': '0px 0px 0px 1px #33333f inset',
  '--kui-navigation-shadow-border-child': '0px 0px 0px 1px #2a2a33 inset',
  '--kui-navigation-shadow-focus': '0px 0px 0px 3px rgba(0, 68, 244, 0.45)',
  '--kui-shadow-focus': '0px 0px 0px 4px rgba(0, 68, 244, 0.55)',
  '--kui-shadow-border': '0px 0px 0px 1px #6b6b80 inset',
  '--kui-shadow-border-disabled': '0px 0px 0px 1px #2a2a33 inset',
})

export const SANDBOX_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  Classic: undefined,
  'Konnect Day': defineKongponentsTheme(konnectDay),
  'Konnect Night': defineKongponentsTheme(konnectNight),
  'Brand A': defineKongponentsTheme(brandA),
  'Brand B': defineKongponentsTheme(brandB),
  Dark: darkTheme,
}
