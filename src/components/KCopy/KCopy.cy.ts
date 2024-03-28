import { mount } from 'cypress/vue'
import KCopy from '@/components/KCopy/KCopy.vue'

const text = '1234567890ABCDEFG'
const container = '.k-copy'

describe('KCopy', () => {
  it('renders with default props', () => {
    mount(KCopy, {
      props: {
        text,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `badge` set to true', () => {
    const badge = 'Id:'
    mount(KCopy, {
      props: {
        text,
        badge: true,
        badgeLabel: badge,
      },
    })

    cy.get(container).should('be.visible')
    cy.get(container).find('.copy-badge-text').should('contain.text', badge)
  })

  it('renders with `truncated` set to false', () => {
    mount(KCopy, {
      props: {
        text,
        truncate: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('not.have.class', 'truncate-content')
      .should('have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `monospace` set to false', () => {
    mount(KCopy, {
      props: {
        text,
        monospace: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container')
      .should('not.have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `hidden`', () => {
    mount(KCopy, {
      props: {
        text,
        format: 'hidden',
      },
    })

    cy.get(container).should('be.visible')
    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('[data-testid="copy-id"]').should('not.exist')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `redacted`', () => {
    mount(KCopy, {
      props: {
        text,
        format: 'redacted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', '*****')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `deleted`', () => {
    mount(KCopy, {
      props: {
        text,
        format: 'deleted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', '*12345')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  describe('tooltips', () => {
    it('renders with `copyTooltip` prop set', () => {
      const tooltipText = 'Click to copy!'

      mount(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .k-popover-content').should('contain.text', tooltipText)
    })

    it('renders with `textTooltip` prop set', () => {
      const tooltipText = 'Custom tooltip text!'

      mount(KCopy, {
        props: {
          text,
          textTooltip: tooltipText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .k-popover-content').should('contain.text', tooltipText)
    })

    it('renders `successTooltip` with `copyTooltip` prop set', () => {
      const tooltipText = 'Click to copy'
      const successText = 'Copied!'

      mount(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
          successTooltip: successText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .k-popover-content').should('contain.text', tooltipText)
      cy.get('[data-testid="copy-to-clipboard"]').click()
      cy.get(container).find('.k-tooltip .k-popover-content').should('contain.text', successText)
    })
  })
})
