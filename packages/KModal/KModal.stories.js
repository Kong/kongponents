import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import KModal from './KModal.vue'

let isVisible = true

storiesOf('KModal', module)
  .addDecorator(VueInfoAddon)
  .add('Custom Header', () => ({
    components: { KModal },
    template:
    `
    <KModal :isVisible='true'>
      <template slot="header">
        Custom Header
      </template>
    </KModal>
    `
  }))
  .add('Custom Body', () => ({
    components: { KModal },
    template:
    `
    <KModal :isVisible='true'>
      <template slot="body">
        Custom Body
      </template>
    </KModal>
    `
  }))
  .add('Custom Footer', () => ({
    components: { KModal },
    template:
    `
    <KModal :isVisible='true'>
      <template slot="footer-actions">
        <button>Custom Proceed</button>
      </template>
      <template slot="footer-dismiss">
        <button>Custom Cancel</button>
      </template>
    </KModal>
    `
  }))
