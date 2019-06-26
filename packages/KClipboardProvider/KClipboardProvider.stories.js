import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import { action } from '../../storybook/node_modules/@storybook/addon-actions'

import KClipboardProvider from './KClipboardProvider'

storiesOf('KClipboardProvider', module)
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
  }), {info: {}})
