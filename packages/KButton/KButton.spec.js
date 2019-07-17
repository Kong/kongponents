import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { default as KButton, appearances } from '@/KButton/KButton'

const rendersCorrectAppearance = (variant) => {
  it(`renders kbutton with the ${variant} appearance`, () => {
    const wrapper = mount(KButton, {
      propsData: {
        'appearance': variant
      },
      slots: {
        default: variant
      }
    })

    expect(wrapper.find('.button').classes()).toContain(`${variant}`)
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe('KButton', () => {
  Object.values(appearances).map(a => rendersCorrectAppearance(a))

  it('sets small class when size passed', () => {
    const wrapper = mount(KButton, {
      propsData: {
        'size': 'small'
      },
      slots: {
        default: 'Small Button'
      }
    })

    expect(wrapper.find('.button').classes()).toContain('small')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a router link with KButton styles', () => {
    const localVue = createLocalVue()
    const router = new VueRouter({
      mode: 'history',
      routes: [{
        path: 'services',
        name: 'services',
        redirect: 'services',
        meta: { breadcrumb: 'Services' }
      }]
    })

    localVue.use(VueRouter)
    const wrapper = mount(KButton, {
      localVue,
      router,
      propsData: {
        'to': { name: 'services', params: { workspace: 'test' } },
        appearance: 'primary'
      },
      slots: {
        default: `I'm a router link`
      }
    })

    expect(wrapper.find('a').classes()).toContain('button', 'primary')
    expect(wrapper.find('a').attributes('href')).toBe('/services')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a native link with KButton styles', () => {
    const wrapper = mount(KButton, {
      propsData: {
        'to': 'https://google.com',
        appearance: 'secondary'
      },
      slots: {
        default: `I'm a native link`
      }
    })

    expect(wrapper.find('a').classes()).toContain('button', 'secondary')
    expect(wrapper.find('a').attributes('href')).toBe('https://google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
