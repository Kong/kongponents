// @ts-ignore - file exists
import { defineNuxtPlugin } from '#app'

// @ts-ignore - file exists
import '@kong/kongponents/dist/style.css'
// In some NodeJS environments, the `crypto` module is not available by default, so import it and make it available on the server
import crypto from 'node:crypto'

// @ts-ignore - file exists
export default defineNuxtPlugin({
  name: 'kongponents',
  enforce: 'pre',
  setup() {
    // Inject the crypto module into the global scope if it is not already available
    if (import.meta.server && typeof globalThis?.crypto === 'undefined') {
      globalThis.crypto = globalThis.crypto || crypto
    }
  },
})
