import InteractivePill from '@/components/KFilterGroup/InteractivePill.vue'

describe('KFilterGroup - InteractivePill', () => {
  const PILL_ID = 'interactive-pill'
  const BASE_LABEL_ID = 'interactive-pill-base-label'
  const CONTENT_LABEL_ID = 'interactive-pill-content-label'
  const CLEAR_ICON_ID = 'interactive-pill-clear-icon'
  const CLEAR_FOCUS_ID = 'interactive-pill-clear-focus'
  const OPEN_ICON_ID = 'interactive-pill-open-icon'

  const PILL_FOCUS_BOX_SHADOW = 'rgba(0, 68, 244, 0.2) 0px 0px 0px 4px'
  const CLEAR_FOCUS_BOX_SHADOW = 'rgba(0, 68, 244, 0.2) 0px 0px 0px 2px'

  const render = ({
    label,
    clearFocus,
    contentLabel,
    delimiter,
    pillFocus,
    tooltipText,
  }: {
    label: string
    clearFocus?: boolean
    contentLabel?: string
    delimiter?: string
    pillFocus?: boolean
    tooltipText?: string
  }) => {
    cy.mount(InteractivePill as any, {
      props: {
        label,
        ...(clearFocus !== undefined && { clearFocus }),
        ...(contentLabel !== undefined && { contentLabel }),
        ...(delimiter !== undefined && { delimiter }),
        ...(pillFocus !== undefined && { pillFocus }),
        ...(tooltipText !== undefined && { tooltipText }),
        onTrigger: cy.spy().as('trigger'),
        onClear: cy.spy().as('clear'),
      },
    })
  }

  it('renders content-less by default', () => {
    render({ label: 'test' })
    cy.getTestId(PILL_ID).should('exist')
    cy.getTestId(BASE_LABEL_ID).should('exist').should('have.text', 'test')
    cy.getTestId(CONTENT_LABEL_ID).should('exist').should('have.text', '')
    cy.getTestId(CLEAR_ICON_ID).should('not.exist')
    cy.getTestId(OPEN_ICON_ID).should('exist')
  })

  it('renders with content when provided', () => {
    render({ label: 'test', contentLabel: 'foo' })
    cy.getTestId(PILL_ID).should('exist')
    cy.getTestId(BASE_LABEL_ID).should('exist').should('have.text', 'test: ')
    cy.getTestId(CONTENT_LABEL_ID).should('exist').should('have.text', 'foo')
    cy.getTestId(CLEAR_ICON_ID).should('exist')
    cy.getTestId(OPEN_ICON_ID).should('not.exist')
  })

  it('renders the pill focused when `pillFocus` is true', () => {
    render({ label: 'test', pillFocus: true })
    cy.getTestId(PILL_ID)
      .should('have.css', 'box-shadow', PILL_FOCUS_BOX_SHADOW)
      .should('have.class', 'focused')
  })

  it('renders the pill focused when `pillFocus` is false but has browser focus', () => {
    render({ label: 'test', pillFocus: false })
    cy.getTestId(PILL_ID)
      .should('not.have.css', 'box-shadow', PILL_FOCUS_BOX_SHADOW)
      .should('have.class', 'unfocused')
      .focus()
      .should('have.css', 'box-shadow', PILL_FOCUS_BOX_SHADOW)
      .should('have.class', 'focused')
  })

  it('renders the clear icon focused when `clearFocus` is true', () => {
    render({ label: 'test', contentLabel: 'foo', clearFocus: true })
    cy.getTestId(CLEAR_FOCUS_ID)
      .should('have.css', 'box-shadow', CLEAR_FOCUS_BOX_SHADOW)
    cy.getTestId(PILL_ID)
      .should('have.class', 'clear-focused')
  })

  it('renders the clear icon focused when `clearFocus` is false but has browser focus', () => {
    render({ label: 'test', contentLabel: 'foo', clearFocus: false })
    cy.getTestId(PILL_ID).should('have.class', 'clear-unfocused')
    cy.getTestId(CLEAR_FOCUS_ID).should('not.have.css', 'box-shadow', CLEAR_FOCUS_BOX_SHADOW)

    cy.getTestId(CLEAR_ICON_ID).focus()

    cy.getTestId(PILL_ID).should('have.class', 'clear-focused')
    cy.getTestId(CLEAR_FOCUS_ID).should('have.css', 'box-shadow', CLEAR_FOCUS_BOX_SHADOW)
  })

  it('does not render clear focus if the pill is focused', () => {
    render({ label: 'test', contentLabel: 'foo', pillFocus: true, clearFocus: true })
    cy.getTestId(PILL_ID)
      .should('have.class', 'clear-unfocused')
      .should('have.class', 'focused')
      .should('have.css', 'box-shadow', PILL_FOCUS_BOX_SHADOW)
    cy.getTestId(CLEAR_FOCUS_ID)
      .should('not.have.css', 'box-shadow', CLEAR_FOCUS_BOX_SHADOW)

    cy.getTestId(CLEAR_ICON_ID).focus()

    cy.getTestId(PILL_ID)
      .should('have.class', 'clear-unfocused')
      .should('have.class', 'focused')
      .should('have.css', 'box-shadow', PILL_FOCUS_BOX_SHADOW)
    cy.getTestId(CLEAR_FOCUS_ID)
      .should('not.have.css', 'box-shadow', CLEAR_FOCUS_BOX_SHADOW)
  })

  it('fires trigger when clicked', () => {
    render({ label: 'test' })
    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 0)

    cy.getTestId(PILL_ID).click()

    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 1)
  })

  it('fires trigger when enter is pressed on the pill', () => {
    render({ label: 'test' })
    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 0)

    cy.getTestId(PILL_ID).trigger('keydown', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      keyCode: 13,
    })

    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 1)
  })

  it('fires clear when the clear icon is clicked', () => {
    render({ label: 'test', contentLabel: 'foo' })
    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 0)

    cy.getTestId(CLEAR_ICON_ID).click()

    cy.get('@clear').should('have.callCount', 1)
    cy.get('@trigger').should('have.callCount', 0)
  })

  it('fires clear when the enter is pressed on the clear icon', () => {
    render({ label: 'test', contentLabel: 'foo' })
    cy.get('@clear').should('have.callCount', 0)
    cy.get('@trigger').should('have.callCount', 0)

    cy.getTestId(CLEAR_ICON_ID).trigger('keydown', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      keyCode: 13,
    })

    cy.get('@clear').should('have.callCount', 1)
    cy.get('@trigger').should('have.callCount', 0)
  })
})

