export interface Tab {
  /** Has to be unique, corresponds to the panel slot name */
  hash: string
  title: string
  disabled?: boolean
  /** If present, tab will be rendered as either a router-link or an anchor  */
  to?: string | object
}
