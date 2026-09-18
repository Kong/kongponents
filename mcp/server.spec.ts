import { Client, InMemoryTransport } from '@modelcontextprotocol/client'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createServer } from './server'
import type { McpSnapshot } from './types'

const clients: Client[] = []
const snapshot = JSON.parse(readFileSync(path.resolve('bin/mcp-data/snapshot.json'), 'utf8')) as McpSnapshot

afterEach(async () => {
  await Promise.all(clients.splice(0).map((client) => client.close()))
})

describe('Kongponents MCP protocol', () => {
  it('registers and calls all read-only tools', async () => {
    const server = createServer(snapshot, '0.0.0-test')
    const client = new Client({ name: 'kongponents-mcp-test', version: '1.0.0' })
    clients.push(client)
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])

    const { tools } = await client.listTools()
    expect(tools.map((tool) => tool.name)).toEqual([
      'list_components',
      'get_component_docs',
      'get_component_source_code',
      'get_component_source_styles',
      'list_docs',
      'search_docs',
      'get_docs',
      'get_theme_variables',
    ])
    expect(tools.every((tool) => tool.annotations?.readOnlyHint === true)).toBe(true)

    const result = await client.callTool({ name: 'get_component_docs', arguments: { components: ['KButton'] } })
    expect(result.isError).not.toBe(true)
    expect(result.content[0]).toMatchObject({ type: 'text' })
    expect(result.content[0].type === 'text' && result.content[0].text).toContain('# Button')

    await server.close()
  })
})
