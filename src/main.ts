import { createApp } from 'vue'
import App from './App.vue'
import Kongponents from './index'
import ToastManager from './components/KToaster/ToastManager'
import SetupCalendar from 'v-calendar'

// Import a single component
// import { KButton } from './index'

// OR

// Import plugin (all components)
// import Kongponents from './index'

const app = createApp(App)

// Globally register a single component
// app.component('KButton', KButton)

// OR

// Install plugin (all components)
app.use(Kongponents)
app.use(SetupCalendar, {})

app.config.globalProperties.$toaster = new ToastManager()

app.mount('#app')
