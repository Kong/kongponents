import { getCurrentInstance, watch } from 'vue'

import type { WatchSource } from 'vue'

export interface UseDeprecatedProps {
  notice: string
  docPath?: string
  fragment?: string
}

export const composeWarning = (componentName: string, notice: string, docPath: string = 'guide/migrating-to-version-9.html', fragment = '') =>
  `${componentName}: ${notice}. See the migration guide for more details: https://kongponents.konghq.com/${docPath}${fragment ? `#${fragment}` : ''}`

export const useDeprecated = (condition: WatchSource<boolean>, {
  notice,
  docPath,
  fragment,
}: UseDeprecatedProps) => {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('useDeprecated can only be invoked inside setups')
  }

  watch(condition, (exists) => {
    if (exists) {
      console.warn(composeWarning(instance.type.name!, notice, docPath, fragment))
    }
  }, { immediate: true })
}
