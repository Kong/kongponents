import { defineClientConfig } from '@vuepress/client'

import Kongponents from '../../src'

// Import component-specific files
import * as icons from '../../src/components/KIcon/icons' // KIcon icons
import ToastManager from '../../src/components/KToaster/ToastManager'

// Import global VuePress components
import ColorSwatch from './components/ColorSwatch.vue'
import TypographyBlock from './components/TypographyBlock.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // Register KIcon icons
  app.config.globalProperties.$icons = Object.keys(icons)

  // @ts-ignore
  if (!__VUEPRESS_SSR__) {
    // Register ToastManager
    app.config.globalProperties.$toaster = new ToastManager()
  }

  // Register all Kongponents
  app.use(Kongponents)

  // Register other components
  app.component('ColorSwatch', ColorSwatch)
  app.component('TypographyBlock', TypographyBlock)
  },
  setup() {},
  rootComponents: [],
})
