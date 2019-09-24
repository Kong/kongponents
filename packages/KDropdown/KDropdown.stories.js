import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import { action } from '../../storybook/node_modules/@storybook/addon-actions'
import StoryRouter from '../../storybook/node_modules/storybook-vue-router'

import { default as KDropdown, alignments } from './KDropdown.vue'
import KIcon from '../KIcon/KIcon.vue'

storiesOf('KDropdown', module)
  .add('Default', () => ({
    components: { KDropdown },
    template: `<div>
    <KDropdown
      :items="['item 1', 'item 2', 'item 3']"
      toggle-text="Open Dropdown" />
      <KDropdown
      :items="['item 1', 'item 2', 'item 3']"
      toggle-text="Open Dropdown"
      button-type="text" />
    </div>`
  }), {info: {}})
  .add('Alignments', () => ({
    components: { KDropdown },
    template: `<div>
    ${Object.keys(alignments).map(position => {
      return `
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        position="${position}"
        toggle-text="${position}" />
      `
    }).join('')}
    </div>
    `
  }), { info: {} })
  .add('Icons', () => ({
    components: { KDropdown, KIcon },
    template: `<div>
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']" >
        <KIcon slot="icon" icon="gear" />
      </KDropdown>
    </div>
    `
  }), { info: {} })
  .add('Computed', () => ({
    components: { KDropdown },
    template: `<div>
      <KDropdown :items="items" :toggle-text="selectedText"/>
    </div>
    `,
    computed: {
      selectedText () {
        return this.items.filter(i => i.selected).length + ' Selected'
      }
    },
    data: () => {
      return {
        items: [
          { name: 'item 1', selected: false },
          { name: 'item 2', selected: true }
        ]
      }
    }
  }))
  .add('Slotted', () => ({
    components: { KDropdown },
    template: `<div>
     <KDropdown :items="items" toggle-text="Select Items">
        <template slot-scope="{ item }">
          <a :href="item.path">{{ item.name }}</a>
        </template>
      </KDropdown>
    </div>
    `,
    data: () => {
      return {
        items: [
          { name: 'item 1', selected: false, id: 1, path: '/services' },
          { name: 'item 2', selected: true, id: 2, path: '/routes' }
        ]
      }
    }
  }))
  .add('Actions', () => ({
    components: { KDropdown },
    template: `
    <KDropdown
      :items="['item 1', 'item 2', 'item 3']"
      toggle-text="Cool Actions">
      <template slot="item-1">
        <span @click="onClick">Click me!</span>
      </template>
    </KDropdown>
    `,
    methods: {
      onClick (e) {
        action('onClick')(e)
      }
    }
  }), {info: {}})
