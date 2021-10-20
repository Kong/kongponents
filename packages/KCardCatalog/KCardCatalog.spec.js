import { mount } from '@vue/test-utils'
import KCardCatalog from '@/KCardCatalog/KCardCatalog'

describe('KCardCatalog', () => {
  it('matches snapshot', () => {
    const wrapper = mount(KCardCatalog)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
