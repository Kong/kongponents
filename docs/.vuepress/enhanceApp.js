// Get base stylesheet
import '../../packages/styles/styles.css'
import icons from '../../packages/KIcon/icons' // KIcon icons

// Globally import all Kongponents
import KAlert from '../../packages/KAlert/KAlert.vue'
import KBadge from '../../packages/KBadge/KBadge.vue'
import KButton from '../../packages/KButton/KButton.vue'
import KCard from '../../packages/KCard/KCard.vue'
import KClipboardProvider from '../../packages/KClipboardProvider/KClipboardProvider.js'
import KMultiselect from '../../packages/KMultiselect/KMultiselect.vue'
import KEmptyState from '../../packages/KEmptyState/KEmptyState.vue'
import KIcon from '../../packages/KIcon/KIcon.vue'
import KInput from '../../packages/KInput/KInput.vue'
import KInputSwitch from '../../packages/KInputSwitch/KInputSwitch.vue'
import KCheckbox from '../../packages/KCheckbox/KCheckbox.vue'
import KRadio from '../../packages/KRadio/KRadio.vue'
import KLabel from '../../packages/KLabel/KLabel.vue'
import KModal from '../../packages/KModal/KModal.vue'
import KoolTip from '../../packages/KoolTip/KoolTip.vue'
import KPop from '../../packages/KPop/KPop.vue'
import Krumbs from '../../packages/Krumbs/Krumbs.vue'
import KSegmentedControl from '../../packages/KSegmentedControl/KSegmentedControl.vue'
import KTable from '../../packages/KTable/KTable.vue'
import KTabs from '../../packages/KTabs/KTabs.vue'
import KToggle from '../../packages/KToggle/KToggle.js'
import Komponent from '../../packages/Komponent/Komponent.js'
import KSlideout from '../../packages/KSlideout/KSlideout.vue'
import KSkeleton from '../../packages/KSkeleton/KSkeleton.vue'

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
  Vue.component('KMultiselect', KMultiselect)
  Vue.component('KEmptyState', KEmptyState)
  Vue.component('KIcon', KIcon)
  Vue.component('KInput', KInput)
  Vue.component('KInputSwitch', KInputSwitch)
  Vue.component('KCheckbox', KCheckbox)
  Vue.component('KRadio', KRadio)
  Vue.component('KLabel', KLabel)
  Vue.component('KModal', KModal)
  Vue.component('KoolTip', KoolTip)
  Vue.component('KPop', KPop)
  Vue.component('Krumbs', Krumbs)
  Vue.component('Komponent', Komponent)
  Vue.component('KSegmentedControl', KSegmentedControl)
  Vue.component('KTabs', KTabs)
  Vue.component('KTable', KTable)
  Vue.component('KToggle', KToggle)
  Vue.component('KSlideout', KSlideout)
  Vue.component('KSkeleton', KSkeleton)

  Vue.prototype.$icons = Object.keys(icons)
}
