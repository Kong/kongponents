import { mount } from 'cypress/vue'
import KCopy from '@/components/KCopy/KCopy.vue'

const content = '1234567890ABCDEFG'
const container = '.k-copy'
const badgeContainer = '.k-copy-badge'

describe('KCopy', () => {
  it('renders with default props', () => {
    mount(KCopy, {
      props: {
        content,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.content-container')
      .should('have.class', 'non-truncated-content')
      .should('have.class', 'monospace')
      .should('contain.text', content)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  it('renders with `isBadge` set to true', () => {
    const badge = 'Id'
    mount(KCopy, {
      props: {
        content,
        isBadge: true,
        badgeText: badge,
      },
    })

    cy.get(badgeContainer).should('be.visible')
    cy.get(badgeContainer).find('.copy-badge-text').should('contain.text', badge)
    cy.get(badgeContainer).find('.k-badge.id-badge').should('exist')
  })

  it('renders with `truncated` set to false', () => {
    mount(KCopy, {
      props: {
        content,
        truncate: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.content-container')
      .should('not.have.class', 'truncated-content')
      .should('have.class', 'monospace')
      .should('contain.text', content)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  it('renders with `monospace` set to false', () => {
    mount(KCopy, {
      props: {
        content,
        monospace: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.content-container')
      .should('have.class', 'non-truncated-content')
      .should('not.have.class', 'monospace')
      .should('contain.text', content)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  it('renders with `format` set to `hidden`', () => {
    mount(KCopy, {
      props: {
        content,
        format: 'hidden',
      },
    })

    cy.get(container).should('be.visible')
    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('[data-testid="copy-id"]').should('not.exist')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  it('renders with `format` set to `redacted`', () => {
    mount(KCopy, {
      props: {
        content,
        format: 'redacted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.content-container')
      .should('have.class', 'non-truncated-content')
      .should('have.class', 'monospace')
      .should('contain.text', '*****')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  it('renders with `format` set to `deleted`', () => {
    mount(KCopy, {
      props: {
        content,
        format: 'deleted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.content-container')
      .should('have.class', 'non-truncated-content')
      .should('have.class', 'monospace')
      .should('contain.text', '*12345')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.content-icon').should('be.visible')
  })

  describe('tooltips', () => {
    it('renders with `copyTooltip` prop set', () => {
      const tooltipText = 'Click to copy!'

      mount(KCopy, {
        props: {
          content,
          copyTooltip: tooltipText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .k-popover-content').should('contain.text', tooltipText)
    })

    it('renders with `contentTooltip` prop set', () => {
      const tooltipText = 'Custom tooltip text!'

      mount(KCopy, {
        props: {
          content,
          contentTooltip: tooltipText,
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
          content,
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

  it('emits event', () => {
    mount(KCopy, {
      props: {
        content,
      },
    })

    cy.get('[data-testid="copy-to-clipboard"]').click().then(() => {
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'copied').then((evt) => {
        cy.wrap(evt[0][0]).should('be.equal', content)
      })
    })
  })
})
