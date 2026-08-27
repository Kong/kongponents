import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KStepper from '@/components/KStepper/KStepper.vue'
import type { StepItem } from '@/types'

const longSteps: StepItem[] = [
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions' },
]

const stepTypes: StepItem[] = [
  { label: 'step: completed', state: 'completed' },
  { label: 'step: active', state: 'active' },
  { label: 'step: pending', state: 'pending' },
  { label: 'step: error', state: 'error' },
  { label: 'step: default' },
]

describe('KStepper', () => {
  it('renders steps', async () => {
    await render(KStepper, {
      props: {
        steps: longSteps,
      },
    })

    await expect.element(page.getByCSS('.k-stepper')).toBeInTheDocument()
    await expect.element(page.getByCSS('.k-stepper')).toBeVisible()
    await expect.poll(() => page.getByCSS('.step').all().length).toBe(longSteps.length)
  })

  it('renders with maxLabelWidth', async () => {
    const width = 100

    await render(KStepper, {
      props: {
        maxLabelWidth: width + '',
        steps: longSteps,
      },
    })

    await expect.element(page.getByCSS('.k-stepper')).toBeVisible()
    await expect.element(page.getByCSS('.step-label').first()).toBeVisible()
    await expect.element(page.getByCSS('.step-label').first()).toHaveStyle({ maxWidth: `${width}px` })
  })

  it('renders each step type', async () => {
    await render(KStepper, {
      props: {
        steps: stepTypes,
      },
    })
    const types = ['completed', 'active', 'default', 'error', 'pending']

    await expect.element(page.getByCSS('.k-stepper')).toBeVisible()

    for (let i = 0; i < types.length; i++) {
      await expect.element(page.getByTestId(`step-${types[i]}`)).toBeInTheDocument()
      await expect.element(page.getByTestId(`step-${types[i]}`)).toHaveTextContent(new RegExp(types[i], 'i'))
    }
  })

  it('renders steps with step number', async () => {
    await render(KStepper, {
      props: {
        steps: stepTypes.map((step) => ({ ...step, state: 'default' as const })),
      },
    })

    await expect.element(page.getByCSS('.k-stepper')).toBeVisible()
    await expect.poll(() => page.getByCSS('.step-number').all().length).toBe(stepTypes.length)
    for (let i = 0; i < stepTypes.length; i++) {
      await expect.element(page.getByCSS('.step-number').nth(i)).toBeVisible()
      await expect.element(page.getByCSS('.step-number').nth(i)).toHaveTextContent(String(i + 1))
    }
  })

  it('renders steps without step numbers when hideStepNumbers is true', async () => {
    await render(KStepper, {
      props: {
        steps: stepTypes.map((step) => ({ ...step, state: 'default' as const })),
        hideStepNumbers: true,
      },
    })

    await expect.element(page.getByCSS('.k-stepper')).toBeVisible()
    await expect.element(page.getByCSS('.step-number')).not.toBeInTheDocument()
  })
})
