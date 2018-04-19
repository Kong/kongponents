import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import KButton from './KButton.vue'

storiesOf('KButton', module)
  .addDecorator(VueInfoAddon)
  .add('Rounded False', () => ({
    components: { KButton },
    template: `<KButton :rounded="false">not round</KButton>`
  }))
  .add('Rounded True', () => ({
    components: { KButton },
    template: '<KButton :rounded="true">rounded</KButton>'
  }))
