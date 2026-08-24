import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import KButton from '@/components/KButton/KButton.vue'
import { ButtonAppearances, ButtonSizes } from '@/types'
import type { ButtonAppearance, ButtonSize } from '@/types'

const rendersCorrectAppearance = (variant: ButtonAppearance) => {
  it(`renders KButton with the ${variant} appearance`, async () => {
    await render(KButton, {
      props: {
        appearance: variant,
      },
      slots: {
        default: () => variant,
      },
    })

    await expect.element(page.getByCSS('.k-button')).toHaveClass(variant)
  })
}

const rendersCorrectSize = (size: ButtonSize) => {
  it(`sets ${size} class when size passed`, async () => {
    await render(KButton, {
      props: {
        size,
      },
      slots: {
        default: () => size.charAt(0).toUpperCase() + size.substring(1).toLowerCase(),
      },
    })

    await expect.element(page.getByCSS('.k-button')).toHaveClass(size)
  })
}

describe('KButton', () => {
  // Loop through ButtonAppearances
  Object.values(ButtonAppearances).map(a => rendersCorrectAppearance(a))

  // Loop through ButtonSizes
  Object.values(ButtonSizes).map(s => rendersCorrectSize(s))

  it('sets icon-button class when icon prop is `true` passed', async () => {
    await render(KButton, {
      props: {
        icon: true,
      },
      slots: {
        default: () => 'Pretend I am an icon',
      },
    })

    await expect.element(page.getByCSS('.k-button')).toHaveClass('icon-button')
  })

  it('renders a native link with KButton styles', async () => {
    await render(KButton, {
      props: {
        to: 'https://google.com',
        appearance: 'secondary',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    await expect.element(page.getByCSS('a')).toHaveClass('k-button')
    await expect.element(page.getByCSS('a')).toHaveClass('secondary')
    await expect.element(page.getByCSS('a')).toHaveAttribute('href', 'https://google.com')
  })

  // TODO: remove this when we remove icon slot
  it('renders an icon when using icon slot', async () => {
    const iconText = 'Pretend I am an icon'
    await render(KButton, {
      props: {
        // deprecated string usage that the component still supports at runtime
        icon: 'spinner' as unknown as boolean,
      },
      slots: {
        default: () => 'Click me',
        icon: () => iconText,
      },
    })

    await expect.element(page.getByCSS('.k-button')).toHaveTextContent(iconText)
  })

  it('strips falsy disabled attribute on native link', async () => {
    await render(KButton, {
      props: {
        to: 'https://google.com',
        disabled: false,
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    await expect.element(page.getByCSS('.k-button')).not.toHaveAttribute('disabled')
  })

  it('should not throw error when `to` prop is an object and disabled is true', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'home', component: defineComponent({ setup: () => () => h('div') }) }],
    })

    // missing `to` on router-link only throws with vue-router's production build
    // the dev build warns instead.
    // A clean console is the dev-build-observable form of "does not throw".
    const warn = vi.spyOn(console, 'warn')
    const error = vi.spyOn(console, 'error')

    await render(KButton, {
      props: {
        to: { name: 'home' },
        disabled: true,
      },
      slots: {
        default: () => 'Click me',
      },
      global: {
        plugins: [router],
      },
    })

    await expect.element(page.getByCSS('.k-button')).toBeInTheDocument()
    expect(warn).not.toHaveBeenCalled()
    expect(error).not.toHaveBeenCalled()
  })

  it('adds `type` property when rendering a native button element', async () => {
    await render(KButton, {
      props: {
        appearance: 'secondary',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    await expect.element(page.getByCSS('button')).toHaveAttribute('type', 'button')
    await expect.element(page.getByCSS('button')).not.toHaveAttribute('role')
  })

  it('adds `type` property as defined on component when rendering a native button element', async () => {
    await render(KButton, {
      props: {
        appearance: 'secondary',
        type: 'submit',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    await expect.element(page.getByCSS('button')).toHaveAttribute('type', 'submit')
  })

  it('adds `role` property and does not render `type` property when rendering an anchor tag', async () => {
    await render(KButton, {
      props: {
        to: 'https://google.com',
        appearance: 'secondary',
        type: 'submit',
      },
      slots: {
        default: () => "I'm a native link",
      },
    })

    await expect.element(page.getByCSS('a')).not.toHaveAttribute('type')
    await expect.element(page.getByCSS('a')).toHaveAttribute('role', 'button')
  })
})
