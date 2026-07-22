import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Kongponents from '../../../src'
// Import component-specific files
import RouterLink from '../components/RouterLink.vue'
import DocsLayout from './DocsLayout.vue'

// Theme styles
import './index.scss'

export default {
  ...DefaultTheme,
  Layout: DocsLayout,
  enhanceApp(ctx: EnhanceAppContext) {
    // Extend default theme custom behaviour
    DefaultTheme.enhanceApp(ctx)

    // Stub the <router-link> component; it doesn't exist in VitePress
    ctx.app.component('RouterLink', RouterLink)

    // Register all Kongponents
    ctx.app.use(Kongponents)
  },
}
