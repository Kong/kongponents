/// <reference types="vite/client" />
/* eslint-disable */
import ToastManager from './components/KToaster/ToastManager'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module 'vue' {
  interface ComponentCustomProperties {
    $toaster: typeof ToastManager
  }
}
