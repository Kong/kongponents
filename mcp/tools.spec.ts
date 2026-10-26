import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadSnapshot } from './load-snapshot'
import { createToolHandlers } from './tools'
import { extractComponentProperty, extractDocumentationScope, listComponentProperties } from './lib/markdown'
import { searchDocumentation } from './lib/search'

const snapshot = loadSnapshot(path.resolve('bin/mcp-data'))
const handlers = createToolHandlers(snapshot)

describe('Kongponents MCP snapshot', () => {
  it('contains all public documentation and component records', () => {
    expect(snapshot.docs.length).toBeGreaterThan(40)
    expect(snapshot.components).toHaveLength(48)
    expect(snapshot.components.every((component) => component.sourceFiles.length > 0)).toBe(true)
    expect(snapshot.docs.find((doc) => doc.path === '/guide/')?.canonicalUrl).toBe('https://kongponents.konghq.com/guide/')
    expect(snapshot.docs.find((doc) => doc.path === '/guide/mcp-server')?.content).toContain('## Available tools')
  })

  it('contains source styles', () => {
    expect(snapshot.components.find((component) => component.exports.includes('KButton'))?.styleBlocks.length).toBeGreaterThan(0)
  })

  it('scopes every component and round-trips every indexed property', () => {
    for (const component of snapshot.components) {
      const doc = snapshot.docs.find((candidate) => candidate.path === component.docPath)
      expect(doc, `Missing docs for ${component.exports[0]}`).toBeDefined()
      const scoped = extractDocumentationScope(doc!.content, component.docHeading)
      expect(scoped, `Missing documentation scope for ${component.exports[0]}`).toBeDefined()
      for (const property of listComponentProperties(scoped!)) {
        expect(
          extractComponentProperty(scoped!, property).matchedProperty,
          `Property lookup failed for ${component.exports[0]}.${property}`,
        ).toBe(property)
      }
    }
  })
})

describe('Kongponents MCP tools', () => {
  it('resolves components by export, title, slug, and alias', () => {
    for (const identifier of ['KPop', 'Popover', 'popover', 'KPopover']) {
      const result = handlers.getComponentDocs([identifier])
      expect(result.isError).not.toBe(true)
      expect(result.content[0]).toMatchObject({ type: 'text' })
      expect(result.content[0].type === 'text' && result.content[0].text).toContain('# Popover')
    }
  })

  it('resolves deprecated public aliases discovered from the export catalog', () => {
    const result = handlers.getComponentDocs(['KDropdownMenu'])
    expect(result.isError).not.toBe(true)
    expect(result.content[0].type === 'text' && result.content[0].text).toContain('# KDropdown')
  })

  it('returns suggestions for unknown components', () => {
    const result = handlers.getComponentDocs(['KButon'])
    expect(result.isError).toBe(true)
    expect(result.content[0].type === 'text' && result.content[0].text).toContain('KButton')
  })

  it('returns only selected component documentation sections', () => {
    const result = handlers.getComponentDocs(['KButton'], ['Props'])
    expect(result.isError).not.toBe(true)
    const text = result.content[0].type === 'text' ? result.content[0].text : ''
    expect(text).toContain('## Props')
    expect(text).not.toContain('## Slots')
    expect(result.structuredContent).toBeUndefined()
  })

  it('returns one exact component property without the rest of the props', () => {
    const result = handlers.getComponentProperty('KButton', 'appearance')
    expect(result.isError).not.toBe(true)
    const text = result.content[0].type === 'text' ? result.content[0].text : ''
    expect(text).toContain('### appearance')
    expect(text).not.toContain('### size')
    expect(result.structuredContent).toBeUndefined()
  })

  it('does not return a slot with the same name as a requested property', () => {
    const result = handlers.getComponentProperty('KButton', 'default')
    expect(result.isError).toBe(true)
    expect(result.content[0].type === 'text' && result.content[0].text).not.toContain('default slot allows')
  })

  it('returns nested component table props without parent component props', () => {
    const docsResult = handlers.getComponentDocs(['KDropdownItem'], ['Props'])
    const propertyResult = handlers.getComponentProperty('KDropdownItem', 'item')
    const docsText = docsResult.content[0].type === 'text' ? docsResult.content[0].text : ''
    const propertyText = propertyResult.content[0].type === 'text' ? propertyResult.content[0].text : ''

    expect(docsResult.isError).not.toBe(true)
    expect(docsText).toContain('| `item`')
    expect(docsText).not.toContain('triggerText')
    expect(propertyResult.isError).not.toBe(true)
    expect(propertyText).toContain('| `item`')
    expect(propertyText).not.toContain('triggerText')
  })

  it.each([
    ['KCatalogItem', 'item'],
    ['KCodeBlockIconButton', 'active'],
    ['KSkeletonBox', 'width'],
  ])('resolves nested heading-based props for %s', (component, property) => {
    const result = handlers.getComponentProperty(component, property)
    expect(result.isError).not.toBe(true)
    expect(result.content[0].type === 'text' && result.content[0].text).toContain(property)
  })

  it.each([
    ['KButton', 'disabled'],
    ['KInput', 'required'],
    ['KToaster', 'title'],
  ])('resolves attributes documented outside the direct prop heading level for %s', (component, property) => {
    const result = handlers.getComponentProperty(component, property)
    expect(result.isError).not.toBe(true)
  })

  it('lists available properties when an exact property is unknown', () => {
    const result = handlers.getComponentProperty('KButton', 'not-a-prop')
    expect(result.isError).toBe(true)
    expect(result.content[0].type === 'text' && result.content[0].text).toContain('appearance')
  })

  it('returns content tools as text without metadata-only structured content', () => {
    const results = [
      handlers.getComponentDocs(['KButton']),
      handlers.getComponentProperty('KButton', 'appearance'),
      handlers.getComponentSourceCode(['KButton']),
      handlers.getComponentSourceStyles(['KButton']),
      handlers.searchDocs('theming'),
      handlers.getDocs('/components/button'),
    ]

    for (const result of results) {
      expect(result.isError).not.toBe(true)
      expect(result.structuredContent).toBeUndefined()
      expect(result.content[0].type === 'text' && result.content[0].text.length).toBeGreaterThan(0)
    }
  })

  it('searches documentation with title matches before content matches', () => {
    const results = searchDocumentation(snapshot.docs, 'theming')
    expect(results[0].path).toBe('/guide/theming')
  })

  it('finds a confirmation modal from a natural-language query', () => {
    const results = searchDocumentation(snapshot.docs, 'confirmation modal confirm action')
    expect(results[0].path).toBe('/components/modal')
    expect(results[0].snippet).toContain('confirm their action')
    expect(new Set(results.map((result) => result.score)).size).toBeGreaterThan(1)
  })

  it('normalizes documentation paths without exposing the filesystem', () => {
    expect(handlers.getDocs('components/button.md').isError).not.toBe(true)
    expect(handlers.getDocs('/components/button.html').isError).not.toBe(true)
    expect(handlers.getDocs('../../package.json').isError).toBe(true)
  })
})
