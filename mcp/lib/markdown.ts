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

const directSectionHeadings = (markdown: string, headings: Heading[]): Heading[] => {
  const rootHeading = headings[0]
  const sectionLevel = rootHeading ? rootHeading.level + 1 : 2
  return headings.filter((heading) => heading.level === sectionLevel)
}

/** Restrict a shared documentation page to one nested component heading. */
export const extractDocumentationScope = (markdown: string, scopeHeading?: string): string | undefined => {
  if (!scopeHeading) return markdown
  const headings = parseHeadings(markdown)
  const scopeIndex = headings.findIndex((heading) => normalizeHeading(heading.title) === normalizeHeading(scopeHeading))
  if (scopeIndex < 0) return undefined
  const scope = headings[scopeIndex]
  return markdown.slice(scope.start, sectionEnd(markdown, headings, scopeIndex)).trim()
}

export const listDocumentationSections = (markdown: string): string[] => unique(
  directSectionHeadings(markdown, parseHeadings(markdown)).map((heading) => heading.title),
)

export const extractDocumentationSections = (markdown: string, requestedSections: string[]) => {
  const headings = parseHeadings(markdown)
  const sectionHeadings = directSectionHeadings(markdown, headings)
  const availableSections = unique(sectionHeadings.map((heading) => heading.title))
  const requested = unique(requestedSections.map((section) => section.trim()).filter(Boolean))
  const chunks: string[] = []
  const matchedSections: string[] = []

  for (const section of requested) {
    if (normalizeHeading(section) === 'overview') {
      const overviewEnd = sectionHeadings[0]?.start ?? markdown.length
      const overview = markdown.slice(0, overviewEnd).trim()
      if (overview) {
        chunks.push(overview)
        matchedSections.push('Overview')
      }
      continue
    }

    const heading = sectionHeadings.find((candidate) => normalizeHeading(candidate.title) === normalizeHeading(section))
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

interface PropertyEntry {
  title: string
  markdown: string
}

const isApiSection = (title: string): boolean => {
  const normalized = normalizeHeading(title)
  return normalized === 'props'
    || normalized.endsWith('props')
    || normalized === 'arguments'
    || normalized === 'htmlattributes'
    || normalized === 'attributebinding'
}

const tablePropertyEntries = (sectionMarkdown: string): PropertyEntry[] => {
  const lines = sectionMarkdown.split('\n')
  const entries: PropertyEntry[] = []

  for (let index = 0; index < lines.length - 2; index++) {
    const header = lines[index]
    const separator = lines[index + 1]
    if (!header.trim().startsWith('|') || !/^\s*\|?(?:\s*:?-+:?\s*\|)+\s*$/.test(separator)) continue

    for (let rowIndex = index + 2; rowIndex < lines.length; rowIndex++) {
      const row = lines[rowIndex]
      if (!row.trim().startsWith('|')) break
      const firstCell = row.split('|')[1]?.trim().replace(/[`*_]/g, '')
      if (!firstCell) continue
      entries.push({
        title: firstCell,
        markdown: `### ${firstCell}\n\n${header}\n${separator}\n${row}`,
      })
    }
  }

  return entries
}

const headingPropertyEntries = (markdown: string, headings: Heading[], sectionIndex: number): PropertyEntry[] => {
  const section = headings[sectionIndex]
  const end = sectionEnd(markdown, headings, sectionIndex)
  const candidates = headings
    .map((heading, index) => ({ heading, index }))
    .filter(({ heading }) => heading.start > section.start && heading.start < end && heading.level === section.level + 1)
  const entries: PropertyEntry[] = []

  for (const { heading, index } of candidates) {
    if (normalizeHeading(heading.title) === 'htmlattributes') {
      const containerEnd = sectionEnd(markdown, headings, index)
      for (const nested of headings.filter((candidate) => (
        candidate.start > heading.start
        && candidate.start < containerEnd
        && candidate.level === heading.level + 1
      ))) {
        const nestedIndex = headings.indexOf(nested)
        entries.push({
          title: nested.title,
          markdown: markdown.slice(nested.start, Math.min(sectionEnd(markdown, headings, nestedIndex), containerEnd)).trim(),
        })
      }
      continue
    }

    entries.push({
      title: heading.title,
      markdown: markdown.slice(heading.start, Math.min(sectionEnd(markdown, headings, index), end)).trim(),
    })
  }

  return entries
}

const componentPropertyEntries = (markdown: string): PropertyEntry[] => {
  const headings = parseHeadings(markdown)
  const apiSections = directSectionHeadings(markdown, headings)
    .filter((heading) => isApiSection(heading.title))
  const entries: PropertyEntry[] = []

  for (const section of apiSections) {
    const sectionIndex = headings.indexOf(section)
    const end = sectionEnd(markdown, headings, sectionIndex)
    const firstNestedHeading = headings.find((heading) => heading.start > section.start && heading.start < end)
    const sectionMarkdown = markdown.slice(section.start, firstNestedHeading?.start ?? end).trim()
    entries.push(...headingPropertyEntries(markdown, headings, sectionIndex))
    entries.push(...tablePropertyEntries(sectionMarkdown))
  }

  return entries.filter((entry, index) => (
    entries.findIndex((candidate) => normalizeHeading(candidate.title) === normalizeHeading(entry.title)) === index
  ))
}

export const listComponentProperties = (markdown: string): string[] => componentPropertyEntries(markdown).map(({ title }) => title)

export const extractComponentProperty = (markdown: string, property: string) => {
  const entries = componentPropertyEntries(markdown)
  const matched = entries.find((entry) => normalizeHeading(entry.title) === normalizeHeading(property))
  return {
    markdown: matched?.markdown,
    matchedProperty: matched?.title,
    availableProperties: entries.map(({ title }) => title),
  }
}
