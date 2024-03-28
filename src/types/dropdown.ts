import type { Component } from 'vue'

export interface DropdownItem {
  label: string
  // This follows the vue-router RawLocation interface type
  to?: string | object
  value?: string | number
  selected?: boolean
  hasDivider?: boolean
  danger?: boolean
}

export type DropdownItemType = 'link' | 'button' | 'default'

export type DropdownItemRenderedType = 'link' | 'router-link' | 'button' | 'div'

export interface DropdownItemRenderedComponent {
  tag: string | Component
  onClick?: ((event: Event) => void)
  attrs: {
    class?: string
    isRounded?: boolean
    disabled?: boolean
    to?: string | object
    href?: string
  }
}

export type DropdownItemRenderedRecord = Record<DropdownItemRenderedType, DropdownItemRenderedComponent>
