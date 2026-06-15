import { lightTheme, darkTheme, brandATheme, brandBTheme, konnectLightTheme, konnectDarkTheme } from '../../src/theme'
import type { KongponentsTheme } from '../../src/types/theme'

export const SANDBOX_THEME_STORAGE_KEY = 'kong-sandbox-theme'

export const SANDBOX_THEME_OPTIONS: Record<string, KongponentsTheme | undefined> = {
  Default: undefined,
  Light: lightTheme,
  Dark: darkTheme,
  'Brand A': brandATheme,
  'Brand B': brandBTheme,
  'Konnect Light': konnectLightTheme,
  'Konnect Dark': konnectDarkTheme,
}
