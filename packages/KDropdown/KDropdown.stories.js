import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'

import KDropdown from './KDropdown.vue'

storiesOf('KDropdown', module)
  .addDecorator(StoryRouter())
  .add('Default', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        toggle-text="Open Dropdown" />
    </div>
  `}))
  .add('Show Active', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['workspaces', 'vitals']"
        show-active
        toggle-text="workspaces">
        <template slot="workspaces">
          <router-link to="/overview">Workspaces</router-link>
        </template>
      </KDropdown>
    </div>
  `}))
  .add('Center Aligned', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        position="center"
        toggle-text="Open Dropdown" />
    </div>
  `}))
  .add('Right Aligned', () => ({
    components: { KDropdown },
    template: `
    <div style="margin-left: 50px">
      <KDropdown
        :items="['item 1', 'item 2', 'item 3']"
        position="right"
        toggle-text="Open Dropdown"/>
    </div>
  `}))
