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

    // A Windows pnpm.cmd needs a shell; pass the temp path through the environment so shell characters in it stay data.
    execFileSync('pnpm', ['pack', '--pack-destination', process.platform === 'win32' ? '"%MCP_PACK_DESTINATION%"' : temporaryDirectory], {
      cwd: repoRoot,
      stdio: 'ignore',
      shell: process.platform === 'win32',
      env: { ...process.env, MCP_PACK_DESTINATION: temporaryDirectory },
    })

    const tarball = readdirSync(temporaryDirectory).find((entry) => entry.endsWith('.tgz'))
    expect(tarball).toBeDefined()
    execFileSync('tar', ['-xzf', path.join(temporaryDirectory, tarball!), '-C', extractedDirectory])

    const packagedRoot = path.join(extractedDirectory, 'package')
    const executable = path.join(packagedRoot, 'bin/kongponents-mcp.js')
    expect(existsSync(path.join(packagedRoot, 'bin/mcp/server.js'))).toBe(true)
    expect(existsSync(path.join(packagedRoot, 'bin/mcp-data', process.env.SNAPSHOT_FORMAT === 'json' ? 'snapshot.json' : 'snapshot.json.gz'))).toBe(true)

    const transport = new StdioClientTransport({
      command: process.platform === 'win32' ? process.execPath : executable,
      args: process.platform === 'win32' ? [executable] : [],
      cwd: temporaryDirectory,
      stderr: 'pipe',
    })
    const client = new Client({ name: 'kongponents-mcp-package-test', version: '1.0.0' })

    try {
      await client.connect(transport)
      const { tools } = await client.listTools()
      expect(tools.map((tool) => tool.name)).toContain('get_component_docs')

      const componentList = await client.callTool({ name: 'list_components', arguments: { query: 'button' } })
      const docList = await client.callTool({ name: 'list_docs', arguments: { query: 'usage' } })
      expect(componentList.structuredContent).toMatchObject({ components: expect.any(Array) })
      expect(docList.structuredContent).toMatchObject({ docs: expect.any(Array) })

      const contentCalls = [
        { name: 'get_component_docs', arguments: { components: ['KButton'] }, expected: '## Props' },
        { name: 'get_component_property', arguments: { component: 'KButton', property: 'appearance' }, expected: '### appearance' },
        { name: 'get_component_source_code', arguments: { components: ['KButton'] }, expected: '<template>' },
        { name: 'get_component_source_styles', arguments: { components: ['KButton'] }, expected: 'scss' },
        { name: 'get_docs', arguments: { path: '/guide/usage' }, expected: '# Usage' },
        { name: 'search_docs', arguments: { query: 'confirmation modal confirm action' }, expected: 'confirm their action' },
      ]
      for (const { name, arguments: args, expected } of contentCalls) {
        const result = await client.callTool({ name, arguments: args })
        expect(result.isError, name).not.toBe(true)
        expect(result.structuredContent, name).toBeUndefined()
        expect(result.content[0].type === 'text' && result.content[0].text, name).toContain(expected)
      }

      const docs = await client.callTool({ name: 'get_docs', arguments: { path: '/guide/usage' } })
      expect(docs.content[0].type === 'text' && docs.content[0].text.length).toBeGreaterThan(1000)

      const search = await client.callTool({ name: 'search_docs', arguments: { query: 'confirmation modal confirm action' } })
      expect(search.content[0].type === 'text' && search.content[0].text).toContain('/components/modal')
    } finally {
      await client.close()
    }
  })
})
