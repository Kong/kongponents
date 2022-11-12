import { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Kongponents from '../../../src'
// Import component-specific files
import * as icons from '../../../src/components/KIcon/icons' // KIcon icons
import ToastManager from '../../../src/components/KToaster/ToastManager'

// Theme styles
import './index.scss'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // Extend default theme custom behaviour
    DefaultTheme.enhanceApp(ctx)

    // Register KIcon icons
    ctx.app.config.globalProperties.$icons = Object.keys(icons)

    // Register ToastManager
    // TODO: May need to handle SSR
    ctx.app.config.globalProperties.$toaster = new ToastManager()

    // Register all Kongponents
    ctx.app.use(Kongponents)
  }
}
