// Get base stylesheet
import '../../packages/styles/styles.css'

// Globally import all Kongponents
import KAlert from '../../packages/KAlert'
import KBadge from '../../packages/KBadge'
import KButton from '../../packages/KButton'
import KCard from '../../packages/KCard'
import KClipboardProvider from '../../packages/KClipboardProvider'
import KEmptyState from '../../packages/KEmptyState'
import KIcon from '../../packages/KIcon'
import KInput from '../../packages/KInput'
import KInputSwitch from '../../packages/KInputSwitch'
import KInputCheckbox from '../../packages/KInputCheckbox'
import KLabel from '../../packages/KLabel'
import KModal from '../../packages/KModal'
import KoolTip from '../../packages/KoolTip'
import KPop from '../../packages/KPop'
import Krumbs from '../../packages/Krumbs'
import KTable from '../../packages/KTable'
import KToaster from '../../packages/KToaster'
import KToggle from '../../packages/KToggle'

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
  Vue.component('KInputCheckbox', KInputCheckbox)
  Vue.component('KLabel', KLabel)
  Vue.component('KModal', KModal)
  Vue.component('KoolTip', KoolTip)
  Vue.component('KPop', KPop)
  Vue.component('Krumbs', Krumbs)
  Vue.component('KTable', KTable)
  Vue.component('KToaster', KToaster)
  Vue.component('KToggle', KToggle)
}
