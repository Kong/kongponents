import KSkeleton from './KSkeleton'
import KSkeletonBox from './KSkeletonBox'

const Plugin = {
  install (Vue) {
    Vue.component('KSkeleton', KSkeleton)
    Vue.component('KSkeletonBox', KSkeletonBox)
  }
}

export default Plugin
export { KSkeleton, KSkeletonBox }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
