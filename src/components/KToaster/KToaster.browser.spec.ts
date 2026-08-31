import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KToaster from '@/components/KToaster/KToaster.vue'
import type { ToasterProps } from '@/types'

describe('KToaster', () => {
  it('renders toaster', async () => {
    const toasterState: ToasterProps['toasterState'] = [
      { key: '1', title: 'I have a toast', message: 'hey toasty' },
      { key: '2', title: 'I have a toast', appearance: 'success', message: 'hey toasty' },
      { key: '3', title: 'I have a toast', appearance: 'danger', message: 'hey toasty' },
      { key: '4', title: 'I have a toast', appearance: 'danger', message: 'hey toasty' },
    ]

    await render(KToaster, {
      props: {
        toasterState,
      },
    })

    await expect.element(page.getByCSS('.k-toaster')).toBeInTheDocument()
    await expect.poll(() => page.getByCSS('.k-toaster').getByCSS('div[role="alert"].danger').all().length).toBe(2)
    await expect.poll(() => page.getByCSS('.k-toaster').getByCSS('.toaster .toaster-message').all().length).toBe(4)
  })

  it('renders all elements in toaster correctly - message passed', async () => {
    const title = 'I have a toast'
    const message = 'hey toasty'

    await render(KToaster, {
      props: {
        toasterState: [{ key: '1', title, message }],
      },
    })

    await expect.element(page.getByCSS('.toaster .toaster-icon')).toBeVisible()
    await expect.element(page.getByCSS('.toaster .toaster-title')).toHaveTextContent(title)
    await expect.element(page.getByCSS('.toaster .toaster-message')).toHaveTextContent(message)
    await expect.element(page.getByTestId('toaster-close-icon')).toBeVisible()
  })

  it('renders all elements in toaster correctly - message not passed', async () => {
    const title = 'I have a toast'

    await render(KToaster, {
      props: {
        toasterState: [{ key: '1', title }],
      },
    })

    await expect.element(page.getByCSS('.toaster .toaster-icon')).toBeVisible()
    await expect.element(page.getByCSS('.toaster .toaster-title')).toHaveTextContent(title)
    await expect.element(page.getByCSS('.toaster .toaster-message')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('toaster-close-icon')).toBeVisible()
  })

  it('shows close button even if content is long', async () => {
    const longTitle = 'title'.repeat(20)
    const longMessage = 'message'.repeat(20)

    await render(KToaster, {
      props: {
        toasterState: [{ key: '1', title: longTitle, message: longMessage }],
      },
    })

    await expect.element(page.getByTestId('toaster-close-icon')).toBeVisible()
  })
})
