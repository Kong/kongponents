import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import { default as KAlert, appearances } from './KAlert.vue'

storiesOf('Alert', module)
  .add('Alert - isDismissible', () => ({
    components: { KAlert },
    template: `<KAlert isShowing isDismissible alertMessage="howdy!" />`
  }), {info: {}})
  .add('Alert - not Dismissable', () => ({
    components: { KAlert },
    template: `<KAlert isShowing alertMessage="howdy!" />`
  }), {info: {}})
  .add('Alert - Appearances', () => ({
    components: { KAlert },
    template: `
    <div>
      ${Object.keys(appearances).map(type => {
      return `<KAlert isShowing isDismissible alertMessage="${type}" appearance="${type}" style="margin-bottom: 10px;"/>`
    }).join('')}
    </div>`
  }), {info: {}})
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
  }), {info: {}})
