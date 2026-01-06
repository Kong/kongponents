import { onBeforeUnmount } from 'vue'
import { ToastManager } from '@/index'

export default function useSandboxToaster() {
  const toasters = Array.from({ length: 20 }).map(() => new ToastManager())
  const toaster = toasters.pop()!

  toasters.forEach(item => setTimeout(() => item.destroy(), Math.ceil(Math.random() * 10000)))

  onBeforeUnmount(() => {
    toaster.destroy()
  })

  return { toaster }
}
