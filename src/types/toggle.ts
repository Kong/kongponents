import type { Ref } from 'vue'

export interface ToggleProps {
  /**
   * Whether the toggle is toggled on or off by default.
   * @default false
   */
  toggled?: boolean
}

export interface ToggleEmits {
  /**
   * Emitted when the toggle is changed.
   */
  toggled: [value: boolean]
}

export interface ToggleSlots {
  /**
   * Content to toggle.
   */
  default?(props: { isToggled: Ref<boolean>, toggle: () => void }): any
}
