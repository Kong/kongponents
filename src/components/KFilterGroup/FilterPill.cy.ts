import { h } from 'vue'
import FilterPill from '@/components/KFilterGroup/FilterPill.vue'
import KButton from '@/components/KButton/KButton.vue'
import type { Filter, FilterPillSlotProps, FilterSelection } from '@/types'

describe('KFilterGroup - FilterPill', () => {
  const PILL_ID = 'filter-pill'
  const CONTENT_ID = 'filter-pill-content'
  const CLEAR_ICON_ID = 'interactive-pill-clear-icon'
  const OPEN_ICON_ID = 'interactive-pill-open-icon'
  const APPLY_ID = 'filter-pill-apply'
  const CANCEL_ID = 'filter-pill-cancel'
  const INPUT_ID = 'filter-pill-input'
  const SELECT_ID = 'filter-pill-select'
  const MULTISELECT_ID = 'filter-pill-multiselect'
  const getPopoverSelector = (key: string) => `[data-testid="filter-group-pill-${key}"] .popover`

  const render = ({
    filter,
    initOpen,
    selection = undefined,
    custom = false,
    slots = undefined,
  }: {
    filter: Filter
    initOpen?: boolean
    selection?: FilterSelection
    custom?: boolean
    slots?: Record<string, (props: FilterPillSlotProps) => any>
  }) => {
    const onApply = cy.spy().as('apply')
    const onClose = cy.spy().as('close')
    const onOpen = cy.spy().as('open')
    const onClear = cy.spy().as('clear')

    cy.mount(FilterPill as any, {
      props: {
        filter,
        initOpen,
        selection,
        custom,
        onApply,
        onClose,
        onOpen,
        onClear,
      },
      slots,
    }).as('filterPill')
  }

  it('renders closed by default', () => {
    render({ filter: { label: 'Foo' } })
    cy.getTestId(CONTENT_ID).should('exist').should('not.be.visible')
  })

  it('renders open when initOpen is true', () => {
    render({ filter: { label: 'Foo' }, initOpen: true })
    cy.getTestId(CONTENT_ID).should('exist').should('be.visible')
  })

  it('renders the selection text', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.getTestId(PILL_ID).should('have.text', 'Foo = Ayy')
  })

  it('renders the selection text with the correct operator text', () => {
    render({ filter: { label: 'Foo' } })
    const ops = ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte']
    const expected = [' = ', ' ≠ ', ': ', ': ', ' < ', ' ≤ ', ' > ', ' ≥ ']

    ops.forEach((op, index) => {
      cy.get('@filterPill')
        .its('wrapper')
        .invoke('setProps', {
          selection: { operator: op, value: 'a', text: 'Ayy' },
        })
      cy.getTestId(PILL_ID).should('have.text', `Foo${expected[index]}Ayy`)
    })
  })

  it('renders the selection text with the operatorDelimiter if set', () => {
    render({ filter: { label: 'Foo' } })
    const ops = ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte']
    const operatorDelimiter = ' !!! '

    ops.forEach((op) => {
      cy.get('@filterPill')
        .its('wrapper')
        .invoke('setProps', {
          selection: { operator: op, value: 'a', text: 'Ayy', operatorDelimiter },
        })
      cy.getTestId(PILL_ID).should('have.text', `Foo${operatorDelimiter}Ayy`)
    })
  })

  it('renders clear icon when selection is defined', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.getTestId(CLEAR_ICON_ID).should('exist').should('be.visible')
    cy.getTestId(OPEN_ICON_ID).should('not.exist')
  })

  it('renders open icon when selection is undefined', () => {
    render({
      filter: { label: 'Foo' },
      selection: undefined,
    })
    cy.getTestId(OPEN_ICON_ID).should('exist').should('be.visible')
    cy.getTestId(CLEAR_ICON_ID).should('not.exist')
  })

  it('toggles open state when clicked', () => {
    render({ filter: { label: 'Foo' }, initOpen: true })
    cy.getTestId(CONTENT_ID).should('be.visible')
    cy.getTestId(PILL_ID).click()
    cy.getTestId(CONTENT_ID).should('not.be.visible')
    cy.getTestId(PILL_ID).click()
    cy.getTestId(CONTENT_ID).should('be.visible')
  })

  it('emits @open/@close when opened/closed', () => {
    cy.get('@open').should('have.callCount', 0)
    cy.get('@close').should('have.callCount', 0)

    render({ filter: { label: 'Foo' }, initOpen: true })

    cy.get('@open').should('have.callCount', 1) // because initOpen counts
    cy.get('@close').should('have.callCount', 0)

    cy.getTestId(PILL_ID).click()

    cy.get('@open').should('have.callCount', 1)
    cy.get('@close').should('have.callCount', 1)

    cy.getTestId(PILL_ID).click()

    cy.get('@open').should('have.callCount', 2)
    cy.get('@close').should('have.callCount', 1)
  })

  it('emits @clear when clear button is clicked', () => {
    render({
      filter: { label: 'Foo' },
      selection: { operator: 'eq', value: 'a', text: 'Ayy' },
    })
    cy.get('@clear').should('have.callCount', 0)
    cy.getTestId(CLEAR_ICON_ID).click()
    cy.get('@clear').should('have.callCount', 1)
  })

  describe('popover content interactions', () => {
    it('emits @close when cancel button is clicked', () => {
      cy.get('@close').should('have.callCount', 0)
      render({ filter: { label: 'Foo' } })
      cy.getTestId(PILL_ID).click()
      cy.getTestId(CANCEL_ID).click()
      cy.get('@close').should('have.callCount', 1)
    })

    it('emits @apply when apply button is clicked', () => {
      cy.get('@apply').should('have.callCount', 0)
      render({ filter: { label: 'Foo' } })
      cy.getTestId(PILL_ID).click()
      cy.getTestId(APPLY_ID).should('have.attr', 'disabled', 'disabled')
      cy.getTestId(INPUT_ID).type('foo')
      cy.getTestId(APPLY_ID).click()
      cy.get('@apply').should('have.callCount', 1)
    })

    it('text input: focuses the input if the filter is an input type', () => {
      render({ filter: { label: 'Foo' } })
      cy.getTestId(INPUT_ID).should('exist').should('not.be.visible').should('not.have.focus')
      cy.getTestId(PILL_ID).click()
      cy.getTestId(INPUT_ID).should('exist').should('be.visible').should('have.focus')
    })

    it('select input: emits apply with the selected content', () => {
      cy.get('@apply').should('have.callCount', 0)
      render({ filter: { label: 'Foo', multiple: false, options: [{
        label: 'Bar',
        value: 'bar',
      }, {
        label: 'Baz',
        value: 'baz',
      }] } })
      cy.getTestId(PILL_ID).click()
      cy.getTestId(SELECT_ID).click()
      cy.getTestId('select-item-baz').click()
      cy.getTestId(APPLY_ID).click()
      cy.get('@apply').should('have.callCount', 1)
      cy.get('@apply').should('have.been.calledWith', {
        operator: 'eq',
        text: 'Baz',
        value: 'baz',
      })
    })

    it('multi select input: emits apply with multiple selected content', () => {
      cy.get('@apply').should('have.callCount', 0)
      render({ filter: { label: 'Foo', multiple: true, options: [{
        label: 'Bar',
        value: 'bar',
      }, {
        label: 'Baz',
        value: 'baz',
      }] } })
      cy.getTestId(PILL_ID).click()
      cy.getTestId(MULTISELECT_ID).click()
      cy.getTestId('multiselect-item-baz').click()
      cy.getTestId('multiselect-item-bar').click()
      cy.getTestId(MULTISELECT_ID).type('{esc}')
      cy.getTestId(APPLY_ID).click()
      cy.get('@apply').should('have.callCount', 1)
      cy.get('@apply').should('have.been.calledWith', {
        operator: 'eq',
        text: 'Baz, Bar',
        value: ['baz', 'bar'],
      })
    })

    describe('custom filter slot props', () => {
      const CUSTOM_OPTIONS = [{ label: 'Bar', value: 'bar' }, { label: 'Baz', value: 'baz' }]

      it('passes filter/selection state through to the slot', () => {
        render({
          custom: true,
          filter: { label: 'Foo', multiple: true, operators: ['eq', 'neq'], options: CUSTOM_OPTIONS },
          selection: { operator: 'neq', value: 'a', text: 'Ayy' },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('span', { 'data-testid': 'custom-options' }, JSON.stringify(props.options)),
              h('span', { 'data-testid': 'custom-multiple' }, String(props.multiple)),
              h('span', { 'data-testid': 'custom-operators' }, JSON.stringify(props.operators)),
              h('span', { 'data-testid': 'custom-value' }, JSON.stringify(props.value)),
              h('span', { 'data-testid': 'custom-text' }, props.text),
              h('span', { 'data-testid': 'custom-operator' }, props.operator),
            ]),
          },
        })
        cy.getTestId(PILL_ID).click()
        cy.getTestId('custom-options').should('have.text', JSON.stringify(CUSTOM_OPTIONS))
        cy.getTestId('custom-multiple').should('have.text', 'true')
        cy.getTestId('custom-operators').should('have.text', JSON.stringify(['eq', 'neq']))
        cy.getTestId('custom-value').should('have.text', JSON.stringify('a'))
        cy.getTestId('custom-text').should('have.text', 'Ayy')
        cy.getTestId('custom-operator').should('have.text', 'neq')
      })

      it('emits @apply built from setValue/setOperator', () => {
        cy.get('@apply').should('have.callCount', 0)
        render({
          custom: true,
          filter: { label: 'Foo', operators: ['eq', 'neq'], options: CUSTOM_OPTIONS },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('button', {
                'data-testid': 'custom-set-value',
                onClick: () => props.setValue('baz', 'Baz'),
              }, 'set value'),
              h('button', {
                'data-testid': 'custom-set-operator',
                onClick: () => props.setOperator('neq'),
              }, 'set operator'),
            ]),
          },
        })
        cy.getTestId(PILL_ID).click()
        cy.getTestId('custom-set-value').click()
        cy.getTestId('custom-set-operator').click()
        cy.getTestId(APPLY_ID).click()
        cy.get('@apply').should('have.callCount', 1)
        cy.get('@apply').should('have.been.calledWith', {
          operator: 'neq',
          text: 'Baz',
          value: 'baz',
        })
      })

      it('disables/enables apply via setApplyState', () => {
        // KButton is registered explicitly here (unlike the shared `render` helper
        // above) so its `disabled` prop reflects as a real native `disabled`
        // attribute, making it reliable to assert on.
        const onApply = cy.spy().as('apply')
        cy.mount(FilterPill as any, {
          props: {
            filter: { label: 'Foo' },
            custom: true,
            onApply,
          },
          global: {
            components: { KButton },
          },
          slots: {
            default: (props: FilterPillSlotProps) => h('div', {}, [
              h('button', {
                'data-testid': 'custom-disable',
                onClick: () => props.setApplyState(false),
              }, 'disable'),
              h('button', {
                'data-testid': 'custom-enable',
                onClick: () => props.setApplyState(true),
              }, 'enable'),
            ]),
          },
        })

        cy.getTestId(PILL_ID).click()
        cy.getTestId(APPLY_ID).should('not.be.disabled')

        cy.getTestId('custom-disable').click()
        cy.getTestId(APPLY_ID).should('be.disabled')

        cy.getTestId('custom-enable').click()
        cy.getTestId(APPLY_ID).should('not.be.disabled')
        cy.getTestId(APPLY_ID).click()
        cy.get('@apply').should('have.callCount', 1)
      })

      it('still emits @apply with undefined if setValue is never called', () => {
        cy.get('@apply').should('have.callCount', 0)
        render({
          custom: true,
          filter: { label: 'Foo' },
          slots: {
            default: () => h('div', { 'data-testid': 'bare-custom-slot' }, 'no destructured props used'),
          },
        })
        cy.getTestId(PILL_ID).click()
        cy.getTestId(APPLY_ID).click()
        cy.get('@apply').should('have.callCount', 1)
        cy.get('@apply').should('have.been.calledWith', undefined)
      })
    })
  })
})
