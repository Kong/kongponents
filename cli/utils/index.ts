export * from './strings'
export * from './kongponents'

export function sleep(ms = 2200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
