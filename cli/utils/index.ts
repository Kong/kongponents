export * from './strings.js'
export * from './kongponents.js'

export function sleep(ms = 2200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
