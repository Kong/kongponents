import type { CallToolResult } from '@modelcontextprotocol/server'
import type { McpSnapshot } from './types'
import { componentSuggestions, docSuggestions, resolveComponent, resolveDoc } from './lib/catalog'
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

  getComponentDocs: (identifiers: string[]): ToolResult => {
    const components = identifiers.map((identifier) => resolveComponent(snapshot, identifier))
    const invalidIndex = components.findIndex((component) => !component)
    if (invalidIndex >= 0) {
      const invalid = identifiers[invalidIndex]
      return failure(`Unknown component "${invalid}". Did you mean: ${componentSuggestions(snapshot, invalid).join(', ')}?`)
    }
    const results = components.map((component) => {
      const resolved = component!
      const doc = resolveDoc(snapshot, resolved.docPath)!
      return { ...componentSummary(resolved), canonicalUrl: doc.canonicalUrl, markdown: doc.content }
    })
    return success(results.map((result) => `# ${result.exports.join(', ')}\n\n${result.markdown}`).join('\n\n---\n\n'), { components: results })
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
    return success(text, { components: results })
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
    return success(blocks.join('\n\n'), { components: results, sharedStyles: includeShared ? snapshot.sharedStyles : [] })
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
    return success(results.map((result) => `## ${result.title}\n${result.path}\n\n${result.snippet}`).join('\n\n') || 'No documentation content matched the query.', { results })
  },

  getDocs: (path: string): ToolResult => {
    const doc = resolveDoc(snapshot, path)
    if (!doc) return failure(`Unknown documentation path "${path}". Did you mean: ${docSuggestions(snapshot, path).join(', ')}?`)
    return success(doc.content, { doc })
  },

  getThemeVariables: (theme?: string, category?: string, query?: string): ToolResult => {
    const normalizedTheme = theme?.trim().toLowerCase()
    if (normalizedTheme && !snapshot.themes[normalizedTheme]) {
      return failure(`Unknown theme "${theme}". Available themes: ${Object.keys(snapshot.themes).join(', ')}.`)
    }
    const normalizedCategory = category?.trim().toLowerCase()
    const normalizedQuery = query?.trim().toLowerCase()
    const tokens = snapshot.themeTokens.filter((token) => (
      (!normalizedCategory || token.category.toLowerCase() === normalizedCategory)
      && (!normalizedQuery || token.name.toLowerCase().includes(normalizedQuery) || token.description.toLowerCase().includes(normalizedQuery))
    )).map((token) => ({
      ...token,
      ...(normalizedTheme ? { themeValue: snapshot.themes[normalizedTheme][token.name] ?? null } : {}),
    }))
    const text = tokens.map((token) => `- ${token.name}: ${'themeValue' in token ? token.themeValue ?? token.value ?? 'unset' : token.value ?? 'unset'} — ${token.description}`).join('\n')
    return success(text || 'No theme variables matched the filters.', {
      theme: normalizedTheme,
      availableThemes: Object.keys(snapshot.themes),
      tokens,
    })
  },
})
