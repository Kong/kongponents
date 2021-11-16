import { mount } from '@vue/test-utils'
import KPagination from '@/KPagination/KPagination'

/**
 * ALL TESTS MUST USE testMode: true
 * We generate unique IDs for reference by aria properties. Test mode strips these out
 * allowing for successful snapshot verification.
 * propsData: {
 *   testMode: true
 * }
 */
describe('KPagination', () => {
  const myItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const pageSizes = [2, 4, 6]

  it('correctly renders props', () => {
    const currPage = 2
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 9,
        pageSizes: pageSizes,
        currentPage: currPage,
        items: myItems,
        testMode: true
      }
    })

    expect(wrapper.find('[data-testid="visible-items"]').html()).toEqual(expect.stringContaining('3 to 4'))
    expect(wrapper.find('[data-testid="visible-items"]').html()).toEqual(expect.stringContaining('of 9'))
    expect(wrapper.find('.pagination-button.active a').html()).toEqual(expect.stringContaining(currPage + ''))

    for (let i = 0; i < pageSizes.length; i++) {
      expect(wrapper.find(`[data-testid="k-select-item-${pageSizes[i]}"]`).exists()).toBe(true)
    }

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('goes to first page', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true
      }
    })

    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(1 + ''))
    wrapper.find('[data-testid="next-btn"] a').trigger('click')
    wrapper.find('[data-testid="next-btn"] a').trigger('click')
    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(3 + ''))
    wrapper.find('[data-testid="page-1-btn"] a').trigger('click')
    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(1 + ''))
  })

  it('goes to previous page', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true
      }
    })

    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(1 + ''))
    wrapper.find('[data-testid="next-btn"] a').trigger('click')
    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(2 + ''))
    wrapper.find('[data-testid="prev-btn"] a').trigger('click')
    expect(wrapper.find('.pagination-button.active').html()).toEqual(expect.stringContaining(1 + ''))
  })

  it('can change page size', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        testMode: true
      }
    })

    expect(wrapper.find('[data-testid="k-select-input"] .k-button').html()).toEqual(expect.stringContaining('2 items per page'))
    wrapper.find('[data-testid="k-select-input"] button').trigger('click')
    wrapper.find('[data-testid="k-select-item-4"] button').trigger('click')
    expect(wrapper.find('[data-testid="k-select-input"] .k-button').html()).toEqual(expect.stringContaining('4 items per page'))
  })

  it('allows disabling page jump', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 9,
        pageSizes: [2, 4, 6],
        items: myItems,
        disablePageJump: true,
        testMode: true
      }
    })

    expect(wrapper.find('[data-testid="page-1-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="prev-btn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="next-btn"]').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 100,
        pageSizes: [10, 20, 30],
        neighbors: 2,
        testMode: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
