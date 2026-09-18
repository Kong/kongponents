interface Heading {
  level: number
  title: string
  start: number
}

const normalizeHeading = (value: string): string => value
  .replace(/[`*_]/g, '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '')

const parseHeadings = (markdown: string): Heading[] => {
  const headings: Heading[] = []
  let offset = 0
  let fence: '`' | '~' | undefined

  for (const line of markdown.split(/(?<=\n)/)) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1][0] as '`' | '~'
      if (!fence) fence = marker
      else if (fence === marker) fence = undefined
      offset += line.length
      continue
    }

    if (!fence) {
      const heading = line.match(/^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*(?:\n|$)/)
      if (heading) {
        headings.push({
          level: heading[1].length,
          title: heading[2].trim(),
          start: offset,
        })
      }
    }
    offset += line.length
  }

  return headings
}

const sectionEnd = (markdown: string, headings: Heading[], index: number): number => {
  const heading = headings[index]
  const nextHeading = headings.slice(index + 1).find((candidate) => candidate.level <= heading.level)
  return nextHeading?.start ?? markdown.length
}

const unique = (values: string[]): string[] => [...new Set(values)]

export const listDocumentationSections = (markdown: string): string[] => unique(
  parseHeadings(markdown)
    .filter((heading) => heading.level === 2)
    .map((heading) => heading.title),
)

export const extractDocumentationSections = (markdown: string, requestedSections: string[]) => {
  const headings = parseHeadings(markdown)
  const secondLevelHeadings = headings.filter((heading) => heading.level === 2)
  const availableSections = unique(secondLevelHeadings.map((heading) => heading.title))
  const requested = unique(requestedSections.map((section) => section.trim()).filter(Boolean))
  const chunks: string[] = []
  const matchedSections: string[] = []

  for (const section of requested) {
    if (normalizeHeading(section) === 'overview') {
      const overviewEnd = secondLevelHeadings[0]?.start ?? markdown.length
      const overview = markdown.slice(0, overviewEnd).trim()
      if (overview) {
        chunks.push(overview)
        matchedSections.push('Overview')
      }
      continue
    }

    const heading = secondLevelHeadings.find((candidate) => normalizeHeading(candidate.title) === normalizeHeading(section))
    if (!heading) continue
    const headingIndex = headings.indexOf(heading)
    chunks.push(markdown.slice(heading.start, sectionEnd(markdown, headings, headingIndex)).trim())
    matchedSections.push(heading.title)
  }

  return {
    markdown: chunks.join('\n\n'),
    matchedSections,
    availableSections: ['Overview', ...availableSections],
  }
}

export const listComponentProperties = (markdown: string): string[] => {
  const headings = parseHeadings(markdown)
  const propsIndex = headings.findIndex((heading) => heading.level === 2 && normalizeHeading(heading.title) === 'props')
  if (propsIndex < 0) return []

  const properties: string[] = []
  for (const heading of headings.slice(propsIndex + 1)) {
    if (heading.level <= 2) break
    if (heading.level === 3) properties.push(heading.title)
  }
  return unique(properties)
}

export const extractComponentProperty = (markdown: string, property: string) => {
  const headings = parseHeadings(markdown)
  const propsIndex = headings.findIndex((heading) => heading.level === 2 && normalizeHeading(heading.title) === 'props')
  const properties = listComponentProperties(markdown)
  if (propsIndex < 0) return { markdown: undefined, matchedProperty: undefined, availableProperties: properties }

  const relativeIndex = headings.slice(propsIndex + 1).findIndex((heading) => (
    heading.level === 3 && normalizeHeading(heading.title) === normalizeHeading(property)
  ))
  if (relativeIndex < 0) return { markdown: undefined, matchedProperty: undefined, availableProperties: properties }

  const headingIndex = propsIndex + 1 + relativeIndex
  const heading = headings[headingIndex]
  return {
    markdown: markdown.slice(heading.start, sectionEnd(markdown, headings, headingIndex)).trim(),
    matchedProperty: heading.title,
    availableProperties: properties,
  }
}
