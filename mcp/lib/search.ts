import type { DocumentationPage, DocumentationSection } from '../types'

export interface SearchResult {
  title: string
  path: string
  section: DocumentationSection
  canonicalUrl: string
  snippet: string
  score: number
}

const queryTerms = (query: string): string[] => [...new Set(query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])]

const createSnippet = (content: string, terms: string[]): string => {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  const lowerContent = normalizedContent.toLowerCase()
  const matchIndexes = terms.map((term) => lowerContent.indexOf(term)).filter((index) => index >= 0)
  if (!matchIndexes.length) return normalizedContent.slice(0, 220)
  const starts = matchIndexes.map((index) => Math.max(0, index - 90))
  const start = starts.reduce((best, candidate) => {
    const coverage = (position: number) => terms.filter((term) => lowerContent.slice(position, position + 220).includes(term)).length
    return coverage(candidate) > coverage(best) ? candidate : best
  })
  const end = Math.min(normalizedContent.length, start + 220)
  return `${start > 0 ? '…' : ''}${normalizedContent.slice(start, end)}${end < normalizedContent.length ? '…' : ''}`
}

const scoreDoc = (doc: DocumentationPage, terms: string[], query: string): number => {
  if (!terms.length) return 0
  const title = doc.title.toLowerCase()
  const path = doc.path.toLowerCase()
  const content = doc.content.toLowerCase()
  const matches = terms.filter((term) => title.includes(term) || path.includes(term) || content.includes(term))
  if (matches.length < Math.min(2, terms.length)) return 0

  const termScore = matches.reduce((score, term) => score
    + (title.includes(term) ? 20 : 0)
    + (path.includes(term) ? 10 : 0)
    + (content.includes(term) ? 2 : 0), 0)
  const phraseScore = title === query ? 80 : title.includes(query) ? 40 : path.includes(query) ? 30 : 0
  return termScore + phraseScore + Math.round(20 * matches.length / terms.length)
}

export const searchDocumentation = (
  docs: DocumentationPage[],
  query: string,
  section?: DocumentationSection,
  limit: number = 10,
): SearchResult[] => {
  const terms = queryTerms(query)
  const normalizedQuery = query.trim().toLowerCase()
  return docs
    .filter((doc) => !section || doc.section === section)
    .map((doc) => ({ doc, score: scoreDoc(doc, terms, normalizedQuery) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.doc.title.localeCompare(right.doc.title))
    .slice(0, limit)
    .map(({ doc, score }) => ({
      title: doc.title,
      path: doc.path,
      section: doc.section,
      canonicalUrl: doc.canonicalUrl,
      snippet: createSnippet(doc.content, terms),
      score,
    }))
}
