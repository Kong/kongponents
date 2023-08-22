import type ToastManager from './components/KToaster/ToastManager'

declare module 'vue' {
  interface ComponentCustomProperties {
    $toaster: typeof ToastManager
  }
}
