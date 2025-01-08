import { normalizeHighlightedLines } from './lineHighlighting'

describe('normalizeHighlightedLines', () => {
  it('converts string expression to lines', () => {
    expect(normalizeHighlightedLines('1,2,4-6', 10)).eql([1, 2, 4, 5, 6])
    expect(normalizeHighlightedLines('15', 10)).eql([])
    expect(normalizeHighlightedLines('7,5-9,10-9,12,0,3,1', 11)).eql([1, 3, 5, 6, 7, 8, 9, 10])
    expect(normalizeHighlightedLines('1,2,3', 0)).eql([])
    expect(normalizeHighlightedLines('1,1,3-3,5-6,5-6', 10)).eql([1, 3, 5, 6])
  })

  it('normalizes ranges to lines', () => {
    expect(normalizeHighlightedLines([1, 2, [4, 6]], 10)).eql([1, 2, 4, 5, 6])
    expect(normalizeHighlightedLines([15], 10)).eql([])
    expect(normalizeHighlightedLines([7, [5, 9], [10, 9], 12, 0, 3, 1], 11)).eql([1, 3, 5, 6, 7, 8, 9, 10])
    expect(normalizeHighlightedLines([1, 2, 3], 0)).eql([])
    expect(normalizeHighlightedLines([1, 1, [3, 3], [5, 6], [5, 6]], 10)).eql([1, 3, 5, 6])
  })

  it('throws error for invalid expression', () => {
    expect(() => normalizeHighlightedLines('', 10)).to.throw('Invalid line number expression.')
    expect(() => normalizeHighlightedLines('foo', 10)).to.throw('Invalid line number expression.')
    expect(() => normalizeHighlightedLines('1,2,4-6,-5', 10)).to.throw('Invalid line number expression.')
  })
})
