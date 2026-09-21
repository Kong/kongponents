import { parse as parseSfc } from '@vue/compiler-sfc'
import { KUI_THEMEABLE_TOKENS } from '@kong/design-tokens/tokens/themeable-tokens'
import {
  classicDay,
  classicNight,
  electricLimeDay,
  electricLimeDayHighContrast,
  electricLimeNight,
  electricLimeNightHighContrast,
} from '@kong/design-tokens/themes'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { createComponentCatalog, UNDOCUMENTED_COMPONENT_EXPORTS } from './catalog'
import type { ComponentCatalogDefinition, ComponentRecord, DocumentationPage, DocumentationSection, McpSnapshot, SnapshotFile, StyleBlock } from './types'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOCS_ROOT = path.join(REPO_ROOT, 'docs')
const OUTPUT_PATH = path.join(REPO_ROOT, 'bin/mcp-data/snapshot.json')
const DEPLOYED_HOSTNAME = 'https://kongponents.konghq.com'

/** Convert a documentation route into the public URL shipped in MCP responses. */
const canonicalUrlForRoute = (route: string): string => route.endsWith('/')
  ? `${DEPLOYED_HOSTNAME}${route}`
  : `${DEPLOYED_HOSTNAME}${route}.html`

const toPosix = (value: string): string => value.split(path.sep).join('/')

/** Recursively collect matching files in deterministic path order. */
const walk = async (directory: string, predicate: (filePath: string) => boolean): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      return walk(absolutePath, predicate)
    }
    return predicate(absolutePath) ? [absolutePath] : []
  }))
  return files.flat().sort()
}

/** Map a docs-relative Markdown path to its VitePress route. */
const routeFromDoc = (relativePath: string): string => {
  const withoutExtension = relativePath.replace(/\.md$/, '')
  if (withoutExtension === 'index') return '/'
  return `/${withoutExtension.replace(/\/index$/, '/')}`
}

/** Classify routes for list/search filtering in the MCP API. */
const sectionFromRoute = (route: string): DocumentationSection => {
  if (route.startsWith('/components/')) return 'components'
  if (route.startsWith('/guide/')) return 'guide'
  return 'home'
}

/** Prefer frontmatter titles and fall back to the first Markdown H1. */
const titleFromMarkdown = (content: string, frontmatter: Record<string, unknown>, sourcePath: string): string => {
  if (typeof frontmatter.title === 'string') return frontmatter.title
  const heading = content.match(/^#\s+(.+)$/m)?.[1]
  if (heading) return heading.replace(/`/g, '')
  throw new Error(`Unable to determine documentation title for ${sourcePath}`)
}

/** Split optional YAML frontmatter from the original Markdown body. */
const parseFrontmatter = (raw: string): { data: Record<string, unknown>, content: string } => {
  if (!raw.startsWith('---\n')) return { data: {}, content: raw }
  const closingDelimiter = raw.indexOf('\n---\n', 4)
  if (closingDelimiter < 0) return { data: {}, content: raw }
  const yaml = raw.slice(4, closingDelimiter)
  const parsed = parseYaml(yaml)
  return {
    data: parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {},
    content: raw.slice(closingDelimiter + 5),
  }
}

/** Read public Markdown verbatim; internal implementation plans are intentionally excluded. */
const readDocumentation = async (): Promise<DocumentationPage[]> => {
  const files = await walk(DOCS_ROOT, (filePath) => filePath.endsWith('.md') && !filePath.includes(`${path.sep}plans${path.sep}`))
  return Promise.all(files.map(async (absolutePath) => {
    const sourcePath = toPosix(path.relative(REPO_ROOT, absolutePath))
    const relativePath = toPosix(path.relative(DOCS_ROOT, absolutePath))
    const raw = await readFile(absolutePath, 'utf8')
    const parsed = parseFrontmatter(raw)
    const route = routeFromDoc(relativePath)
    return {
      path: route,
      sourcePath,
      title: titleFromMarkdown(parsed.content, parsed.data, sourcePath),
      section: sectionFromRoute(route),
      canonicalUrl: canonicalUrlForRoute(route),
      frontmatter: parsed.data,
      content: raw,
    }
  }))
}

/** Include runtime TypeScript and Vue files while excluding every test variant. */
const isProductionSource = (filePath: string): boolean => {
  if (!/\.(ts|vue)$/.test(filePath)) return false
  return !/\.(?:cy|spec|browser\.spec)\.ts$/.test(filePath)
}

/** Read a repository file while storing a portable, repository-relative path. */
const readSnapshotFile = async (absolutePath: string): Promise<SnapshotFile> => ({
  path: toPosix(path.relative(REPO_ROOT, absolutePath)),
  content: await readFile(absolutePath, 'utf8'),
})

/** Bundle production sources, public types, and extracted SFC styles for one catalog record. */
const readComponent = async (definition: ComponentCatalogDefinition): Promise<ComponentRecord> => {
  const sourcePaths = (await Promise.all(definition.sourceDirectories.map(async (directory) => {
    const absoluteDirectory = path.join(REPO_ROOT, directory)
    return walk(absoluteDirectory, isProductionSource)
  }))).flat()

  const sourceFiles = await Promise.all(sourcePaths.map(readSnapshotFile))
  const styleBlocks: StyleBlock[] = []
  for (const sourceFile of sourceFiles.filter((file) => file.path.endsWith('.vue'))) {
    const parsed = parseSfc(sourceFile.content, { filename: sourceFile.path })
    if (parsed.errors.length) {
      throw new Error(`Unable to parse ${sourceFile.path}: ${parsed.errors.join(', ')}`)
    }
    parsed.descriptor.styles.forEach((style, index) => {
      styleBlocks.push({
        path: `${sourceFile.path}#style-${index + 1}`,
        content: style.content.trim(),
        lang: style.lang ?? 'css',
        scoped: style.scoped ?? false,
      })
    })
  }

  const typeFiles = await Promise.all((definition.typeFiles ?? []).map((filePath) => readSnapshotFile(path.join(REPO_ROOT, filePath))))

  return {
    slug: definition.slug,
    title: definition.title,
    docPath: definition.docPath,
    docHeading: definition.docHeading,
    exports: definition.exports,
    aliases: definition.aliases,
    deprecated: definition.deprecated,
    sourceFiles,
    styleBlocks,
    typeFiles,
  }
}

interface ComponentExport {
  name: string
  sourcePath: string
}

/** Parse the package's public default exports and their component-relative source paths. */
const readComponentExports = async (): Promise<ComponentExport[]> => {
  const source = await readFile(path.join(REPO_ROOT, 'src/components/index.ts'), 'utf8')
  return [...source.matchAll(/export \{ default as (\w+) \} from ['"]([^'"]+)['"]/g)]
    .map((match) => ({ name: match[1], sourcePath: match[2] }))
}

/** Enforce complete docs/export coverage and unique user-facing component identifiers. */
const validateCatalog = (docs: DocumentationPage[], catalog: ComponentCatalogDefinition[], componentExports: ComponentExport[]): void => {
  const componentDocPaths = docs.filter((doc) => doc.section === 'components').map((doc) => doc.path).sort()
  const catalogDocPaths = [...new Set(catalog.map((entry) => entry.docPath))].sort()
  const missingCatalogEntries = componentDocPaths.filter((docPath) => !catalogDocPaths.includes(docPath))
  const missingDocs = catalogDocPaths.filter((docPath) => !componentDocPaths.includes(docPath))
  if (missingCatalogEntries.length || missingDocs.length) {
    throw new Error(`Component catalog mismatch. Missing catalog entries: ${missingCatalogEntries.join(', ') || 'none'}. Missing docs: ${missingDocs.join(', ') || 'none'}.`)
  }

  const exportedNames = new Set(componentExports.map(({ name }) => name))
  const catalogedExports = new Set(catalog.flatMap((entry) => [...entry.exports, ...(entry.aliases ?? [])]))
  const unaccountedExports = [...exportedNames]
    .filter((exportName) => !catalogedExports.has(exportName) && !UNDOCUMENTED_COMPONENT_EXPORTS[exportName])
  if (unaccountedExports.length) {
    throw new Error(`Public component exports missing from the MCP catalog: ${unaccountedExports.join(', ')}.`)
  }

  const seen = new Map<string, string>()
  for (const entry of catalog) {
    for (const key of [entry.slug, ...entry.exports, ...(entry.aliases ?? [])]) {
      const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, '')
      const owner = seen.get(normalized)
      if (owner && owner !== entry.slug) throw new Error(`Duplicate component identifier: ${key}`)
      seen.set(normalized, entry.slug)
    }
    for (const exportName of entry.exports) {
      if (!exportedNames.has(exportName)) throw new Error(`Documented component export does not exist: ${exportName}`)
    }
  }
}

/** Assemble the version-matched, offline snapshot consumed by the bundled stdio server. */
const main = async (): Promise<void> => {
  const docs = await readDocumentation()
  const componentExports = await readComponentExports()
  const typeFilePaths = (await walk(path.join(REPO_ROOT, 'src/types'), (filePath) => filePath.endsWith('.ts')))
    .map((filePath) => toPosix(path.relative(REPO_ROOT, filePath)))
  const catalog = createComponentCatalog({ docs, componentExports, typeFilePaths })
  validateCatalog(docs, catalog, componentExports)
  const components = await Promise.all(catalog.map(readComponent))
  const sharedStylePaths = await walk(path.join(REPO_ROOT, 'src/styles'), (filePath) => /\.(?:css|scss|sass)$/.test(filePath))
  const sharedStyles = await Promise.all(sharedStylePaths.map(readSnapshotFile))

  const snapshot: McpSnapshot = {
    schemaVersion: 1,
    docs,
    components,
    sharedStyles,
    themeTokens: [...KUI_THEMEABLE_TOKENS],
    themes: {
      'classic-day': classicDay,
      'classic-night': classicNight,
      'electric-lime-day': electricLimeDay,
      'electric-lime-day-high-contrast': electricLimeDayHighContrast,
      'electric-lime-night': electricLimeNight,
      'electric-lime-night-high-contrast': electricLimeNightHighContrast,
    },
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot)}\n`, 'utf8')
  process.stderr.write(`Generated Kongponents MCP snapshot: ${docs.length} docs, ${components.length} components.\n`)
}

await main()
