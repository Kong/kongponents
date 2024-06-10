import { inject } from 'vue'
import { kongponentsRandomIdFunction } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function useGetRandomId() {
  const kongponentsId: () => string = inject<() => string>(kongponentsRandomIdFunction, uuidv4)

  return { kongponentsId }
}