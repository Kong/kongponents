import { describe, it, expect } from 'vitest'
import { KONGPONENTS_COMPONENT_TOKENS } from './component-tokens'
import { KONGPONENTS_THEME_TOKENS } from './contract'

/** Naming grammar: --kui-<component>-<segment>[-<segment>...] with no trailing dash. */
const COMPONENT_TOKEN_GRAMMAR = /^--kui-[a-z]+-[a-z0-9]+(?:-[a-z0-9]+)*$/

describe('KONGPONENTS_COMPONENT_TOKENS — registry integrity', () => {
  it('is a non-empty array of strings', () => {
    expect(Array.isArray(KONGPONENTS_COMPONENT_TOKENS)).toBe(true)
    expect(KONGPONENTS_COMPONENT_TOKENS.length).toBeGreaterThan(0)
    for (const t of KONGPONENTS_COMPONENT_TOKENS) {
      expect(typeof t).toBe('string')
    }
  })

  it('every entry follows the --kui-<component>-* naming grammar', () => {
    for (const token of KONGPONENTS_COMPONENT_TOKENS) {
      expect(token, `"${token}" does not match the component-token naming grammar`).toMatch(COMPONENT_TOKEN_GRAMMAR)
    }
  })

  it('contains no duplicate entries', () => {
    const seen = new Set<string>()
    for (const token of KONGPONENTS_COMPONENT_TOKENS) {
      expect(seen.has(token), `Duplicate entry: "${token}"`).toBe(false)
      seen.add(token)
    }
  })

  it('every entry is present in KONGPONENTS_THEME_TOKENS (contract must include all component tokens)', () => {
    const contractSet = new Set<string>(KONGPONENTS_THEME_TOKENS)
    for (const token of KONGPONENTS_COMPONENT_TOKENS) {
      expect(contractSet.has(token), `"${token}" is in the component registry but absent from KONGPONENTS_THEME_TOKENS — regenerate the contract`).toBe(true)
    }
  })

  it('no entry is also a semantic token (component tokens must not overlap the semantic tier)', () => {
    // Semantic tokens are those in the contract that are NOT component tokens.
    const componentSet = new Set<string>(KONGPONENTS_COMPONENT_TOKENS)
    const semanticTokens = new Set<string>(KONGPONENTS_THEME_TOKENS.filter(t => !componentSet.has(t)))
    for (const token of KONGPONENTS_COMPONENT_TOKENS) {
      expect(semanticTokens.has(token), `"${token}" appears in both the component registry and the semantic tier — it should be in only one`).toBe(false)
    }
  })
})
