import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import type { TabsAppearance } from '@/types'
import KTabs from '@/components/KTabs/KTabs.vue'

const TABS = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const appearances: TabsAppearance[] = ['default', 'minimal']

interface PanelLifecycle {
  mounts: number
  unmounts: number
}

const createStatefulPanel = (name: string, lifecycle: PanelLifecycle) => defineComponent({
  setup() {
    const value = ref('')

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

const createPanelSlots = (lifecycles: Record<string, PanelLifecycle>) => ({
  pictures: h(createStatefulPanel('pictures', lifecycles.pictures)),
  movies: h(createStatefulPanel('movies', lifecycles.movies)),
  books: h(createStatefulPanel('books', lifecycles.books)),
})

describe('KTabs', () => {
  appearances.forEach((appearance) => {
    describe(`${appearance} appearance`, () => {
      it('sets correct appearance class', () => {
        cy.mount(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })
        cy.get('.k-tabs').should('have.class', appearance)
      })

      it('first tab is set if hash not found', () => {
        cy.mount(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })

        cy.get('.tab-item').eq(0).should('have.class', 'active')
      })

      it('sets correct tab if default tab prop', () => {
        cy.mount(KTabs, {
          props: {
            tabs: TABS,
            modelValue: '#books',
            appearance,
          },
        })

        cy.get('.tab-item').eq(2).should('have.class', 'active')
      })

      it('emits change event on click', () => {
        cy.mount(KTabs, {
          props: {
            tabs: TABS,
            appearance,
          },
        })

        cy.get('.tab-item').eq(1).click().then(() => {
          cy.wrap(Cypress.vueWrapper.emitted()).should('have.property', 'change')
          cy.wrap(Cypress.vueWrapper.emitted('change')[0][0]).should('eq', '#movies')
        })
      })

      it('hides the panel content when hidePanels is true', () => {
        const picturesSlot = 'I love pictures'
        const moviesSlot = 'I love pictures'
        const booksSlot = 'I love pictures'

        cy.mount(KTabs, {
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

        cy.get('.tab-item').eq(0).click().then(() => {
          cy.get('#panel-0').should('not.exist')
          cy.get('.tab-container').should('not.exist')
        })
        cy.get('.tab-item').eq(1).click().then(() => {
          cy.get('#panel-1').should('not.exist')
          cy.get('.tab-container').should('not.exist')
        })
        cy.get('.tab-item').eq(2).click().then(() => {
          cy.get('#panel-2').should('not.exist')
          cy.get('.tab-container').should('not.exist')
        })
      })

      it('disables the tab item when disabled is true', () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', disabled: true },
          { hash: '#books', title: 'Books' },
        ]

        cy.mount(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        cy.get('.tab-item .tab-link').eq(1).should('have.class', 'disabled')
        cy.get('.tab-item').eq(1).click().then(() => {
          cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'change')
        })
      })

      it('renders the tab as a link if tab.to is present', () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', to: '/movies' },
          { hash: '#books', title: 'Books' },
        ]

        cy.mount(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        cy.get('.tab-item .tab-link').eq(1).should('have.attr', 'href', '/movies')
      })

      it('renders the tab as a link with no href attribute if tab.to is present and tab.disabled is true', () => {
        const tabs = [
          { hash: '#pictures', title: 'Pictures' },
          { hash: '#movies', title: 'Movies', to: '/movies', disabled: true },
          { hash: '#books', title: 'Books' },
        ]

        cy.mount(KTabs, {
          props: {
            tabs,
            appearance,
          },
        })

        cy.get('.tab-item .tab-link').eq(1).should('not.have.attr', 'href')
      })

      it('does not change the tab when beforeChange returns false', () => {
        cy.mount(KTabs, {
          props: {
            tabs: TABS,
            beforeChange: () => false,
            appearance,
          },
        })

        cy.get('.tab-item').eq(1).click().then(() => {
          cy.wrap(Cypress.vueWrapper.emitted()).should('not.have.property', 'change')
        })
      })

      describe('slots', () => {
        it('provides the #hash slot content', () => {
          const picturesSlot = 'I love pictures'
          const moviesSlot = 'I love pictures'
          const booksSlot = 'I love pictures'

          cy.mount(KTabs, {
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

          cy.get('.tab-item').eq(0).click().then(() => {
            cy.get('#panel-0').should('contain.text', picturesSlot)
          })
          cy.get('.tab-item').eq(1).click().then(() => {
            cy.get('#panel-1').should('contain.text', moviesSlot)
          })
          cy.get('.tab-item').eq(2).click().then(() => {
            cy.get('#panel-2').should('contain.text', booksSlot)
          })
        })

        it('provides the anchor slot content', () => {
          const picturesSlot = 'I love pictures'
          const moviesSlot = 'I love pictures'
          const booksSlot = 'I love pictures'

          cy.mount(KTabs, {
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

          cy.get('#pictures-tab .tab-link').should('contain.text', picturesSlot)
          cy.get('#movies-tab .tab-link').should('contain.text', moviesSlot)
          cy.get('#books-tab .tab-link').should('contain.text', booksSlot)
        })
      })
    })
  })

  describe('cacheTabs', () => {
    const slots = {
      pictures: () => h('input', { 'data-testid': 'pictures-content' }),
      movies: () => h('input', { 'data-testid': 'movies-content' }),
      books: () => h('input', { 'data-testid': 'books-content' }),
    }

    it('unmounts inactive content by default', () => {
      cy.mount(KTabs, { props: { tabs: TABS }, slots })
      cy.getTestId('pictures-content').type('discarded')
      cy.get('#movies-tab').click()
      cy.getTestId('pictures-content').should('not.exist')
      cy.get('#pictures-tab').click()
      cy.getTestId('pictures-content').should('have.value', '')
    })

    it('caches initial and programmatically activated tabs', () => {
      cy.mount(KTabs, { props: { tabs: TABS, cacheTabs: true, modelValue: '#books' }, slots })
      cy.getTestId('books-content').type('retained')
      cy.getTestId('pictures-content').should('not.exist')
      cy.then(() => Cypress.vueWrapper.setProps({ modelValue: '#movies' }))
      cy.getTestId('movies-content').should('be.visible')
      cy.getTestId('books-content').should('not.be.visible').and('have.value', 'retained')
      cy.then(() => Cypress.vueWrapper.setProps({ modelValue: '#books' }))
      cy.getTestId('books-content').should('be.visible').and('have.value', 'retained')
      cy.getTestId('movies-content').should('not.be.visible')
      cy.getTestId('pictures-content').should('not.exist')
    })

    it('does not mount a tab when beforeChange rejects activation', () => {
      cy.mount(KTabs, { props: { tabs: TABS, cacheTabs: true, beforeChange: async () => false }, slots })
      cy.get('#movies-tab').click()
      cy.getTestId('pictures-content').should('be.visible')
      cy.getTestId('movies-content').should('not.exist')
    })

    it('discards removed tabs and waits for activation when they are added again', () => {
      cy.mount(KTabs, { props: { tabs: TABS, cacheTabs: true }, slots })
      cy.getTestId('pictures-content').type('discarded')
      cy.get('#movies-tab').click()
      cy.then(() => Cypress.vueWrapper.setProps({ tabs: TABS.slice(1) }))
      cy.getTestId('pictures-content').should('not.exist')
      cy.then(() => Cypress.vueWrapper.setProps({ tabs: TABS }))
      cy.getTestId('pictures-content').should('not.exist')
      cy.get('#pictures-tab').click()
      cy.getTestId('pictures-content').should('be.visible').and('have.value', '')
    })

    it('discards inactive content when caching is disabled', () => {
      cy.mount(KTabs, { props: { tabs: TABS, cacheTabs: true }, slots })
      cy.getTestId('pictures-content').type('discarded')
      cy.get('#movies-tab').click()
      cy.getTestId('movies-content').type('active')
      cy.then(() => Cypress.vueWrapper.setProps({ cacheTabs: false }))
      cy.getTestId('pictures-content').should('not.exist')
      cy.getTestId('movies-content').should('have.value', 'active')
      cy.then(() => Cypress.vueWrapper.setProps({ cacheTabs: true }))
      cy.getTestId('pictures-content').should('not.exist')
      cy.get('#pictures-tab').click()
      cy.getTestId('pictures-content').should('have.value', '')
      cy.getTestId('movies-content').should('not.be.visible').and('have.value', 'active')
    })

    it('discards all cached content when hidePanels is enabled', () => {
      cy.mount(KTabs, { props: { tabs: TABS, cacheTabs: true }, slots })
      cy.getTestId('pictures-content').type('discarded')
      cy.get('#movies-tab').click()
      cy.then(() => Cypress.vueWrapper.setProps({ hidePanels: true }))
      cy.get('.tab-container').should('not.exist')
      cy.then(() => Cypress.vueWrapper.setProps({ hidePanels: false }))
      cy.getTestId('movies-content').should('be.visible')
      cy.getTestId('pictures-content').should('not.exist')
    })

    it('lazily mounts visited panels and preserves their state and DOM identity', () => {
      const lifecycles = {
        pictures: { mounts: 0, unmounts: 0 },
        movies: { mounts: 0, unmounts: 0 },
        books: { mounts: 0, unmounts: 0 },
      }
      let picturesPanel: Element | undefined

      cy.mount(KTabs, {
        props: {
          tabs: TABS,
          cacheTabs: true,
        },
        slots: createPanelSlots(lifecycles),
      })

      cy.getTestId('pictures-panel').should('be.visible')
      cy.getTestId('movies-panel').should('not.exist')
      cy.getTestId('books-panel').should('not.exist')
      cy.getTestId('pictures-panel').then(($panel) => {
        picturesPanel = $panel[0]
      })
      cy.getTestId('pictures-input').type('preserved state')
      cy.get('.tab-item').eq(1).click()
      cy.getTestId('movies-panel').should('be.visible')
      cy.get('#panel-0').should('not.be.visible')
      cy.getTestId('pictures-panel').should('exist')
      cy.get('.tab-item').eq(0).click()
      cy.getTestId('pictures-panel').should(($panel) => {
        expect($panel[0]).to.equal(picturesPanel)
      })
      cy.getTestId('pictures-input').should('have.value', 'preserved state')
      cy.then(() => {
        expect(lifecycles.pictures.mounts).to.equal(1)
        expect(lifecycles.pictures.unmounts).to.equal(0)
        expect(lifecycles.movies.mounts).to.equal(1)
        expect(lifecycles.movies.unmounts).to.equal(0)
        expect(lifecycles.books.mounts).to.equal(0)
      })
    })
  })
})
