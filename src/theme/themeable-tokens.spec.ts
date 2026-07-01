import { describe, it, expect } from 'vitest'
import { KUI_THEMEABLE_TOKENS } from '@kong/design-tokens/themeable-tokens'

describe('KUI_THEMEABLE_TOKENS (from @kong/design-tokens)', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(KUI_THEMEABLE_TOKENS)).toBe(true)
    expect(KUI_THEMEABLE_TOKENS.length).toBeGreaterThan(0)
  })

  it('every entry starts with --kui-', () => {
    for (const token of KUI_THEMEABLE_TOKENS) {
      expect(token).toMatch(/^--kui-/)
    }
  })

  it('contains no duplicate entries', () => {
    const set = new Set(KUI_THEMEABLE_TOKENS)
    expect(set.size).toBe(KUI_THEMEABLE_TOKENS.length)
  })

  it('contains key semantic tokens', () => {
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-color-text-primary')
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-color-background')
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-border-radius-30')
  })

  it('contains component tokens for pilot components', () => {
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-button-border-radius-medium')
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-card-padding')
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-input-shadow-border-hover')
    expect(KUI_THEMEABLE_TOKENS).toContain('--kui-badge-border-radius')
  })

  it('contains breakpoint tokens', () => {
    const breakpoints = KUI_THEMEABLE_TOKENS.filter(t => t.includes('breakpoint'))
    expect(breakpoints).toHaveLength(5)
  })
})
