import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine-javascript.mjs'


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

const { codeToHtml } = createSingletonShorthands(createHighlighter)

export { codeToHtml }
