import { describe, it, expect } from 'vitest'
import { defineKongponentsTheme } from './defineKongponentsTheme'

describe('defineKongponentsTheme', () => {
  it('returns the exact same object reference (identity helper)', () => {
    const theme = { '--kui-color-text-primary': '#6f28ff' }
    expect(defineKongponentsTheme(theme)).toBe(theme)
  })

  it('passes through an empty object', () => {
    const theme = {}
    expect(defineKongponentsTheme(theme)).toBe(theme)
  })

  it('preserves all token entries without mutation', () => {
    const theme = {
      '--kui-color-text-primary': '#0044f4',
      '--kui-border-radius-30': '999px',
    }
    const result = defineKongponentsTheme(theme)
    expect(result).toEqual(theme)
    expect(Object.keys(result)).toHaveLength(2)
  })
})
