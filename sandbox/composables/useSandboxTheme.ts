import { ref } from 'vue'
import { useTheme } from '../../src'
import { SANDBOX_THEME_OPTIONS, SANDBOX_THEME_STORAGE_KEY } from '../utils/sandboxThemes'

// Module-level ref — singleton across all composable calls so every consumer
// (SandboxThemePicker + SandboxTheming) stays in sync without a store.
const _saved = typeof localStorage !== 'undefined' ? localStorage.getItem(SANDBOX_THEME_STORAGE_KEY) : null
const activeThemeLabel = ref<string>(_saved && _saved in SANDBOX_THEME_OPTIONS ? _saved : 'Default')

export function useSandboxTheme() {
  const { setTheme } = useTheme()

  function selectTheme(label: string): void {
    if (!(label in SANDBOX_THEME_OPTIONS)) return
    activeThemeLabel.value = label
    setTheme(SANDBOX_THEME_OPTIONS[label])
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SANDBOX_THEME_STORAGE_KEY, label)
    }
  }

  return {
    activeThemeLabel,
    themeLabels: Object.keys(SANDBOX_THEME_OPTIONS),
    selectTheme,
  }
}
