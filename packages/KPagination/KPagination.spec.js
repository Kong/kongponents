import { mount } from '@vue/test-utils'
import KPagination from '@/KPagination/KPagination'

describe('KPagination', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KPagination, {
      propsData: {
        totalCount: 100,
        pageSizes: [10, 20, 30],
        testMode: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
