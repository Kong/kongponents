import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import type { TabsAppearance } from '@/types'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const appearances: TabsAppearance[] = ['default', 'minimal']

describe('KTabs', () => {
  appearances.forEach((appearance) => {
    describe(`${appearance} appearance`, () => {
      it('sets correct appearance class', async () => {
        await render(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })

        await expect.element(page.getByCSS('.k-tabs')).toHaveClass(appearance)
      })

      it('first tab is set if hash not found', async () => {
        await render(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })

        await expect.element(page.getByCSS('.tab-item').nth(0)).toHaveClass('active')
      })

      it('sets correct tab if default tab prop', async () => {
        await render(KTabs, {
          props: {
            tabs: TABS,
            modelValue: '#books',
            appearance,
          },
        })

        await expect.element(page.getByCSS('.tab-item').nth(2)).toHaveClass('active')
      })

      it('emits change event on click', async () => {
        const screen = await render(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })

        await page.getByCSS('.tab-item').nth(1).click()

        await expect.poll(() => screen.emitted()).toHaveProperty('change')
        expect(screen.emitted('change')?.[0][0]).toBe('#movies')
      })

      it('hides the panel content when hidePanels is true', async () => {
        const picturesSlot = 'I love pictures'
        const moviesSlot = 'I love pictures'
        const booksSlot = 'I love pictures'

        await render(KTabs, {
          props: {
            tabs: TABS,
            hidePanels: true,
            appearance,
          },
          slots: {
            pictures: h('div', {}, picturesSlot),
            movies: h('div', {}, moviesSlot),
            books: h('div', {}, booksSlot),
          },
        })

        await page.getByCSS('.tab-item').nth(0).click()
        await expect.element(page.getByCSS('#panel-0')).not.toBeInTheDocument()
        await expect.element(page.getByCSS('.tab-container')).not.toBeInTheDocument()

        await page.getByCSS('.tab-item').nth(1).click()
        await expect.element(page.getByCSS('#panel-1')).not.toBeInTheDocument()
        await expect.element(page.getByCSS('.tab-container')).not.toBeInTheDocument()

        await page.getByCSS('.tab-item').nth(2).click()
        await expect.element(page.getByCSS('#panel-2')).not.toBeInTheDocument()
        await expect.element(page.getByCSS('.tab-container')).not.toBeInTheDocument()
      })

      it('disables the tab item when disabled is true', async () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', disabled: true },
          { hash: '#books', title: 'Books' },
        ]

        const screen = await render(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        await expect.element(page.getByCSS('.tab-item .tab-link').nth(1)).toHaveClass('disabled')

        await page.getByCSS('.tab-item').nth(1).click()
        await expect.poll(() => screen.emitted()).not.toHaveProperty('change')
      })

      it('renders the tab as a link if tab.to is present', async () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', to: '/movies' },
          { hash: '#books', title: 'Books' },
        ]

        await render(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        await expect.element(page.getByCSS('.tab-item .tab-link').nth(1)).toHaveAttribute('href', '/movies')
      })

      it('renders the tab as a link with no href attribute if tab.to is present and tab.disabled is true', async () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', to: '/movies', disabled: true },
          { hash: '#books', title: 'Books' },
        ]

        await render(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        await expect.element(page.getByCSS('.tab-item .tab-link').nth(1)).not.toHaveAttribute('href')
      })

      it('does not change the tab when beforeChange returns false', async () => {
        const screen = await render(KTabs, {
          props: {
            tabs: TABS,
            beforeChange: () => false,
            appearance,
          },
        })

        await page.getByCSS('.tab-item').nth(1).click()
        await expect.poll(() => screen.emitted()).not.toHaveProperty('change')
      })

      describe('slots', () => {
        it('provides the #hash slot content', async () => {
          const picturesSlot = 'I love pictures'
          const moviesSlot = 'I love pictures'
          const booksSlot = 'I love pictures'

          await render(KTabs, {
            props: {
              tabs: TABS,
              appearance,
            },
            slots: {
              pictures: h('div', {}, picturesSlot),
              movies: h('div', {}, moviesSlot),
              books: h('div', {}, booksSlot),
            },
          })

          await page.getByCSS('.tab-item').nth(0).click()
          await expect.element(page.getByCSS('#panel-0')).toHaveTextContent(picturesSlot)

          await page.getByCSS('.tab-item').nth(1).click()
          await expect.element(page.getByCSS('#panel-1')).toHaveTextContent(moviesSlot)

          await page.getByCSS('.tab-item').nth(2).click()
          await expect.element(page.getByCSS('#panel-2')).toHaveTextContent(booksSlot)
        })

        it('provides the anchor slot content', async () => {
          const picturesSlot = 'I love pictures'
          const moviesSlot = 'I love pictures'
          const booksSlot = 'I love pictures'

          await render(KTabs, {
            props: {
              tabs: TABS,
              appearance,
            },
            slots: {
              'pictures-anchor': h('div', {}, picturesSlot),
              'movies-anchor': h('div', {}, moviesSlot),
              'books-anchor': h('div', {}, booksSlot),
            },
          })

          await expect.element(page.getByCSS('#pictures-tab .tab-link')).toHaveTextContent(picturesSlot)
          await expect.element(page.getByCSS('#movies-tab .tab-link')).toHaveTextContent(moviesSlot)
          await expect.element(page.getByCSS('#books-tab .tab-link')).toHaveTextContent(booksSlot)
        })
      })
    })
  })
})
