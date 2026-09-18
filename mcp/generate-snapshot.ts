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
import { COMPONENT_CATALOG } from './catalog'
import type { ComponentRecord, DocumentationPage, DocumentationSection, McpSnapshot, SnapshotFile, StyleBlock } from './types'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOCS_ROOT = path.join(REPO_ROOT, 'docs')
const OUTPUT_PATH = path.join(REPO_ROOT, 'bin/mcp-data/snapshot.json')
const DEPLOYED_HOSTNAME = 'https://kongponents.konghq.com'

const canonicalUrlForRoute = (route: string): string => route.endsWith('/')
  ? `${DEPLOYED_HOSTNAME}${route}`
  : `${DEPLOYED_HOSTNAME}${route}.html`

const toPosix = (value: string): string => value.split(path.sep).join('/')

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

const routeFromDoc = (relativePath: string): string => {
  const withoutExtension = relativePath.replace(/\.md$/, '')
  if (withoutExtension === 'index') return '/'
  return `/${withoutExtension.replace(/\/index$/, '/')}`
}

const sectionFromRoute = (route: string): DocumentationSection => {
  if (route.startsWith('/components/')) return 'components'
  if (route.startsWith('/guide/')) return 'guide'
  return 'home'
}

const titleFromMarkdown = (content: string, frontmatter: Record<string, unknown>, sourcePath: string): string => {
  if (typeof frontmatter.title === 'string') return frontmatter.title
  const heading = content.match(/^#\s+(.+)$/m)?.[1]
  if (heading) return heading.replace(/`/g, '')
  throw new Error(`Unable to determine documentation title for ${sourcePath}`)
}

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

const isProductionSource = (filePath: string): boolean => {
  if (!/\.(ts|vue)$/.test(filePath)) return false
  return !/\.(?:cy|spec|browser\.spec)\.ts$/.test(filePath)
}

const readSnapshotFile = async (absolutePath: string): Promise<SnapshotFile> => ({
  path: toPosix(path.relative(REPO_ROOT, absolutePath)),
  content: await readFile(absolutePath, 'utf8'),
})

const readComponent = async (definition: typeof COMPONENT_CATALOG[number]): Promise<ComponentRecord> => {
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
    exports: definition.exports,
    aliases: definition.aliases,
    deprecated: definition.deprecated,
    sourceFiles,
    styleBlocks,
    typeFiles,
  }
}

const validateCatalog = async (docs: DocumentationPage[]): Promise<void> => {
  const componentDocPaths = docs.filter((doc) => doc.section === 'components').map((doc) => doc.path).sort()
  const catalogDocPaths = COMPONENT_CATALOG.map((entry) => entry.docPath).sort()
  const missingCatalogEntries = componentDocPaths.filter((docPath) => !catalogDocPaths.includes(docPath))
  const missingDocs = catalogDocPaths.filter((docPath) => !componentDocPaths.includes(docPath))
  if (missingCatalogEntries.length || missingDocs.length) {
    throw new Error(`Component catalog mismatch. Missing catalog entries: ${missingCatalogEntries.join(', ') || 'none'}. Missing docs: ${missingDocs.join(', ') || 'none'}.`)
  }

  const componentExportsSource = await readFile(path.join(REPO_ROOT, 'src/components/index.ts'), 'utf8')
  const exportedNames = new Set([...componentExportsSource.matchAll(/export \{ default as (\w+) \}/g)].map((match) => match[1]))
  const seen = new Map<string, string>()
  for (const entry of COMPONENT_CATALOG) {
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

const main = async (): Promise<void> => {
  const docs = await readDocumentation()
  await validateCatalog(docs)
  const components = await Promise.all(COMPONENT_CATALOG.map(readComponent))
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
