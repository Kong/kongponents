import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import { withInfo } from '../../storybook/node_modules/storybook-addon-vue-info'
import KIcon from './KIcon.vue'
import icons from './icons'
const iconNames = Object.keys(icons)

storiesOf('Icon', module)
  .add('Icons', () => ({
    components: { KIcon },
    template: `<div>
      ${iconNames.map(name => {
        if (name !== 'spinner') {
          return `<KIcon icon="${name}" />`
        }
    }).join('')}
    </div>`
  }), { info: {} })
  .add('Spinner', () => ({
    components: { KIcon },
    template: `<div style="background: rgba(0,0,0,.45)">
      <KIcon icon="spinner" view-box="0 0 16 16" />
    </div>`
  }), {info: {}})
