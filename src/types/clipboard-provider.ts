import type { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

export interface ClipboardProviderSlots {
  /**
   * Slot for providing `copyToClipboard` method to the children.
   */
  default?(props: { copyToClipboard: typeof copyTextToClipboard }): any
}
