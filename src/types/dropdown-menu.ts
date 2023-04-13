import { AnyElementOf } from '@/types'

export interface DropdownItem {
  label: string
  // This follows the vue-router RawLocation interface type
  to?: string | object
  value?: string | number
  selected?: boolean
  hasDivider?: boolean
}

export const AppearanceArray = ['menu', 'selectionMenu'] as const

export type Appearance = AnyElementOf<typeof AppearanceArray>

export type DropdownItemType = 'link' | 'button' | 'default'

export type DropdownItemRenderedType = 'link' | 'router-link' | 'button' | 'default'

export interface IDropdownItemRenderedComponent {
  tag: string;
  onClick: ((event: Event) => void) | undefined;
  attrs: {
    class: string;
    isRounded?: boolean;
    disabled?: boolean;
    to?: string | object | undefined;
    href?: string;
  }
}

export type DropdownItemRenderedRecord = Record<DropdownItemRenderedType, IDropdownItemRenderedComponent>
