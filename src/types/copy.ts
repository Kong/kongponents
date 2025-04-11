export type CopyFormat = 'default' | 'hidden' | 'redacted' | 'deleted'

export interface CopyProps {
  /**
   * Text displayed before the copyable text when `badge` is true.
   * @default ''
   */
  badgeLabel?: string

  /**
   * The copyable text.
   */
  text: string

  /**
   * Tooltip text displayed on hover over the `text`.
   * @default ''
   */
  textTooltip?: string

  /**
   * Tooltip text displayed on hover over copy button.
   * @default ''
   */
  copyTooltip?: string

  /**
   * Tooltip text displayed on error.
   * @default 'default'
   */
  format?: CopyFormat

  /**
   * Whether or not to display as a badge.
   * @default false
   */
  badge?: boolean

  /**
   * Whether or not to use monospace font.
   * @default false
   */
  monospace?: boolean

  /**
   * Whether or not the text should be truncated.
   * @default false
   */
  truncate?: boolean

  /**
   * Tooltip text displayed on successful copy.
   * @default 'Copied!'
   */
  successTooltip?: string

  /**
   * Number of characters to truncate at.
   * @default 8
   */
  truncationLimit?: number | string
}
