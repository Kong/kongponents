import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'
import { snapshotFilename } from './snapshot-format'
import type { McpSnapshot } from './types'

/** Load the packaged snapshot, with plain JSON available for local debugging. */
export const loadSnapshot = (directory: string | URL): McpSnapshot => {
  const directoryPath = directory instanceof URL ? fileURLToPath(directory) : directory
  const format = existsSync(join(directoryPath, snapshotFilename('gzip'))) ? 'gzip' : 'json'
  const file = join(directoryPath, snapshotFilename(format))
  const data = readFileSync(file)
  return JSON.parse(format === 'json' ? data.toString('utf8') : gunzipSync(data).toString('utf8')) as McpSnapshot
}
