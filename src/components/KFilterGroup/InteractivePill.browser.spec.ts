import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import InteractivePill from '@/components/KFilterGroup/InteractivePill.vue'

describe('KFilterGroup - InteractivePill', () => {
  const PILL_ID = 'interactive-pill'
  const BASE_LABEL_ID = 'interactive-pill-base-label'
  const CONTENT_LABEL_ID = 'interactive-pill-content-label'
  const TRIGGER_ID = 'interactive-pill-trigger'
  const CLEAR_ICON_ID = 'interactive-pill-clear-icon'
  const CLEAR_FOCUS_ID = 'interactive-pill-clear-focus'
  const OPEN_ICON_ID = 'interactive-pill-open-icon'

  const PILL_FOCUS_BOX_SHADOW = 'rgba(0, 68, 244, 0.2) 0px 0px 0px 4px'
  const CLEAR_FOCUS_BOX_SHADOW = 'color(srgb 0 0.266667 0.956863 / 0.2) 0px 0px 0px 2px'

  const renderPill = async ({
    label,
    clearFocus,
    contentLabel,
    delimiter,
    pillFocus,
    readonly,
    tooltipText,
  }: {
    label: string
    clearFocus?: boolean
    contentLabel?: string
    delimiter?: string
    pillFocus?: boolean
    readonly?: boolean
    tooltipText?: string
  }) => {
    const onTrigger = vi.fn()
    const onClear = vi.fn()

    await render(InteractivePill, {
      props: {
        label,
        ...(clearFocus !== undefined && { clearFocus }),
        ...(contentLabel !== undefined && { contentLabel }),
        ...(delimiter !== undefined && { delimiter }),
        ...(pillFocus !== undefined && { pillFocus }),
        ...(readonly !== undefined && { readonly }),
        ...(tooltipText !== undefined && { tooltipText }),
        onTrigger,
        onClear,
      },
    })

    return { onTrigger, onClear }
  }

  it('renders content-less by default', async () => {
    await renderPill({ label: 'test' })
    await expect.element(page.getByTestId(PILL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(BASE_LABEL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(BASE_LABEL_ID)).toHaveTextContent('test')
    await expect.element(page.getByTestId(CONTENT_LABEL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(CONTENT_LABEL_ID)).not.toHaveTextContent(/\S/)
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).not.toBeInTheDocument()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).toBeInTheDocument()
  })

  it('renders with content when provided', async () => {
    await renderPill({ label: 'test', contentLabel: 'foo' })
    await expect.element(page.getByTestId(PILL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(BASE_LABEL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(BASE_LABEL_ID)).toHaveTextContent('test:')
    await expect.element(page.getByTestId(CONTENT_LABEL_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(CONTENT_LABEL_ID)).toHaveTextContent('foo')
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).toBeInTheDocument()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).not.toBeInTheDocument()
  })

  it('renders the pill focused when `pillFocus` is true', async () => {
    await renderPill({ label: 'test', pillFocus: true })
    await expect.element(page.getByTestId(PILL_ID)).toHaveStyle({ boxShadow: PILL_FOCUS_BOX_SHADOW })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('focused')
  })

  it('renders the pill focused when `pillFocus` is false but has browser focus', async () => {
    await renderPill({ label: 'test', pillFocus: false })
    await expect.element(page.getByTestId(PILL_ID)).not.toHaveStyle({ boxShadow: PILL_FOCUS_BOX_SHADOW })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('unfocused')
    page.getByTestId(TRIGGER_ID).element().focus()
    await expect.element(page.getByTestId(PILL_ID)).toHaveStyle({ boxShadow: PILL_FOCUS_BOX_SHADOW })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('focused')
  })

  it('renders the clear icon focused when `clearFocus` is true', async () => {
    await renderPill({ label: 'test', contentLabel: 'foo', clearFocus: true })
    await expect.element(page.getByTestId(CLEAR_FOCUS_ID)).toHaveStyle({ boxShadow: CLEAR_FOCUS_BOX_SHADOW })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('clear-focused')
  })

  it('renders the clear icon focused when `clearFocus` is false but has browser focus', async () => {
    await renderPill({ label: 'test', contentLabel: 'foo', clearFocus: false })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('clear-unfocused')
    await expect.element(page.getByTestId(CLEAR_FOCUS_ID)).not.toHaveStyle({ boxShadow: CLEAR_FOCUS_BOX_SHADOW })
    page.getByTestId(CLEAR_ICON_ID).element().focus()
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('clear-focused')
    await expect.element(page.getByTestId(CLEAR_FOCUS_ID)).toHaveStyle({ boxShadow: CLEAR_FOCUS_BOX_SHADOW })
  })

  it('renders clear focus even if the pill is focused', async () => {
    await renderPill({ label: 'test', contentLabel: 'foo', pillFocus: true, clearFocus: true })
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('clear-focused')
    await expect.element(page.getByTestId(PILL_ID)).toHaveClass('focused')
    await expect.element(page.getByTestId(PILL_ID)).toHaveStyle({ boxShadow: PILL_FOCUS_BOX_SHADOW })
    await expect.element(page.getByTestId(CLEAR_FOCUS_ID)).toHaveStyle({ boxShadow: CLEAR_FOCUS_BOX_SHADOW })
  })

  it('fires trigger when clicked', async () => {
    const { onTrigger, onClear } = await renderPill({ label: 'test' })
    await page.getByTestId(PILL_ID).click()
    await expect.poll(() => onTrigger.mock.calls.length).toBe(1)
    expect(onClear).toHaveBeenCalledTimes(0)
  })

  it('while readonly does not fire trigger when clicked', async () => {
    const { onTrigger, onClear } = await renderPill({ label: 'test', readonly: true })
    await expect.element(page.getByTestId(TRIGGER_ID)).toBeDisabled()
    await page.getByTestId(PILL_ID).click()
    expect(onTrigger).toHaveBeenCalledTimes(0)
    expect(onClear).toHaveBeenCalledTimes(0)
  })

  it('when readonly without content, the control icons do not appear', async () => {
    await renderPill({ label: 'test', contentLabel: undefined, readonly: true })
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).not.toBeInTheDocument()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).not.toBeInTheDocument()
  })

  it('when readonly with content, the control icons do not appear', async () => {
    await renderPill({ label: 'test', contentLabel: 'foo', readonly: true })
    await expect.element(page.getByTestId(CLEAR_ICON_ID)).not.toBeInTheDocument()
    await expect.element(page.getByTestId(OPEN_ICON_ID)).not.toBeInTheDocument()
  })

  it('fires trigger when enter is pressed on the pill', async () => {
    const { onTrigger, onClear } = await renderPill({ label: 'test' })
    await userEvent.type(page.getByTestId(TRIGGER_ID), '{Enter}')
    await expect.poll(() => onTrigger.mock.calls.length).toBe(1)
    expect(onClear).toHaveBeenCalledTimes(0)
  })

  it('fires clear when the clear icon is clicked', async () => {
    const { onTrigger, onClear } = await renderPill({ label: 'test', contentLabel: 'foo' })
    await page.getByTestId(CLEAR_ICON_ID).click()
    await expect.poll(() => onClear.mock.calls.length).toBe(1)
    expect(onTrigger).toHaveBeenCalledTimes(0)
  })

  it('fires clear when the enter is pressed on the clear icon', async () => {
    const { onTrigger, onClear } = await renderPill({ label: 'test', contentLabel: 'foo' })
    await userEvent.type(page.getByTestId(CLEAR_ICON_ID), '{Enter}')
    await expect.poll(() => onClear.mock.calls.length).toBe(1)
    expect(onTrigger).toHaveBeenCalledTimes(0)
  })
})
