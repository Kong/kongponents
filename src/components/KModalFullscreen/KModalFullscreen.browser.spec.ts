import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KModalFullscreen from '@/components/KModalFullscreen/KModalFullscreen.vue'

describe('KModalFullscreen', () => {
  it('renders proper content when using slots', async () => {
    const headerIcon = 'This is some header icon text'
    const headerText = 'This is some header text'
    const bodyHeader = 'This is some body header text'
    const bodyHeaderDescription = 'This is some body header description text'
    const bodyText = 'This is some body text'

    await render(KModalFullscreen, {
      props: {
        isVisible: true,
        title: headerText,
      },
      slots: {
        'header-icon': () => h('div', {}, headerIcon),
        'header-content': () => h('div', {}, headerText),
        'body-header': () => h('div', {}, bodyHeader),
        'body-header-description': () => h('div', {}, bodyHeaderDescription),
        default: () => h('div', {}, bodyText),
      },
    })

    await expect.element(page.getByCSS('.k-modal-fullscreen-title .header-icon')).toHaveTextContent(headerIcon)
    await expect.element(page.getByCSS('.k-modal-fullscreen-header')).toHaveTextContent(headerText)
    await expect.element(page.getByCSS('.k-modal-fullscreen-body-header .body-header')).toHaveTextContent(bodyHeader)
    await expect.element(page.getByCSS('.k-modal-fullscreen-body-header .body-header-description')).toHaveTextContent(bodyHeaderDescription)
    await expect.element(page.getByCSS('.k-modal-fullscreen-body')).toHaveTextContent(bodyText)
    await expect.element(page.getByCSS('.k-modal-fullscreen-footer')).not.toBeInTheDocument()
  })

  it('renders proper content when using action-buttons slot', async () => {
    const actionButtonsText = 'This is some action buttons text'

    await render(KModalFullscreen, {
      props: {
        isVisible: true,
        title: 'Test Me',
      },
      slots: {
        'action-buttons': () => h('div', {}, actionButtonsText),
      },
    })

    await expect.element(page.getByCSS('.k-modal-fullscreen-action')).toHaveTextContent(actionButtonsText)
  })

  it('renders proper content when using props', async () => {
    const title = 'Sweet prop title'
    const actionButtonText = 'Sweet prop actionButton'
    const cancelButtonText = 'Sweet prop cancelButton'
    const bodyHeader = 'Sweet prop bodyHeader'
    const bodyHeaderDescription = 'Sweet prop bodyHeaderDescription'

    await render(KModalFullscreen, {
      props: {
        isVisible: true,
        title,
        actionButtonText,
        cancelButtonText,
        bodyHeader,
        bodyHeaderDescription,
      },
    })

    await expect.element(page.getByCSS('.proceed-button')).toHaveTextContent(actionButtonText)
    await expect.element(page.getByCSS('.cancel-button')).toHaveTextContent(cancelButtonText)
    await expect.element(page.getByCSS('.k-modal-fullscreen-header')).toHaveTextContent(title)
    await expect.element(page.getByCSS('.k-modal-fullscreen-body-header .body-header')).toHaveTextContent(bodyHeader)
    await expect.element(page.getByCSS('.k-modal-fullscreen-body-header .body-header-description')).toHaveTextContent(bodyHeaderDescription)
  })

  it('emits close when hitting escape', async () => {
    const screen = await render(KModalFullscreen, {
      props: {
        title: 'Test Me',
        isVisible: true,
      },
    })

    await userEvent.keyboard('{Escape}')

    await expect.poll(() => screen.emitted()).toHaveProperty('canceled')
  })

  it('renders proper content when using footer-content slot', async () => {
    const footerContentText = 'This is some footer text'

    await render(KModalFullscreen, {
      props: {
        isVisible: true,
        title: 'Test Me',
      },
      slots: {
        'footer-content': footerContentText,
      },
    })

    await expect.element(page.getByCSS('.k-modal-fullscreen-footer')).toBeVisible()
    await expect.element(page.getByCSS('.k-modal-fullscreen-footer')).toHaveTextContent(footerContentText)
  })
})
