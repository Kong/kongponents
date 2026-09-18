import type { ComponentRecord, DocumentationPage, McpSnapshot } from '../types'

export const normalizeIdentifier = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const identifiersFor = (component: ComponentRecord): string[] => [
  component.slug,
  component.title,
  ...component.exports,
  ...(component.aliases ?? []),
]

const editDistance = (left: string, right: string): number => {
  const rows = Array.from({ length: left.length + 1 }, () => Array<number>(right.length + 1).fill(0))
  for (let index = 0; index <= left.length; index++) rows[index][0] = index
  for (let index = 0; index <= right.length; index++) rows[0][index] = index
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      rows[leftIndex][rightIndex] = Math.min(
        rows[leftIndex - 1][rightIndex] + 1,
        rows[leftIndex][rightIndex - 1] + 1,
        rows[leftIndex - 1][rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      )
    }
  }
  return rows[left.length][right.length]
}

export const componentSuggestions = (snapshot: McpSnapshot, value: string): string[] => {
  const normalized = normalizeIdentifier(value)
  return snapshot.components
    .map((component) => ({
      name: component.exports[0],
      distance: Math.min(...identifiersFor(component).map((identifier) => editDistance(normalized, normalizeIdentifier(identifier)))),
    }))
    .sort((left, right) => left.distance - right.distance || left.name.localeCompare(right.name))
    .slice(0, 3)
    .map(({ name }) => name)
}

export const resolveComponent = (snapshot: McpSnapshot, value: string): ComponentRecord | undefined => {
  const normalized = normalizeIdentifier(value)
  return snapshot.components.find((component) => identifiersFor(component).some((identifier) => normalizeIdentifier(identifier) === normalized))
}

export const normalizeDocPath = (value: string): string => {
  let normalized = value.trim().replace(/^https?:\/\/kongponents\.konghq\.com/i, '')
  normalized = normalized.replace(/\.(?:md|html)$/, '')
  if (!normalized.startsWith('/')) normalized = `/${normalized}`
  if (normalized === '/guide') normalized = '/guide/'
  if (normalized.length > 1 && normalized.endsWith('/') && normalized !== '/guide/') normalized = normalized.slice(0, -1)
  return normalized
}

export const resolveDoc = (snapshot: McpSnapshot, value: string): DocumentationPage | undefined => {
  const normalized = normalizeDocPath(value)
  return snapshot.docs.find((doc) => doc.path === normalized)
}

export const docSuggestions = (snapshot: McpSnapshot, value: string): string[] => {
  const normalized = normalizeDocPath(value)
  return snapshot.docs
    .map((doc) => ({ path: doc.path, distance: editDistance(normalized, doc.path) }))
    .sort((left, right) => left.distance - right.distance || left.path.localeCompare(right.path))
    .slice(0, 3)
    .map(({ path }) => path)
}
