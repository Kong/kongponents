import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import KoolTip from './KoolTip.vue'

storiesOf('KoolTip', module)
  .add('Button with default positioning', () => ({
    components: { KoolTip },
    template: `<KoolTip style="margin-top:50px;margin-left:100px;" message="I am some sample text with default positioning!"><button>button</button></KoolTip>`
  }), {info: {}})
  .add('Button with right positioning', () => ({
    components: { KoolTip },
    template: `<KoolTip position="right" message="I am some sample text with right positioning!"><button>button</button></KoolTip>`
  }), {info: {}})
