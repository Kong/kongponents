import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { createApp } from 'vue'
import { KONGPONENTS_THEME_INJECTION_KEY, createThemeController, useTheme } from './useTheme'
import type { KongponentsTheme, UseThemeReturn } from '@/types/theme'

// createThemeController

describe('createThemeController', () => {
  it('calls apply immediately with the initial theme on creation', () => {
    const apply = vi.fn()
    const initialTheme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    createThemeController(apply, initialTheme)
    expect(apply).toHaveBeenCalledOnce()
    expect(apply).toHaveBeenCalledWith(initialTheme)
  })

  it('calls apply with undefined when no initial theme is provided', () => {
    const apply = vi.fn()
    createThemeController(apply)
    expect(apply).toHaveBeenCalledOnce()
    expect(apply).toHaveBeenCalledWith(undefined)
  })

  it('initialises theme ref to the provided initial theme', () => {
    const initialTheme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    const { theme } = createThemeController(vi.fn(), initialTheme)
    expect(theme.value).toStrictEqual(initialTheme)
  })

  it('initialises theme ref to undefined when no initial theme is given', () => {
    const { theme } = createThemeController(vi.fn())
    expect(theme.value).toBeUndefined()
  })

  it('setTheme updates the theme ref', () => {
    const { theme, setTheme } = createThemeController(vi.fn())
    const next: KongponentsTheme = { '--kui-border-radius-30': '999px' }
    setTheme(next)
    expect(theme.value).toStrictEqual(next)
  })

  it('setTheme calls apply with the new theme', () => {
    const apply = vi.fn()
    const { setTheme } = createThemeController(apply)
    apply.mockClear() // ignore the initial call

    const next: KongponentsTheme = { '--kui-border-radius-30': '999px' }
    setTheme(next)
    expect(apply).toHaveBeenCalledOnce()
    expect(apply).toHaveBeenCalledWith(next)
  })

  it('setTheme with undefined clears the theme ref', () => {
    const initialTheme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    const { theme, setTheme } = createThemeController(vi.fn(), initialTheme)
    setTheme(undefined)
    expect(theme.value).toBeUndefined()
  })

  it('setTheme with undefined calls apply with undefined', () => {
    const apply = vi.fn()
    const { setTheme } = createThemeController(apply)
    apply.mockClear()
    setTheme(undefined)
    expect(apply).toHaveBeenCalledWith(undefined)
  })

  it('each call returns an independent controller', () => {
    const apply1 = vi.fn()
    const apply2 = vi.fn()
    const c1 = createThemeController(apply1)
    const c2 = createThemeController(apply2)

    // Distinct reactive refs — not the same reference.
    expect(c1.theme).not.toBe(c2.theme)

    apply1.mockClear()
    apply2.mockClear()

    c1.setTheme({ '--kui-color-text-primary': '#aaa' })

    expect(c1.theme.value).toStrictEqual({ '--kui-color-text-primary': '#aaa' })
    expect(apply1).toHaveBeenCalledOnce()
    expect(c2.theme.value).toBeUndefined()
    expect(apply2).not.toHaveBeenCalled()
  })
})

// useTheme — helpers

/**
 * Runs `fn` inside a minimal Vue app's setup() so `inject` works correctly.
 * Returns the value that `fn` returns from setup.
 */
function withSetup<T>(fn: () => T, provide?: (app: ReturnType<typeof createApp>) => void): T {
  let result: T
  const TestComponent = defineComponent({
    setup() {
      result = fn()
      return () => h('div')
    },
  })
  const app = createApp(TestComponent)
  provide?.(app)
  const div = document.createElement('div')
  app.mount(div)
  return result!
}

// useTheme — browser fallback

describe('useTheme — browser fallback (no provider)', () => {
  // The module-level `fallbackController` singleton persists across tests.
  // We can't reset it without module re-import, but we CAN verify the
  // important observable behaviors without depending on its internal state.

  it('returns an object with theme and setTheme', () => {
    const result = withSetup(() => useTheme())
    expect(result).toHaveProperty('theme')
    expect(result).toHaveProperty('setTheme')
    expect(typeof result.setTheme).toBe('function')
  })

  it('returns the same singleton on repeated calls from different setups', () => {
    const r1 = withSetup(() => useTheme())
    const r2 = withSetup(() => useTheme())
    // Both point at the same controller (same theme ref reference).
    expect(r1.theme).toBe(r2.theme)
  })

  it('setTheme updates the shared theme ref and writes tokens into the kongponents-theme <style> element', () => {
    const controller = withSetup(() => useTheme())
    const theme: KongponentsTheme = { '--kui-color-text-primary': '#0044f4' }
    controller.setTheme(theme)
    expect(controller.theme.value).toStrictEqual(theme)
    const styleEl = document.getElementById('kongponents-theme') as HTMLStyleElement | null
    expect(styleEl).not.toBeNull()
    expect(styleEl!.textContent).toContain('--kui-color-text-primary: #0044f4')
    styleEl!.remove()
  })
})

// useTheme — injected provider

describe('useTheme — with a provided controller', () => {
  it('returns the injected controller when one is provided', () => {
    const providedController: UseThemeReturn = {
      theme: createThemeController(vi.fn()).theme,
      setTheme: vi.fn(),
    }

    const result = withSetup(
      () => useTheme(),
      (app) => app.provide(KONGPONENTS_THEME_INJECTION_KEY, providedController),
    )

    expect(result).toBe(providedController)
  })

  it('setTheme on the injected controller calls its setTheme, not the fallback', () => {
    const providedSetTheme = vi.fn()
    const providedController: UseThemeReturn = {
      theme: createThemeController(vi.fn()).theme,
      setTheme: providedSetTheme,
    }

    const result = withSetup(
      () => useTheme(),
      (app) => app.provide(KONGPONENTS_THEME_INJECTION_KEY, providedController),
    )

    const theme: KongponentsTheme = { '--kui-color-text-primary': '#abc' }
    result.setTheme(theme)
    expect(providedSetTheme).toHaveBeenCalledWith(theme)
    // The fallback path writes to document.documentElement; confirm it was not triggered.
    expect(document.documentElement.style.getPropertyValue('--kui-color-text-primary')).toBe('')
  })
})

// useTheme — SSR (no window)

describe('useTheme — SSR path (window undefined)', () => {
  beforeEach(() => {
    // Suppress Vue's "inject() can only be used inside setup()" warning —
    // calling useTheme() outside setup is intentional here to avoid mounting
    // a full Vue app, which itself requires window.ShadowRoot.
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    vi.stubGlobal('window', undefined)
  })

  it('returns a controller without throwing', () => {
    // Called outside setup: inject() returns null, then the SSR branch runs.
    const result = useTheme()
    expect(result).toHaveProperty('theme')
    expect(result).toHaveProperty('setTheme')
  })

  it('returns a fresh controller on each call (no shared server state)', () => {
    const r1 = useTheme()
    const r2 = useTheme()
    // Each SSR call must produce its own ref — not the same reference.
    expect(r1.theme).not.toBe(r2.theme)
  })

  it('setTheme on the SSR controller does not throw', () => {
    const result = useTheme()
    expect(() => result.setTheme({ '--kui-color-text-primary': '#abc' })).not.toThrow()
  })
})
