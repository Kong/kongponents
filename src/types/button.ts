import type { Replace } from '@/types/utils'
import type { RouterLinkProps } from 'vue-router'

export type ButtonAppearance = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'none'
export type ButtonAppearanceRecord = Record<Replace<ButtonAppearance, '-', ''>, ButtonAppearance>

export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonSizeRecord = Record<ButtonSize, ButtonSize>

export type ButtonProps = {
  appearance?: ButtonAppearance
  size?: ButtonSize
  to?: RouterLinkProps | null
  type?: HTMLButtonElement['type']
  disabled?: boolean
  icon?: boolean
}

export const ButtonAppearances: ButtonAppearanceRecord = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  none: 'none',
}

export const ButtonSizes: ButtonSizeRecord = {
  large: 'large',
  medium: 'medium',
  small: 'small',
}
