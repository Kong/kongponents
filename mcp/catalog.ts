import path from 'node:path'
import type { ComponentCatalogDefinition, DocumentationPage } from './types'

interface ComponentExport {
  name: string
  sourcePath: string
}

interface CatalogInput {
  docs: DocumentationPage[]
  componentExports: ComponentExport[]
  typeFilePaths: string[]
}

type PageOverride = Partial<Pick<ComponentCatalogDefinition, 'aliases' | 'deprecated' | 'exports' | 'typeFiles'>>

// Most pages follow the K{DocumentationTitle} convention. Keep only naming,
// type-file, and public-alias exceptions here so ordinary components require no
// MCP-specific registration when they are scaffolded.
const PAGE_OVERRIDES: Record<string, PageOverride> = {
  '/components/codeblock': { aliases: ['Code Block'], typeFiles: ['src/types/code-block.ts'] },
  '/components/datetime-picker': { typeFiles: ['src/types/date-time-picker.ts'] },
  '/components/dropdown': { aliases: ['KDropdownMenu'] },
  '/components/multiselect': { aliases: ['Multi Select'], typeFiles: ['src/types/multi-select.ts'] },
  '/components/popover': { aliases: ['KPopover', 'Pop'], exports: ['KPop'], typeFiles: ['src/types/popover.ts'] },
  '/components/table': { deprecated: true, typeFiles: ['src/types/table.ts'] },
  '/components/table-data': { typeFiles: ['src/types/table.ts'] },
  '/components/table-view': { typeFiles: ['src/types/table.ts'] },
  '/components/textarea': { aliases: ['Textarea', 'Text Area'], typeFiles: ['src/types/text-area.ts'] },
  '/components/theme-provider': { typeFiles: ['src/types/theme.ts'] },
  '/components/toaster': { exports: ['KToaster', 'ToastManager'], typeFiles: ['src/types/toaster.ts'] },
}

// Some documentation pages describe multiple public components. These records
// give each nested component an independent lookup and documentation scope.
const NESTED_COMPONENTS: Array<Omit<ComponentCatalogDefinition, 'sourceDirectories' | 'typeFiles'> & { typeFiles: string[] }> = [
  { slug: 'catalog-item', title: 'Catalog Item', docPath: '/components/catalog', docHeading: 'KCatalogItem', exports: ['KCatalogItem'], aliases: [], typeFiles: ['src/types/catalog.ts'] },
  { slug: 'code-block-icon-button', title: 'CodeBlock Icon Button', docPath: '/components/codeblock', docHeading: 'KCodeBlockIconButton', exports: ['KCodeBlockIconButton'], aliases: [], typeFiles: ['src/types/code-block.ts'] },
  { slug: 'dropdown-item', title: 'Dropdown Item', docPath: '/components/dropdown', docHeading: 'KDropdownItem', exports: ['KDropdownItem'], aliases: [], typeFiles: ['src/types/dropdown.ts'] },
  { slug: 'skeleton-box', title: 'Skeleton Box', docPath: '/components/skeleton', docHeading: 'KSkeletonBox', exports: ['KSkeletonBox'], aliases: [], typeFiles: ['src/types/skeleton.ts'] },
]

// Deprecated KModalFullscreen has no component reference page of its own. It
// remains a public compatibility export, but presenting KModal's API as its
// documentation would be misleading.
export const UNDOCUMENTED_COMPONENT_EXPORTS: Record<string, string> = {
  KModalFullscreen: 'Deprecated compatibility component; see the version 9 migration guide.',
}

const exportNameFromTitle = (title: string): string => {
  const compact = title.replace(/[^a-z0-9]/gi, '')
  return compact.startsWith('K') ? compact : `K${compact}`
}

const sourceDirectoryFor = (componentExport: ComponentExport): string => {
  const relativeSource = componentExport.sourcePath.replace(/^\.\//, '')
  return `src/components/${relativeSource.split('/')[0]}`
}

/** Build the catalog from public docs and exports, applying explicit metadata only where conventions are ambiguous. */
export const createComponentCatalog = ({ docs, componentExports, typeFilePaths }: CatalogInput): ComponentCatalogDefinition[] => {
  const exportsByName = new Map(componentExports.map((componentExport) => [componentExport.name, componentExport]))
  const availableTypeFiles = new Set(typeFilePaths)
  const componentDocs = docs.filter((doc) => doc.section === 'components')

  const catalog = componentDocs.map((doc): ComponentCatalogDefinition => {
    const override = PAGE_OVERRIDES[doc.path] ?? {}
    const exportNames = override.exports ?? [exportNameFromTitle(doc.title)]
    const primaryExport = exportsByName.get(exportNames[0])
    if (!primaryExport) {
      throw new Error(`Unable to match ${doc.sourcePath} to public export ${exportNames[0]}. Add a page override for non-standard naming.`)
    }

    const inferredTypeFile = `src/types/${path.posix.basename(doc.path)}.ts`
    const typeFiles = override.typeFiles ?? (availableTypeFiles.has(inferredTypeFile) ? [inferredTypeFile] : [])
    return {
      slug: doc.path.replace(/^\/components\//, ''),
      title: doc.title,
      docPath: doc.path,
      exports: exportNames,
      sourceDirectories: [sourceDirectoryFor(primaryExport)],
      typeFiles,
      aliases: override.aliases ?? [],
      deprecated: override.deprecated,
    }
  })

  for (const nested of NESTED_COMPONENTS) {
    if (!componentDocs.some((doc) => doc.path === nested.docPath)) continue
    const componentExport = exportsByName.get(nested.exports[0])
    if (!componentExport) throw new Error(`Nested component export does not exist: ${nested.exports[0]}`)
    catalog.push({ ...nested, sourceDirectories: [sourceDirectoryFor(componentExport)] })
  }

  return catalog.sort((left, right) => left.slug.localeCompare(right.slug))
}
