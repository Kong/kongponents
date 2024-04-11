import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/styles.scss'
import Kongponents from '../src'
// Sandbox layout
import { SandboxLayout } from '@kong-ui-public/sandbox-layout'
import type { SandboxNavigationItem } from '@kong-ui-public/sandbox-layout'
import '@kong-ui-public/sandbox-layout/dist/style.css'

const app = createApp(App)

// Globally register the component the sandbox app
app.component('SandboxLayout', SandboxLayout)

// Define the sandbox layout links here to inject
const sandboxAppLinks: SandboxNavigationItem[] = ([
  { name: 'KAlert', to: { name: 'alert' } },
  { name: 'KBadge', to: { name: 'badge' } },
  { name: 'KButton', to: { name: 'button' } },
  { name: 'KBreadcrumbs', to: { name: 'breadcrumbs' } },
  { name: 'KCard', to: { name: 'card' } },
  { name: 'KCatalog', to: { name: 'catalog' } },
  { name: 'KCheckbox', to: { name: 'checkbox' } },
  { name: 'KCodeBlock', to: { name: 'codeblock' } },
  { name: 'KCollapse', to: { name: 'collapse' } },
  { name: 'KCopy', to: { name: 'copy' } },
  { name: 'KDateTimePicker', to: { name: 'datetimepicker' } },
  { name: 'KDropdown', to: { name: 'dropdown' } },
  { name: 'KEmptyState', to: { name: 'emptystate' } },
  { name: 'KFileUpload', to: { name: 'fileupload' } },
  { name: 'KInput', to: { name: 'input' } },
  { name: 'KInputSwitch', to: { name: 'inputswitch' } },
  { name: 'KLabel', to: { name: 'label' } },
  { name: 'KModal & KPrompt', to: { name: 'modals' } },
  { name: 'KMultiselect', to: { name: 'multiselect' } },
  { name: 'KPagination', to: { name: 'pagination' } },
  { name: 'KRadio', to: { name: 'radio' } },
  { name: 'KSegmentedControl', to: { name: 'segmentedcontrol' } },
  { name: 'KSelect', to: { name: 'select' } },
  { name: 'KSkeleton', to: { name: 'skeleton' } },
  { name: 'KSlideout', to: { name: 'slideout' } },
  { name: 'KTable', to: { name: 'table' } },
  { name: 'KTabs', to: { name: 'tabs' } },
  { name: 'KTextarea', to: { name: 'textarea' } },
  { name: 'KToaster', to: { name: 'toaster' } },
  { name: 'KTreeList', to: { name: 'treelist' } },
])

// Provide the app links to the SandboxLayout components
app.provide('app-links', sandboxAppLinks)

app.use(router)

// Globally register components so they do not have to be imported
app.use(Kongponents)

app.mount('#app')
