import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'

import KTable from './KTable.vue'

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
    { label: 'Credentials', key: 'credentials' },
    { label: '', key: 'actions', hideLabel: true }
  ],
  data: [
    {
      name: 'iOS App',
      type: 'Key',
      credentials: 'xyz'
    },
    {
      name: 'Website Desktop',
      type: 'Basic',
      credentials: '123xyz'
    },
    {
      name: 'Android App',
      type: 'JWT',
      credentials: '123xyz'
    }
  ]
}

storiesOf('KTable', module)
  .addDecorator(VueInfoAddon)
  .add('Default', () => ({
    components: { KTable },
    template: `
    <KTable :options=options>
      <template slot="actions" slot-scope="{row, rowKey, rowValue}"><a href="">Edit</a></template>
    </KTable>
    `,
    data () {
      return {
        options
      }
    }
  }))
  .add('hasHover', () => ({
    components: { KTable },
    template: `
    <KTable :options=options :hasHover='true'>
      <template slot="actions" slot-scope="{row, rowKey, rowValue}"><a href="">Edit</a></template>
    </KTable>
    `,
    data () {
      return {
        options
      }
    }
  }))
  .add('isStriped', () => ({
    components: { KTable },
    template: `
    <KTable :options="options" :isStriped='true'>
        <template slot="actions" slot-scope="{row, rowKey, rowValue}"> <a href="">Edit</a></template>
    </KTable>
    `,
    data () {
      return {
        options
      }
    }
  }))
