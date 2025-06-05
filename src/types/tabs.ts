import type { RouterLinkProps } from 'vue-router'

export type StripHash<S extends string> = S extends `#${infer Rest}` ? Rest : S

export interface Tab<H extends string = string> {
  /** Has to be unique, corresponds to the panel slot name */
  hash: H
  title: string
  disabled?: boolean
  /** If present, tab will be rendered as either a router-link or an anchor  */
  to?: RouterLinkProps['to']
}

export interface TabsProps<H extends string = string> {
  /**
   * Array of tab objects.
   */
  tabs: readonly Tab<H>[]

  /**
   * The hash of the currently active tab.
   * @default ''
   */
  modelValue?: NoInfer<H>

  /**
   * Whether all tabs should not render corresponding "panel" (the tab content) containers.
   * @default false
   */
  hidePanels?: boolean

  /**
   * The tabindex of the tab buttons.
   * @deprecated Previously used to support adding links inside tab buttons, this prop is now deprecated as the to prop has built-in support via the `to` prop.
   * @default 0
   */
  anchorTabindex?: number

  /**
   * A function that determines whether tab change should be allowed.
   * Returning or resolving to `false` will prevent the tab change.
   * @default () => true
   */
  beforeChange?: NoInfer<(hash: H) => boolean | Promise<boolean>>
}

export interface TabsEmits<H extends string = string> {
  /**
   * Emitted when the active tab changes.
   */
  'update:modelValue': NoInfer<[hash: H]>

  /**
   * Emitted when the active tab changes.
   */
  change: NoInfer<[hash: H]>
}

export type TabsSlots<H extends string = string> = {
  /**
   * Slot for the tab content.
   */
  [K in `${StripHash<H>}-anchor`]?: () => any
} & {
  /**
   * Slot for the tab panel content.
   */
  [K in StripHash<H>]?: () => any
}
