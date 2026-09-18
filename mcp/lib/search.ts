import type { DocumentationPage, DocumentationSection } from '../types'

export interface SearchResult {
  title: string
  path: string
  section: DocumentationSection
  canonicalUrl: string
  snippet: string
  score: number
}

const createSnippet = (content: string, query: string): string => {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  const matchIndex = normalizedContent.toLowerCase().indexOf(query.toLowerCase())
  if (matchIndex < 0) return normalizedContent.slice(0, 220)
  const start = Math.max(0, matchIndex - 90)
  const end = Math.min(normalizedContent.length, matchIndex + query.length + 130)
  return `${start > 0 ? '…' : ''}${normalizedContent.slice(start, end)}${end < normalizedContent.length ? '…' : ''}`
}

const scoreDoc = (doc: DocumentationPage, query: string): number => {
  const normalizedQuery = query.toLowerCase()
  const title = doc.title.toLowerCase()
  const path = doc.path.toLowerCase()
  const content = doc.content.toLowerCase()
  if (title === normalizedQuery) return 100
  if (title.startsWith(normalizedQuery)) return 80
  if (path.startsWith(normalizedQuery) || path.startsWith(`/${normalizedQuery}`)) return 70
  if (title.includes(normalizedQuery)) return 60
  if (path.includes(normalizedQuery)) return 50
  if (content.includes(normalizedQuery)) return 10
  return 0
}

export const searchDocumentation = (
  docs: DocumentationPage[],
  query: string,
  section?: DocumentationSection,
  limit: number = 10,
): SearchResult[] => docs
  .filter((doc) => !section || doc.section === section)
  .map((doc) => ({ doc, score: scoreDoc(doc, query) }))
  .filter(({ score }) => score > 0)
  .sort((left, right) => right.score - left.score || left.doc.title.localeCompare(right.doc.title))
  .slice(0, limit)
  .map(({ doc, score }) => ({
    title: doc.title,
    path: doc.path,
    section: doc.section,
    canonicalUrl: doc.canonicalUrl,
    snippet: createSnippet(doc.content, query),
    score,
  }))
