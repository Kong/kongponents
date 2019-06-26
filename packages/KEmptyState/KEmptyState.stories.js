import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import KEmptyState from './KEmptyState.vue'

storiesOf('EmptyState', module)
  .add('Call to action', () => ({
    components: { KEmptyState },
    template: `<div>
    <KEmptyState cta-text="Do A Thing" :handle-click="callToAction">
      <template slot="title">No Enabled Entities</template>
      <template slot="message">To do the thing, click below.</template>
      </KEmptyState>
    </div>`,
    methods: {
      callToAction () {
        alert('action thing!')
      }
    }
  }), {info: {}})
