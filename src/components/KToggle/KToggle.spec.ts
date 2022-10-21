import { mount } from 'cypress/vue'
import KToggle from '@/components/KToggle'
import { h } from 'vue'

describe('KToggle', () => {
  it('toggles content', () => {
    mount(KToggle, {
      slots: {
        default: (props) => {
          return h('button',
            {
              ...props,
              // bind emits onClick = @click, onUpdate = @update, etc.
              onClick: () => props.toggle(),
            }, 'click me ' + (props.isToggled.value ? 'yes' : 'no'),
          )
        },
      },
    })

    const button = cy.get('button')

    button.should('have.text', 'click me no')
    button.click()
    button.should('have.text', 'click me yes')
  })
})
