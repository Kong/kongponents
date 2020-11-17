import { mount } from '@vue/test-utils'
import KViewSwitcher from '@/KViewSwitcher/KViewSwitcher'

describe('KViewSwitcher', () => {
  it('toggles view when clicked', async () => {
    const wrapper = mount(KViewSwitcher, {
      propsData: {
        view: 'table'
      }
    })

    const button = wrapper.find('.view-switch-button')

    expect(button.classes()).toContain('table')

    button.trigger('click')

    expect(wrapper.emitted('view-changed')).toHaveLength(1)
  })

  it('console errors when wrong view passed', () => {
    console.error = jest.fn()

    mount(KViewSwitcher, {
      propsData: {
        view: 'cool'
      }
    })

    expect(console.error).toBeTruthy()
  })

  it('matches snapshot', () => {
    const wrapper = mount(KViewSwitcher, {
      propsData: {
        view: 'table'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
