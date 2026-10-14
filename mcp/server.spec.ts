import { Client, InMemoryTransport } from '@modelcontextprotocol/client'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { loadSnapshot } from './load-snapshot'
import { createServer } from './server'

const clients: Client[] = []
const snapshot = loadSnapshot(path.resolve('bin/mcp-data'))

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
      'get_component_property',
      'get_component_source_code',
      'get_component_source_styles',
      'list_docs',
      'search_docs',
      'get_docs',
    ])
    expect(tools.every((tool) => tool.annotations?.readOnlyHint === true)).toBe(true)

    const result = await client.callTool({ name: 'get_component_docs', arguments: { components: ['KButton'] } })
    expect(result.isError).not.toBe(true)
    expect(result.content[0]).toMatchObject({ type: 'text' })
    expect(result.content[0].type === 'text' && result.content[0].text).toContain('# Button')

    const propertyResult = await client.callTool({
      name: 'get_component_property',
      arguments: { component: 'KButton', property: 'appearance' },
    })
    expect(propertyResult.isError).not.toBe(true)
    expect(propertyResult.content[0].type === 'text' && propertyResult.content[0].text).toContain('### appearance')

    await server.close()
  })
})
