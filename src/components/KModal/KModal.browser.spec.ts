import { describe, it, expect, vi } from 'vitest'
import { page } from 'vitest/browser'
import type { Locator } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, ref } from 'vue'
import KModal from '@/components/KModal/KModal.vue'
import KPop from '@/components/KPop/KPop.vue'

// Clicks a corner of the element that the centered `.modal-container` doesn't cover, so the
// click lands on the backdrop itself rather than on the modal content.
const clickBackdropCorner = async (backdrop: Locator): Promise<void> => {
  const { width } = backdrop.element().getBoundingClientRect()
  await backdrop.click({ position: { x: width - 10, y: 10 } })
}

describe('KModal', () => {
  it('renders closed when visible is false', async () => {
    await render(KModal, {
      props: {
        visible: false,
      },
    })

    await expect.element(page.getByCSS('.k-modal')).not.toBeInTheDocument()
  })

  it('renders open when visible is true', async () => {
    await render(KModal, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByCSS('.k-modal .modal-container')).toBeVisible()
  })

  it('renders action buttons and close icon by default', async () => {
    await render(KModal, {
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

    await render(KModal, {
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

    await render(KModal, {
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

  it('renders content when passed through slot', async () => {
    const content = 'Modal Content'

    await render(KModal, {
      props: {
        visible: true,
      },
      slots: {
        default: content,
      },
    })

    await expect.element(page.getByCSS('.modal-content')).toBeVisible()
    await expect.element(page.getByCSS('.modal-content')).toHaveTextContent(content)
  })

  it('renders action button properly when text, appearance and disabled props are passed', async () => {
    const text = 'Action Button'
    const appearance = 'danger'
    const disabled = true

    await render(KModal, {
      props: {
        visible: true,
        actionButtonText: text,
        actionButtonAppearance: appearance,
        actionButtonDisabled: disabled,
      },
    })

    const actionButton = page.getByTestId('modal-action-button')
    await expect.element(actionButton).toBeVisible()
    await expect.element(actionButton).toHaveTextContent(text)
    await expect.element(actionButton).toHaveClass(appearance)
    await expect.element(actionButton).toBeDisabled()
  })

  it('renders cancel button properly when text, appearance and disabled props are passed', async () => {
    const text = 'Cancel Button'
    const appearance = 'danger'
    const disabled = true

    await render(KModal, {
      props: {
        visible: true,
        cancelButtonText: text,
        cancelButtonAppearance: appearance,
        cancelButtonDisabled: disabled,
      },
    })

    const cancelButton = page.getByTestId('modal-cancel-button')
    await expect.element(cancelButton).toBeVisible()
    await expect.element(cancelButton).toHaveTextContent(text)
    await expect.element(cancelButton).toHaveClass(appearance)
    await expect.element(cancelButton).toBeDisabled()
  })

  it('does not render cancel button when hideCancelButton is true', async () => {
    await render(KModal, {
      props: {
        visible: true,
        hideCancelButton: true,
      },
    })

    await expect.element(page.getByTestId('modal-cancel-button')).not.toBeInTheDocument()
  })

  it('renders footer slot when passed', async () => {
    const footer = 'Modal Footer'

    await render(KModal, {
      props: {
        visible: true,
      },
      slots: {
        footer,
      },
    })

    await expect.element(page.getByCSS('.modal-footer')).toBeVisible()
    await expect.element(page.getByCSS('.modal-footer')).toHaveTextContent(footer)
    await expect.element(page.getByTestId('modal-cancel-button')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('modal-action-button')).not.toBeInTheDocument()
  })

  it('renders footer-actions slot when passed', async () => {
    const footerActions = 'Modal Footer Actions'

    await render(KModal, {
      props: {
        visible: true,
      },
      slots: {
        'footer-actions': footerActions,
      },
    })

    await expect.element(page.getByCSS('.footer-actions')).toBeVisible()
    await expect.element(page.getByCSS('.footer-actions')).toHaveTextContent(footerActions)
    await expect.element(page.getByTestId('modal-cancel-button')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('modal-action-button')).not.toBeInTheDocument()
  })

  it('renders custom content over default content when passed through content slot', async () => {
    const modalContent = 'Modal Content'

    await render(KModal, {
      props: {
        visible: true,
      },
      slots: {
        content: modalContent,
      },
    })

    await expect.element(page.getByCSS('.modal-container')).toBeVisible()
    await expect.element(page.getByCSS('.modal-container')).toHaveTextContent(modalContent)
    await expect.element(page.getByCSS('.modal-header')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.modal-content')).not.toBeInTheDocument()
    await expect.element(page.getByCSS('.modal-footer')).not.toBeInTheDocument()
  })

  it('does not render close icon when hideCloseIcon is true', async () => {
    await render(KModal, {
      props: {
        visible: true,
        hideCloseIcon: true,
      },
    })

    await expect.element(page.getByTestId('modal-close-icon')).not.toBeInTheDocument()
  })

  it('renders modal with correct maxWidth when prop is passed', async () => {
    const maxWidth = '123px'

    await render(KModal, {
      props: {
        visible: true,
        maxWidth,
      },
    })

    await expect.element(page.getByCSS('.k-modal .modal-container')).toHaveStyle({ maxWidth })
  })

  it('renders modal with correct maxHeight when prop is passed', async () => {
    const maxHeight = '123px'

    await render(KModal, {
      props: {
        visible: true,
        maxHeight,
      },
    })

    await expect.element(page.getByCSS('.k-modal .modal-content')).toHaveStyle({ maxHeight })
  })

  it('renders full screen modal when fullScreen prop is true', async () => {
    await render(KModal, {
      props: {
        visible: true,
        fullScreen: true,
      },
    })

    await expect.element(page.getByCSS('.k-modal .modal-backdrop.modal-full-screen')).toBeVisible()
  })

  it('renders modal with correct zIndex when prop is passed', async () => {
    await render(KModal, {
      props: {
        visible: true,
        zIndex: 1200,
      },
    })

    await expect.element(page.getByCSS('.k-modal .modal-backdrop')).toHaveStyle({ zIndex: '1200' })
  })

  it('renders modal with correct default zIndex when prop is not passed', async () => {
    await render(KModal, {
      props: {
        visible: true,
      },
    })

    // default z-index
    await expect.element(page.getByCSS('.k-modal .modal-backdrop')).toHaveStyle({ zIndex: '1100' })
  })

  it('provides its z-index so a nested KPop elevates above it', async () => {
    await render(KModal, {
      props: {
        visible: true,
        zIndex: 1100,
      },
      slots: {
        default: () => h(KPop, { target: 'body' }, {
          content: () => 'Popover content',
        }),
      },
    })

    await expect.element(page.getByCSS('.popover')).toHaveStyle({ zIndex: '1101' })
  })

  it('emits proceed event when action button is clicked', async () => {
    const onProceed = vi.fn()

    await render(KModal, {
      props: {
        visible: true,
        onProceed,
      },
    })

    await page.getByTestId('modal-action-button').click()
    await expect.poll(() => onProceed.mock.calls.length).toBe(1)
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const onCancel = vi.fn()

    await render(KModal, {
      props: {
        visible: true,
        onCancel,
      },
    })

    await page.getByTestId('modal-cancel-button').click()
    await expect.poll(() => onCancel.mock.calls.length).toBe(1)
  })

  it('does not close modal on backdrop click when closeOnBackdropClick is false', async () => {
    const onCancel = vi.fn()

    await render(KModal, {
      props: {
        visible: true,
        closeOnBackdropClick: false,
        onCancel,
      },
    })

    await clickBackdropCorner(page.getByCSS('.k-modal .modal-backdrop'))
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('emits cancel event when backdrop is clicked and closeOnBackdropClick is true', async () => {
    const onCancel = vi.fn()

    await render(KModal, {
      props: {
        visible: true,
        closeOnBackdropClick: true,
        onCancel,
      },
    })

    await clickBackdropCorner(page.getByCSS('.k-modal .modal-backdrop'))
    await expect.poll(() => onCancel.mock.calls.length).toBe(1)
  })

  it('does not emit cancel event when backdrop is clicked while text selected and closeOnBackdropClick is true', async () => {
    const onCancel = vi.fn()

    await render(KModal, {
      props: {
        visible: true,
        closeOnBackdropClick: true,
        onCancel,
      },
      slots: {
        default: '<p data-testid="modal-text">Select this text to test</p>',
      },
    })

    const selectionChanged = new Promise<void>((resolve) => {
      document.addEventListener('selectionchange', () => resolve(), { once: true })
    })

    const modalText = page.getByTestId('modal-text').element()
    const range = document.createRange()
    range.selectNodeContents(modalText)
    const selection = document.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)

    await selectionChanged

    expect(document.getSelection()?.toString()).toBe('Select this text to test')

    page.getByCSS('.k-modal .modal-backdrop').element().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('sets focus on first input field when inputAutofocus is true', async () => {
    await render(KModal, {
      props: {
        visible: true,
        inputAutofocus: true,
      },
      slots: {
        default: '<input data-testid="slotted-input" type="text" />',
      },
    })

    await expect.element(page.getByCSS('.k-modal input[data-testid="slotted-input"]')).toHaveFocus()
  })

  it('locks body scroll when modal is open and unlocks when closed', async () => {
    const screen = await render(KModal, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByCSS('body')).toHaveStyle({ overflow: 'hidden' })

    await screen.rerender({ visible: false })

    await expect.element(page.getByCSS('body')).toHaveStyle({ overflow: 'visible' })
  })

  it('unlocks body scroll when modal is unmounted', async () => {
    const screen = await render(KModal, {
      props: {
        visible: true,
      },
    })

    await expect.element(page.getByCSS('body')).toHaveStyle({ overflow: 'hidden' })

    await screen.unmount()

    await expect.element(page.getByCSS('body')).toHaveStyle({ overflow: 'visible' })
  })

  it('renders the header when a title slot is added after mount', async () => {
    const ready = ref(false)

    await render(defineComponent({
      setup: () => () => h(
        KModal,
        { hideCloseIcon: true, visible: true },
        ready.value ? { title: () => 'Slotted title' } : {},
      ),
    }))

    await expect.element(page.getByCSS('.modal-header')).not.toBeInTheDocument()

    ready.value = true

    await expect.element(page.getByCSS('.modal-header')).toBeInTheDocument()
    await expect.element(page.getByCSS('.modal-title')).toHaveTextContent('Slotted title')
  })
})
