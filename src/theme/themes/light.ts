import { defineKongponentsTheme } from '@/theme/defineKongponentsTheme'

/**
 * Example light theme.
 *
 * Restates the default light surface tokens explicitly so an app can toggle
 * back to light after applying {@link darkTheme} (or any darker theme). With no
 * theme applied at all, Kongponents already renders in this default light look —
 * this theme is provided mainly to make light/dark switching demonstrably symmetric.
 */
export const lightTheme = defineKongponentsTheme({
  '--kui-color-background': '#ffffff',
  '--kui-color-background-neutral-weakest': '#f9fafb',
  '--kui-color-background-disabled': '#e0e4ea',
  '--kui-color-text': '#000933',
  '--kui-color-text-neutral': '#6c7489',
  '--kui-color-text-inverse': '#ffffff',
  '--kui-color-text-disabled': '#afb7c5',
  '--kui-color-border': '#e0e4ea',
})
