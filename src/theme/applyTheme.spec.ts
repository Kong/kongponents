import { describe, it, expect, afterEach } from 'vitest'
import { applyTheme } from './applyTheme'

/**
 * Each test uses a fresh <div> to sidestep the module-level WeakMap state;
 * tests that use document.documentElement clean up in afterEach.
 */

const makeEl = (): HTMLDivElement => document.createElement('div')

afterEach(() => {
  // Remove any tokens that tests may have written to the real document root.
  const root = document.documentElement
  for (const token of Array.from(root.style)) {
    if (token.startsWith('--kui-')) {
      root.style.removeProperty(token)
    }
  }
})

describe('applyTheme — basic application', () => {
  it('sets CSS custom properties on the provided element', () => {
    const el = makeEl()
    applyTheme({ '--kui-color-text-primary': '#0044f4', '--kui-border-radius-30': '999px' }, el)
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')
    expect(el.style.getPropertyValue('--kui-border-radius-30')).toBe('999px')
  })

  it('defaults to document.documentElement when no target is provided', () => {
    applyTheme({ '--kui-color-text-primary': '#0044f4' })
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')
  })

  it('applies multiple tokens in a single call', () => {
    const el = makeEl()
    const theme = {
      '--kui-color-text-primary': '#ff0000',
      '--kui-color-background': '#ffffff',
      '--kui-border-radius-30': '8px',
    }
    applyTheme(theme, el)
    for (const [token, value] of Object.entries(theme)) {
      expect(el.style.getPropertyValue(token)).toBe(value)
    }
  })
})

describe('applyTheme — theme switching (stale-token removal)', () => {
  it('removes tokens from the previous theme that are absent from the new theme', () => {
    const el = makeEl()
    applyTheme({ '--kui-color-text-primary': '#0044f4', '--kui-border-radius-30': '999px' }, el)
    // Switch to a theme that only has one of the previous tokens.
    applyTheme({ '--kui-color-text-primary': '#6f28ff' }, el)
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')
    // The token absent from the new theme must be removed.
    expect(el.style.getPropertyValue('--kui-border-radius-30')).toBe('')
  })

  it('updates values for tokens present in both old and new theme', () => {
    const el = makeEl()
    applyTheme({ '--kui-color-text-primary': '#0044f4' }, el)
    applyTheme({ '--kui-color-text-primary': '#6f28ff' }, el)
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')
  })

  it('removes all previously applied tokens when called with undefined', () => {
    const el = makeEl()
    applyTheme({ '--kui-color-text-primary': '#0044f4', '--kui-color-background': '#fff' }, el)
    applyTheme(undefined, el)
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('')
    expect(el.style.getPropertyValue('--kui-color-background')).toBe('')
  })

  it('is idempotent — re-applying the same theme produces the same result', () => {
    const el = makeEl()
    const theme = { '--kui-color-text-primary': '#0044f4' }
    applyTheme(theme, el)
    applyTheme(theme, el)
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')
  })
})

describe('applyTheme — first call on a fresh element', () => {
  it('does not error when the element has no prior theme (WeakMap miss)', () => {
    const el = makeEl()
    expect(() => applyTheme({ '--kui-color-text-primary': '#0044f4' }, el)).not.toThrow()
    expect(el.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')
  })

  it('calling with undefined on a never-touched element is a no-op', () => {
    const el = makeEl()
    expect(() => applyTheme(undefined, el)).not.toThrow()
    expect(el.style.length).toBe(0)
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
