import { describe, it, expect } from 'vitest'
import { KONGPONENTS_THEME_TOKENS } from './contract'
import { lightTheme, darkTheme, brandATheme, brandBTheme } from './themes'

describe('KONGPONENTS_THEME_TOKENS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(KONGPONENTS_THEME_TOKENS)).toBe(true)
    expect(KONGPONENTS_THEME_TOKENS.length).toBeGreaterThan(0)
  })

  it('every entry starts with --kui-', () => {
    for (const token of KONGPONENTS_THEME_TOKENS) {
      expect(token).toMatch(/^--kui-/)
    }
  })

  it('contains no duplicate entries', () => {
    const set = new Set(KONGPONENTS_THEME_TOKENS)
    expect(set.size).toBe(KONGPONENTS_THEME_TOKENS.length)
  })

  it('contains key structural tokens from the design system', () => {
    expect(KONGPONENTS_THEME_TOKENS).toContain('--kui-color-text-primary')
    expect(KONGPONENTS_THEME_TOKENS).toContain('--kui-color-background')
    expect(KONGPONENTS_THEME_TOKENS).toContain('--kui-border-radius-30')
  })

  it('does not contain breakpoint tokens (which cannot be consumed in @media queries)', () => {
    const breakpointTokens = KONGPONENTS_THEME_TOKENS.filter(t => t.includes('breakpoint'))
    expect(breakpointTokens).toHaveLength(0)
  })
})

describe('bundled theme objects', () => {
  const themes = [
    { name: 'lightTheme', theme: lightTheme },
    { name: 'darkTheme', theme: darkTheme },
    { name: 'brandATheme', theme: brandATheme },
    { name: 'brandBTheme', theme: brandBTheme },
  ]

  for (const { name, theme } of themes) {
    describe(name, () => {
      it('is a non-null object', () => {
        expect(theme).toBeDefined()
        expect(typeof theme).toBe('object')
        expect(theme).not.toBeNull()
      })

      it('has at least one token', () => {
        expect(Object.keys(theme).length).toBeGreaterThan(0)
      })

      it('every key is a valid KongponentsThemeToken', () => {
        const validTokens = new Set<string>(KONGPONENTS_THEME_TOKENS)
        for (const key of Object.keys(theme)) {
          expect(validTokens.has(key), `"${key}" is not in KONGPONENTS_THEME_TOKENS`).toBe(true)
        }
      })

      it('every value is a non-empty string', () => {
        for (const [token, value] of Object.entries(theme)) {
          expect(typeof value, `value for ${token} should be a string`).toBe('string')
          expect((value as string).length, `value for ${token} should not be empty`).toBeGreaterThan(0)
        }
      })
    })
  }
})
