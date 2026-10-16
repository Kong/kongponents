export type SnapshotFormat = 'json' | 'gzip'

export const snapshotFilename = (format: SnapshotFormat): string =>
  format === 'json' ? 'snapshot.json' : 'snapshot.json.gz'
