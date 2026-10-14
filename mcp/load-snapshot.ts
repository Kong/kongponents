import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gunzipSync } from 'node:zlib'
import type { McpSnapshot } from './types'

/** Load the packaged snapshot, with plain JSON available for local debugging. */
export const loadSnapshot = (directory: string | URL): McpSnapshot => {
  const compressedFile = directory instanceof URL ? new URL('snapshot.json.gz', directory) : join(directory, 'snapshot.json.gz')
  const format = process.env.SNAPSHOT_FORMAT === 'json' || !existsSync(compressedFile) ? 'json' : 'gzip'
  const filename = format === 'json' ? 'snapshot.json' : 'snapshot.json.gz'
  const file = directory instanceof URL ? new URL(filename, directory) : join(directory, filename)
  const data = readFileSync(file)
  return JSON.parse(format === 'json' ? data.toString('utf8') : gunzipSync(data).toString('utf8')) as McpSnapshot
}
