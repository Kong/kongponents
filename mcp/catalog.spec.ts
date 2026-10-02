import { describe, expect, it } from 'vitest'
import { createComponentCatalog } from './catalog'
import type { DocumentationPage } from './types'

const componentDoc = (path: string, title: string): DocumentationPage => ({
  path,
  sourcePath: `docs${path}.md`,
  title,
  section: 'components',
  canonicalUrl: `https://example.test${path}`,
  frontmatter: {},
  content: `# ${title}`,
})

describe('MCP component catalog discovery', () => {
  it('discovers a conventionally named component without a manual catalog entry', () => {
    const catalog = createComponentCatalog({
      docs: [componentDoc('/components/example-card', 'Example Card')],
      componentExports: [{ name: 'KExampleCard', sourcePath: './KExampleCard/KExampleCard.vue' }],
      typeFilePaths: ['src/types/example-card.ts'],
    })

    expect(catalog).toEqual([expect.objectContaining({
      slug: 'example-card',
      exports: ['KExampleCard'],
      sourceDirectories: ['src/components/KExampleCard'],
      typeFiles: ['src/types/example-card.ts'],
    })])
  })

  it('fails with an actionable error when docs and exports cannot be matched', () => {
    expect(() => createComponentCatalog({
      docs: [componentDoc('/components/example-card', 'Example Card')],
      componentExports: [],
      typeFilePaths: [],
    })).toThrow('Add a page override for non-standard naming')
  })
})
