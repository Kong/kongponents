// Get base stylesheet
import '../../packages/styles/styles.css'
import icons from '../../packages/KIcon/icons' // KIcon icons
import { default as ToastManager } from '../../packages/KToaster/ToastManager' // Toaster API

// Globally import all Kongponents
import KAlert from '../../packages/KAlert/KAlert.vue'
import KBadge from '../../packages/KBadge/KBadge.vue'
import KButton from '../../packages/KButton/KButton.vue'
import KCard from '../../packages/KCard/KCard.vue'
import KClipboardProvider from '../../packages/KClipboardProvider/KClipboardProvider.js'
import KEmptyState from '../../packages/KEmptyState/KEmptyState.vue'
import KIcon from '../../packages/KIcon/KIcon.vue'
import KInput from '../../packages/KInput/KInput.vue'
import KInputSwitch from '../../packages/KInputSwitch/KInputSwitch.vue'
import KLabel from '../../packages/KLabel/KLabel.vue'
import KModal from '../../packages/KModal/KModal.vue'
import KoolTip from '../../packages/KoolTip/KoolTip.vue'
import KPop from '../../packages/KPop/KPop.vue'
import Krumbs from '../../packages/Krumbs/Krumbs.vue'
import KTable from '../../packages/KTable/KTable.vue'
import KToaster from '../../packages/KToaster/KToaster.vue'
import KToggle from '../../packages/KToggle/KToggle.js'
import KSlideout from '../../packages/KSlideout/KSlideout.vue'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('KAlert', KAlert)
  Vue.component('KBadge', KBadge)
  Vue.component('KButton', KButton)
  Vue.component('KCard', KCard)
  Vue.component('KClipboardProvider', KClipboardProvider)
  Vue.component('KEmptyState', KEmptyState)
  Vue.component('KIcon', KIcon)
  Vue.component('KInput', KInput)
  Vue.component('KInputSwitch', KInputSwitch)
  Vue.component('KLabel', KLabel)
  Vue.component('KModal', KModal)
  Vue.component('KoolTip', KoolTip)
  Vue.component('KPop', KPop)
  Vue.component('Krumbs', Krumbs)
  Vue.component('KTable', KTable)
  Vue.component('KToggle', KToggle)
  Vue.component('KSlideout', KSlideout)

  Vue.prototype.$icons = Object.keys(icons)
  Vue.prototype.$toaster = new ToastManager()
}
