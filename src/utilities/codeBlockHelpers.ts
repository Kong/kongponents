// =================================
// Calculating matching line numbers
// =================================

import { escapeRegExp } from 'lodash-es'

/**
 * Build an array of character indices at which each line (0-based) starts.
 * lineOffsets[i] = character index where line i starts in `code`.
 */
export function buildLineOffsets(code: string): number[] {
  const lineOffsets = [0]
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '\n') {
      lineOffsets.push(i + 1)
    }
  }
  return lineOffsets
}

/**
 * Binary search:
 * Find which 1-based line number a particular character offset falls on.
 * eg. findLineForOffset([0, 5, 10], 7) => 2
 */
function findLineForOffset(lineOffsets: number[], offset: number): number {
  let low = 0
  let high = lineOffsets.length - 1

  // Perform a binary search to find the highest line offset <= the given offset
  // and that will be the line number.
  while (low < high) {
    // Calculate the mid-point
    const mid = Math.floor((low + high + 1) / 2)
    if (lineOffsets[mid] <= offset) {
      // narrow the search to the upper half
      low = mid
    } else {
      // narrow the search to the lower half
      high = mid - 1
    }
  }
  // Convert from 0-based line index to 1-based
  return low + 1
}

/**
 * For an **exact** substring, this returns an array of ALL line numbers
 * (1-based) touched by each match.
 * This assumes the query does NOT contain '\n' (no cross-line matches).
 */function getAllMatchingLineNumbersByExactMatch(code: string, query: string, lineOffsets: number[]): number[] {
  const allMatchedLineNumbers: number[] = []

  let startPos = 0
  while (true) {
    const pos = code.indexOf(query, startPos)
    if (pos === -1) break

    const lineNumber = findLineForOffset(lineOffsets, pos)
    allMatchedLineNumbers.push(lineNumber)

    // lineNumber is 1-based, so it becomes the next line's start offset in the `lineOffsets` array
    const nextLineOffset = lineNumber < lineOffsets.length ? lineOffsets[lineNumber] : code.length

    // Move to the next character after the match
    startPos = nextLineOffset
  }

  return allMatchedLineNumbers
}

/**
 * For a **regex** that may span multiple lines, this returns
 * an array of ALL line numbers (1-based) touched by each match.
 *
 * Example:
 *   If a match starts on line 2 and ends on line 5, this adds
 *   [2, 3, 4, 5] to the result array for that match.
 */
function getAllMatchingLineNumbersByRegExp(code: string, query: string, lineOffsets: number[]): number[] {
  const regExp = new RegExp(query, 'sg')

  const allMatchedLineNumbers: number[] = []
  let match

  while ((match = regExp.exec(code)) !== null) {
    // Start/end offsets of the matched text
    const startOffset = match.index
    const endOffset = match.index + match[0].length - 1

    // Map offsets to line numbers
    const startLine = findLineForOffset(lineOffsets, startOffset)
    const endLine = findLineForOffset(lineOffsets, endOffset)

    // Collect each line from startLine through endLine
    for (let line = startLine; line <= endLine; line++) {
      // Avoid duplicates
      if (allMatchedLineNumbers[allMatchedLineNumbers.length - 1] !== line) {
        allMatchedLineNumbers.push(line)
      }
    }
  }

  return allMatchedLineNumbers
}

/**
 * Get an array of line numbers (1-based) that contain matches for the given query.
 * Both exact and regex matches are supported.
 * Accepts a pre-built array of line offsets for better performance for repeated searches
 * on the same code.
 */
export function getMatchingLineNumbers(code: string, query: string, isRegExpMode: boolean, lineOffsets = buildLineOffsets(code)): number[] {
  if (isRegExpMode) {
    return getAllMatchingLineNumbersByRegExp(code, query, lineOffsets)
  } else {
    return getAllMatchingLineNumbersByExactMatch(code, query, lineOffsets)
  }
}

// ================================
// Highlighting matching characters
// ================================
export const wrapMark = (match: string) => `<mark class="matched-term">${match}</mark>`

// We only need to escape '<' and '&' characters as we can assure that the escaped output
// will only be directly set as innerHTML and will not be concatenated with other strings
// or used inside HTML attributes.
const ESCAPE_REGEX = /[<&]/
export function escapeInnerHTML(raw: string): string {
  return raw.replace(/[&<]/g, (char: string) => char === '&' ? '&amp;' : '&lt;')
}

// Provide a fast path for escaping strings that don't contain special characters
// especially useful for large bodies of text where the overhead of escaping is non-trivial
// It also allows to only escape necessary characters.
export function escapeHTMLIfNeeded(raw: string, regExp = ESCAPE_REGEX, escape = escapeInnerHTML): string {
  return regExp.test(raw) ? escape(raw) : raw
}

export function highlightMatchingChars(code: string, query: string, isRegExpMode: boolean): string {
  let regExp: RegExp
  try {
    // This RegExp must have a capture group to work here
    regExp = new RegExp(`((?:${isRegExpMode ? query : escapeRegExp(query)})+)`, 'sgi')
  } catch {
    return code
  }

  // This is a fast path for the common case where there are no special characters
  if (!ESCAPE_REGEX.test(code)) {
    return code.replace(regExp, wrapMark)
  }

  const parts = code.split(regExp)
  const result: string[] = []

  for (let i = 0; i < parts.length; i++) {
    const escaped = escapeInnerHTML(parts[i])
    result.push(i % 2 === 0 ? escaped : wrapMark(escaped))
  }

  return result.join('')
}

// ========================
// Line highlighting syntax
// ========================

/**
 * A regular expression to match a line number expression.
 * Examples of valid expressions:
 * - "1" (a single line number)
 * - "1-5" (a range of line numbers)
 * - "1,3,5" (a list of individual line numbers)
 * - "1-3,5,7-10" (a mix of ranges and individual numbers)
 */
export const LINE_NUMBER_EXPRESSION_REGEX = /^\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*$/

// '1,2,4-6' -> [1, 2, 4, 5, 6]
function expressionToLines(expression: string, maxLines: number): number[] {
  if (!LINE_NUMBER_EXPRESSION_REGEX.test(expression)) {
    throw new Error('Invalid line number expression.')
  }

  const ranges = expression.split(',').map((part) => {
    const [start, end] = part.split('-').map(Number)
    // If there's no end, it's a single line, otherwise it's a range
    return end == null ? start : [start, end] as [number, number]
  })

  return rangesToLines(ranges, maxLines)
}

// [1, 2, [4, 6]] -> [1, 2, 4, 5, 6]
function rangesToLines(ranges: (number | [number, number])[], maxLines: number): number[] {
  const lines = ranges.flatMap((range) => {
    if (typeof range === 'number') {
      return range < 1 || range > maxLines ? [] : range
    }

    // Ensure start is less than end
    let [start, end] = range[0] < range[1] ? range : [range[1], range[0]]

    // Ensure start and end are within bounds
    start = Math.max(1, start)
    end = Math.min(maxLines, end)

    return Array.from({ length: end - start + 1 }, (_, i) => i + start)
  }).sort((a, b) => a - b)

  // Ensure no duplicates
  return Array.from(new Set(lines))
}

export function normalizeHighlightedLines(lines: string | (number | [number, number])[], maxLines: number): number[] {
  return typeof lines === 'string'
    ? expressionToLines(lines, maxLines)
    : rangesToLines(lines, maxLines)
}
