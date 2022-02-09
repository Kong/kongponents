import { defineClientAppEnhance } from '@vuepress/client'
import Kongponents from '../../src'

// Import component-specific files
import * as icons from '../../src/components/KIcon/icons' // KIcon icons
// import ToastManager from '../../src/components/KToaster/ToastManager'

// Import global VuePress components
import swatch from './components/swatch.vue'
import textBlock from './components/text-block.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // Register KIcon icons
  app.config.globalProperties.$icons = Object.keys(icons)

  // Register ToastManager
  // app.config.globalProperties.$toaster = new ToastManager()

  // Register all Kongponents
  app.use(Kongponents)

  // Register other components
  app.component('swatch', swatch)
  app.component('textBlock', textBlock)
})
