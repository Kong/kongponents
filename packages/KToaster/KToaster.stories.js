import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

storiesOf('KToaster', module)
  .addDecorator(VueInfoAddon)
  .add('Default', () => ({
    
  }))
