import type { Replace } from '@/types/utils'

export type ButtonAppearance = 'primary' | 'secondary' | 'tertiary' | 'danger'
export type ButtonAppearanceRecord = Record<Replace<ButtonAppearance, '-', ''>, ButtonAppearance>

export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonSizeRecord = Record<ButtonSize, ButtonSize>

export const ButtonAppearances: ButtonAppearanceRecord = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
}

export const ButtonSizes: ButtonSizeRecord = {
  large: 'large',
  medium: 'medium',
  small: 'small',
}
