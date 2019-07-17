import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import KTable from './KTable.vue'

const options = {
  headers: [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Enabled', key: 'enabled' },
    { key: 'actions', hideLabel: true }
  ],
  data: [
    {
      name: 'Basic Auth',
      id: '517526354743085',
      enabled: 'true'
    },
    {
      name: 'Website Desktop',
      id: '328027447731198',
      enabled: 'false'
    },
    {
      name: 'Android App',
      id: '405383051040955',
      enabled: 'true'
    }
  ]
}

storiesOf('Table', module)
  .add('Default', () => ({
    components: { KTable },
    template: `<KTable :options=options />`,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
  .add('hover', () => ({
    components: { KTable },
    template: `<KTable :options=options :hasHover='true' />`,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
  .add('small', () => ({
    components: { KTable },
    template: `<KTable :options="options" is-small />`,
    data () {
      return {
        options
      }
    }
  }), {info: {}})
  .add('slots', () => ({
    components: { KTable },
    template: `
    <KTable :options=options>
      <template slot="name" slot-scope="{row, rowKey, rowValue}">
        <strong v-if="rowValue === 'Basic Auth'">{{ rowValue }}</strong>
      </template>
      <template slot="enabled" slot-scope={rowValue}>
        <span v-if="rowValue === 'true'" style="color: green">&#10003;</span>
        <span v-else style="color: red">&#10007;</span>
      </template>
      <template slot="actions"><a href="">Edit</a></template>
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
