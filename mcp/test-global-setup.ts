import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = path.join(repoRoot, 'bin/mcp-data/snapshot.json')

/** Ensure MCP specs can run from a fresh checkout without relying on a preceding CI build. */
export default function setup(): void {
  if (!existsSync(snapshotPath)) {
    execFileSync('pnpm', ['build:mcp'], { cwd: repoRoot, stdio: 'inherit' })
  }
}
