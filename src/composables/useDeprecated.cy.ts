import { defineComponent } from 'vue'
import { useDeprecated, composeWarning } from '@/composables/useDeprecated'

describe('useDeprecated', () => {
  const CORRECT_CONDITION = 'condition'
  const COMPONENT_NAME = 'KTestComponent'
  const notice = 'heads up'

  let assertion = CORRECT_CONDITION
  let docPath: string | undefined = undefined
  let fragment: string | undefined = undefined
  const TestComponent = defineComponent({
    name: COMPONENT_NAME,
    setup() {
      useDeprecated(() => assertion === CORRECT_CONDITION, {
        notice,
        docPath,
        fragment,
      })
    },
    template: '<div />',
  })

  beforeEach(() => {
    cy.stub(console, 'warn').as('consoleWarn')
    assertion = CORRECT_CONDITION
    docPath = undefined
    fragment = undefined
  })

  it('should warn the user when the condition was met', () => {
    cy.mount(TestComponent)
    cy.get('@consoleWarn').should('be.calledWith', composeWarning(COMPONENT_NAME, notice))
  })

  it('should not warn when the condition returns false', () => {
    assertion = 'another condition'

    cy.mount(TestComponent)
    cy.get('@consoleWarn').should('not.be.called')
  })

  describe('path and fragment', () => {
    const testCases = [
      { docPath: 'path/to/example', fragment: 'anchor' },
      { docPath: 'path/to/example', fragment: undefined },
      { docPath: undefined, fragment: 'anchor' },
      { docPath: undefined, fragment: undefined },
    ]

    testCases.forEach(({ docPath: testDocPath, fragment: testFragment }) => {
      it(`should warn correctly with docPath: "${testDocPath}" and fragment: "${testFragment}"`, () => {
        assertion = CORRECT_CONDITION
        docPath = testDocPath
        fragment = testFragment

        const expectedWarning = composeWarning(COMPONENT_NAME, notice, testDocPath, testFragment)

        cy.mount(TestComponent)
        cy.get('@consoleWarn').should('be.calledWith', expectedWarning)
      })
    })
  })
})
