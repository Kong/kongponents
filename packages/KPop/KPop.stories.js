import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import KPop from './KPop.vue'

storiesOf('KPop', module)
  .add('Popover with default positioning on top, triggers on click by default', () => ({
    components: { KPop },
    template: `<KPop title="Cool header" style="margin-top:150px;margin-left:100px;"><button>button</button><div slot="content">I am some sample text with default positioning!</div></KPop>`
  }), {info: {}})
  .add('Popover with positioning on the right', () => ({
    components: { KPop },
    template: `<KPop placement="right" title="Cool header" style="margin-top:100px;"><button>button</button><div slot="content">I am some sample text with right positioning!</div></KPop>`
  }), {info: {}})
  .add('Popover that triggers on hover', () => ({
    components: { KPop },
    template: `<KPop trigger="hover" title="Cool header" style="margin-left:100px;"><button>button</button><div slot="content">I am some sample text that triggers on hover!</div></KPop>`
  }), {info: {}})
