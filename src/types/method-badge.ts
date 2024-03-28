export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options' | 'trace' | 'connect' | 'custom'
export interface MethodBadgeColors {
  color: string
  backgroundColor: string
}

export const MethodsArray = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom'] as const
