import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

import KTable from './KTable.vue'

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
    { label: 'Credentials', key: 'credentials' },
    { key: 'actions', hideLabel: true }
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
      credentials: '721'
    },
    {
      name: 'Android App',
      type: 'JWT',
      credentials: '123xyz'
    }
  ]
}

storiesOf('Table', module)
  .add('Default', () => ({
    components: { KTable },
    template: `
    <KTable :options=options>
        <template slot="actions" slot-scope="{row, rowKey, rowValue}"><a href="">Edit</a></template>
    </KTable>
    <!--
    data() {
      return {
        options: ${JSON.stringify(options, null, 2)}
      }
    }
    -->
    `,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
  .add('hover', () => ({
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
  }), {info: {}})
  .add('small', () => ({
    components: { KTable },
    template: `
    <KTable :options="options" is-small />
    <!--
    data() {
      return {
        options: ${JSON.stringify(options, null, 2)}
      }
    }
    -->
    `,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
  .add('sortable', () => ({
    components: { KTable },
    template: `
      <KTable :options="options" sort-direction="desc" sort-by="type">
        <template slot="actions" slot-scope="{row, rowKey, rowValue}"><a href="">Edit</a></template>
      </KTable>
    `,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
