import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KPrompt from '@/components/KPrompt/KPrompt.vue'

describe('KPrompt', () => {
  it('renders closed when visible is false', async () => {
    await render(KPrompt, {
      props: {
        visible: false,
      },
    })

    await expect.element(page.getByCSS('.k-prompt')).not.toBeInTheDocument()
  })

  it('renders open when visible is true', async () => {
    await render(KPrompt, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByCSS('.k-prompt .modal-container')).toBeVisible()
  })

  it('renders action buttons and close icon by default', async () => {
    await render(KPrompt, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByTestId('modal-close-icon')).toBeVisible()
    await expect.element(page.getByTestId('modal-cancel-button')).toBeVisible()
    await expect.element(page.getByTestId('modal-action-button')).toBeVisible()
  })

  it('renders title when passed through prop', async () => {
    const title = 'Modal Title'

    await render(KPrompt, {
      props: {
        visible: true,
        title,
      },
    })

    await expect.element(page.getByCSS('.modal-title')).toBeVisible()
    await expect.element(page.getByCSS('.modal-title')).toHaveTextContent(title)
  })

  it('renders title when passed through slot', async () => {
    const title = 'Slotted Title'

    await render(KPrompt, {
      props: {
        visible: true,
        title: 'Modal Title',
      },
      slots: {
        title,
      },
    })

    await expect.element(page.getByCSS('.modal-title')).toBeVisible()
    await expect.element(page.getByCSS('.modal-title')).toHaveTextContent(title)
  })

  it('renders message when passed through prop', async () => {
    const message = 'Modal Message'

    await render(KPrompt, {
      props: {
        visible: true,
        message,
      },
    })

    await expect.element(page.getByCSS('.prompt-content .prompt-message')).toBeVisible()
    await expect.element(page.getByCSS('.prompt-content .prompt-message')).toHaveTextContent(message)
  })

  it('renders content passed through default slot over message prop', async () => {
    const content = 'Modal Content'

    await render(KPrompt, {
      props: {
        visible: true,
        message: 'Modal Message',
      },
      slots: {
        default: content,
      },
    })

    await expect.element(page.getByCSS('.prompt-content')).toBeVisible()
    await expect.element(page.getByCSS('.prompt-content')).toHaveTextContent(content)
    await expect.element(page.getByCSS('.prompt-content .prompt-message')).not.toBeInTheDocument()
  })

  it('renders action button properly when text, appearance and disabled props are passed', async () => {
    const text = 'Action Button'
    const appearance = 'danger'
    const disabled = true

    await render(KPrompt, {
      props: {
        visible: true,
        actionButtonText: text,
        actionButtonAppearance: appearance,
        actionButtonDisabled: disabled,
      },
    })

    await expect.element(page.getByTestId('modal-action-button')).toBeVisible()
    await expect.element(page.getByTestId('modal-action-button')).toHaveTextContent(text)
    await expect.element(page.getByTestId('modal-action-button')).toHaveClass(appearance)
    await expect.element(page.getByTestId('modal-action-button')).toBeDisabled()
  })

  it('renders cancel button properly when text, appearance and disabled props are passed', async () => {
    const text = 'Cancel Button'
    const appearance = 'danger'
    const disabled = true

    await render(KPrompt, {
      props: {
        visible: true,
        cancelButtonText: text,
        cancelButtonAppearance: appearance,
        cancelButtonDisabled: disabled,
      },
    })

    await expect.element(page.getByTestId('modal-cancel-button')).toBeVisible()
    await expect.element(page.getByTestId('modal-cancel-button')).toHaveTextContent(text)
    await expect.element(page.getByTestId('modal-cancel-button')).toHaveClass(appearance)
    await expect.element(page.getByTestId('modal-cancel-button')).toBeDisabled()
  })

  it('renders modal with correct width when passed through modalAttributes prop', async () => {
    const widthHeight = '123px'

    await render(KPrompt, {
      props: {
        visible: true,
        modalAttributes: {
          maxWidth: widthHeight,
          maxHeight: widthHeight,
        },
      },
    })

    await expect.element(page.getByCSS('.k-prompt .modal-container')).toHaveStyle({ maxWidth: widthHeight })
    await expect.element(page.getByCSS('.k-prompt .modal-content')).toHaveStyle({ maxHeight: widthHeight })
  })

  it('emits proceed event when action button is clicked', async () => {
    const screen = await render(KPrompt, {
      props: {
        visible: true,
      },
    })

    await page.getByTestId('modal-action-button').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('proceed')
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const screen = await render(KPrompt, {
      props: {
        visible: true,
      },
    })

    await page.getByTestId('modal-cancel-button').click()

    await expect.poll(() => screen.emitted()).toHaveProperty('cancel')
  })

  it('emits cancel event when backdrop is clicked and closeOnBackdropClick is true', async () => {
    const screen = await render(KPrompt, {
      props: {
        visible: true,
        modalAttributes: {
          closeOnBackdropClick: true,
        },
      },
    })

    const backdrop = page.getByCSS('.k-prompt .modal-backdrop')
    const { width } = backdrop.element().getBoundingClientRect()

    await backdrop.click({ position: { x: width - 1, y: 1 } })

    await expect.poll(() => screen.emitted()).toHaveProperty('cancel')
  })

  it('renders confirmation input field and confirmation prompt properly when props are passed', async () => {
    const confirmationText = 'Confirmation Text'
    const confirmationPrompt = 'Confirmation {confirmationText} Prompt'

    await render(KPrompt, {
      props: {
        visible: true,
        confirmationPrompt,
        confirmationText,
      },
    })

    await expect.element(page.getByCSS('.prompt-confirmation-text')).toBeVisible()
    await expect.element(page.getByCSS('.prompt-confirmation-text')).toHaveTextContent('Confirmation "Confirmation Text" Prompt')
    await expect.element(page.getByTestId('confirmation-input')).toBeVisible()
    await expect.element(page.getByTestId('confirmation-input')).toHaveAttribute('name', 'prompt-confirmation-text')
  })

  it('action button behaves correctly when confirmationText is passed', async () => {
    const confirmationText = 'Confirmation Text'

    await render(KPrompt, {
      props: {
        visible: true,
        confirmationText,
        actionButtonDisabled: false,
      },
    })

    await expect.element(page.getByTestId('modal-action-button')).toBeDisabled()

    await page.getByTestId('confirmation-input').fill(confirmationText)

    await expect.element(page.getByTestId('modal-action-button')).toBeEnabled()
  })
})
