import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import { action } from '../../storybook/node_modules/@storybook/addon-actions'
import { withInfo } from '../../storybook/node_modules/storybook-addon-vue-info'

import KButton from './KButton.vue'
import KIcon from '../KIcon/KIcon.vue'

storiesOf('KButton', module)
  .add('Default', () => ({
    components: { KButton },
    template: `<KButton>button</KButton>`
  }), {info: {}})
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
  }), {info: {}})
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
