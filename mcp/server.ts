import { McpServer } from '@modelcontextprotocol/server'
import { z } from 'zod'
import { createToolHandlers } from './tools'
import type { McpSnapshot } from './types'

const componentListSchema = z.object({
  components: z.array(z.string().min(1)).min(1).max(10).describe('One to ten component names, exports, or slugs.'),
})
const sectionSchema = z.enum(['home', 'guide', 'components']).optional()
const readOnlyAnnotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

export const createServer = (snapshot: McpSnapshot, version: string): McpServer => {
  const server = new McpServer(
    { name: 'kongponents', version },
    {
      instructions: 'Use this server as the source of truth for Kongponents APIs. Prefer get_component_property for one prop, or get_component_docs with sections for a focused answer. Call list_components or search_docs to discover content before requesting complete documentation, source, or styles. The snapshot matches the installed @kong/kongponents version.',
    },
  )
  const handlers = createToolHandlers(snapshot)

  server.registerTool('list_components', {
    title: 'List Kongponents components',
    description: 'List documented public Kongponents components, exports, slugs, and deprecation status.',
    inputSchema: z.object({ query: z.string().optional().describe('Optional title, export, or slug filter.') }),
    annotations: readOnlyAnnotations,
  }, ({ query }) => handlers.listComponents(query))

  server.registerTool('get_component_docs', {
    title: 'Get Kongponents component documentation',
    description: 'Get complete or selected version-matched Markdown documentation sections and examples for one to ten Kongponents components.',
    inputSchema: componentListSchema.extend({
      sections: z.array(z.string().trim().min(1)).min(1).max(10).optional().describe('Optional top-level component section names such as Props, Slots, Events, or Overview.'),
    }),
    annotations: readOnlyAnnotations,
  }, ({ components, sections }) => handlers.getComponentDocs(components, sections))

  server.registerTool('get_component_property', {
    title: 'Get one Kongponents component property',
    description: 'Get the focused documentation and examples for one exact component prop. Prefer this over full component docs when only one prop is needed.',
    inputSchema: z.object({
      component: z.string().trim().min(1).describe('Component name, export, alias, or slug.'),
      property: z.string().trim().min(1).describe('Exact documented prop heading, for example appearance or modelValue.'),
    }),
    annotations: readOnlyAnnotations,
  }, ({ component, property }) => handlers.getComponentProperty(component, property))

  server.registerTool('get_component_source_code', {
    title: 'Get Kongponents component source code',
    description: 'Get Vue and TypeScript production source plus public types for one to ten documented components.',
    inputSchema: componentListSchema,
    annotations: readOnlyAnnotations,
  }, ({ components }) => handlers.getComponentSourceCode(components))

  server.registerTool('get_component_source_styles', {
    title: 'Get Kongponents component source styles',
    description: 'Get raw Vue CSS/SCSS style blocks for components, optionally including shared Kongponents SCSS.',
    inputSchema: z.object({
      components: componentListSchema.shape.components,
      includeShared: z.boolean().default(false).describe('Include shared Kongponents SCSS sources.'),
    }),
    annotations: readOnlyAnnotations,
  }, ({ components, includeShared }) => handlers.getComponentSourceStyles(components, includeShared))

  server.registerTool('list_docs', {
    title: 'List Kongponents documentation',
    description: 'List all available Kongponents documentation pages and paths.',
    inputSchema: z.object({ section: sectionSchema, query: z.string().optional() }),
    annotations: readOnlyAnnotations,
  }, ({ section, query }) => handlers.listDocs(section, query))

  server.registerTool('search_docs', {
    title: 'Search Kongponents documentation',
    description: 'Search all version-matched Kongponents guides and component documentation and return ranked snippets.',
    inputSchema: z.object({
      query: z.string().trim().min(2),
      section: sectionSchema,
      limit: z.number().int().min(1).max(25).default(10),
    }),
    annotations: readOnlyAnnotations,
  }, ({ query, section, limit }) => handlers.searchDocs(query, section, limit))

  server.registerTool('get_docs', {
    title: 'Get a Kongponents documentation page',
    description: 'Get complete original Markdown for an exact Kongponents documentation path.',
    inputSchema: z.object({ path: z.string().min(1).describe('Path such as /guide/usage or /components/button.') }),
    annotations: readOnlyAnnotations,
  }, ({ path }) => handlers.getDocs(path))

  return server
}
