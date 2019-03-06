import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Krumbs from '@/Krumbs/Krumbs'

describe('Krumbs', () => {
  it('renders breadcrumb links', () => {
    const localVue = createLocalVue()
    const routes = [{
      path: 'services',
      name: 'root-services',
      redirect: 'services',
      meta: { breadcrumb: 'Services' }
    }]

    const router = new VueRouter({
      mode: 'history',
      routes
    })

    localVue.use(VueRouter)
    const wrapper = mount(Krumbs, {
      localVue,
      context: {
        props: {
          items: [
            {
              key: routes[0].name,
              to: routes[0],
              title: routes[0].meta.breadcrumb,
              text: routes[0].meta.breadcrumb
            },
            {
              key: 'docs',
              to: 'https://docs.konghq.com',
              title: 'Go to Kong Docs',
              text: 'External Link'
            }
          ]
        }
      },
      router
    })

    expect(wrapper.findAll(`ul li`)).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders breadcrumb links without needing a router', () => {
    const wrapper = mount(Krumbs, {
      context: {
        props: {
          items: [
            {
              key: 'docs',
              to: 'https://docs.konghq.com',
              title: 'Go to Kong Docs',
              text: 'External Link'
            }
          ]
        }
      }
    })

    expect(wrapper.findAll(`ul li`)).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
