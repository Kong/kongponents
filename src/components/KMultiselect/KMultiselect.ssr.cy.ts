import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'

describe('KMultiselect SSR', () => {
  it('keeps its height stable while hydrating selected badges', () => {
    const items = Array.from(new Array(10)).map((_, index) => ({
      label: `Item ${index}`,
      value: `${index}`,
    }))
    const props = {
      items,
      modelValue: items.map(item => item.value),
      selectedRowCount: 1,
      width: '250',
    }
    let app: ReturnType<typeof createSSRApp>
    let serverHeight = 0

    cy.then(async () => {
      const html = await renderToString(createSSRApp({
        render: () => h(KMultiselect, props),
      }))
      const container = document.createElement('div')
      container.id = 'ssr-root'
      container.innerHTML = html
      document.body.append(container)
    })

    cy.get('#ssr-root').find('.multiselect-selection-badge').should('not.exist')
    cy.get('#ssr-root').find('[data-testid="multiselect-trigger"]').then(($trigger) => {
      serverHeight = $trigger[0]!.getBoundingClientRect().height
    })

    cy.then(() => {
      app = createSSRApp({ render: () => h(KMultiselect, props) })
      app.mount(document.getElementById('ssr-root')!)
    })

    cy.get('#ssr-root').find('[data-testid="hidden-selection-count"]').should('contain.text', '+8')
    cy.get('#ssr-root').find('[data-testid="multiselect-trigger"]').should(($trigger) => {
      expect($trigger[0]!.getBoundingClientRect().height).to.equal(serverHeight)
    })

    cy.then(() => app.unmount())
  })
})
