import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import KComponent from '@/components/KComponent'
import KButton from '@/components/KButton/KButton.vue'

describe('KComponent', () => {
  it('can update reactive data object', async () => {
    await render(KComponent, {
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

    await expect.element(page.getByCSS('.k-button')).toHaveTextContent('clicked me 0 times!')
    await page.getByCSS('.k-button').click()
    await expect.element(page.getByCSS('.k-button')).toHaveTextContent('clicked me 1 times!')
  })
})
