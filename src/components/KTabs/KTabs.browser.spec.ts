import { describe, it, expect } from 'vitest'
import { defineComponent, h, onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import type { TabsAppearance } from '@/types'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const appearances: TabsAppearance[] = ['default', 'minimal']

interface PanelLifecycle {
  activations: number
  deactivations: number
  mounts: number
  unmounts: number
}

const createStatefulPanel = (name: string, lifecycle: PanelLifecycle) => defineComponent({
  setup() {
    const value = ref('')

    onActivated(() => {
      lifecycle.activations += 1
    })
    onDeactivated(() => {
      lifecycle.deactivations += 1
    })

    onMounted(() => {
      lifecycle.mounts += 1
    })

    onUnmounted(() => {
      lifecycle.unmounts += 1
    })

    return () => h('div', { 'data-testid': `${name}-panel` }, [
      h('input', {
        'data-testid': `${name}-input`,
        value: value.value,
        onInput: (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            value.value = event.target.value
          }
        },
      }),
    ])
  },
})

const createPanelSlots = (lifecycles: Record<string, PanelLifecycle>) => {
  const Pictures = createStatefulPanel('pictures', lifecycles.pictures)

  return {
    pictures: () => [h('span', 'Pictures heading'), h(Pictures)],
    movies: h(createStatefulPanel('movies', lifecycles.movies)),
    books: h(createStatefulPanel('books', lifecycles.books)),
  }
}

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

describe('KTabs cacheTabs', () => {
  const slots = {
    pictures: () => h('input', { 'data-testid': 'pictures-content' }),
    movies: () => h('input', { 'data-testid': 'movies-content' }),
    books: () => h('input', { 'data-testid': 'books-content' }),
  }

  it('unmounts inactive content by default', async () => {
    await render(KTabs, { props: { tabs: TABS }, slots })
    await userEvent.type(page.getByTestId('pictures-content'), 'discarded')
    await page.getByTestId('movies-tab').click()
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await page.getByTestId('pictures-tab').click()
    await expect.element(page.getByTestId('pictures-content')).toHaveValue('')
  })

  it('caches initial and programmatically activated tabs', async () => {
    const screen = await render(KTabs, { props: { tabs: TABS, cacheTabs: true, modelValue: '#books' }, slots })
    await userEvent.type(page.getByTestId('books-content'), 'retained')
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await screen.rerender({ modelValue: '#movies' })
    await expect.element(page.getByTestId('movies-content')).toBeVisible()
    await expect.element(page.getByTestId('books-content')).not.toBeInTheDocument()
    await screen.rerender({ modelValue: '#books' })
    await expect.element(page.getByTestId('books-content')).toBeVisible()
    await expect.element(page.getByTestId('books-content')).toHaveValue('retained')
    await expect.element(page.getByTestId('movies-content')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
  })

  it('does not mount a tab when beforeChange rejects activation', async () => {
    await render(KTabs, { props: { tabs: TABS, cacheTabs: true, beforeChange: async () => false }, slots })
    await page.getByTestId('movies-tab').click()
    await expect.element(page.getByTestId('pictures-content')).toBeVisible()
    await expect.element(page.getByTestId('movies-content')).not.toBeInTheDocument()
  })

  it('discards removed tabs and waits for activation when they are added again', async () => {
    const screen = await render(KTabs, { props: { tabs: TABS, cacheTabs: true }, slots })
    await userEvent.type(page.getByTestId('pictures-content'), 'discarded')
    await page.getByTestId('movies-tab').click()
    await screen.rerender({ tabs: TABS.slice(1) })
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await screen.rerender({ tabs: TABS })
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await page.getByTestId('pictures-tab').click()
    await expect.element(page.getByTestId('pictures-content')).toBeVisible()
    await expect.element(page.getByTestId('pictures-content')).toHaveValue('')
  })

  it('discards inactive content when caching is disabled', async () => {
    const screen = await render(KTabs, { props: { tabs: TABS, cacheTabs: true }, slots })
    await userEvent.type(page.getByTestId('pictures-content'), 'discarded')
    await page.getByTestId('movies-tab').click()
    await userEvent.type(page.getByTestId('movies-content'), 'active')
    await screen.rerender({ cacheTabs: false })
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('movies-content')).toHaveValue('active')
    await screen.rerender({ cacheTabs: true })
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
    await page.getByTestId('pictures-tab').click()
    await expect.element(page.getByTestId('pictures-content')).toHaveValue('')
    await page.getByTestId('movies-tab').click()
    await expect.element(page.getByTestId('movies-content')).toHaveValue('active')
  })

  it('discards all cached content when hidePanels is enabled', async () => {
    const screen = await render(KTabs, { props: { tabs: TABS, cacheTabs: true, hidePanels: false }, slots })
    await userEvent.type(page.getByTestId('pictures-content'), 'discarded')
    await page.getByTestId('movies-tab').click()
    await screen.rerender({ hidePanels: true })
    await expect.element(page.getByCSS('.tab-container')).not.toBeInTheDocument()
    await screen.rerender({ hidePanels: false })
    await expect.element(page.getByTestId('movies-content')).toBeVisible()
    await expect.element(page.getByTestId('pictures-content')).not.toBeInTheDocument()
  })

  it('lazily mounts visited panels and preserves their state and DOM identity', async () => {
    const lifecycles = {
      pictures: { mounts: 0, unmounts: 0, activations: 0, deactivations: 0 },
      movies: { mounts: 0, unmounts: 0, activations: 0, deactivations: 0 },
      books: { mounts: 0, unmounts: 0, activations: 0, deactivations: 0 },
    }
    const screen = await render(KTabs, {
      props: {
        tabs: TABS,
        cacheTabs: true,
      },
      slots: createPanelSlots(lifecycles),
    })

    await expect.element(page.getByTestId('pictures-panel')).toBeVisible()
    await expect.poll(() => lifecycles.pictures.activations).toBe(1)
    await expect.element(page.getByTestId('movies-panel')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('books-panel')).not.toBeInTheDocument()
    const picturesPanel = page.getByTestId('pictures-panel').element()
    await userEvent.type(page.getByTestId('pictures-input'), 'preserved state')
    await page.getByTestId('movies-tab').click()
    await expect.element(page.getByTestId('movies-panel')).toBeVisible()
    await expect.element(page.getByTestId('pictures-panel')).not.toBeInTheDocument()
    await expect.poll(() => lifecycles.pictures.deactivations).toBe(1)
    expect(lifecycles.pictures.unmounts).toBe(0)
    await page.getByTestId('pictures-tab').click()
    await expect.element(page.getByTestId('pictures-panel')).toBeVisible()
    expect(page.getByTestId('pictures-panel').element()).toBe(picturesPanel)
    await expect.element(page.getByTestId('pictures-input')).toHaveValue('preserved state')
    await expect.element(page.getByCSS('#panel-0')).toHaveTextContent('Pictures heading')
    await expect.poll(() => lifecycles.pictures.activations).toBe(2)
    await expect.poll(() => lifecycles.movies.deactivations).toBe(1)
    expect(lifecycles.pictures.mounts).toBe(1)
    expect(lifecycles.pictures.unmounts).toBe(0)
    expect(lifecycles.movies.mounts).toBe(1)
    expect(lifecycles.movies.unmounts).toBe(0)
    expect(lifecycles.books.mounts).toBe(0)
    await screen.unmount()
    await expect.poll(() => lifecycles.pictures.unmounts).toBe(1)
    expect(lifecycles.movies.unmounts).toBe(1)
  })
})
