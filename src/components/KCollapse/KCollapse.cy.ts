import { mount } from 'cypress/vue'
import { h } from 'vue'
import KCollapse from '@/components/KCollapse/KCollapse.vue'

describe('KCollapse', () => {
  it('renders proper content when using props', () => {
    const title = 'Awesome title'
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      props: {
        title,
        triggerLabel,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-title').should('exist')
    cy.getTestId('collapse-title').should('contain.text', title)
    cy.getTestId('collapse-trigger-label').should('contain.text', triggerLabel)
  })

  it('displays a caret for trigger if no label provided', () => {
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-trigger-icon').should('exist')
  })

  it('allows using leading trigger alignment', () => {
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      props: {
        triggerLabel,
        triggerAlignment: 'leading',
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-trigger-label').should('contain.text', triggerLabel)
    cy.get('.collapse-heading').should('not.have.class', 'has-trailing-trigger')
  })

  it('correctly shows and hides content with trigger click', () => {
    const triggerLabel = 'Awesome label'
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      props: {
        triggerLabel,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-trigger-label').should('contain.text', triggerLabel)
    // hidden by default
    cy.getTestId('collapse-hidden-content').should('not.be.visible')
    // visible when clicked
    cy.getTestId('collapse-trigger-label').click()
    cy.getTestId('collapse-hidden-content').should('be.visible')
  })

  it('allows content to be expanded by default', () => {
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      props: {
        modelValue: false,
      },
      slots: {
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-trigger-content').should('exist')
    // visible by default
    cy.getTestId('collapse-hidden-content').should('be.visible')
    cy.getTestId('collapse-hidden-content').should('contain.text', collapseContent)
    // hidden when clicked
    cy.getTestId('collapse-trigger-content').click()
    cy.getTestId('collapse-hidden-content').should('not.be.visible')
  })

  it('renders proper content when using slots', () => {
    const triggerContent = 'Awesome label'
    const visibleContent = 'Always visible awesomeness'
    const collapseContent = 'Can you see me?'

    mount(KCollapse, {
      slots: {
        'trigger-content': h('div', {}, triggerContent),
        'visible-content': h('div', {}, visibleContent),
        default: h('div', {}, collapseContent),
      },
    })

    cy.getTestId('collapse-trigger-content').should('contain.text', triggerContent)
    cy.getTestId('collapse-visible-content').should('exist')
    cy.getTestId('collapse-visible-content').should('contain.text', visibleContent)
    // hidden by default
    cy.getTestId('collapse-hidden-content').should('not.be.visible')
    // visible when clicked
    cy.getTestId('collapse-trigger-content').click()
    cy.getTestId('collapse-hidden-content').should('be.visible')
    cy.getTestId('collapse-hidden-content').should('contain.text', collapseContent)
  })
})
