import { build } from 'esbuild'
import { chmod, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mcpOutputDirectory = path.join(repoRoot, 'bin/mcp')
const launcherPath = path.join(repoRoot, 'bin/kongponents-mcp.js')

await mkdir(mcpOutputDirectory, { recursive: true })
await build({
  entryPoints: [path.join(repoRoot, 'mcp/stdio.ts')],
  outfile: path.join(mcpOutputDirectory, 'server.js'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node20',
  packages: 'bundle',
  sourcemap: false,
  minify: false,
  banner: { js: '/* Kongponents MCP server — generated bundle */' },
})

const launcher = `#!/usr/bin/env node
const major = Number(process.versions.node.split('.')[0])
if (major < 20) {
  console.error('Kongponents MCP requires Node.js 20 or newer. The Kongponents Vue library can still be used on its supported older Node.js versions.')
  process.exitCode = 1
} else {
  import('./mcp/server.js').catch((error) => {
    console.error('Unable to start Kongponents MCP:', error)
    process.exitCode = 1
  })
}
`
await writeFile(launcherPath, launcher, 'utf8')
await chmod(launcherPath, 0o755)
process.stderr.write('Built Kongponents MCP server.\n')
