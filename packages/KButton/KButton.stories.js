import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import VueInfoAddon from 'storybook-addon-vue-info'

import KButton from './KButton.vue'

storiesOf('Button', module)
  .addDecorator(VueInfoAddon)
  .add('Default', () => ({
    components: { KButton },
    template: `<KButton>button</KButton>`
  }))
  .add('Rounded False', () => ({
    components: { KButton },
    template: `<KButton :isRounded='false'>button</KButton>`
  }))
  .add('Appearance', () => ({
    components: { KButton },
    template: `<div>
      <KButton appearance="secondary">secondary</KButton>  
      <KButton appearance='primary'>primary</KButton>
      <KButton appearance='outline-primary'>outline-primary</KButton>
      <KButton appearance='btn-link'>btn-link</KButton>
      <KButton appearance='danger'>danger</KButton>
      <KButton appearance='outline-danger'>outline-danger</KButton>
      <KButton appearance='btn-link-danger'>btn-link-danger</KButton>
    </div>`
  }))
  .add('Disabled', () => ({
    components: { KButton },
    template: `<div>
      <KButton disabled appearance="secondary">secondary</KButton>  
      <KButton disabled appearance='primary'>primary</KButton>
      <KButton disabled appearance='outline-primary'>outline-primary</KButton>
      <KButton disabled appearance='btn-link'>btn-link</KButton>
      <KButton disabled appearance='danger'>danger</KButton>
      <KButton disabled appearance='outline-danger'>outline-danger</KButton>
      <KButton disabled appearance='btn-link-danger'>btn-link-danger</KButton>
    </div>`
  }))
  .add('Actions', () => ({
    components: { KButton },
    template: `
    <KButton 
      @click="onClick"
      @focus="onFocus"
      @blur="onBlur"
      @dblclick="onDblClick"
      appearance='primary'>
      button
    </KButton>`,
    methods: {
      onClick (e) {
        action('onClick')(e)
      },
      onFocus (e) {
        action('onFocus')(e)
      },
      onBlur (e) {
        action('onBlur')(e)
      },
      onDblClick (e) {
        action('onDblClick')(e)
      }
    }
  }))
