import { storiesOf } from '../../storybook/node_modules/@storybook/vue/dist/client'
import KInputSwitch from './KInputSwitch.vue'

storiesOf('KInputSwitch', module)
  .add('Default', () => ({
    components: { KInputSwitch },
    template: `
      <KInputSwitch
        v-model="checked"
        @change="handleToggle">
      <template slot="label">{{ labelText}}</template>
    </KInputSwitch>
    `,
    data: () => ({
      checked: false
    }),
    computed: {
      labelText () {
        return this.checked ? 'on' : 'off'
      }
    },
    methods: {
      handleToggle (value) {
        this.checked = value
        console.log(this.checked)
      }
    }
  }), { info: {} })
