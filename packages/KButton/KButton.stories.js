import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import KButton from './KButton.vue'

storiesOf('KButton', module)
  .addDecorator(VueInfoAddon)
  .add('Rounded False', () => ({
    components: { KButton },
    template: `<KButton :isRounded='false'>button</KButton>`
  }))
  .add('Rounded True', () => ({
    components: { KButton },
    template: `<KButton :isRounded='true'>button</KButton>`
  }))
  .add('Primary Styles', () => ({
    components: { KButton },
    template: `<KButton appearance='primary'>button</KButton>`
  }))
