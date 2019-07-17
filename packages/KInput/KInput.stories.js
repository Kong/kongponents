import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import { action } from '../../storybook/node_modules/@storybook/addon-actions'
import KInput from './KInput.vue'
import KLabel from '../KLabel/KLabel.vue'

storiesOf('KInput', module)
  .add('Default', () => ({
    components: { KInput, KLabel },
    template: `<div style="display:grid; grid-gap: 1rem">
      <div><KInput type="email" placeholder="Enter email" value="invalid" /></div>
      <div>
        <KLabel>Label</KLabel>
        <KInput type="text" placeholder="Focus on me" />
      </div>
      <div>
        <KLabel>Label</KLabel>
        <KInput type="text" placeholder="I have a label & hint" />
        <p class="hint">Hint</p>
      </div>
      <div>
        <KInput type="search" placeholder="Search..." />
      </div>
      <div>
        <KInput disabled type="text" placeholder="Disabled" />
      </div>
    </div>`
  }), { info: {} })
  .add('Actions', () => ({
    components: { KInput },
    template: `
      <KInput
        type="email"
        placeholder="Make some actions 😉"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"/>
    `,
    methods: {
      onFocus (e) {
        action('onFocus')(e)
      },
      onBlur (e) {
        action('onBlur')(e)
      },
      onInput (e) {
        action('onInput')(e)
      }
    }
  }), { info: {} })
