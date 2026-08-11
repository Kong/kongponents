import KCopy from '@/components/KCopy/KCopy.vue'

const text = '1234567890ABCDEFG'
const container = '.k-copy'

describe('KCopy', () => {
  it('renders with default props', () => {
    cy.mount(KCopy, {
      props: {
        text,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `badge` set to true', () => {
    const badge = 'Id:'
    cy.mount(KCopy, {
      props: {
        text,
        badge: true,
        badgeLabel: badge,
      },
    })

    cy.get(container).should('be.visible')
    cy.get(container).find('.copy-badge-text').should('contain.text', badge)
  })

  it('renders with `truncated` set to false', () => {
    cy.mount(KCopy, {
      props: {
        text,
        truncate: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('not.have.class', 'truncate-content')
      .should('have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `monospace` set to false', () => {
    cy.mount(KCopy, {
      props: {
        text,
        monospace: false,
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container')
      .should('not.have.class', 'monospace')
      .should('contain.text', text)

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `hidden`', () => {
    cy.mount(KCopy, {
      props: {
        text,
        format: 'hidden',
      },
    })

    cy.get(container).should('be.visible')
    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('[data-testid="copy-id"]').should('not.exist')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `redacted`', () => {
    cy.mount(KCopy, {
      props: {
        text,
        format: 'redacted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', '*****')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  it('renders with `format` set to `deleted`', () => {
    cy.mount(KCopy, {
      props: {
        text,
        format: 'deleted',
      },
    })

    cy.get(container).should('be.visible')

    cy.get(container).find('.copy-container .copy-text')
      .should('have.class', 'monospace')
      .should('contain.text', '*12345')

    cy.get(container).find('[data-testid="copy-to-clipboard"]').should('be.visible')
    cy.get(container).find('.text-icon').should('be.visible')
  })

  describe('truncation', () => {
    // `truncationLimit: 'auto'` renders the full text and truncates only when it measures an
    // overflow on `.copy-text`, so the component has to be given less room than the text needs.
    const longText = 'https://example.konghq.com/a-very-long-path-that-does-not-fit/1234567890ABCDEFG'
    const column = '[data-testid="column"]'

    const expectTruncated = () => {
      cy.get(container).find('.copy-text').should(($text) => {
        expect($text[0].scrollWidth).to.be.greaterThan($text[0].offsetWidth)
      })
    }

    const expectWithinColumn = () => {
      cy.get(column).then(($column) => {
        const columnRight = $column[0].getBoundingClientRect().right

        cy.get(container).should(($root) => {
          expect($root[0].getBoundingClientRect().right).to.be.at.most(columnRight)
        })

        cy.getTestId('copy-to-clipboard').should(($button) => {
          expect($button[0].getBoundingClientRect().right).to.be.at.most(columnRight)
        })
      })
    }

    it('truncates when it is a grid item narrower than its text', () => {
      cy.mount({
        components: { KCopy },
        data: () => ({ longText }),
        template: `
          <div
            data-testid="column"
            style="display: grid; grid-template-columns: 1fr; width: 200px"
          >
            <KCopy
              badge
              truncate
              truncation-limit="auto"
              :text="longText"
            />
          </div>
        `,
      })

      expectTruncated()
      expectWithinColumn()
    })

    // Consumers laying the badge out in a column commonly make the root a block so it fills the
    // column. The badge box is inline-flex sized to its content, so it needs capping separately.
    it('truncates when a consumer makes the root a block', () => {
      cy.mount({
        components: { KCopy },
        data: () => ({ longText }),
        template: `
          <div
            data-testid="column"
            style="overflow: hidden; width: 200px"
          >
            <component is="style">.k-copy.block-root { display: block; width: 100%; }</component>
            <KCopy
              badge
              class="block-root"
              truncate
              truncation-limit="auto"
              :text="longText"
            />
          </div>
        `,
      })

      expectTruncated()
      expectWithinColumn()
    })

    it('does not truncate when the text fits', () => {
      cy.mount(KCopy, {
        props: {
          text,
          truncate: true,
          truncationLimit: 'auto',
        },
      })

      cy.get(container).find('.truncate-content').should('not.exist')
      cy.get(container).find('.copy-text').should(($text) => {
        expect($text[0].scrollWidth).to.equal($text[0].offsetWidth)
      })
    })
  })

  describe('tooltips', () => {
    it('renders with `copyTooltip` prop set', () => {
      const tooltipText = 'Click to copy!'

      cy.mount(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .popover-content').should('contain.text', tooltipText)
    })

    it('renders with `textTooltip` prop set', () => {
      const tooltipText = 'Custom tooltip text!'

      cy.mount(KCopy, {
        props: {
          text,
          textTooltip: tooltipText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .popover-content').should('contain.text', tooltipText)
    })

    it('renders `successTooltip` with `copyTooltip` prop set', () => {
      cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, 'writeText').resolves()
      })

      const tooltipText = 'Click to copy'
      const successText = 'Copied!'

      cy.mount(KCopy, {
        props: {
          text,
          copyTooltip: tooltipText,
          successTooltip: successText,
        },
      })

      cy.get(container).should('be.visible')
      cy.get(container).find('.k-tooltip').should('exist')
      cy.get(container).find('.k-tooltip .popover-content').should('contain.text', tooltipText)
      cy.get('[data-testid="copy-to-clipboard"]').click()
      cy.window().then(() => {
        cy.get(container).find('.k-tooltip .popover-content').should('contain.text', successText)
      })
    })
  })
})
