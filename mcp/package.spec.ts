import { Client } from '@modelcontextprotocol/client'
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, describe, expect, it } from 'vitest'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const temporaryDirectories: string[] = []

afterAll(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true })
  }
})

describe('Kongponents MCP package', () => {
  it('starts the packaged executable and completes an initialize handshake over stdio', async () => {
    const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), 'kongponents-mcp-package-'))
    const extractedDirectory = path.join(temporaryDirectory, 'extracted')
    temporaryDirectories.push(temporaryDirectory)
    mkdirSync(extractedDirectory)

    execFileSync('pnpm', ['pack', '--pack-destination', temporaryDirectory], {
      cwd: repoRoot,
      stdio: 'ignore',
    })

    const tarball = readdirSync(temporaryDirectory).find((entry) => entry.endsWith('.tgz'))
    expect(tarball).toBeDefined()
    execFileSync('tar', ['-xzf', path.join(temporaryDirectory, tarball!), '-C', extractedDirectory])

    const packagedRoot = path.join(extractedDirectory, 'package')
    const executable = path.join(packagedRoot, 'bin/kongponents-mcp.js')
    expect(existsSync(path.join(packagedRoot, 'bin/mcp/server.js'))).toBe(true)
    expect(existsSync(path.join(packagedRoot, 'bin/mcp-data/snapshot.json'))).toBe(true)

    const transport = new StdioClientTransport({ command: executable, cwd: temporaryDirectory, stderr: 'pipe' })
    const client = new Client({ name: 'kongponents-mcp-package-test', version: '1.0.0' })

    try {
      await client.connect(transport)
      const { tools } = await client.listTools()
      expect(tools.map((tool) => tool.name)).toContain('get_component_docs')
    } finally {
      await client.close()
    }
  })
})
