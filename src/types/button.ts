import { Replace } from '@/types/utils'

export type ButtonAppearance = 'primary' | 'secondary' | 'danger' | 'creation' | 'outline' | 'btn-link' | 'btn-link-danger' | 'action-active'
export type ButtonAppearanceRecord = Record<Replace<ButtonAppearance, '-', ''>, ButtonAppearance>

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonSizeRecord = Record<ButtonSize, ButtonSize>
