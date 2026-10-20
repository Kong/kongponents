import { ref } from 'vue'
import { applyTheme } from '../../../../src/theme/applyTheme'
import {
  DOCS_COLOR_MODE_STORAGE_KEY,
  DOCS_THEME_OPTIONS,
  DOCS_THEME_STORAGE_KEY,
} from '../utils/docsThemes'

const FALLBACK_THEME = 'Classic Day'

function readSaved(): string {
  if (typeof localStorage === 'undefined') return FALLBACK_THEME

  const savedTheme = localStorage.getItem(DOCS_THEME_STORAGE_KEY) ?? FALLBACK_THEME
  const savedMode = localStorage.getItem(DOCS_COLOR_MODE_STORAGE_KEY)
  if (savedTheme in DOCS_THEME_OPTIONS) return savedTheme

  // Migrate selections saved by the previous two-control picker.
  const mode = savedMode === 'dark' ? 'Night' : 'Day'
  const migrated = savedTheme.endsWith(' High Contrast')
    ? `${savedTheme.replace(' High Contrast', '')} ${mode} High Contrast`
    : `${savedTheme} ${mode}`
  return migrated in DOCS_THEME_OPTIONS ? migrated : FALLBACK_THEME
}

const activeThemeLabel = ref(readSaved())

export function useDocsTheme() {
  function applyCurrentTheme(): void {
    applyTheme(DOCS_THEME_OPTIONS[activeThemeLabel.value])
    document.documentElement.classList.toggle('dark', activeThemeLabel.value.includes('Night'))
    localStorage.setItem(DOCS_THEME_STORAGE_KEY, activeThemeLabel.value)
  }

  function selectTheme(label: string): void {
    if (!(label in DOCS_THEME_OPTIONS)) return
    activeThemeLabel.value = label
    applyCurrentTheme()
  }

  return {
    activeThemeLabel,
    themeLabels: Object.keys(DOCS_THEME_OPTIONS),
    selectTheme,
    applyCurrentTheme,
  }
}
