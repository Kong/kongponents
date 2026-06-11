import { describe, it, expect } from 'vitest'
import { themeToStyleRecord, themeToCssVars } from './themeToCssVars'

describe('themeToStyleRecord', () => {
  it('converts token entries to a flat style record', () => {
    const result = themeToStyleRecord({
      '--kui-color-text-primary': '#0044f4',
      '--kui-border-radius-30': '999px',
    })
    expect(result).toEqual({
      '--kui-color-text-primary': '#0044f4',
      '--kui-border-radius-30': '999px',
    })
  })

  it('returns an empty record for an empty theme', () => {
    expect(themeToStyleRecord({})).toEqual({})
  })

  it('excludes tokens whose value is undefined', () => {
    // TypeScript enforces string values, but a cast simulates a partial/spread scenario.
    const theme = {
      '--kui-color-text-primary': '#0044f4',
      '--kui-color-background': undefined,
    } as Record<string, string | undefined>
    const result = themeToStyleRecord(theme as Parameters<typeof themeToStyleRecord>[0])
    expect(result).toHaveProperty('--kui-color-text-primary', '#0044f4')
    expect(result).not.toHaveProperty('--kui-color-background')
  })

  it('excludes tokens whose value is null', () => {
    const theme = {
      '--kui-color-text-primary': '#0044f4',
      '--kui-color-background': null,
    } as Record<string, string | null>
    const result = themeToStyleRecord(theme as Parameters<typeof themeToStyleRecord>[0])
    expect(result).toHaveProperty('--kui-color-text-primary', '#0044f4')
    expect(result).not.toHaveProperty('--kui-color-background')
  })

  it('preserves token insertion order', () => {
    const theme = {
      '--kui-color-text-primary': 'a',
      '--kui-color-background': 'b',
      '--kui-border-radius-30': 'c',
    }
    expect(Object.keys(themeToStyleRecord(theme))).toEqual([
      '--kui-color-text-primary',
      '--kui-color-background',
      '--kui-border-radius-30',
    ])
  })
})

describe('themeToCssVars', () => {
  it('wraps declarations in :root by default', () => {
    const css = themeToCssVars({ '--kui-color-text-primary': '#0044f4' })
    expect(css).toBe(':root {\n  --kui-color-text-primary: #0044f4;\n}')
  })

  it('uses a custom selector when provided', () => {
    const css = themeToCssVars(
      { '--kui-color-text-primary': '#6f28ff' },
      '[data-kui-theme="portal"]',
    )
    expect(css).toMatch(/^\[data-kui-theme="portal"\]/)
    expect(css).toContain('--kui-color-text-primary: #6f28ff;')
  })

  it('produces correct multi-token output with exact formatting', () => {
    const css = themeToCssVars({
      '--kui-color-text-primary': '#0044f4',
      '--kui-border-radius-30': '999px',
    })
    expect(css).toBe(
      ':root {\n  --kui-color-text-primary: #0044f4;\n  --kui-border-radius-30: 999px;\n}',
    )
  })

  it('produces valid (empty-declarations) output for an empty theme', () => {
    const css = themeToCssVars({})
    expect(css).toBe(':root {\n\n}')
  })

  it('excludes tokens with undefined values from the CSS output', () => {
    const theme = {
      '--kui-color-text-primary': '#0044f4',
      '--kui-color-background': undefined,
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(css).toContain('--kui-color-text-primary: #0044f4;')
    expect(css).not.toContain('--kui-color-background')
  })
})
