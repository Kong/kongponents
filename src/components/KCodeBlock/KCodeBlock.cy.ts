
import KCodeBlock from './KCodeBlock.vue'

const code = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3]
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
    cy.get('[data-testid="code-block-copy-button"]').should('exist')
    cy.get('[data-testid="highlighted-code-block"]').contains(code)
  })

  it('has no copy button when props.showCopyButton is false', () => {
    renderComponent({ id: 'code-block', showCopyButton: false })

    cy.get('[data-testid="code-block-copy-button"]').should('not.exist')
  })

  it('can be searched to highlight matching lines', () => {
    const id = 'code-block'
    renderComponent({
      id,
      searchable: true,
    })

    // Searches in normal mode.
    const expectedLineNumbers = [2, 3, 4]

    cy.get('[data-testid="code-block-search-input"]').type('key').then(() => {
      // Guard: Ensures processing of the search is done
      cy.get('[data-testid="code-block-processing-icon"]').should('be.visible')
    })

    cy.get('[data-testid="code-block-processing-icon"]').should('not.exist')

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    cy.get('.line-is-highlighted-match').should('not.exist')
    for (const lineNumber of expectedLineNumbers) {
      cy.get('[data-testid="k-code-block"]').trigger('keydown', { code: 'F3', bubbles: true })
      cy.get(`.line-is-highlighted-match .line-anchor#${id}-L${lineNumber}`).should('be.visible')
    }

    // Searches again in regular expression mode.
    const expectedLineNumbersForRegExp = [2, 3]

    cy.get('[data-testid="regexp-mode-button"]').click()

    cy.get('[data-testid="code-block-search-input"]').clear()
    cy.get('[data-testid="code-block-search-input"]').type('key[12]').then(() => {
      // Guard: Ensures processing of the search is done
      cy.get('[data-testid="code-block-processing-icon"]').should('be.visible')
    })

    cy.get('[data-testid="code-block-processing-icon"]').should('not.exist')

    cy.get('.line-is-match').should('have.length', expectedLineNumbersForRegExp.length)
    // Checks if the correct line numbers are highlighted now that processing is done.
    for (const lineNumber of expectedLineNumbersForRegExp) {
      cy.get(`.line-is-match .line-anchor#${id}-L${lineNumber}`).should('exist')
    }
  })

  it('can be filtered to show only matching lines (like grep)', () => {
    renderComponent({ id: 'code-block', searchable: true })

    // Searches in normal mode.
    const expectedMatchedTerms = ['key']
    const expectedNumberOfMatches = 3

    cy.get('[data-testid="filter-mode-button"]').click()

    cy.get('[data-testid="code-block-search-input"]').type('key').then(() => {
      // Guard: Ensures processing of the search is done
      cy.get('[data-testid="code-block-processing-icon"]').should('be.visible')
    })

    cy.get('[data-testid="code-block-processing-icon"]').should('not.exist')

    cy.get('.matched-term')
      .should('have.length', expectedNumberOfMatches)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTerms.includes(matchedTerm.textContent as string))
      })

    // Searches again in regular expression mode.
    const expectedMatchedTermsForRegExp = ['key1', 'key2']
    const expectedNumberOfMatchesForRegExp = 2

    cy.get('[data-testid="regexp-mode-button"]').click()

    cy.get('[data-testid="code-block-search-input"]').clear()
    cy.get('[data-testid="code-block-search-input"]').type('key[12]').then(() => {
      // Guard: Ensures processing of the search is done
      cy.get('[data-testid="code-block-processing-icon"]').should('be.visible')
    })

    cy.get('[data-testid="code-block-processing-icon"]').should('not.exist')

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
    cy.get('[data-testid="code-block-search-input"]').clear()
    cy.get('[data-testid="code-block-search-input"]').type('key[12]')

    cy.get('.k-code-block').trigger('keydown', { code: 'KeyR', altKey: true })
    cy.get('.matched-term').should('have.length', 2)
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
})
