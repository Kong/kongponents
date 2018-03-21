import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import GButton from './button.vue'

storiesOf('G-button', module)
  .addDecorator(VueInfoAddon)
  .add('Rounded False', () => ({
    components: { GButton },
    template: `
      <g-button :rounded="false">not round</g-button>
      <g-button :rounded="true">rounded</g-button>
    `
  }))
  .add('Rounded True', () => ({
    components: { GButton },
    template: '<g-button :rounded="true">rounded</g-button>'
  }))