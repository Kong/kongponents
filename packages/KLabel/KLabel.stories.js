import { storiesOf } from '@storybook/vue'
import KLabel from './KLabel.vue'

storiesOf('KLabel', module)
  .add('Default', () => ({
    components: { KLabel },
    template: `<KLabel for="input_id">Label Text</KLabel>`
  }), {info: {}})
