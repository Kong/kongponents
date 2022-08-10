// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import KStepper from '@/components/KStepper/KStepper.vue'

const longSteps = [
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions' },
]

const stepTypes = [
  { label: 'step: completed', state: 'completed' },
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

    const stepLabel = cy.get('.k-step-label')

    cy.get('.k-stepper').should('be.visible')
    stepLabel.should('be.visible')
    stepLabel.invoke('max-width').should('eq', width)
  })

  it('renders each step type', () => {
    mount(KStepper, {
      props: {
        steps: stepTypes,
      },
    })
    const types = ['completed', 'default', 'error', 'pending']

    cy.get('.k-stepper').should('be.visible')

    for (let i = 0; i < types.length; i++) {
      cy.getTestId(`[data-testid="k-step-${types[i]}"]`).should('exist')
      cy.getTestId(`[data-testid="k-step-${types[i]}"]`).should('contain.html', types[i])
    }
  })
})
