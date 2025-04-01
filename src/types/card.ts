export type HeaderTag = 'div' | 'p' | 'span' | 'a' | 'legend' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const HeaderTags: HeaderTag[] = ['div', 'p', 'span', 'a', 'legend', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export interface CardProps {
  /**
   * The title of the card.
   * @default ''
   */
  title?: string

  /**
   * HTML element you want title to be rendered as.
   * One of ['div', 'p', 'span', 'a', 'legend', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].
   * @default 'div'
   */
  titleTag?: HeaderTag
}

export interface CardSlots {
  /**
   * The content of the card.
   */
  default?(): any

  /**
   * The title of the card.
   */
  title?(): any

  /**
   * Action elements to be rendered to the right of the card title.
   */
  actions?(): any

  /**
   * The footer of the card.
   */
  footer?(): any
}
