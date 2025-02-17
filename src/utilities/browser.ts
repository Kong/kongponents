export const IS_MAYBE_MAC = typeof navigator !== 'undefined' &&
  ('userAgentData' in navigator && navigator.userAgentData === 'macOS' ||
    navigator.platform?.toLowerCase().includes('mac'))

export const IS_MAYBE_FIREFOX = typeof navigator !== 'undefined' &&
  navigator.userAgent.includes('Firefox')

export function cssSupports(key: string, value: string): boolean {
  return typeof CSS !== 'undefined' && CSS.supports(key, value)
}

let scrollbarSize: number | null = null
export function getScrollbarSize(): number {
  if (scrollbarSize !== null) {
    return scrollbarSize
  }

  if (typeof document === 'undefined') {
    return 0
  }

  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.overflow = 'scroll'
  div.style.position = 'absolute'
  div.style.top = '-9999px'
  document.body.appendChild(div)
  scrollbarSize = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)
  return scrollbarSize
}
