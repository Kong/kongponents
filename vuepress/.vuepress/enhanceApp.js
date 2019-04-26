// Get base stylesheet
import '../../styles.css'

// Register Kongponents
import KButton from '../../node_modules/@kongponents/kbutton'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.component('KButton', KButton);
}
