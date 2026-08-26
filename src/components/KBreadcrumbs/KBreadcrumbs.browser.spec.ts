import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KBreadcrumbs from '@/components/KBreadcrumbs/KBreadcrumbs.vue'
import type { BreadcrumbItem } from '@/types'

describe('KBreadcrumbs', () => {
  it('renders a breadcrumb', async () => {
    const items = [{
      key: 'docs',
      to: 'https://docs.konghq.com',
      text: 'Go to Kong Docs',
    }] as BreadcrumbItem[]

    await render(KBreadcrumbs, {
      props: {
        items,
      },
    })

    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('li').all().length).toBe(1)
  })

  it('correctly renders an non-link breadcrumbs', async () => {
    await render(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            text: 'Go to Kong Docs',
          },
          {
            key: 'specific-doc',
            text: 'My Doc',
          },
        ],
      },
    })

    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('li').all().length).toBe(2)
    const items = page.getByCSS('.k-breadcrumbs').getByCSS('.breadcrumbs-item')
    await expect.element(items.nth(0)).not.toHaveClass('link')
    await expect.element(items.nth(1)).not.toHaveClass('link')
    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('.breadcrumbs-divider').all().length).toBe(2)
  })

  it('renders custom divider when using slot', async () => {
    const customDivider = 'custom_divider'

    await render(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            text: 'Go to Kong Docs',
          },
          {
            key: 'specific-doc',
            text: 'My Doc',
          },
        ],
      },
      slots: {
        divider: customDivider,
      },
    })

    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('li').all().length).toBe(2)
    await expect.poll(() => page.getByCSS('.k-breadcrumbs .breadcrumbs-divider').all().length).toBe(2)
    await expect.element(page.getByCSS('.k-breadcrumbs .breadcrumbs-divider').first()).toHaveTextContent(customDivider)
  })

  it('renders custom icon when using slot', async () => {
    const customIcon = 'custom_icon'

    await render(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            text: 'Go to Kong Docs',
          },
        ],
      },
      slots: {
        'icon-docs': customIcon,
      },
    })

    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('li').all().length).toBe(1)
    await expect.element(page.getByCSS('.k-breadcrumbs .breadcrumbs-icon-container')).toHaveTextContent(customIcon)
  })

  it('renders breadcrumb links without needing a router', async () => {
    await render(KBreadcrumbs, {
      props: {
        items: [
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            title: 'Go to Kong Docs',
            text: 'External Link',
          },
        ],
      },
    })

    await expect.poll(() => page.getByCSS('.k-breadcrumbs').getByCSS('li').all().length).toBe(1)
  })
})
