import { default as KToaster, toasterAppearances } from './KToaster.vue'
import Vue from 'vue'

// Track all instances of notifications currently open
let toasterState = []

// Set default values
const defaultTimeout = 5000
const defaultAppearance = toasterAppearances['info']
const appearances = Object.keys(toasterAppearances)
const toasterContainerID = 'toaster-container'

// Create a component container for the notification to bind to
const notificationContainer = document.createElement('div')

notificationContainer.id = toasterContainerID
document.body.appendChild(notificationContainer)

// Extend the notification SFC as a class and mount it to the container
const ComponentClass = Vue.extend(KToaster)
var notificationInstance = new ComponentClass({
  data: { toasterState }
})

notificationInstance.$mount('#' + toasterContainerID).$on('close', key => {
  closeToaster(key)
})

// Create a new notification
function newToaster (args) {
  // If the only arg is a string, set as toaster message
  if (typeof args === 'string') {
    args = {
      message: args
    }
  }

  // Set Toaster props
  args.key = args.key || new Date().getTime()
  args.timeoutMilliseconds = args.timeoutMilliseconds || defaultTimeout
  args._timer = setTimer(args.key, args.timeoutMilliseconds)
  // Verify appearance exists & is in allowed appearances. If not use default
  args.appearance = (args.appearance && appearances.indexOf(args.appearance) !== -1)
    ? args.appearance
    : defaultAppearance

  // Add toaster to state
  toasterState.push(args)
}

// Sets a timer to kill the notification after the specified timeout
const setTimer = (key, timeout) => setTimeout(() => closeToaster(key), timeout)

// Removes the notification from state
const closeToaster = (key) => {
  const i = toasterState.findIndex(n => key === n.key)

  clearTimeout(toasterState[i]._timer)
  toasterState.splice(i, 1)
}

// Create the api
const toasterApi = {
  open: newToaster, // Create new toaster
  close: closeToaster, // Close toaster
  getState: () => { //  Return all toasters in current state
    return toasterState
  }
}

export default toasterApi
