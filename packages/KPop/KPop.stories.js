import { storiesOf } from '@storybook/vue'

import KPop from './KPop.vue'

storiesOf('KPop', module)
  .add('Popover with default positioning on top, triggers on click by default', () => ({
    components: { KPop },
    template: `<KPop title="Cool header" content="I am some sample text with default positioning!" style="margin-top:150px;margin-left:100px;"><button>button</button></KPop>`
  }), {info: {}})
  .add('Popover with positioning on the right', () => ({
    components: { KPop },
    template: `<KPop placement="right" title="Cool header" content="I am some sample text with right positioning!"><button>button</button></KPop>`
  }), {info: {}})
  .add('Popover that triggers on hover', () => ({
    components: { KPop },
    template: `<KPop trigger="hover" title="Cool header" content="I am some sample text that triggers on hover!"><button>button</button></KPop>`
  }), {info: {}})
