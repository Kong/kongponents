import { mount } from '@vue/test-utils'
import {%kongponent_name%} from '@/{%kongponent_name%}/{%kongponent_name%}'

describe('{%kongponent_name%}', () => {
  it('matches snapshot', () => {
    const wrapper = mount({%kongponent_name%})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
