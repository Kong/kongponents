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
  }).filter(range => range !== undefined)

  return rangesToLines(ranges, maxLines)
}

// [1, 2, [4, 6]] -> [1, 2, 4, 5, 6]
function rangesToLines(ranges: Array<number | [number, number]>, maxLines: number): number[] {
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

export function normalizeHighlightedLines(lines: string | Array<number | [number, number]>, maxLines: number): number[] {
  return typeof lines === 'string'
    ? expressionToLines(lines, maxLines)
    : rangesToLines(lines, maxLines)
}
