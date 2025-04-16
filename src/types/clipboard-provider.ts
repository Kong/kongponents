import type { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

export interface ClipboardProviderSlots {
  /**
   * Slot for providing `copyToClipboard` method to the children.
   */
  default?(props: { copyToClipboard: (arg: string | undefined) => ReturnType<typeof copyTextToClipboard> }): any
}
