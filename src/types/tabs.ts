import type { RouteLocationNamedRaw } from 'vue-router'

export interface Tab {
  hash: string
  title: string
  route?: RouteLocationNamedRaw
}
