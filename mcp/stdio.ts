import { serveStdio } from '@modelcontextprotocol/server/stdio'
import { readFileSync } from 'node:fs'
import { loadSnapshot } from './load-snapshot'
import { createServer } from './server'

const snapshot = loadSnapshot(new URL('../mcp-data/', import.meta.url))
const packageJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string }

void serveStdio(() => createServer(snapshot, packageJson.version))
