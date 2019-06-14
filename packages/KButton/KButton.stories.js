import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withInfo } from 'storybook-addon-vue-info'

import { default as KButton, appearances } from './KButton.vue'
import KIcon from '../KIcon/KIcon.vue'

storiesOf('KButton', module)
  .add('Default', () => ({
    components: { KButton },
    template: `<KButton>button</KButton>`
  }), {info: {}})
  .add('Anchor Link', () => ({
    components: { KButton },
    template: `<div>
      <KButton appearance="btn-link" :to="{path: '/'}">Router Link!</KButton>
      <KButton appearance="btn-link" to="http://google.com">Anchor Link!</KButton>
    </div>`
  }), {info: {}})
  .add('Appearance', () => ({
    components: { KButton },
    template: `
      <div>
      ${Object.values(appearances).map(type => {
      return `<KButton appearance="${type}" style="margin: 0 5px">${type}</KButton>`
    }).join('')}
      </div>`
  }), {info: {}})
  .add('Disabled', () => ({
    components: { KButton },
    template: `<div>
      ${Object.values(appearances).map(type => {
      return `<KButton appearance="${type}" disabled style="margin: 0 5px">${type}</KButton>`
    }).join('')}
      </div>`
  }), {info: {}})
  .add('Sizes', () => ({
    components: { KButton },
    template: `<div>
      <KButton appearance="secondary" size="small">small</KButton>
    </div>`
  }), { info: {} })
  .add('Icons', () => ({
    components: { KButton, KIcon },
    template: `<div>
      <KButton appearance="secondary">
        <KIcon slot="icon" icon="gear" />
        With Text
      </KButton>
      <KButton appearance="secondary">
        <KIcon slot="icon" icon="gear" />
      </KButton>
    </div>`
  }), {info: {}})
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
  }), {info: {}})
