import { mount } from '@cypress/vue'
import KFileUpload from '@/components/KUpload/KFileUpload.vue'

describe('KFileUpload', () => {
  it('renders text when value is passed', () => {
    const text = 'I am a label text'
    mount(KFileUpload, {
      props: {
        testMode: true,
        label: text, // e.g. v-model
      },
    })

    cy.get('.k-upload .k-input-label').should('have.value', text)
  })
})
