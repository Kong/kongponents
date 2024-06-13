import { onBeforeUnmount } from 'vue'
import { ToastManager } from '@/index'

export default function useSandboxToaster() {
  const toaster = new ToastManager()

  onBeforeUnmount(() => {
    toaster.destroy()
  })

  return { toaster }
}
