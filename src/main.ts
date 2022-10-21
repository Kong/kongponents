import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
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

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)

app.mount('#app')
