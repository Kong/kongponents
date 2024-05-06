// Import types for custom commands
/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

import useUtilities from '@/composables/useUtilities'

const { getSizeFromString, stripRequiredLabel } = useUtilities()

describe('getSizeFromString(): ', () => {
  it('handles numbers', () => {
    const sizeStr = '500'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}px`)
  })

  it('handles auto', () => {
    const sizeStr = 'auto'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}`)
  })

  it('handles percentages', () => {
    const sizeStr = '500%'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}`)
  })

  it('handles vh', () => {
    const sizeStr = '500vh'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}`)
  })

  it('handles vw', () => {
    const sizeStr = '500vw'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}`)
  })

  it('handles px', () => {
    const sizeStr = '500px'
    const result = getSizeFromString(sizeStr)

    expect(result).equal(`${sizeStr}`)
  })
})

describe('stripRequiredLabel(): ', () => {
  it('does not change non-required fields', () => {
    const label = 'Name**'
    const result = stripRequiredLabel(label, false)

    expect(result).equal(label)
  })

  it('correctly modifies required fields with space', () => {
    const label = 'Name *'
    const expected = 'Name'
    const result = stripRequiredLabel(label, true)

    expect(result).equal(expected)
  })

  it('correctly modifies required fields with no space', () => {
    const label = 'Name*'
    const expected = 'Name'
    const result = stripRequiredLabel(label, true)

    expect(result).equal(expected)
  })
})
