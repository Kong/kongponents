
import KCodeBlock from './KCodeBlock.vue'

const code = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3]
}`

const longCode = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3],
  "key4": "string value",
  "key5": 5681,
  "key6": [1, 2, 3],
  "key7": "string value",
  "key8": 5681,
  "key9": [1, 2, 3],
  "key10": "string value",
  "key11": 5681,
  "key12": [1, 2, 3],
  "key13": "string value",
  "key14": 5681,
  "key15": [1, 2, 3],
  "key16": "string value",
  "key17": 5681,
  "key18": [1, 2, 3],
  "key19": "string value",
  "key20": 5681,
  "key21": [1, 2, 3],
  "key22": "string value",
  "key23": 5681,
  "key24": [1, 2, 3],
  "key25": "string value",
  "key26": 5681,
  "key27": [1, 2, 3],
  "key28": "string value",
  "key29": 5681,
  "key30": [1, 2, 3]
}`

function renderComponent(props = {}) {
  return cy.mount(KCodeBlock, {
    props: {
      language: 'json',
      code,
      ...props,
    },
  })
}

describe('KCodeBlock', () => {
  it('has the right default content', () => {
    renderComponent({ id: 'code-block' })

    cy.get('.line').should('have.length', 5)
    cy.getTestId('code-block-copy-button-code-block').should('exist')
    cy.getTestId('highlighted-code-block').contains(code)
  })

  it('has no copy button when props.showCopyButton is false', () => {
    renderComponent({ id: 'code-block', showCopyButton: false })

    cy.getTestId('code-block-copy-button-code-block').should('not.exist')
  })

  it('always show the copy button without needing to hover when props.showCopyButton is "always"', () => {
    cy.viewport(1281, 800)

    renderComponent({ id: 'code-block' })
    cy.getTestId('code-block-copy-button-code-block').should('not.be.visible')

    renderComponent({ id: 'code-block', showCopyButton: 'always' })
    cy.getTestId('code-block-copy-button-code-block').should('be.visible')
  })

  it('can be searched to highlight matching lines', () => {
    const id = 'code-block'
    renderComponent({
      id,
      searchable: true,
    })

    // Searches in normal mode.
    const expectedLineNumbers = [2, 3, 4]

    cy.getTestId('code-block-search-input').should('have.attr', 'name', 'code-search')
    cy.getTestId('code-block-search-input').type('key').then(() => {
      // Guard: Ensures processing of the search is done
      cy.getTestId('code-block-processing-icon').should('be.visible')
    })

    cy.getTestId('code-block-processing-icon').should('not.exist')

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    cy.get('.line-is-highlighted-match').should('not.exist')
    for (const lineNumber of expectedLineNumbers) {
      cy.getTestId('k-code-block').trigger('keydown', { code: 'F3', bubbles: true })
      cy.get(`.line-is-highlighted-match .line-anchor#${id}-L${lineNumber}`).should('be.visible')
    }

    // Searches again in regular expression mode.
    const expectedLineNumbersForRegExp = [2, 3]

    cy.getTestId('regexp-mode-button').click()

    cy.getTestId('code-block-search-input').clear()
    cy.getTestId('code-block-search-input').type('key[12]').then(() => {
      // Guard: Ensures processing of the search is done
      cy.getTestId('code-block-processing-icon').should('be.visible')
    })

    cy.getTestId('code-block-processing-icon').should('not.exist')

    cy.get('.line-is-match').should('have.length', expectedLineNumbersForRegExp.length)
    // Checks if the correct line numbers are highlighted now that processing is done.
    for (const lineNumber of expectedLineNumbersForRegExp) {
      cy.get(`.line-is-match .line-anchor#${id}-L${lineNumber}`).should('exist')
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers', () => {
    const id = 'code-block'
    const expectedLineNumbers = [3, 4, 5]
    renderComponent({
      id,
      highlightedLineNumbers: expectedLineNumbers,
    })

    cy.getTestId('code-block-processing-icon').should('not.exist')

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    cy.get('.line-is-highlighted-match').should('not.exist')
    for (const lineNumber of expectedLineNumbers) {
      cy.getTestId('k-code-block').trigger('keydown', { code: 'F3', bubbles: true })
      cy.get(`.line-is-highlighted-match .line-anchor#${id}-L${lineNumber}`).should('be.visible')
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers in range expressions', () => {
    const id = 'code-block'
    const expectedLineNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 30, 31, 32]
    renderComponent({
      id,
      code: longCode,
      highlightedLineNumbers: '10-3,4,6,12,1,13-13,30-34',
    })

    for (const lineNumber of expectedLineNumbers) {
      cy.get('.line').eq(lineNumber - 1).should('have.class', 'line-is-match')
    }
  })

  it('can highlight matching lines when initialized with highlightedLineNumbers in range expressions', () => {
    const id = 'code-block'
    const expectedLineNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 30, 31, 32]
    renderComponent({
      id,
      code: longCode,
      highlightedLineNumbers: [[10, 3], 4, 6, 12, 1, [13, 13], [30, 34]],
    })

    for (const lineNumber of expectedLineNumbers) {
      cy.get('.line').eq(lineNumber - 1).should('have.class', 'line-is-match')
    }
  })

  it('can be filtered to show only matching lines (like grep)', () => {
    renderComponent({ id: 'code-block', searchable: true })

    // Searches in normal mode.
    const expectedMatchedTerms = ['key']
    const expectedNumberOfMatches = 3

    cy.getTestId('filter-mode-button').click()

    cy.getTestId('code-block-search-input').type('key').then(() => {
      // Guard: Ensures processing of the search is done
      cy.getTestId('code-block-processing-icon').should('be.visible')
    })

    cy.getTestId('code-block-processing-icon').should('not.exist')

    cy.get('.matched-term')
      .should('have.length', expectedNumberOfMatches)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTerms.includes(matchedTerm.textContent as string))
      })

    // Searches again in regular expression mode.
    const expectedMatchedTermsForRegExp = ['key1', 'key2']
    const expectedNumberOfMatchesForRegExp = 2

    cy.getTestId('regexp-mode-button').click()

    cy.getTestId('code-block-search-input').clear()
    cy.getTestId('code-block-search-input').type('key[12]').then(() => {
      // Guard: Ensures processing of the search is done
      cy.getTestId('code-block-processing-icon').should('be.visible')
    })

    cy.getTestId('code-block-processing-icon').should('not.exist')

    cy.get('.matched-term')
      .should('have.length', expectedNumberOfMatchesForRegExp)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTermsForRegExp.includes(matchedTerm.textContent as string))
      })
  })

  it('shows matching results when initializing with query', () => {
    renderComponent({ id: 'code-block', searchable: true, query: 'key' })

    cy.get('.line-is-match').should('have.length', 3)
  })

  it('matching results when initializing with query overrides highlightedNumberLines', () => {
    renderComponent({ id: 'code-block', searchable: true, query: 'key', highlightedLineNumbers: [1] })

    // should highlight 2, 3, 4
    cy.get('.line-is-match').should('have.length', 3)
  })

  it('can be interacted with using default shortcuts', () => {
    const id = 'code-block'
    renderComponent({ id, searchable: true, query: 'key' })

    // Tests that scoped shortcuts don’t work when focus is not within the code block.
    cy.document().trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match').should('not.exist')

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'id').should('equal', `${id}-L2`)

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'id').should('equal', `${id}-L3`)

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'id').should('equal', `${id}-L4`)

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'id').should('equal', `${id}-L2`)

    cy.get('.k-code-block').trigger('keydown', { code: 'F3', shiftKey: true })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'id').should('equal', `${id}-L4`)

    // Switches to filter mode using shortcut.
    cy.get('.filtered-code-block').should('not.exist')
    cy.get('.k-code-block').trigger('keydown', { code: 'KeyF', altKey: true })
    cy.get('.filtered-code-block').should('exist')
    cy.get('.matched-term').should('have.length', 3)

    // Switches to regular expression mode using shortcut.
    cy.getTestId('code-block-search-input').clear()
    cy.getTestId('code-block-search-input').type('key[12]')

    cy.get('.k-code-block').trigger('keydown', { code: 'KeyR', altKey: true })
    cy.get('.matched-term').should('have.length', 2)
  })

  it('can hide line numbers', () => {
    renderComponent({ id: 'code-block', showLineNumbers: false })

    cy.get('.line-number-rows').should('not.exist')
  })

  it('shows line number links', () => {
    const id = 'code-block'
    renderComponent({ id, searchable: true, query: 'key', showLineNumberLinks: true })

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.line-is-highlighted-match .line-anchor').invoke('attr', 'href').should('equal', `#${id}-L2`)
  })

  it('has the `single-line` class when props.singleLine is true', () => {
    renderComponent({ id: 'code-block', singleLine: true })

    cy.get('pre.highlighted-code-block').should('have.class', 'single-line')
  })

  it('initializes in regular expression mode with search correctly executed', () => {
    const id = 'code-block'
    renderComponent({
      id,
      initialRegExpMode: true,
      query: 'key[12]',
    })

    const expectedLineNumbersForRegExp = [2, 3]

    cy.get('.line-is-match').should('have.length', expectedLineNumbersForRegExp.length)
    for (const lineNumber of expectedLineNumbersForRegExp) {
      cy.get(`.line-is-match .line-anchor#${id}-L${lineNumber}`).should('exist')
    }
  })

  it('initializes in filter mode with search correctly executed', () => {
    renderComponent({
      id: 'code-block',
      initialFilterMode: true,
      initialRegExpMode: true,
      query: 'key[12]',
    })

    const expectedMatchedTerms = ['key1', 'key2']
    const expectedNumberOfMatches = 2

    cy.get('.matched-term')
      .should('have.length', expectedNumberOfMatches)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTerms.includes(matchedTerm.textContent as string))
      })
  })

  it('emits code-block-render event on mount with correct event data', () => {
    const onCodeBlockRender = cy.spy().as('codeBlockRenderSpy')

    const props = {
      id: 'code-block',
      language: 'json',
      code,
      theme: 'dark',
      onCodeBlockRender,
    }

    cy.mount(KCodeBlock, { props })

    cy.get('@codeBlockRenderSpy')
      .should('have.been.calledOnce')
      .its('firstCall.args.0')
      .should((eventData: any) => {
        expect(eventData).to.include({
          code: props.code,
          language: props.language,
          theme: props.theme,
          query: '',
        })
        expect(eventData).to.have.property('preElement').that.is.instanceOf(HTMLElement)
        expect(eventData).to.have.property('codeElement').that.is.instanceOf(HTMLElement)
        expect(eventData.matchingLineNumbers).to.be.an('array')
      })
  })
})
