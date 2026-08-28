import { describe, it, expect, afterEach } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KThemeProvider from '@/components/KThemeProvider/KThemeProvider.vue'
import type { KongponentsTheme } from '@/types/theme'

const theme: KongponentsTheme = {
  '--kui-color-text-primary': 'rgb(111, 40, 255)',
  '--kui-border-radius-30': '999px',
}

describe('KThemeProvider', () => {
  afterEach(() => {
    // Clean up any theme overrides created by global-mode tests.
    document.getElementById('kongponents-theme')?.remove()
  })

  it('applies theme tokens as inline custom properties on its wrapper (subtree scope)', async () => {
    await render(KThemeProvider, {
      props: { theme },
      slots: { default: '<div class="child">child</div>' },
    })

    await expect.element(page.getByCSS('.k-theme-provider')).toBeInTheDocument()
    expect(page.getByCSS('.k-theme-provider').element().getAttribute('style')).toContain('--kui-color-text-primary')

    // The child inherits the custom property from the provider's wrapper.
    await expect.poll(() => getComputedStyle(page.getByCSS('.child').element()).getPropertyValue('--kui-color-text-primary').trim())
      .toBe('rgb(111, 40, 255)')

    // The document root is untouched in subtree scope.
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('')
  })

  it('sets the data-kui-theme attribute when name is provided', async () => {
    await render(KThemeProvider, {
      props: { theme, name: 'portal' },
    })

    await expect.element(page.getByCSS('.k-theme-provider')).toHaveAttribute('data-kui-theme', 'portal')
  })

  it('renders with a custom tag', async () => {
    await render(KThemeProvider, {
      props: { theme, tag: 'section' },
    })

    await expect.element(page.getByCSS('section.k-theme-provider')).toBeInTheDocument()
  })

  it('writes tokens to the document root when global is true', async () => {
    await render(KThemeProvider, {
      props: { theme, global: true },
      slots: { default: '<div class="child">child</div>' },
    })

    // In global mode the wrapper carries no --kui-* inline custom properties...
    const kuiProps = Array.from(page.getByCSS('.k-theme-provider').element().style).filter((p: string) => p.startsWith('--kui-'))
    expect(kuiProps).toHaveLength(0)

    // ...they are written to the document root instead.
    await expect.poll(() => getComputedStyle(document.documentElement).getPropertyValue('--kui-color-text-primary').trim())
      .toBe('rgb(111, 40, 255)')
  })
})
