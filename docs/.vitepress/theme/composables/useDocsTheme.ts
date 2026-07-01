import { ref } from 'vue'
import { applyTheme } from '../../../../src/theme/applyTheme'
import { DOCS_THEME_OPTIONS, DOCS_THEME_STORAGE_KEY } from '../utils/docsThemes'

const FALLBACK_THEME = Object.keys(DOCS_THEME_OPTIONS)[0]

function readSaved(): string {
  if (typeof localStorage === 'undefined') return FALLBACK_THEME
  const saved = localStorage.getItem(DOCS_THEME_STORAGE_KEY)
  return saved && saved in DOCS_THEME_OPTIONS ? saved : FALLBACK_THEME
}

const activeThemeLabel = ref<string>(readSaved())

export function useDocsTheme() {
  function selectTheme(label: string): void {
    if (!(label in DOCS_THEME_OPTIONS)) return
    activeThemeLabel.value = label
    applyTheme(DOCS_THEME_OPTIONS[label])
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DOCS_THEME_STORAGE_KEY, label)
    }
  }

  return {
    activeThemeLabel,
    themeLabels: Object.keys(DOCS_THEME_OPTIONS),
    selectTheme,
  }
}
