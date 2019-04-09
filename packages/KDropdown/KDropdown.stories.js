import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import { default as KDropdown, alignments } from './KDropdown.vue'

storiesOf('KDropdown', module)
  .add('Default', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        toggle-text="Open Dropdown" />
    </div>
  `}), {info: {}})
  .add('Alignments', () => ({
    components: { KDropdown },
    template: `
    <div style="display:flex">
    ${Object.keys(alignments).map(position => {
      return `<div style="margin: 1rem">
        <KDropdown
          :items="['item 1', 'item 2', 'item 3']"
          position="${position}"
          toggle-text="Open ${position}" />
      </div>`
    }).join('')}
    </div>
  `}), {info: {}})
  .add('Custom Text', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        :toggle-icon="false"
        position="left">
        <template slot="toggle-text">Look mah, no arrow!</template>
      </KDropdown>
    </div>
  `}), { info: {} })
  .add('Actions', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        toggle-text="Cool Actions"
        position="left">
        <template slot="item-1">
          <span @click="onClick">Click me!</span>
        </template>
      </KDropdown>
    </div>`,
    methods: {
      onClick (e) {
        action('onClick')(e)
      }
    }
  }), {info: {}})
