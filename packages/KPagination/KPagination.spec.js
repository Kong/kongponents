import { mount } from '@vue/test-utils'
import KPagination from '@/KPagination/KPagination'

describe('KPagination', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KPagination)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
