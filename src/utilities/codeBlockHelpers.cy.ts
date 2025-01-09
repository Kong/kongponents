import { getMatchingLineNumbers, escapeInnerHTML, escapeHTMLIfNeeded, normalizeHighlightedLines, highlightMatchingChars } from './codeBlockHelpers'

const code = `{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "<div class="title">Hello & Hi.</div>",
}
`

describe('getMatchingLineNumbers', () => {
  it('gets matched line numbers by exact match', () => {
    expect(getMatchingLineNumbers(code, 'true', false)).eql([7, 8, 9, 10, 11, 12, 13])
    expect(getMatchingLineNumbers(code, ' ', false)).eql([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21])
    expect(getMatchingLineNumbers(code, '<', false)).eql([21])
    expect(getMatchingLineNumbers(code, 'kong', false)).eql([])
  })

  it('gets matched line numbers by exact match with case sensitivity', () => {
    expect(getMatchingLineNumbers(code, 'TRUE', false)).eql([])
  })

  it('gets matched line numbers by regexp match', () => {
    expect(getMatchingLineNumbers(code, 'tru.', true)).eql([7, 8, 9, 10, 11, 12, 13])
    expect(getMatchingLineNumbers(code, '[ ]', true)).eql([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21])
    expect(getMatchingLineNumbers(code, '.', true)).eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22])
    expect(getMatchingLineNumbers(code, '<[^>]+>', true)).eql([21])
    expect(getMatchingLineNumbers(code, 'kong', true)).eql([])
  })

  it('gets matched line numbers by regexp match with case sensitivity', () => {
    expect(getMatchingLineNumbers(code, 'TRU.', true)).eql([])
  })
})

describe('escapeInnerHTML', () => {
  it('escapes only < and &', () => {
    expect(escapeInnerHTML('<script>alert("hi")</script>')).eq('&lt;script>alert("hi")&lt;/script>')
    expect(escapeInnerHTML('<div>&larr; & &rarr;</div>')).eq('&lt;div>&amp;larr; &amp; &amp;rarr;&lt;/div>')
    expect(escapeInnerHTML('foo')).eq('foo')
    expect(escapeInnerHTML('')).eq('')
  })
})

describe('escapeHTMLIfNeeded', () => {
  it('escapes only < and &', () => {
    const regex = /<&>/
    const escape = cy.spy((v: string) => v)

    expect(escapeHTMLIfNeeded('{ foo: "bar" }', regex, escape)).eq('{ foo: "bar" }')
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(escape).not.have.been.called
  })

  it('escapes only < and & by default', () => {
    expect(escapeHTMLIfNeeded('<script>alert("hi")</script>')).eq('&lt;script>alert("hi")&lt;/script>')
    expect(escapeHTMLIfNeeded('<div>&larr; & &rarr;</div>')).eq('&lt;div>&amp;larr; &amp; &amp;rarr;&lt;/div>')
    expect(escapeHTMLIfNeeded('foo')).eq('foo')
    expect(escapeHTMLIfNeeded('')).eq('')
  })
})

describe('highlightMatchingChars', () => {
  it('wraps matched characters with <mark class="matched-term"> matched by exact match', () => {
    expect(highlightMatchingChars(code, 'true', false)).eq(`{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": <mark class="matched-term">true</mark>,
    "noFallthroughCasesInSwitch": <mark class="matched-term">true</mark>,
    "noImplicitReturns": <mark class="matched-term">true</mark>,
    "noUncheckedIndexedAccess": <mark class="matched-term">true</mark>,
    "noUnusedLocals": <mark class="matched-term">true</mark>,
    "noUnusedParameters": <mark class="matched-term">true</mark>,
    "strict": <mark class="matched-term">true</mark>,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "&lt;div class="title">Hello &amp; Hi.&lt;/div>",
}
`)

    expect(highlightMatchingChars(code, '.', false)).eq(`{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "<mark class="matched-term">.</mark>/src",
    "<mark class="matched-term">.</mark>/types",
    "<mark class="matched-term">.</mark>/particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "&lt;div class="title">Hello &amp; Hi<mark class="matched-term">.</mark>&lt;/div>",
}
`)
  })

  it('wraps matched characters with <mark class="matched-term"> matched by exact match', () => {
    expect(highlightMatchingChars(code, '<div class="title">', false)).eq(`{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "<mark class="matched-term">&lt;div class="title"></mark>Hello &amp; Hi.&lt;/div>",
}
`)
  })

  it('wraps matched characters with <mark class="matched-term"> matched by regexp', () => {
    expect(highlightMatchingChars(code, 'true', true)).eq(`{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": <mark class="matched-term">true</mark>,
    "noFallthroughCasesInSwitch": <mark class="matched-term">true</mark>,
    "noImplicitReturns": <mark class="matched-term">true</mark>,
    "noUncheckedIndexedAccess": <mark class="matched-term">true</mark>,
    "noUnusedLocals": <mark class="matched-term">true</mark>,
    "noUnusedParameters": <mark class="matched-term">true</mark>,
    "strict": <mark class="matched-term">true</mark>,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "&lt;div class="title">Hello &amp; Hi.&lt;/div>",
}
`)

    expect(highlightMatchingChars(code, '.', true)).eq(`<mark class="matched-term">{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "jsx": "preserve"
  },
  "include": [
    "./src",
    "./types",
    "./particularly-long-value-that-will-inadvertently-cause-scrolling-for-narrower-containers"
  ],
  "markup": "&lt;div class="title">Hello &amp; Hi.&lt;/div>",
}
</mark>`)
  })
})

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
