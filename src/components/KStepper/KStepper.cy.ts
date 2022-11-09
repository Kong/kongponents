import { mount } from 'cypress/vue'
import KStepper from '@/components/KStepper/KStepper.vue'

const longSteps = [
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions' },
]

const stepTypes = [
  { label: 'step: completed', state: 'completed' },
  { label: 'step: active', state: 'active' },
  { label: 'step: pending', state: 'pending' },
  { label: 'step: error', state: 'error' },
  { label: 'step: default' },
]

describe('KStepper', () => {
  it('renders steps', () => {
    mount(KStepper, {
      props: {
        steps: longSteps,
      },
    })

    cy.get('.k-stepper').should('exist')
    cy.get('.k-stepper').should('be.visible')
    cy.get('.k-step').should('have.length', longSteps.length)
  })

  it('renders with maxLabelWidth', () => {
    const width = 100

    mount(KStepper, {
      props: {
        maxLabelWidth: width + '',
        steps: longSteps,
      },
    })

    cy.get('.k-stepper').should('be.visible')
    cy.get('.k-step-label').should('be.visible')
    cy.get('.k-step-label').should('have.css', 'max-width').and('eq', `${width}px`)
  })

  it('renders each step type', () => {
    mount(KStepper, {
      props: {
        steps: stepTypes,
      },
    })
    const types = ['completed', 'active', 'default', 'error', 'pending']

    cy.get('.k-stepper').should('be.visible')

    for (let i = 0; i < types.length; i++) {
      cy.getTestId(`k-step-${types[i]}`).should('exist')
      cy.getTestId(`k-step-${types[i]}`).contains(types[i], { matchCase: false })
    }
  })
})
