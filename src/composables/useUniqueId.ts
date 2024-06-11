import { inject } from 'vue'
import { kongponentsGetUniqueId } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function useUniqueId() {
  const uniqueIdFn: () => string = inject<() => string>(kongponentsGetUniqueId, uuidv4)

  return {
    uniqueIdFn,
  }
}