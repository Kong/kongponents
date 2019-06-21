import { mount } from '@vue/test-utils'
import KHeading from '@/KHeading/KHeading'

describe('KHeading', () => {
  it('renders as a span', () => {
    const wrapper = mount(KHeading, {
      propsData: {
        type: 'span'
      }
    })

    expect(wrapper.is('span')).toBe(true)
  })

  it('renders as an h4', () => {
    const wrapper = mount(KHeading, {
      propsData: {
        type: 'h4'
      }
    })

    expect(wrapper.is('h4')).toBe(true)
  })

  it('renders with md & mono class', () => {
    const wrapper = mount(KHeading, {
      propsData: {
        size: 'md',
        font: 'mono'
      }
    })

    expect(wrapper.classes()).toContain('md', 'mono')
  })

  it('matches snapshot', () => {
    const wrapper = mount(KHeading)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
