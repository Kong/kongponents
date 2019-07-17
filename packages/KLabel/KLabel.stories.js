import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import KLabel from './KLabel.vue'

storiesOf('KLabel', module)
  .add('Default', () => ({
    components: { KLabel },
    template: `<KLabel for="input_id">Label Text</KLabel>`
  }), {info: {}})
