import { mount } from 'cypress/vue'
import KComponent from '@/components/KComponent'
import KButton from '@/components/KButton/KButton.vue'
import { h } from 'vue'

describe('KComponent', () => {
  it('can update reactive data object', () => {
    mount(KComponent, {
      props: {
        data: { count: 0 },
      },
      slots: {
        default: (props) => {
          return h(KButton,
            {
              ...props,
              // bind emits onClick = @click, onUpdate = @update, etc.
              onClick: function() {
                props.data.count = props.data.count + 1
              },
            }, 'clicked me ' + props.data.count + ' times!',
          )
        },
      },
    })

    const button = cy.get('.k-button')
    button.should('contain.text', 'clicked me 0 times!')
    button.click()
    button.should('contain.text', 'clicked me 1 times!')
  })
})
