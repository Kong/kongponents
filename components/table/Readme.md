```js
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

<KTable :options=options :isStriped='true' :hasHover='true'>
  <template slot="actions" slot-scope="{row, rowKey, rowValue}"><a href="">Edit</a></template>
</KTable>
```
