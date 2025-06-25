import KToggle from '@/components/KToggle/KToggle.vue'
import { h } from 'vue'

describe('KToggle', () => {
  it('toggles content', () => {
    cy.mount(KToggle, {
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

    cy.get('button').should('have.text', 'click me no')
    cy.get('button').click()
    cy.get('button').should('have.text', 'click me yes')
  })
})
