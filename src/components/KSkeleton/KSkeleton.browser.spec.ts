import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'

describe('KSkeleton', () => {
  describe('variants', () => {
    it('renders generic skeleton state by default', async () => {
      await render(KSkeleton)

      await expect.element(page.getByCSS('.skeleton-loader')).toBeInTheDocument()
    })

    it('renders form skeleton state with 4 rows by default', async () => {
      await render(KSkeleton, {
        props: {
          type: 'form',
        },
      })

      await expect.element(page.getByCSS('.skeleton-form-wrapper')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.skeleton-form-row').all().length).toBe(4)
    })

    it('renders card skeleton state with 2 cards', async () => {
      await render(KSkeleton, {
        props: {
          type: 'card',
          cardCount: 2,
        },
      })

      await expect.element(page.getByCSS('.skeleton-card-wrapper')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.skeleton-card').all().length).toBe(2)
    })

    it('renders table skeleton state with 6 rows by default', async () => {
      await render(KSkeleton, {
        props: {
          type: 'table',
        },
      })

      await expect.element(page.getByCSS('.skeleton-table-wrapper')).toBeInTheDocument()
      await expect.poll(() => page.getByCSS('.skeleton-table-row').all().length).toBe(6)
    })

    it('renders spinner skeleton state', async () => {
      await render(KSkeleton, {
        props: {
          type: 'spinner',
        },
      })

      await expect.element(page.getByCSS('.skeleton-spinner')).toBeInTheDocument()
    })

    it('renders full screen loader with progress bar', async () => {
      await render(KSkeleton, {
        props: {
          type: 'fullscreen-kong',
        },
      })

      await expect.element(page.getByTestId('full-screen-loader')).toBeVisible()

      await expect.element(page.getByCSS('[role="progressbar"]')).toBeVisible()
    })

    it('renders full screen loader with custom zIndex', async () => {
      await render(KSkeleton, {
        props: {
          type: 'fullscreen-kong',
          zIndex: 12000,
        },
      })

      await expect.element(page.getByTestId('full-screen-loader')).toBeVisible()

      await expect.element(page.getByCSS('.k-skeleton .fullscreen-loading-container')).toHaveStyle({ zIndex: '12000' })
    })

    it('renders full screen generic loader with progress bar', async () => {
      await render(KSkeleton, {
        props: {
          type: 'fullscreen-generic',
        },
      })

      await expect.element(page.getByTestId('full-screen-spinner-loader')).toBeVisible()

      await expect.element(page.getByCSS('[role="progressbar"]')).toBeVisible()
    })

    it('renders full screen generic loader with custom zIndex', async () => {
      await render(KSkeleton, {
        props: {
          type: 'fullscreen-generic',
          zIndex: 12000,
        },
      })

      await expect.element(page.getByTestId('full-screen-spinner-loader')).toBeVisible()

      await expect.element(page.getByCSS('.k-skeleton .fullscreen-loading-container')).toHaveStyle({ zIndex: '12000' })
    })
  })
})
