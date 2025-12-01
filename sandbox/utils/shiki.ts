import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine-javascript.mjs'

// Create a bundled highlighter with lazy-loaded languages and themes
const createHighlighter = createdBundledHighlighter({
  langs: {
    json: () => import('shiki/langs/json.mjs'),
  },
  themes: {
    'catppuccin-latte': () => import('shiki/themes/catppuccin-latte.mjs'),
    'material-theme-palenight': () => import('shiki/themes/material-theme-palenight.mjs'),
  },
  engine: () => createJavaScriptRegexEngine(),
})

// Export singleton shorthand for converting code to HTML
const { codeToHtml } = createSingletonShorthands(createHighlighter)

export { codeToHtml }
