import { mount } from 'cypress/vue'
import KSlider from '@/components/KSlider/KSlider.vue'

describe('KSlider', () => {
  it('renders input[type="range"] element with label and datalist', () => {
    const labelContent = 'Test slider'

    mount(KSlider, {
      props: {
        label: labelContent,
        min: 10,
        max: 20,
        step: 2,
        modelValue: 12,
      },
    })

    cy.get('label').should('have.text', labelContent)

    cy.get('input[type="range"]')
      .should('have.attr', 'min', '10')
      .and('have.attr', 'max', '20')
      .and('have.attr', 'step', '2')
      .and('have.value', '12')

    cy.get('datalist').should('exist')
    cy.get('datalist option')
      .should('have.length', 2)
    cy.get('datalist option').first().should('have.attr', 'value', '10')
    cy.get('datalist option').last().should('have.attr', 'value', '20')
  })

  it('renders marks correctly when showMarks is true', () => {
    mount(KSlider, {
      props: {
        showMarks: true,
      },
    })

    cy.get('datalist option')
      .should('have.length', 11) // Default marks from 0 to 10
    cy.get('.slider-marks span')
      .should('have.length', 11)
    Array.from({ length: 11 }, (_, i) => i).forEach(i => {
      cy.get('datalist option').eq(i).should('have.attr', 'value', `${i}`)
      cy.get('datalist option').eq(i).should('have.attr', 'label', `${i}`)
      cy.get('.slider-marks span').eq(i).should('have.text', `${i}`)
    })
  })

  it('clicking on a mark updates the slider value correctly for different marks', () => {
    mount(KSlider, {
      props: {
        showMarks: true,
      },
    })

    cy.get('.slider-marks span').eq(3).click()
    cy.get('input[type="range"]').should('have.value', '3')
    cy.get('.slider-marks span').eq(5).click()
    cy.get('input[type="range"]').should('have.value', '5')
    cy.get('.slider-marks span').eq(10).click()
    cy.get('input[type="range"]').should('have.value', '10')
  })

  it('renders marks correctly when marks prop is array of numbers', () => {
    const marksNumbers = [0, 2, 4, 6, 8, 10]
    mount(KSlider, {
      props: {
        marks: marksNumbers,
      },
    })

    cy.get('datalist option')
      .should('have.length', marksNumbers.length)
    cy.get('.slider-marks span')
      .should('have.length', marksNumbers.length)
    Array.from({ length: marksNumbers.length }, (_, i) => i).forEach(i => {
      cy.get('datalist option').eq(i).should('have.attr', 'value', `${marksNumbers[i]}`)
      cy.get('datalist option').eq(i).should('have.attr', 'label', `${marksNumbers[i]}`)
      cy.get('.slider-marks span').eq(i).should('have.text', `${marksNumbers[i]}`)
    })
  })

  it('renders marks correctly when marks prop is array of objects', () => {
    const marksObj = [
      {
        label: 'Zero',
        value: 0,
      },
      {
        label: 'Five',
        value: 5,
      },
      {
        label: 'Ten',
        value: 10,
      },
    ]
    mount(KSlider, {
      props: {
        marks: marksObj,
      },
    })

    cy.get('datalist option')
      .should('have.length', marksObj.length)
    cy.get('.slider-marks span')
      .should('have.length', marksObj.length)
    Array.from({ length: marksObj.length }, (_, i) => i).forEach(i => {
      cy.get('datalist option').eq(i).should('have.attr', 'value', `${marksObj[i].value}`)
      cy.get('datalist option').eq(i).should('have.attr', 'label', `${marksObj[i].label}`)
      cy.get('.slider-marks span').eq(i).should('have.text', `${marksObj[i].label}`)
    })
  })

  it('emits update:modelValue and change events on input', () => {
    mount(KSlider, {
      props: {
        modelValue: 10,
      },
    })

    cy.get('input[type="range"]').as('slider')

    cy.get('@slider').invoke('val', 5).trigger('input').then(() => {
      cy.wrap(Cypress.vueWrapper.emitted('update:modelValue')?.[0][0]).should('eq', 5)
      cy.wrap(Cypress.vueWrapper.emitted('change')?.[0][0]).should('eq', 5)
      cy.get('@slider').should('have.value', '5')
    })
  })

  it('only renders valid marks', () => {
    const invalidMarks = [2, 4]
    const validMarks = [0, 5, 10]
    const allMarks = [...invalidMarks, ...validMarks]

    mount(KSlider, {
      props: {
        step: 5,
        marks: allMarks,
      },
    })

    cy.getTestId('slider-datalist-marks').should('exist')
    cy.getTestId('slider-marks').should('exist')
    validMarks.forEach(mark => {
      cy.getTestId(`datalist-mark-${mark}`).should('exist')
      cy.getTestId(`mark-${mark}`).should('be.visible')
    })
    invalidMarks.forEach(mark => {
      cy.getTestId(`datalist-mark-${mark}`).should('not.exist')
      cy.getTestId(`mark-${mark}`).should('not.exist')
    })
  })

  it('sets modelValue to min when invalid value provided', () => {
    mount(KSlider, {
      props: {
        modelValue: 100, // Invalid value
      },
    })

    cy.get('input[type="range"]').should('have.value', '0') // Should reset to min value
  })
})
