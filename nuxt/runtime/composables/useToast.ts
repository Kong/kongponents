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

export default function useToast() {
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
