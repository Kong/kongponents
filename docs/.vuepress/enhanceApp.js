// Get base stylesheet
import '../../packages/styles/styles.css'
import icons from '../../packages/KIcon/icons' // KIcon icons

import VueCompositionAPI from '@vue/composition-api'

// Globally import all Kongponents
import KAlert from '../../packages/KAlert/KAlert.vue'
import KBadge from '../../packages/KBadge/KBadge.vue'
import KButton from '../../packages/KButton/KButton.vue'
import KCard from '../../packages/KCard/KCard.vue'
import KCardCatalog from '../../packages/KCardCatalog/KCardCatalog.vue'
import KCatalogItem from '../../packages/KCardCatalog/KCatalogItem.vue'
import KClipboardProvider from '../../packages/KClipboardProvider/KClipboardProvider.js'
import KMultiselect from '../../packages/KMultiselect/KMultiselect.vue'
import KEmptyState from '../../packages/KEmptyState/KEmptyState.vue'
import KIcon from '../../packages/KIcon/KIcon.vue'
import KInlineEdit from '../../packages/KInlineEdit/KInlineEdit.vue'
import KInput from '../../packages/KInput/KInput.vue'
import KInputSwitch from '../../packages/KInputSwitch/KInputSwitch.vue'
import KCheckbox from '../../packages/KCheckbox/KCheckbox.vue'
import KRadio from '../../packages/KRadio/KRadio.vue'
import KLabel from '../../packages/KLabel/KLabel.vue'
import KMenu from '../../packages/KMenu/KMenu.vue'
import KMenuItem from '../../packages/KMenu/KMenuItem.vue'
import KModal from '../../packages/KModal/KModal.vue'
import KoolTip from '../../packages/KoolTip/KoolTip.vue'
import KPagination from '../../packages/KPagination/KPagination.vue'
import KPop from '../../packages/KPop/KPop.vue'
import KPrompt from '../../packages/KPrompt/KPrompt.vue'
import Krumbs from '../../packages/Krumbs/Krumbs.vue'
import KSegmentedControl from '../../packages/KSegmentedControl/KSegmentedControl.vue'
import KSelect from '../../packages/KSelect/KSelect.vue'
import KTable from '../../packages/KTable/KTable.vue'
import KTableLegacy from '../../packages/KTableLegacy/KTableLegacy.vue'
import KTabs from '../../packages/KTabs/KTabs.vue'
import KTextArea from '../../packages/KTextArea/KTextArea.vue'
import KToggle from '../../packages/KToggle/KToggle.js'
import Komponent from '../../packages/Komponent/Komponent.js'
import KSlideout from '../../packages/KSlideout/KSlideout.vue'
import KSkeleton from '../../packages/KSkeleton/KSkeleton.vue'
import KSkeletonBox from '../../packages/KSkeleton/KSkeletonBox.vue'
import KViewSwitcher from '../../packages/KViewSwitcher/KViewSwitcher.vue'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(VueCompositionAPI)
  Vue.component('KAlert', KAlert)
  Vue.component('KBadge', KBadge)
  Vue.component('KButton', KButton)
  Vue.component('KCard', KCard)
  Vue.component('KCardCatalog', KCardCatalog)
  Vue.component('KCatalogItem', KCatalogItem)
  Vue.component('KClipboardProvider', KClipboardProvider)
  Vue.component('KMultiselect', KMultiselect)
  Vue.component('KEmptyState', KEmptyState)
  Vue.component('KIcon', KIcon)
  Vue.component('KInlineEdit', KInlineEdit)
  Vue.component('KInput', KInput)
  Vue.component('KInputSwitch', KInputSwitch)
  Vue.component('KCheckbox', KCheckbox)
  Vue.component('KRadio', KRadio)
  Vue.component('KLabel', KLabel)
  Vue.component('KMenu', KMenu)
  Vue.component('KMenuItem', KMenuItem)
  Vue.component('KModal', KModal)
  Vue.component('KoolTip', KoolTip)
  Vue.component('KPagination', KPagination)
  Vue.component('KPop', KPop)
  Vue.component('KPrompt', KPrompt)
  Vue.component('Krumbs', Krumbs)
  Vue.component('Komponent', Komponent)
  Vue.component('KSegmentedControl', KSegmentedControl)
  Vue.component('KSelect', KSelect)
  Vue.component('KTable', KTable)
  Vue.component('KTableLegacy', KTableLegacy)
  Vue.component('KTabs', KTabs)
  Vue.component('KTextArea', KTextArea)
  Vue.component('KToggle', KToggle)
  Vue.component('KSlideout', KSlideout)
  Vue.component('KSkeleton', KSkeleton)
  Vue.component('KSkeletonBox', KSkeletonBox)
  Vue.component('KViewSwitcher', KViewSwitcher)

  Vue.prototype.$icons = Object.keys(icons)
}
