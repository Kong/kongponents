export type CodeBlockEventData = {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}

export type Theme = 'light' | 'dark'

export type CommandKeywords = 'toggleFilterMode' | 'toggleRegExpMode' | 'jumpToNextMatch' | 'jumpToPreviousMatch' | 'copyCode'
