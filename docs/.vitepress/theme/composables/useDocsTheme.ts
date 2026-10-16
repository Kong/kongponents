import { ref } from 'vue'
import { applyTheme } from '../../../../src/theme/applyTheme'
import {
  DOCS_COLOR_MODE_STORAGE_KEY,
  DOCS_THEME_OPTIONS,
  DOCS_THEME_STORAGE_KEY,
  type DocsColorMode,
} from '../utils/docsThemes'

const FALLBACK_THEME = 'Electric Lime'

function readSaved(): { theme: string, mode: DocsColorMode } {
  if (typeof localStorage === 'undefined') return { theme: FALLBACK_THEME, mode: 'light' }

  const savedTheme = localStorage.getItem(DOCS_THEME_STORAGE_KEY) ?? FALLBACK_THEME
  const legacyMode: DocsColorMode = savedTheme.includes('Night') ? 'dark' : 'light'
  const theme = savedTheme
    .replace(' Day High Contrast', ' High Contrast')
    .replace(' Night High Contrast', ' High Contrast')
    .replace(/ (Day|Night)$/, '')
  const savedMode = localStorage.getItem(DOCS_COLOR_MODE_STORAGE_KEY)

  return {
    theme: theme in DOCS_THEME_OPTIONS ? theme : FALLBACK_THEME,
    mode: savedMode === 'light' || savedMode === 'dark' ? savedMode : legacyMode,
  }
}

const saved = readSaved()
const activeThemeLabel = ref(saved.theme)
const activeMode = ref<DocsColorMode>(saved.mode)

export function useDocsTheme() {
  function applyCurrentTheme(): void {
    applyTheme(DOCS_THEME_OPTIONS[activeThemeLabel.value][activeMode.value])
    document.documentElement.classList.toggle('dark', activeMode.value === 'dark')
    localStorage.setItem(DOCS_THEME_STORAGE_KEY, activeThemeLabel.value)
    localStorage.setItem(DOCS_COLOR_MODE_STORAGE_KEY, activeMode.value)
  }

  function selectTheme(label: string): void {
    if (!(label in DOCS_THEME_OPTIONS)) return
    activeThemeLabel.value = label
    applyCurrentTheme()
  }

  function toggleMode(): void {
    activeMode.value = activeMode.value === 'light' ? 'dark' : 'light'
    applyCurrentTheme()
  }

  return {
    activeThemeLabel,
    activeMode,
    themeLabels: Object.keys(DOCS_THEME_OPTIONS),
    selectTheme,
    toggleMode,
    applyCurrentTheme,
  }
}
