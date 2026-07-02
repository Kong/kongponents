import { describe, it, expect } from 'vitest'
import { KUI_THEMEABLE_TOKENS } from '@kong/design-tokens/tokens/themeable-tokens'

describe('KUI_THEMEABLE_TOKENS (from @kong/design-tokens)', () => {
  it('is a non-empty array of token records', () => {
    expect(Array.isArray(KUI_THEMEABLE_TOKENS)).toBe(true)
    expect(KUI_THEMEABLE_TOKENS.length).toBeGreaterThan(0)
  })

  it('every record exposes name, description, category, and value', () => {
    for (const token of KUI_THEMEABLE_TOKENS) {
      expect(token.name).toMatch(/^--kui-/)
      expect(typeof token.description).toBe('string')
      expect(typeof token.category).toBe('string')
      // `value` is a string default, or `null` for value-less component tokens.
      expect(token.value === null || typeof token.value === 'string').toBe(true)
    }
  })

  it('contains no duplicate token names', () => {
    const names = KUI_THEMEABLE_TOKENS.map((token) => token.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('contains key semantic tokens', () => {
    const names = KUI_THEMEABLE_TOKENS.map((token) => token.name)
    expect(names).toContain('--kui-color-text-primary')
    expect(names).toContain('--kui-color-background')
    expect(names).toContain('--kui-border-radius-30')
  })

  it('contains component tokens for pilot components', () => {
    const names = KUI_THEMEABLE_TOKENS.map((token) => token.name)
    expect(names).toContain('--kui-button-border-radius-medium')
    expect(names).toContain('--kui-card-padding')
    expect(names).toContain('--kui-input-shadow-border-hover')
    expect(names).toContain('--kui-badge-border-radius')
  })

  it('marks value-less component tokens with category "component" and a null value', () => {
    const badge = KUI_THEMEABLE_TOKENS.find((token) => token.name === '--kui-badge-border-radius')
    expect(badge?.category).toBe('component')
    expect(badge?.value).toBeNull()
  })

  it('contains the 5 breakpoint tokens categorized as "breakpoint"', () => {
    const breakpoints = KUI_THEMEABLE_TOKENS.filter((token) => token.category === 'breakpoint')
    expect(breakpoints).toHaveLength(5)
  })
})
