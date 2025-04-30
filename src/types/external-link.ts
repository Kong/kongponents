export interface ExternalLinkProps {
  /**
   * The URL that the hyperlink points to.
   */
  href: string

  /**
   * If true, icon won't be rendered.
   * @default false
   */
  hideIcon?: boolean
}

export interface ExternalLinkSlots {
  /**
   * Link text.
   */
  default?(): any
}
