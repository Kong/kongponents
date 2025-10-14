export interface CodeBlockEventData {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}

export type Theme = 'light' | 'dark'

export type CommandKeywords = 'toggleFilterMode' | 'toggleRegExpMode' | 'jumpToNextMatch' | 'jumpToPreviousMatch' | 'copyCode'

/**
 * @internal
 */
export interface CodeBlockIconButtonProps {
  theme?: Theme
  active?: boolean
  /**
   * Only pass tooltip text if it's the copy button
   */
  copyTooltip?: string
}

export interface CodeBlockProps {
  /**
   * ID value used for form elements like the search input and its label.
   */
  id: string

  /**
   * The code that will be rendered as a text node inside of a `<pre><code></code></pre>` fragment.
   */
  code: string

  /**
   * The syntax language of `props.code` (e.g. `'json'`).
   */
  language: string

  /**
   * Whether filter mode is initially active.
   * @default false
   */
  initialFilterMode?: boolean

  /**
   * Whether regular expression mode is initially active.
   * @default false
   */
  initialRegExpMode?: boolean

  /**
   * Shows an actions bar with a search input and related action buttons.
   * @default false
   */
  searchable?: boolean

  /**
   * The line numbers for the lines to highlight by default.
   * @default []
   */
  highlightedLineNumbers?: string | Array<number | [number, number]>

  /**
   * Allows controlling the processing state from outside the component. This allows a parent component to show the processing icon when it’s, for example, currently syntax highlighting the code.
   * @default false
   */
  processing?: boolean

  /**
   * Used as the initial value of the search input. Can be used to initialize a code block with a query which was read from client storage.
   * @default ''
   */
  query?: string

  /**
   * Controls whether to show a copy button. It copies the original code (i.e. the value of `props.code`) to the clipboard.
   * @default true
   */
  showCopyButton?: boolean

  /**
   * Controls whether to show line numbers.
   * @default true
   */
  showLineNumbers?: boolean

  /**
   * Controls whether to add links to the current line number.
   * @default false
   */
  showLineNumberLinks?: boolean

  /**
   * Controls the color scheme of the component.
   * @default 'light'
   */
  theme?: Theme

  /**
   * Displays the code on a single line.
   * @default false
   */
  singleLine?: boolean

  /**
   * The max-height of the code block.
   * @default 'none'
   */
  maxHeight?: number | string

  /**
   * Whether the code block is editable.
   * @default false
   */
  contenteditable?: boolean
}

export interface CodeBlockEmits {
  /**
   * Fired when the code block is rendered or re-rendered.
   * This happens initially when mounting the component. It also happens when turning *off* filter mode (this renders a line-filtered sub set of the code and can’t be syntax highlighted after the fact). It also happens when the code changes (i.e. `props.code` is updated).
   */
  'code-block-render': [evt: CodeBlockEventData]

  /**
   * Fired when the matching line numbers are updated in response to a search.
   */
  'matching-lines-change': [evt: CodeBlockEventData]

  /**
   * Fired when the search query is updated.
   */
  'query-change': [query: string]

  /**
   * Fired when the filter mode is toggled.
   */
  'filter-mode-change': [on: boolean]

  /**
   * Fired when the regular expression mode is toggled.
   */
  'reg-exp-mode-change': [on: boolean]

  /**
   * Fired when the code is changed in contenteditable mode and the element looses focus.
   */
  'update:code': [newCode: string]
}

export interface CodeBlockSlots {
  /**
   * Additional actions to be displayed in the code block.
   */
  'secondary-actions'?(): any
}
