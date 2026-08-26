import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KExternalLink from '@/components/KExternalLink/KExternalLink.vue'

describe('KExternalLink', () => {
  it('should not render link element when passed invalid href', async () => {
    const linkHref = 'kongponents'
    const linkText = 'This is external link'
    await render(KExternalLink, {
      props: {
        href: linkHref,
      },
      slots: {
        default: () => linkText,
      },
    })

    await expect.element(page.getByCSS('.k-external-link')).not.toBeInTheDocument()
  })

  it('should render link with href attribute', async () => {
    const linkHref = 'https://kongponents.konghq.com/'
    const linkText = 'This is external link'
    await render(KExternalLink, {
      props: {
        href: linkHref,
      },
      slots: {
        default: () => linkText,
      },
    })

    await expect.element(page.getByCSS('.k-external-link')).toHaveAttribute('href', linkHref)
    await expect.element(page.getByCSS('.k-external-link')).toHaveTextContent(linkText)
  })
})
