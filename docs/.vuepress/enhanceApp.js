// Get base stylesheet
import '../../packages/styles/styles.css'

// Globally import all Kongponents
import KAlert from '../../packages/KAlert'
import KButton from '../../packages/KButton'
import KCard from '../../packages/KCard'
import KClipboardProvider from '../../packages/KClipboardProvider'
import KEmptyState from '../../packages/KEmptyState'
import KIcon from '../../packages/KIcon'
import KModal from '../../packages/KModal'
import KPop from '../../packages/KPop'
import Krumbs from '../../packages/Krumbs'
import KTable from '../../packages/KTable'
import KToaster from '../../packages/KToaster'
import KInput from '../../packages/KInput'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('KAlert', KAlert)
  Vue.component('KModal', KModal)
  Vue.component('KButton', KButton)
  Vue.component('KCard', KCard)
  Vue.component('KEmptyState', KEmptyState)
  Vue.component('KIcon', KIcon)
  Vue.component('KTable', KTable)
  Vue.component('KToaster', KToaster)
  Vue.component('KPop', KPop)
  Vue.component('KClipboardProvider', KClipboardProvider)
  Vue.component('Krumbs', Krumbs)
  Vue.component('KInput', KInput)
}
