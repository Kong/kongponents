import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { h } from 'vue'
import KToggle from '@/components/KToggle/KToggle.vue'

describe('KToggle', () => {
  it('toggles content', async () => {
    await render(KToggle, {
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

    await expect.element(page.getByCSS('button')).toHaveTextContent(/^click me no$/)
    await page.getByCSS('button').click()
    await expect.element(page.getByCSS('button')).toHaveTextContent(/^click me yes$/)
  })
})
