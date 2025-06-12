export interface TruncateProps {
  /**
   * Number of rows to display before truncation.
   * Must be greater than 0.
   * @default 1
   */
  rows?: number

  /**
   * Use this prop if you want to truncate elements that only contain text, such as one or more paragraph <p> tags.
   * @default false
   */
  truncateText?: boolean

  /**
   * Whether the content is expanded by default.
   * @default false
   */
  expanded?: boolean

  /**
   * The width of the truncate container.
   * @default '100%'
   */
  width?: string
}

export interface TruncateSlots {
  /**
   * Default slot for the content to be truncated.
   */
  default?(): any

  /**
   * Slot for customizing the expand trigger.
   * @param props.expand Function to expand the content.
   * @param props.truncatedCount  Number of elements that overflow(only available when not truncateText).
   */
  'expand-trigger'?: (props: { expand: () => Promise<void>, truncatedCount?: number }) => any

  /**
   * Slot for customizing the collapse trigger.
   * @param props.collapse Function to collapse the content.
   */
  'collapse-trigger'?: (props: { collapse: () => Promise<void> }) => any
}
