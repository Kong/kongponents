import { getCurrentInstance, onBeforeUnmount } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { ToastManager } from '@/index'

export default function useSandboxToaster() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const toaster = new ToastManager(appContext)

  onBeforeUnmount(() => {
    toaster.destroy()
  })

  return { toaster }
}