import { describe, it, expect, afterEach } from 'vitest'
import { createApp, defineComponent, h, inject } from 'vue'
import KThemeProvider from './KThemeProvider.vue'
import { KONGPONENTS_THEME_INJECTION_KEY } from '@/composables/useTheme'
import type { KongponentsTheme } from '@/types/theme'

// Helpers

/** Mount a component tree and return the mounted host element. */
function mount(
  componentTree: ReturnType<typeof h>,
  container?: HTMLElement,
): { el: HTMLElement, unmount: () => void } {
  const root = container ?? document.createElement('div')
  document.body.appendChild(root)
  const app = createApp({ render: () => componentTree })
  app.mount(root)
  return {
    el: root,
    unmount: () => {
      app.unmount()
      root.remove()
    },
  }
}

afterEach(() => {
  // Clean up any --kui-* tokens written to document root by global-mode tests.
  for (const token of Array.from(document.documentElement.style)) {
    if (token.startsWith('--kui-')) {
      document.documentElement.style.removeProperty(token)
    }
  }
})

// Subtree (non-global) mode

describe('KThemeProvider — subtree mode (default)', () => {
  it('renders a div wrapper with class k-theme-provider', () => {
    const { el, unmount } = mount(h(KThemeProvider, {}, { default: () => h('span', 'child') }))
    const wrapper = el.querySelector('.k-theme-provider')
    expect(wrapper).not.toBeNull()
    expect(wrapper!.tagName).toBe('DIV')
    unmount()
  })

  it('renders a custom tag when the tag prop is set', () => {
    const { el, unmount } = mount(h(KThemeProvider, { tag: 'section' }, { default: () => h('span') }))
    const wrapper = el.querySelector('.k-theme-provider')
    expect(wrapper!.tagName).toBe('SECTION')
    unmount()
  })

  it('writes theme tokens as inline CSS custom properties on the wrapper', () => {
    const theme: KongponentsTheme = {
      '--kui-color-text-primary': '#6f28ff',
      '--kui-border-radius-30': '12px',
    }
    const { el, unmount } = mount(h(KThemeProvider, { theme }))
    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!
    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')
    expect(wrapper.style.getPropertyValue('--kui-border-radius-30')).toBe('12px')
    unmount()
  })

  it('applies no inline style when theme prop is undefined', () => {
    const { el, unmount } = mount(h(KThemeProvider, { theme: undefined }))
    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!
    expect(wrapper.getAttribute('style')).toBeFalsy()
    unmount()
  })

  it('does NOT write tokens to document root in subtree mode', () => {
    const theme: KongponentsTheme = { '--kui-color-text-primary': '#6f28ff' }
    const { unmount } = mount(h(KThemeProvider, { theme }))
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('')
    unmount()
  })

  it('sets data-kui-theme attribute when name prop is provided', () => {
    const { el, unmount } = mount(h(KThemeProvider, { name: 'portal' }))
    const wrapper = el.querySelector('.k-theme-provider')!
    expect(wrapper.getAttribute('data-kui-theme')).toBe('portal')
    unmount()
  })

  it('omits data-kui-theme attribute when name prop is absent', () => {
    const { el, unmount } = mount(h(KThemeProvider, {}))
    const wrapper = el.querySelector('.k-theme-provider')!
    expect(wrapper.hasAttribute('data-kui-theme')).toBe(false)
    unmount()
  })

  it('provides a theme controller to descendants via KONGPONENTS_THEME_INJECTION_KEY', () => {
    let injected: ReturnType<typeof inject> | undefined

    const Child = defineComponent({
      setup() {
        injected = inject(KONGPONENTS_THEME_INJECTION_KEY)
        return () => h('span')
      },
    })

    const theme: KongponentsTheme = { '--kui-color-text-primary': '#6f28ff' }
    const { unmount } = mount(h(KThemeProvider, { theme }, { default: () => h(Child) }))

    expect(injected).toBeDefined()
    expect((injected as { theme: { value: unknown } }).theme.value).toEqual(theme)
    unmount()
  })

  it('setTheme on the injected controller updates the wrapper inline styles', async () => {
    const { nextTick } = await import('vue')
    let injected: ReturnType<typeof inject> | undefined

    // eslint-disable-next-line vue/one-component-per-file
    const Child = defineComponent({
      setup() {
        injected = inject(KONGPONENTS_THEME_INJECTION_KEY)
        return () => h('span')
      },
    })

    const theme: KongponentsTheme = { '--kui-color-text-primary': '#6f28ff' }
    const { el, unmount } = mount(h(KThemeProvider, { theme }, { default: () => h(Child) }))
    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!

    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')

    const ctrl = injected as { setTheme: (t: KongponentsTheme | undefined) => void }
    ctrl.setTheme({ '--kui-color-text-primary': '#ff0000' })
    await nextTick()

    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('#ff0000')
    unmount()
  })
})

// Global mode

describe('KThemeProvider — global mode', () => {
  it('writes theme tokens to document.documentElement (not the wrapper)', () => {
    const theme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    const { el, unmount } = mount(h(KThemeProvider, { theme, global: true }))

    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')

    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!
    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('')

    unmount()
  })

  it('produces no inline style on the wrapper element in global mode', () => {
    const theme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    const { el, unmount } = mount(h(KThemeProvider, { theme, global: true }))
    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!
    expect(wrapper.getAttribute('style')).toBeFalsy()
    unmount()
  })
})

// Theme prop reactivity

describe('KThemeProvider — theme prop reactivity', () => {
  it('updates inline styles when the theme prop changes (subtree mode)', async () => {
    const { ref, nextTick } = await import('vue')
    const themeRef = ref<KongponentsTheme>({ '--kui-color-text-primary': '#0044f4' })

    // eslint-disable-next-line vue/one-component-per-file
    const Parent = defineComponent({
      setup() {
        return () => h(KThemeProvider, { theme: themeRef.value })
      },
    })

    const { el, unmount } = mount(h(Parent))
    const wrapper = el.querySelector<HTMLElement>('.k-theme-provider')!
    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')

    themeRef.value = { '--kui-color-text-primary': '#6f28ff' }
    await nextTick()
    expect(wrapper.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')

    unmount()
  })

  it('updates document.documentElement when the theme prop changes (global mode)', async () => {
    const { ref, nextTick } = await import('vue')
    const themeRef = ref<KongponentsTheme>({ '--kui-color-text-primary': '#0044f4' })

    // eslint-disable-next-line vue/one-component-per-file
    const Parent = defineComponent({
      setup() {
        return () => h(KThemeProvider, { theme: themeRef.value, global: true })
      },
    })

    const { unmount } = mount(h(Parent))
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('#0044f4')

    themeRef.value = { '--kui-color-text-primary': '#6f28ff' }
    await nextTick()
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('#6f28ff')

    unmount()
  })
})
