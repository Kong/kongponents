import { mount } from '@vue/test-utils'
import KStepper from '@/KStepper/KStepper'

const longSteps = [
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions' }
]

const stepTypes = [
  { label: 'step: completed', state: 'completed' },
  { label: 'step: pending', state: 'pending' },
  { label: 'step: error', state: 'error' },
  { label: 'step: default' }
]

describe('KStepper', () => {
  it('renders steps', () => {
    const wrapper = mount(KStepper, {
      propsData: {
        steps: longSteps
      }
    })

    expect(wrapper.find('.k-stepper').exists()).toBeTruthy()
    expect(wrapper.findAll('.k-step')).toHaveLength(longSteps.length)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with maxLabelWidth', () => {
    const width = 100

    const wrapper = mount(KStepper, {
      propsData: {
        maxLabelWidth: width + '',
        steps: longSteps
      }
    })

    const stepLabel = wrapper.find('.k-step-label')

    expect(wrapper.find('.k-stepper').exists()).toBeTruthy()
    expect(stepLabel.element.style['max-width']).toEqual(width + 'px')
  })

  it('renders each step type', () => {
    const wrapper = mount(KStepper, {
      propsData: {
        steps: stepTypes
      }
    })
    const types = ['completed', 'default', 'error', 'pending']

    expect(wrapper.find('.k-stepper').exists()).toBeTruthy()

    for (let i = 0; i < types.length; i++) {
      expect(wrapper.find(`[data-testid="k-step-${types[i]}"]`).exists()).toBeTruthy()
      expect(wrapper.find(`[data-testid="k-step-${types[i]}"]`).html()).toEqual(expect.stringContaining(types[i]))
    }

    expect(wrapper.html()).toMatchSnapshot()
  })
})
