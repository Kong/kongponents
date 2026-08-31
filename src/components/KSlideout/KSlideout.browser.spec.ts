import { describe, it, expect } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import KSlideout from '@/components/KSlideout/KSlideout.vue'
import KPop from '@/components/KPop/KPop.vue'

describe('KSlideout', () => {
  it('renders default slot', async () => {
    const contentHeading = "What's up default slot"
    const contentSentence = 'Default slots are the easiest'

    await render(KSlideout, {
      props: {
        visible: true,
      },
      slots: {
        default: h('div', {}, [
          h('h1', {}, contentHeading),
          h('p', {}, contentSentence),
        ]),
      },
    })

    await expect.element(page.getByCSS('h1')).toBeVisible()
    await expect.element(page.getByCSS('h1')).toHaveTextContent(new RegExp(`^${contentHeading}$`))
    await expect.element(page.getByCSS('p')).toBeVisible()
    await expect.element(page.getByCSS('p')).toHaveTextContent(new RegExp(`^${contentSentence}$`))
  })

  it('renders props when passed', async () => {
    const titleProp = 'Hello!'

    await render(KSlideout, {
      props: {
        visible: true,
        title: titleProp,
      },
    })

    await expect.element(page.getByTestId('slideout-title')).toBeVisible()
    await expect.element(page.getByTestId('slideout-title')).toHaveTextContent(new RegExp(`^${titleProp}$`))
  })

  it('renders with correct default z-index', async () => {
    await render(KSlideout, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByCSS('.k-slideout .slideout-container')).toHaveStyle({ zIndex: '9999' })
    await expect.element(page.getByCSS('.k-slideout .slideout-backdrop')).toHaveStyle({ zIndex: '9999' })
  })

  it('renders with custom z-index', async () => {
    await render(KSlideout, {
      props: {
        visible: true,
        zIndex: 92929,
      },
    })

    await expect.element(page.getByCSS('.k-slideout .slideout-container')).toHaveStyle({ zIndex: '92929' })
    await expect.element(page.getByCSS('.k-slideout .slideout-backdrop')).toHaveStyle({ zIndex: '92929' })
  })

  it('provides its z-index so a nested KPop elevates above it', async () => {
    await render(KSlideout, {
      props: {
        visible: true,
        zIndex: 9999,
      },
      slots: {
        default: h(KPop, { target: 'body' }, {
          content: () => 'Popover content',
        }),
      },
    })

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '10000' })
  })

  it('renders close icon on right', async () => {
    await render(KSlideout, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByTestId('slideout-close-icon')).toBeVisible()
  })

  it('emits close event when backdrop is clicked', async () => {
    const screen = await render(KSlideout, {
      props: {
        visible: true,
      },
    })

    await page.getByCSS('.slideout-backdrop').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('close')
  })

  it('emits close event when esc key pressed', async () => {
    const screen = await render(KSlideout, {
      props: {
        visible: true,
      },
    })

    await userEvent.keyboard('{Escape}')

    await expect.poll(() => screen.emitted()).toHaveProperty('close')
  })

  it('does not emit close event when closeOnBlur prop is false', async () => {
    const screen = await render(KSlideout, {
      props: {
        visible: true,
        closeOnBlur: false,
      },
    })

    await page.getByCSS('.slideout-backdrop').click()

    expect(screen.emitted()).not.toHaveProperty('close')
  })
})
