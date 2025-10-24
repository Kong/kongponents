import type { Toast } from '@kong/kongponents'

export default function useToast(): {
  showToast: (notification: Partial<Toast>) => Promise<void>
}
