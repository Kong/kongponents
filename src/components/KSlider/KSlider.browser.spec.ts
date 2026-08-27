import { describe, it, expect } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KSlider from '@/components/KSlider/KSlider.vue'

describe('KSlider', () => {
  it('renders input[type="range"] element with label and datalist', async () => {
    const labelContent = 'Test slider'

    await render(KSlider, {
      props: {
        label: labelContent,
        min: 10,
        max: 20,
        step: 2,
        modelValue: 12,
      },
    })

    await expect.element(page.getByCSS('label')).toHaveTextContent(new RegExp(`^${labelContent}$`))

    const rangeInput = page.getByCSS('input[type="range"]')
    await expect.element(rangeInput).toHaveAttribute('min', '10')
    await expect.element(rangeInput).toHaveAttribute('max', '20')
    await expect.element(rangeInput).toHaveAttribute('step', '2')
    await expect.element(rangeInput).toHaveValue('12')

    await expect.element(page.getByCSS('datalist')).toBeInTheDocument()
    await expect.poll(() => page.getByCSS('datalist option').all().length).toBe(2)
    await expect.element(page.getByCSS('datalist option').first()).toHaveAttribute('value', '10')
    await expect.element(page.getByCSS('datalist option').last()).toHaveAttribute('value', '20')
  })

  it('renders marks correctly when showMarks is true', async () => {
    await render(KSlider, {
      props: {
        showMarks: true,
        modelValue: 0,
      },
    })

    await expect.poll(() => page.getByCSS('datalist option').all().length).toBe(11)
    await expect.poll(() => page.getByCSS('.slider-marks span').all().length).toBe(11)

    for (let i = 0; i < 11; i++) {
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('value', `${i}`)
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('label', `${i}`)
      await expect.element(page.getByCSS('.slider-marks span').nth(i)).toHaveTextContent(new RegExp(`^${i}$`))
    }
  })

  it('clicking on a mark updates the slider value correctly for different marks', async () => {
    await render(KSlider, {
      props: {
        showMarks: true,
        modelValue: 0,
      },
    })

    await page.getByCSS('.slider-marks span').nth(3).click()
    await expect.element(page.getByCSS('input[type="range"]')).toHaveValue('3')
    await page.getByCSS('.slider-marks span').nth(5).click()
    await expect.element(page.getByCSS('input[type="range"]')).toHaveValue('5')
    await page.getByCSS('.slider-marks span').nth(10).click()
    await expect.element(page.getByCSS('input[type="range"]')).toHaveValue('10')
  })

  it('renders marks correctly when marks prop is array of numbers', async () => {
    const marksNumbers = [0, 2, 4, 6, 8, 10]

    await render(KSlider, {
      props: {
        marks: marksNumbers,
        modelValue: 0,
      },
    })

    await expect.poll(() => page.getByCSS('datalist option').all().length).toBe(marksNumbers.length)
    await expect.poll(() => page.getByCSS('.slider-marks span').all().length).toBe(marksNumbers.length)

    for (let i = 0; i < marksNumbers.length; i++) {
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('value', `${marksNumbers[i]}`)
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('label', `${marksNumbers[i]}`)
      await expect.element(page.getByCSS('.slider-marks span').nth(i)).toHaveTextContent(new RegExp(`^${marksNumbers[i]}$`))
    }
  })

  it('renders marks correctly when marks prop is array of objects', async () => {
    const marksObj = [
      { label: 'Zero', value: 0 },
      { label: 'Five', value: 5 },
      { label: 'Ten', value: 10 },
    ]

    await render(KSlider, {
      props: {
        marks: marksObj,
        modelValue: 0,
      },
    })

    await expect.poll(() => page.getByCSS('datalist option').all().length).toBe(marksObj.length)
    await expect.poll(() => page.getByCSS('.slider-marks span').all().length).toBe(marksObj.length)

    for (let i = 0; i < marksObj.length; i++) {
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('value', `${marksObj[i].value}`)
      await expect.element(page.getByCSS('datalist option').nth(i)).toHaveAttribute('label', marksObj[i].label)
      await expect.element(page.getByCSS('.slider-marks span').nth(i)).toHaveTextContent(new RegExp(`^${marksObj[i].label}$`))
    }
  })

  it('emits update:modelValue and change events on input', async () => {
    const screen = await render(KSlider, {
      props: {
        modelValue: 10,
      },
    })

    const input = page.getByCSS('input[type="range"]').element() as HTMLInputElement
    input.value = '5'
    input.dispatchEvent(new Event('input', { bubbles: true }))

    await expect.poll(() => screen.emitted()).toHaveProperty('update:modelValue')
    expect(screen.emitted('update:modelValue')?.[0][0]).toBe(5)
    await expect.poll(() => screen.emitted()).toHaveProperty('change')
    expect(screen.emitted('change')?.[0][0]).toBe(5)
    await expect.element(page.getByCSS('input[type="range"]')).toHaveValue('5')
  })

  it('only renders valid marks', async () => {
    const invalidMarks = [2, 4]
    const validMarks = [0, 5, 10]
    const allMarks = [...invalidMarks, ...validMarks]

    await render(KSlider, {
      props: {
        step: 5,
        marks: allMarks,
        modelValue: 0,
      },
    })

    await expect.element(page.getByTestId('slider-datalist-marks')).toBeInTheDocument()
    await expect.element(page.getByTestId('slider-marks')).toBeInTheDocument()

    for (const mark of validMarks) {
      await expect.element(page.getByTestId(`datalist-mark-${mark}`)).toBeInTheDocument()
      await expect.element(page.getByTestId(`mark-${mark}`)).toBeVisible()
    }

    for (const mark of invalidMarks) {
      await expect.element(page.getByTestId(`datalist-mark-${mark}`)).not.toBeInTheDocument()
      await expect.element(page.getByTestId(`mark-${mark}`)).not.toBeInTheDocument()
    }
  })

  it('sets modelValue to min when invalid value provided', async () => {
    await render(KSlider, {
      props: {
        modelValue: 100,
      },
    })

    await expect.element(page.getByCSS('input[type="range"]')).toHaveValue('0')
  })
})
