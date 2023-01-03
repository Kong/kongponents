import { mount } from 'cypress/vue'

import KCodeBlock from './KCodeBlock.vue'

const code = `{
  "key1": "string value",
  "key2": 5681,
  "key3": [1, 2, 3]
}`

function renderComponent(props = {}) {
  return mount(KCodeBlock, {
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

    cy.get('.k-line').should('have.length', 5)
    cy.get('[data-testid="k-code-block-copy-button"]').should('exist')
    cy.get('[data-testid="k-code-block-highlighted-code-block"]').contains(code)
  })

  it('has no copy button when props.showCopyButton is false', () => {
    renderComponent({ id: 'code-block', showCopyButton: false })

    cy.get('[data-testid="k-code-block-copy-button"]').should('not.exist')
  })

  it('can be searched to highlight matching lines', () => {
    const id = 'code-block'
    renderComponent({
      id,
      isSearchable: true,
    })

    // Searches in normal mode.
    const expectedLineNumbers = [2, 3, 4]

    const searchInput = cy.get('[data-testid="k-code-block-search-input"]')
    searchInput.type('key')

    // Checks that the processing icon is shown while the search is in progress and subsequently hidden.
    // Guard: Ensures processing of the search is done
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('have.class', 'k-is-processing-icon-is-visible')
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('not.have.class', 'k-is-processing-icon-is-visible')

    // Jumps to the next (i.e. first) match using F3 and checks that the highlighted line numbers are jumped to in order.
    cy.get('.k-line-is-highlighted-match').should('not.exist')
    for (const lineNumber of expectedLineNumbers) {
      cy.get('[data-testid="k-code-block"]').trigger('keydown', { code: 'F3', bubbles: true })
      cy.get(`.k-line-is-highlighted-match .k-line-anchor#${id}-L${lineNumber}`).should('be.visible')
    }

    // Searches again in regular expression mode.
    const expectedLineNumbersForRegExp = [2, 3]

    const regExpModeButton = cy.get('[data-testid="k-code-block-regexp-mode-button"]')
    regExpModeButton.trigger('click')
    searchInput.clear()
    searchInput.type('key[12]')

    // Guard: Ensures processing of the search is done.
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('have.class', 'k-is-processing-icon-is-visible')
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('not.have.class', 'k-is-processing-icon-is-visible')

    cy.get('.k-line-is-match').should('have.length', expectedLineNumbersForRegExp.length)
    // Checks if the correct line numbers are highlighted now that processing is done.
    for (const lineNumber of expectedLineNumbersForRegExp) {
      cy.get(`.k-line-is-match .k-line-anchor#${id}-L${lineNumber}`).should('exist')
    }
  })

  it('can be filtered to show only matching lines (like grep)', () => {
    renderComponent({ id: 'code-block', isSearchable: true })

    // Searches in normal mode.
    const expectedMatchedTerms = ['key']
    const expectedNumberOfMatches = 3

    cy.get('[data-testid="k-code-block-filter-mode-button"]').trigger('click')

    const searchInput = cy.get('[data-testid="k-code-block-search-input"]')
    searchInput.type('key')

    // Guard: Ensures processing of the search is done.
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('have.class', 'k-is-processing-icon-is-visible')
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('not.have.class', 'k-is-processing-icon-is-visible')

    cy.get('.k-matched-term')
      .should('have.length', expectedNumberOfMatches)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTerms.includes(matchedTerm.textContent as string))
      })

    // Searches again in regular expression mode.
    const expectedMatchedTermsForRegExp = ['key1', 'key2']
    const expectedNumberOfMatchesForRegExp = 2

    const regExpModeButton = cy.get('[data-testid="k-code-block-regexp-mode-button"]')
    regExpModeButton.trigger('click')

    searchInput.clear()
    searchInput.type('key[12]')

    // Guard: Ensures processing of the search is done.
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('have.class', 'k-is-processing-icon-is-visible')
    cy.get('[data-testid="k-code-block-is-processing-icon"]').should('not.have.class', 'k-is-processing-icon-is-visible')

    cy.get('.k-matched-term')
      .should('have.length', expectedNumberOfMatchesForRegExp)
      .each(([matchedTerm]) => {
        expect(expectedMatchedTermsForRegExp.includes(matchedTerm.textContent as string))
      })
  })

  it('shows matching results when initializing with query', () => {
    renderComponent({ id: 'code-block', isSearchable: true, query: 'key' })

    cy.get('.k-line-is-match').should('have.length', 3)
  })

  it('can be interacted with using default shortcuts', () => {
    const id = 'code-block'
    renderComponent({ id, isSearchable: true, query: 'key' })
    const codeBlock = cy.get('.k-code-block')

    // Tests that scoped shortcuts don’t work when focus is not within the code block.
    cy.document().trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match').should('not.exist')

    codeBlock.trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'id').should('equal', `${id}-L2`)

    codeBlock.trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'id').should('equal', `${id}-L3`)

    codeBlock.trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'id').should('equal', `${id}-L4`)

    codeBlock.trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'id').should('equal', `${id}-L2`)

    codeBlock.trigger('keydown', { code: 'F3', shiftKey: true })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'id').should('equal', `${id}-L4`)

    // Switches to filter mode using shortcut.
    cy.get('.k-filtered-code-block').should('not.exist')
    codeBlock.trigger('keydown', { code: 'KeyF', altKey: true })
    cy.get('.k-filtered-code-block').should('exist')
    cy.get('.k-matched-term').should('have.length', 3)

    // Switches to regular expression mode using shortcut.
    const searchInput = cy.get('[data-testid="k-code-block-search-input"]')
    searchInput.clear()
    searchInput.type('key[12]')

    codeBlock.trigger('keydown', { code: 'KeyR', altKey: true })
    cy.get('.k-matched-term').should('have.length', 2)
  })

  it('shows line number links', () => {
    const id = 'code-block'
    renderComponent({ id, isSearchable: true, query: 'key', showLineNumberLinks: true })

    cy.get('.k-code-block').trigger('keydown', { code: 'F3' })
    cy.get('.k-line-is-highlighted-match .k-line-anchor').invoke('attr', 'href').should('equal', `#${id}-L2`)
  })

  it('has the `use-single-line` class when props.useSingleLine is true', () => {
    renderComponent({ id: 'code-block', useSingleLine: true })

    cy.get('pre.k-highlighted-code-block').should('have.class', 'use-single-line')
  })
})
