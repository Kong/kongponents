import { mount } from 'cypress/vue'
import KTruncate from '@/components/KTruncate/KTruncate.vue'

describe('KTruncate', () => {
  it('should not truncate content when is not overflowing', () => {
    mount(KTruncate, {
      props: {
        rows: 3,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element 1</span>',
          '<span style="width: 100%;">Visible element 2</span>',
          '<span data-testid="last-visible-element" style="width: 100%;">Visible element 3</span>',
        ],
      },
    })

    cy.get('[data-testid="last-visible-element"]').should('be.visible')
  })

  it('should truncate overflowing content and show it when expanded', () => {
    mount(KTruncate, {
      props: {
        rows: 2,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element 1</span>',
          '<span style="width: 100%;">Visible element 2</span>',
          '<span data-testid="overflowing-element" style="width: 100%;">Overflowing element</span>',
        ],
      },
    })

    const overflowingElement = cy.get('[data-testid="overflowing-element"]')
    overflowingElement.should('not.be.visible')
    cy.get('[data-testid="expand-trigger-wrapper"]').click().then(() => {
      overflowingElement.should('be.visible')
    })
  })

  it('render content passed in through expand trigger slot', () => {
    const expandTriggerContent = 'Expand'
    mount(KTruncate, {
      slots: {
        default: [
          '<span style="width: 100%;">Visible element</span>',
          '<span style="width: 100%;">Overflowing element</span>',
        ],
        'expand-trigger': () => expandTriggerContent,
      },
    })

    cy.get('[data-testid="expand-trigger-wrapper"]').should('contain.text', expandTriggerContent).click()
  })

  it('render expanded when expanded prop is true and render content passed in through expand trigger slot', () => {
    const collapseTriggerContent = 'Collapse'
    mount(KTruncate, {
      props: {
        expanded: true,
      },
      slots: {
        default: [
          '<span style="width: 100%;">Visible element</span>',
          '<span data-testid="visible-overflowing-element" style="width: 100%;">Visible overflowing element</span>',
        ],
        'collapse-trigger': () => collapseTriggerContent,
      },
    })

    cy.get('[data-testid="visible-overflowing-element"]').should('be.visible')
    cy.get('[data-testid="collapse-trigger-wrapper"]').should('contain.text', collapseTriggerContent)
  })
})
