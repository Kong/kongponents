// `import.meta.client` is declared by nuxt/app's global augments; nuxt>=4.6 no longer
// pulls those in transitively via nuxt/schema, so reference them explicitly.
/// <reference types="nuxt/app" />
import { onBeforeUnmount } from 'vue'
import { ToastManager } from '@kong/kongponents'
import type { Toast } from '@kong/kongponents'

/** The default toaster configuration */
const defaultToastConfig: Toast = {
  key: 'kongponents-toast',
  appearance: 'success',
  message: 'Success',
  timeoutMilliseconds: 3000,
}

export function useToast() {
  // Initialize the toast manager; stub out the `open` and `destroy` methods on the server
  const toast = import.meta.client ? new ToastManager() : { open: () => {}, destroy: () => {} }

  const showToast = async (notification: Partial<Toast>): Promise<void> => {
    if (import.meta.client) {
      toast.open({
        ...defaultToastConfig,
        ...notification,
      })
    }
  }

  onBeforeUnmount(() => {
    toast.destroy()
  })

  return {
    showToast,
  }
}
