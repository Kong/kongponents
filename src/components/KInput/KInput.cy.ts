import { mount } from 'cypress/vue'
import KInput from '@/components/KInput/KInput.vue'
import { h } from 'vue'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * props: {
 *   testMode: true
 * }
 */
describe('KInput', () => {
  it('renders text when value is passed', () => {
    const text = 'Hello'
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: text, // e.g. v-model
      },
    })

    cy.get('input').should('have.value', text)
  })

  it('renders `null` modelValue as empty string', () => {
    // @ts-ignore - to allow passing an invalid modelValue
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: null, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'null')
    cy.get('input').should('have.value', '')
  })

  it('renders `undefined` modelValue as empty string', () => {
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: undefined, // e.g. v-model
      },
    })

    cy.get('input').should('not.have.value', 'undefined')
    cy.get('input').should('have.value', '')
  })

  it('renders label when value is passed', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
      },
    })

    cy.get('.k-input-label').should('contain.text', label)
  })

  it('renders label with labelAttributes applied', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
        labelAttributes: {
          help: 'some help text',
        },
      },
    })

    cy.get('.k-input-label').should('contain.text', label)
    cy.get('.k-input-label .kong-icon-help').should('exist').and('be.visible')
  })

  it('renders label and tooltip with `label-tooltip` slot applied', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
      },
      slots: {
        'label-tooltip': () => h('div', {}, 'This is a tooltip'),
      },
    })

    cy.get('.k-input-label').should('contain.text', label)
    cy.get('.k-input-label .kong-icon-infoFilled').should('exist').and('be.visible')
  })

  it('renders overlayed label when value is passed', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
        overlayLabel: true,
      },
    })

    cy.get('.text-on-input label').should('contain.text', label)
  })

  it('renders an asterisk when `overlayLabel` is true and `required` attr is set', () => {
    const label = 'A label'
    mount(KInput, {
      props: {
        testMode: true,
        label,
        overlayLabel: true,
      },
      attrs: {
        required: true,
      },
    })

    cy.get('.text-on-input label').should('contain.text', label)
    cy.get('.text-on-input  .is-required').should('exist')
  })

  it('renders small when size is passed in', () => {
    mount(KInput, {
      props: {
        testMode: true,
        size: 'small',
      },
    })

    cy.get('.k-input-wrapper .k-input').should('have.class', 'k-input-small')
  })

  it('renders large when size is passed in', () => {
    mount(KInput, {
      props: {
        testMode: true,
        size: 'large',
      },
    })

    cy.get('.k-input-wrapper .k-input').should('have.class', 'k-input-large')
  })

  it('renders help when value is passed', () => {
    const helpText = 'I am helpful'
    mount(KInput, {
      props: {
        testMode: true,
        help: helpText,
      },
    })

    cy.get('.k-input-wrapper .help').should('contain.text', helpText)
  })

  it('shows character count when characterLimit prop is set and exceeded', () => {
    mount(KInput, {
      props: {
        testMode: true,
        characterLimit: 5,
      },
    })

    cy.get('.k-input-wrapper .over-char-limit').should('not.exist')
    cy.get('.k-input-wrapper input.k-input').type('This input has too many characters')
    cy.get('.k-input-wrapper .over-char-limit').should('be.visible')
  })

  it('reacts to text changes', () => {
    const inputValue = 'hey'
    const newValue = 'hey, dude'
    mount(KInput, {
      props: {
        testMode: true,
        modelValue: inputValue,
      },
    })

    cy.get('.k-input').should('have.value', inputValue)
    cy.get('.k-input').clear()
    cy.get('.k-input').type(newValue).then(() => {
      // Check for emitted event
      cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'input')
      cy.get('.k-input').should('have.value', newValue)
    })
  })

  it('should render icon prop', () => {
    const icon = '$'
    mount(KInput, {
      props: {
        testMode: true,
      },
      slots: {
        icon: () => h('div', {}, icon),
      },
    })

    cy.get('.input-icon').should('be.visible').should('contain.text', icon)
  })

  it('should render icon clickable when event listener is bound', () => {
    const onIconClickSpy = cy.spy().as('onIconClickSpy')
    mount(KInput, {
      props: {
        testMode: true,
        // make it clickable
        'onIcon:click': onIconClickSpy,
      },
      slots: {
        icon: () => h('div', {}, '#'),
      },
    })

    cy.get('.input-icon').should('be.visible').should('have.attr', 'role', 'button').should('have.attr', 'tabindex', '0').click()
    cy.get('@onIconClickSpy').should('have.been.called')
  })
})
