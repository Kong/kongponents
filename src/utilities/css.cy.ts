import { normalizeSize } from './css'

describe('normalizeSize', () => {
  it('handles numbers', () => {
    const sizeNum = 500
    const result = normalizeSize(sizeNum)

    expect(result).equal(`${sizeNum}px`)
  })

  it('handles integer strings', () => {
    const sizeStr = '500'
    const result = normalizeSize(sizeStr)

    expect(result).equal(`${sizeStr}px`)
  })

  it('handles floats', () => {
    const sizeNum = 500.5
    const result = normalizeSize(sizeNum)

    expect(result).equal(`${sizeNum}px`)
  })

  it('handles float strings', () => {
    const sizeStr = '500.500'
    const result = normalizeSize(sizeStr)

    expect(result).equal('500.5px')
  })

  it('handles auto', () => {
    const sizeStr = 'auto'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })

  it('handles percentages', () => {
    const sizeStr = '500%'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })

  it('handles vh', () => {
    const sizeStr = '500vh'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })

  it('handles vw', () => {
    const sizeStr = '500vw'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })

  it('handles px', () => {
    const sizeStr = '500px'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })

  it('handles invalid values', () => {
    const sizeStr = 'foo'
    const result = normalizeSize(sizeStr)

    expect(result).equal(sizeStr)
  })
})

