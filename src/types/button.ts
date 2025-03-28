import type { Replace } from '@/types/utils'
import type { RouterLinkProps } from 'vue-router'

export type ButtonAppearance = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'none'
export type ButtonAppearanceRecord = Record<Replace<ButtonAppearance, '-', ''>, ButtonAppearance>

export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonSizeRecord = Record<ButtonSize, ButtonSize>

export type ButtonProps = {
  /**
   * Base styling of the button
   * One of ['primary', 'secondary', 'tertiary', 'danger', 'none']
   * @default 'primary'
   */
  appearance?: ButtonAppearance

  /**
   * Size variations
   * One of ['small', 'medium', 'large']
   * @default 'medium'
   */
  size?: ButtonSize

  /**
   * Route object or path. If object will render <router-link>, if string will render <a>
   * @default null
   */
  to?: RouterLinkProps['to'] | null

  /**
   * Button type
   * @default 'button'
   */
  type?: HTMLButtonElement['type']

  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean

  /**
   * Icon only button
   * @default false
   */
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
