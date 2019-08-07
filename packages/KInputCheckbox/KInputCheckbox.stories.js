import { storiesOf } from '../../storybook/node_modules/@storybook/vue/dist/client'
import KInputCheckbox from './KInputCheckbox.vue'

storiesOf('KInputCheckbox', module)
  .add('Default', () => ({
    components: { KInputCheckbox },
    template: `
      <div>
        <KInputCheckbox
          v-model="checked"
          @change="handleToggle">
          {{ labelText }}
        </KInputCheckbox>
        <KInputCheckbox disabled>
          disabled
        </KInputCheckbox>
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
