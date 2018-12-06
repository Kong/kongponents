import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import KAlert from './KAlert.vue'

storiesOf('Alert', module)
  .addDecorator(VueInfoAddon)
  .add('Alert - isDismissible', () => ({
    components: { KAlert },
    template: `<KAlert isDismissible alertMessage="howdy!" />`
  }))
  .add('Alert - not Dismissable', () => ({
    components: { KAlert },
    template: `<KAlert isShowing alertMessage="howdy!" />`
  }))
  .add('Alert - Appearances', () => ({
    components: { KAlert },
    template: `
    <div>
      <KAlert isShowing isDismissible alertMessage="Info" appearance="info" style="margin-bottom: 10px;"/>
      <KAlert isShowing isDismissible alertMessage="Success" appearance="success" style="margin-bottom: 10px;" />
      <KAlert isShowing isDismissible alertMessage="Danger" appearance="danger" style="margin-bottom: 10px;" />
      <KAlert isShowing isDismissible alertMessage="Warning" appearance="warning" style="margin-bottom: 10px;" />
    </div>`
  }))
  .add('Alert - Slots', () => ({
    components: { KAlert },
    template: `
    <div>
      <KAlert isShowing isDismissible alertMessage="Info" appearance="warning">
        <template slot="alertMessage">
          ⚠️ This is a warning <br>
          Note: Do not do something dangerous
        </template>
      </KAlert>
    </div>`
  }))
