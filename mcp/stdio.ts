import { serveStdio } from '@modelcontextprotocol/server/stdio'
import { readFileSync } from 'node:fs'
import { createServer } from './server'
import type { McpSnapshot } from './types'

const snapshot = JSON.parse(readFileSync(new URL('../mcp-data/snapshot.json', import.meta.url), 'utf8')) as McpSnapshot
const packageJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string }

void serveStdio(() => createServer(snapshot, packageJson.version))
