import { describe, it, expect, afterEach } from 'vitest'
import { applyTheme } from './applyTheme'

const STYLE_ID = 'kongponents-theme'

const getStyleEl = (): HTMLStyleElement | null =>
  document.getElementById(STYLE_ID) as HTMLStyleElement | null

afterEach(() => {
  getStyleEl()?.remove()
})

describe('applyTheme — basic application', () => {
  it('injects a <style> element into <head>', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4' })
    expect(getStyleEl()).not.toBeNull()
    expect(getStyleEl()?.tagName).toBe('STYLE')
  })

  it('generates a :root {} block containing the theme tokens', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4', '--kui-border-radius-30': '999px' })
    const css = getStyleEl()!.textContent!
    expect(css).toContain(':root')
    expect(css).toContain('--kui-color-text-primary: #0044f4')
    expect(css).toContain('--kui-border-radius-30: 999px')
  })

  it('applies multiple tokens in a single call', () => {
    const theme = {
      '--kui-color-text-primary': '#ff0000',
      '--kui-color-background': '#ffffff',
      '--kui-border-radius-30': '8px',
    }
    applyTheme(theme)
    const css = getStyleEl()!.textContent!
    for (const [token, value] of Object.entries(theme)) {
      expect(css).toContain(`${token}: ${value}`)
    }
  })
})

describe('applyTheme — theme switching', () => {
  it('replaces the previous <style> element on re-apply', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4', '--kui-border-radius-30': '999px' })
    applyTheme({ '--kui-color-text-primary': '#6f28ff' })
    const styles = document.querySelectorAll(`#${STYLE_ID}`)
    expect(styles).toHaveLength(1)
    const css = (styles[0] as HTMLStyleElement).textContent!
    expect(css).toContain('--kui-color-text-primary: #6f28ff')
    // Stale token from first theme must be gone.
    expect(css).not.toContain('--kui-border-radius-30')
  })

  it('updates values for tokens present in both old and new theme', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4' })
    applyTheme({ '--kui-color-text-primary': '#6f28ff' })
    expect(getStyleEl()!.textContent).toContain('--kui-color-text-primary: #6f28ff')
  })

  it('removes the <style> element when called with undefined', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4' })
    applyTheme(undefined)
    expect(getStyleEl()).toBeNull()
  })

  it('is idempotent — re-applying the same theme produces one <style> element', () => {
    const theme = { '--kui-color-text-primary': '#0044f4' }
    applyTheme(theme)
    applyTheme(theme)
    expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1)
    expect(getStyleEl()!.textContent).toContain('--kui-color-text-primary: #0044f4')
  })

  it('A → B → A round-trip: only A tokens present after switching back', () => {
    applyTheme({ '--kui-color-text-primary': '#aaa', '--kui-border-radius-30': '4px' })
    applyTheme({ '--kui-color-background': '#fff' })
    applyTheme({ '--kui-color-text-primary': '#aaa', '--kui-border-radius-30': '4px' })
    const css = getStyleEl()!.textContent!
    expect(css).not.toContain('--kui-color-background')
    expect(css).toContain('--kui-color-text-primary: #aaa')
    expect(css).toContain('--kui-border-radius-30: 4px')
  })
})

describe('applyTheme — first call / no prior theme', () => {
  it('does not throw on first call', () => {
    expect(() => applyTheme({ '--kui-color-text-primary': '#0044f4' })).not.toThrow()
  })

  it('calling with undefined when no theme is applied is a no-op', () => {
    expect(() => applyTheme(undefined)).not.toThrow()
    expect(getStyleEl()).toBeNull()
  })
})

describe('applyTheme — SSR guard (no document)', () => {
  it('returns without throwing when document is undefined', () => {
    const original = globalThis.document
    // @ts-expect-error — simulating a non-browser environment
    delete globalThis.document
    expect(() => applyTheme({ '--kui-color-text-primary': '#0044f4' })).not.toThrow()
    globalThis.document = original
  })
})
