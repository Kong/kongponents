// TODO: testing some stuff...

// @ts-ignore - import path exists
import { defineNuxtPlugin } from '#app'

// In some NodeJS environments, the `crypto` module is not available by default, so import it and make it available on the server
import crypto from 'node:crypto'

export default defineNuxtPlugin({
  name: 'kongponents',
  setup() {
    // Inject the crypto module into the global scope if it is not already available
    if (import.meta.server && typeof globalThis?.crypto === 'undefined') {
      globalThis.crypto = globalThis.crypto || crypto
    }
  },
})
