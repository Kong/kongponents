import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { h } from 'vue'
import { render } from 'vitest-browser-vue'
import KAlert from '@/components/KAlert/KAlert.vue'
import { AlertAppearances } from '@/types'
import type { AlertAppearance } from '@/types'

const rendersCorrectVariant = (variant: AlertAppearance) => {
  it(`renders ${variant} variant`, async () => {
    await render(KAlert, {
      props: {
        appearance: variant,
        alertMessage: `I am ${variant}`,
      },
    })

    await expect.element(page.getByCSS('.k-alert')).toHaveClass(variant)
  })
}

describe('KAlert', () => {
  // Loop through AlertAppearances
  Object.keys(AlertAppearances).map(v => rendersCorrectVariant(v as AlertAppearance))

  it('renders info variant when no appearance prop', async () => {
    await render(KAlert, {
      props: {
        alertMessage: 'I should be info!',
      },
    })

    await expect.element(page.getByCSS('.k-alert')).toHaveClass('info')
  })

  it('renders all elements correctly when props are not passed', async () => {
    await render(KAlert)

    await expect.element(page.getByCSS('.k-alert')).toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-icon-container')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-content')).toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-title')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-message')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-dismiss-icon')).not.toBeInTheDocument()
  })

  it('renders title when passed as a prop', async () => {
    const title = 'I am a title'

    await render(KAlert, {
      props: {
        title,
      },
    })

    await expect.element(page.getByCSS('.alert-title')).toBeVisible()
    await expect.element(page.getByCSS('.alert-title')).toHaveTextContent(new RegExp(`^${title}$`))
  })

  it('renders message when passed as a prop', async () => {
    const message = 'I am a message'

    await render(KAlert, {
      props: {
        message,
      },
    })

    await expect.element(page.getByCSS('.alert-message')).toBeVisible()
    await expect.element(page.getByCSS('.alert-message')).toHaveTextContent(new RegExp(`^${message}$`))
  })

  it('renders icon and dismiss button when props are passed', async () => {
    await render(KAlert, {
      props: {
        showIcon: true,
        dismissible: true,
      },
    })

    await expect.element(page.getByCSS('.alert-icon-container')).toBeInTheDocument()
    await expect.element(page.getByCSS('.alert-dismiss-icon')).toBeInTheDocument()
  })

  it('renders default slot correctly', async () => {
    const message = 'I am a message'
    const defaultSlotContent = 'Default'

    await render(KAlert, {
      props: {
        message,
      },
      slots: {
        default: h('span', {}, defaultSlotContent),
      },
    })

    await expect.element(page.getByCSS('.alert-message')).toBeVisible()
    await expect.element(page.getByCSS('.alert-message')).toHaveTextContent(new RegExp(`^${defaultSlotContent}$`))
  })

  it('displays icon passed through icon slot', async () => {
    const iconSlotContent = 'icon slot content'
    const testId = 'slotted-icon'

    await render(KAlert, {
      slots: {
        icon: h('div', { 'data-testid': testId }, iconSlotContent),
      },
    })

    await expect.element(page.getByCSS('.alert-icon-container').getByTestId(testId)).toBeVisible()
    await expect.element(page.getByCSS('.alert-icon-container').getByTestId(testId)).toHaveTextContent(iconSlotContent)
  })

  it('emits dismiss event when dismiss button is clicked', async () => {
    const screen = await render(KAlert, {
      props: {
        dismissible: true,
      },
    })

    await page.getByCSS('.alert-dismiss-icon').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('dismiss')
  })
})
