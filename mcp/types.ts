export type DocumentationSection = 'home' | 'guide' | 'components'

export interface SnapshotFile {
  path: string
  content: string
}

export interface StyleBlock extends SnapshotFile {
  lang: string
  scoped: boolean
}

export interface DocumentationPage {
  path: string
  sourcePath: string
  title: string
  section: DocumentationSection
  canonicalUrl: string
  frontmatter: Record<string, unknown>
  content: string
}

export interface ComponentCatalogDefinition {
  slug: string
  title: string
  docPath: string
  docHeading?: string
  exports: string[]
  sourceDirectories: string[]
  typeFiles?: string[]
  aliases?: string[]
  deprecated?: boolean
}

export interface ComponentRecord extends Omit<ComponentCatalogDefinition, 'sourceDirectories' | 'typeFiles'> {
  sourceFiles: SnapshotFile[]
  styleBlocks: StyleBlock[]
  typeFiles: SnapshotFile[]
}

export interface McpSnapshot {
  schemaVersion: 1
  docs: DocumentationPage[]
  components: ComponentRecord[]
  sharedStyles: SnapshotFile[]
}
