import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import VueInfoAddon from 'storybook-addon-vue-info'

import KClipboardProvider from './KClipboardProvider'

storiesOf('KClipboardProvider', module)
  .addDecorator(VueInfoAddon)
  .add('Copy to Clipboard', () => ({
    components: { KClipboardProvider },
    template: `
    <div>
      <input v-model="dataToCopy" type="text" />
      <KClipboardProvider>
        <KButton
          slot-scope="{ copyToClipboard }"
          @click="() => { if(copyToClipboard(dataToCopy)){ alert(dataToCopy) } }">
          copy to clipboard
        </KButton>
      </KClipboardProvider>
    </div>`,
    data: function () {
      return {
        dataToCopy: 'copy this to clipboard'
      }
    },
    methods: {
      alert () {
        action('copy-to-clipboard')(`This has been copied to clipboard: "${this.dataToCopy}"`)
      }
    }
  }))
