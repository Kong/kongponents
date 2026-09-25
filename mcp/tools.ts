import type { CallToolResult } from '@modelcontextprotocol/server'
import type { McpSnapshot } from './types'
import { componentSuggestions, docSuggestions, resolveComponent, resolveDoc } from './lib/catalog'
import { extractComponentProperty, extractDocumentationScope, extractDocumentationSections, listDocumentationSections } from './lib/markdown'
import { searchDocumentation } from './lib/search'

export type ToolResult = CallToolResult

const success = (text: string, structuredContent: Record<string, unknown>): ToolResult => ({
  content: [{ type: 'text', text }],
  structuredContent,
})

const failure = (message: string): ToolResult => ({
  content: [{ type: 'text', text: message }],
  structuredContent: { error: message },
  isError: true,
})

const componentSummary = (component: McpSnapshot['components'][number]) => ({
  title: component.title,
  slug: component.slug,
  docPath: component.docPath,
  exports: component.exports,
  deprecated: component.deprecated ?? false,
})

const headingAnchor = (heading: string): string => heading
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')

export const createToolHandlers = (snapshot: McpSnapshot) => ({
  listComponents: (query?: string): ToolResult => {
    const normalizedQuery = query?.trim().toLowerCase()
    const components = snapshot.components
      .filter((component) => !normalizedQuery || [component.title, component.slug, ...component.exports, ...(component.aliases ?? [])]
        .some((value) => value.toLowerCase().includes(normalizedQuery)))
      .map(componentSummary)
    const text = components.map((component) => `- ${component.exports.join(', ')} — ${component.title} (${component.docPath})${component.deprecated ? ' [deprecated]' : ''}`).join('\n')
    return success(text || 'No documented components matched the query.', { components })
  },

  getComponentDocs: (identifiers: string[], sections?: string[]): ToolResult => {
    const components = identifiers.map((identifier) => resolveComponent(snapshot, identifier))
    const invalidIndex = components.findIndex((component) => !component)
    if (invalidIndex >= 0) {
      const invalid = identifiers[invalidIndex]
      return failure(`Unknown component "${invalid}". Did you mean: ${componentSuggestions(snapshot, invalid).join(', ')}?`)
    }
    const results = components.map((component) => {
      const resolved = component!
      const doc = resolveDoc(snapshot, resolved.docPath)!
      const scopedMarkdown = extractDocumentationScope(doc.content, resolved.docHeading)
      if (!scopedMarkdown) throw new Error(`Unable to find documentation scope ${resolved.docHeading} for ${resolved.exports[0]}.`)
      const selection = sections?.length ? extractDocumentationSections(scopedMarkdown, sections) : undefined
      return {
        ...componentSummary(resolved),
        canonicalUrl: resolved.docHeading ? `${doc.canonicalUrl}#${headingAnchor(resolved.docHeading)}` : doc.canonicalUrl,
        markdown: selection?.markdown ?? scopedMarkdown,
        returnedSections: selection?.matchedSections ?? ['All'],
        availableSections: selection?.availableSections ?? ['Overview', ...listDocumentationSections(scopedMarkdown)],
      }
    })
    const emptySelection = results.find((result) => !result.markdown)
    if (emptySelection) {
      return failure(`None of the requested sections were found for ${emptySelection.exports[0]}. Available sections: ${emptySelection.availableSections.join(', ')}.`)
    }
    const metadata = results.map((result) => ({
      title: result.title,
      slug: result.slug,
      docPath: result.docPath,
      exports: result.exports,
      deprecated: result.deprecated,
      canonicalUrl: result.canonicalUrl,
      returnedSections: result.returnedSections,
      availableSections: result.availableSections,
    }))
    return success(results.map((result) => `# ${result.exports.join(', ')}\n\n${result.markdown}`).join('\n\n---\n\n'), { components: metadata })
  },

  getComponentProperty: (identifier: string, property: string): ToolResult => {
    const component = resolveComponent(snapshot, identifier)
    if (!component) return failure(`Unknown component "${identifier}". Did you mean: ${componentSuggestions(snapshot, identifier).join(', ')}?`)
    const doc = resolveDoc(snapshot, component.docPath)!
    const scopedMarkdown = extractDocumentationScope(doc.content, component.docHeading)
    if (!scopedMarkdown) return failure(`Documentation scope "${component.docHeading}" was not found for ${component.exports[0]}.`)
    const result = extractComponentProperty(scopedMarkdown, property)
    if (!result.markdown || !result.matchedProperty) {
      return failure(`Unknown property "${property}" for ${component.exports[0]}. Available properties: ${result.availableProperties.join(', ') || 'none documented'}.`)
    }
    return success(`# ${component.exports[0]}: ${result.matchedProperty}\n\n${result.markdown}`, {
      component: componentSummary(component),
      property: result.matchedProperty,
      canonicalUrl: component.docHeading ? `${doc.canonicalUrl}#${headingAnchor(component.docHeading)}` : doc.canonicalUrl,
    })
  },

  getComponentSourceCode: (identifiers: string[]): ToolResult => {
    const components = identifiers.map((identifier) => resolveComponent(snapshot, identifier))
    const invalidIndex = components.findIndex((component) => !component)
    if (invalidIndex >= 0) {
      const invalid = identifiers[invalidIndex]
      return failure(`Unknown component "${invalid}". Did you mean: ${componentSuggestions(snapshot, invalid).join(', ')}?`)
    }
    const results = components.map((component) => ({
      component: component!.exports[0],
      files: [...component!.sourceFiles, ...component!.typeFiles],
    }))
    const text = results.flatMap((result) => result.files.map((file) => `## ${result.component}: ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\``)).join('\n\n')
    return success(text, {
      components: results.map((result) => ({
        component: result.component,
        files: result.files.map((file) => ({ path: file.path, sizeChars: file.content.length })),
      })),
    })
  },

  getComponentSourceStyles: (identifiers: string[], includeShared: boolean = false): ToolResult => {
    const components = identifiers.map((identifier) => resolveComponent(snapshot, identifier))
    const invalidIndex = components.findIndex((component) => !component)
    if (invalidIndex >= 0) {
      const invalid = identifiers[invalidIndex]
      return failure(`Unknown component "${invalid}". Did you mean: ${componentSuggestions(snapshot, invalid).join(', ')}?`)
    }
    const results = components.map((component) => ({
      component: component!.exports[0],
      styles: component!.styleBlocks,
    }))
    const blocks = results.flatMap((result) => result.styles.map((style) => `## ${result.component}: ${style.path}\n\n\`\`\`${style.lang}\n${style.content}\n\`\`\``))
    if (includeShared) {
      blocks.push(...snapshot.sharedStyles.map((file) => `## Shared: ${file.path}\n\n\`\`\`scss\n${file.content}\n\`\`\``))
    }
    return success(blocks.join('\n\n'), {
      components: results.map((result) => ({
        component: result.component,
        styles: result.styles.map((style) => ({ path: style.path, lang: style.lang, scoped: style.scoped, sizeChars: style.content.length })),
      })),
      sharedStyles: includeShared ? snapshot.sharedStyles.map((file) => ({ path: file.path, sizeChars: file.content.length })) : [],
    })
  },

  listDocs: (section?: McpSnapshot['docs'][number]['section'], query?: string): ToolResult => {
    const normalizedQuery = query?.trim().toLowerCase()
    const docs = snapshot.docs
      .filter((doc) => (!section || doc.section === section) && (!normalizedQuery || doc.title.toLowerCase().includes(normalizedQuery) || doc.path.toLowerCase().includes(normalizedQuery)))
      .map(({ title, path, section: docSection, canonicalUrl }) => ({ title, path, section: docSection, canonicalUrl }))
    return success(docs.map((doc) => `- ${doc.title} — ${doc.path}`).join('\n') || 'No documentation pages matched the query.', { docs })
  },

  searchDocs: (query: string, section?: McpSnapshot['docs'][number]['section'], limit?: number): ToolResult => {
    const results = searchDocumentation(snapshot.docs, query, section, limit)
    return success(results.map((result) => `## ${result.title}\n${result.path}\n\n${result.snippet}`).join('\n\n') || 'No documentation content matched the query.', {
      results: results.map((result) => ({
        title: result.title,
        path: result.path,
        section: result.section,
        canonicalUrl: result.canonicalUrl,
        score: result.score,
      })),
    })
  },

  getDocs: (path: string): ToolResult => {
    const doc = resolveDoc(snapshot, path)
    if (!doc) return failure(`Unknown documentation path "${path}". Did you mean: ${docSuggestions(snapshot, path).join(', ')}?`)
    return success(doc.content, {
      doc: {
        path: doc.path,
        sourcePath: doc.sourcePath,
        title: doc.title,
        section: doc.section,
        canonicalUrl: doc.canonicalUrl,
        frontmatter: doc.frontmatter,
      },
    })
  },
})
