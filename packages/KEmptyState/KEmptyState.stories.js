import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import KEmptyState from './KEmptyState.vue'

storiesOf('EmptyState', module)
  .addDecorator(VueInfoAddon)
  .add('Call to action', () => ({
    components: { KEmptyState },
    template: `<div>
    <KEmptyState cta-text="Do A Thing" @cta="callToAction">
      <template slot="title">No Enabled Entities</template>
      <template slot="message">To do the thing, click below.</template>
      </KEmptyState>
    </div>`,
    methods: {
      callToAction () {
        alert('action thing!')
      }
    }
  }))
