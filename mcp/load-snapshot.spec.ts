import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'
import { afterEach, describe, expect, it } from 'vitest'
import { loadSnapshot } from './load-snapshot'

const originalFormat = process.env.SNAPSHOT_FORMAT
const directories: string[] = []
const payload = { schemaVersion: 1, docs: [], components: [], sharedStyles: [] }
const json = Buffer.from(JSON.stringify(payload))

const fixture = (files: Record<string, Buffer>): string => {
  const directory = mkdtempSync(path.join(tmpdir(), 'kongponents-snapshot-'))
  directories.push(directory)
  for (const [filename, content] of Object.entries(files)) writeFileSync(path.join(directory, filename), content)
  return directory
}

afterEach(() => {
  if (originalFormat === undefined) delete process.env.SNAPSHOT_FORMAT
  else process.env.SNAPSHOT_FORMAT = originalFormat
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

describe('loadSnapshot', () => {
  it('reads a compressed snapshot even when SNAPSHOT_FORMAT=json is set at runtime', () => {
    process.env.SNAPSHOT_FORMAT = 'json'
    expect(loadSnapshot(fixture({ 'snapshot.json.gz': gzipSync(json) }))).toEqual(payload)
  })

  it('prefers the compressed snapshot when both formats exist', () => {
    process.env.SNAPSHOT_FORMAT = 'json'
    expect(loadSnapshot(fixture({
      'snapshot.json.gz': gzipSync(json),
      'snapshot.json': Buffer.from('{}'),
    }))).toEqual(payload)
  })

  it('reads plain JSON when the compressed snapshot is absent', () => {
    expect(loadSnapshot(fixture({ 'snapshot.json': json }))).toEqual(payload)
  })

  it('accepts a directory URL without a trailing slash', () => {
    const directory = fixture({ 'snapshot.json.gz': gzipSync(json) })
    expect(loadSnapshot(pathToFileURL(directory))).toEqual(payload)
  })
})
