import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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

describe('themeToCssVars — injection prevention', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('falls back to :root and warns when selector contains "}"', () => {
    const css = themeToCssVars({ '--kui-color-text-primary': '#fff' }, ':root } body::before { content: "x"')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe selector'))
    expect(css).toMatch(/^:root \{/)
    expect(css).not.toContain('body::before')
  })

  it('falls back to :root and warns when selector contains "{"', () => {
    const css = themeToCssVars({ '--kui-color-text-primary': '#fff' }, '.evil { color: red')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe selector'))
    expect(css).toMatch(/^:root \{/)
    expect(css).not.toContain('.evil')
  })

  it('skips a token and warns when its value contains "}" (rule breakout attempt)', () => {
    const theme = {
      '--kui-color-text-primary': '#0044f4',
      '--kui-color-background': 'red } .evil { color: blue',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-background"'))
    expect(css).toContain('--kui-color-text-primary: #0044f4;')
    expect(css).not.toContain('--kui-color-background')
    expect(css).not.toContain('.evil')
  })

  it('skips a token and warns when its key contains ";" (declaration injection attempt)', () => {
    const theme = {
      '--kui-color-text-primary; color': 'injected',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe token key'))
    expect(css).toContain('--kui-color-background: #fff;')
    expect(css).not.toContain('injected')
  })

  it('skips a token and warns when its key contains "{"', () => {
    const theme = {
      '--kui-color{ color: red': 'value',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe token key'))
    expect(css).not.toContain('color: red')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  it('does not warn and produces normal output for valid selector and safe values', () => {
    const css = themeToCssVars(
      { '--kui-color-text-primary': '#0044f4', '--kui-border-radius-30': '999px' },
      '[data-theme="dark"]',
    )
    expect(warnSpy).not.toHaveBeenCalled()
    expect(css).toMatch(/^\[data-theme="dark"\]/)
    expect(css).toContain('--kui-color-text-primary: #0044f4;')
    expect(css).toContain('--kui-border-radius-30: 999px;')
  })

  // --- semicolon injection ---

  it('falls back to :root and warns when selector contains ";" (at-rule injection)', () => {
    const css = themeToCssVars({ '--kui-color-text-primary': '#fff' }, "@import url('evil'); :root")
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe selector'))
    expect(css).toMatch(/^:root \{/)
    expect(css).not.toContain('@import')
  })

  it('skips a token and warns when its value contains ";" (declaration injection)', () => {
    const theme = {
      '--kui-color-text-primary': 'red; color: blue',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-text-primary"'))
    expect(css).not.toContain('--kui-color-text-primary')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  // --- brace injection in values ---

  it('skips a token and warns when its value contains "{" (block nesting attack)', () => {
    const theme = {
      '--kui-color-text-primary': 'red { background: blue',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-text-primary"'))
    expect(css).not.toContain('--kui-color-text-primary')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  // --- </style> XSS ---

  it('skips a token and warns when its value contains "</style" (style element closure / XSS)', () => {
    const theme = {
      '--kui-color-text-primary': 'red</style><script>alert(1)</script>',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-text-primary"'))
    expect(css).not.toContain('</style')
    expect(css).not.toContain('<script>')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  it('skips a token and warns when its value contains "</STYLE" (case-insensitive XSS check)', () => {
    const theme = {
      '--kui-color-text-primary': 'red</STYLE><script>alert(1)</script>',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-text-primary"'))
    expect(css).not.toContain('</STYLE')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  it('falls back to :root and warns when selector contains "</style"', () => {
    const css = themeToCssVars({ '--kui-color-text-primary': '#fff' }, ':root</style><script>alert(1)</script><style>')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe selector'))
    expect(css).toMatch(/^:root \{/)
    expect(css).not.toContain('<script>')
  })

  it('skips a token and warns when its key contains "</style"', () => {
    const theme = {
      '--kui-color</style><script>alert(1)</script>': '#fff',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe token key'))
    expect(css).not.toContain('<script>')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  // --- CSS unicode escape bypass ---

  it('skips a token and warns when its value contains a CSS unicode escape (e.g. \\7D = "}")', () => {
    // Without this check, the CSS parser would decode \7D to } and close the rule block early.
    const theme = {
      '--kui-color-text-primary': 'red\\7D .evil { color: blue',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe value for token "--kui-color-text-primary"'))
    expect(css).not.toContain('--kui-color-text-primary')
    expect(css).toContain('--kui-color-background: #fff;')
  })

  it('falls back to :root and warns when selector contains a CSS unicode escape (e.g. \\3B = ";")', () => {
    // Without this check, the CSS parser would decode \3B to ; enabling at-rule injection.
    const css = themeToCssVars({ '--kui-color-text-primary': '#fff' }, ':root\\3B @import url(evil)')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe selector'))
    expect(css).toMatch(/^:root \{/)
    expect(css).not.toContain('@import')
  })

  it('skips a token and warns when its key contains a CSS unicode escape (e.g. \\3B = ";")', () => {
    const theme = {
      '--kui-color\\3B color': 'injected',
      '--kui-color-background': '#fff',
    } as Parameters<typeof themeToCssVars>[0]
    const css = themeToCssVars(theme)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unsafe token key'))
    expect(css).not.toContain('injected')
    expect(css).toContain('--kui-color-background: #fff;')
  })
})
