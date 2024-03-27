# Table

Pass a fetcher function to build a slot-able table.

```html
  <KTable :fetcher="fetcher" :headers="headers" />
```

::: warning NOTE
`KTable` implements `KIcon` which imports .svg files directly, so a loader may be needed in order to render these in your application such as the webpack
[raw-loader](https://webpack.js.org/loaders/raw-loader/). [See here for more information](/#installation).
:::

## Props

### resizeColumns

Allow table column width to be resizable. Adjusting a column's width will trigger an `@update:table-preferences` event.

<KTable :fetcher="tableOptionsFetcher" :headers="resizeHeaders" resize-columns />

```html
  <KTable :fetcher="fetcher" :headers="headers" resize-columns />
```


<!-- The markdownlint disable below is necessary due to some syntax in the <script> tags - `yarn lint` will not pass without this -->
<!-- markdownlint-disable MD011 MD037 -->

<script lang="ts">
import { defineComponent } from 'vue'
import { AddIcon } from '@kong/icons'

export default defineComponent({
  components: {
    AddIcon
  },
  data() {
    return {
      row: null,
      eventType: '',
      enableRowClick: true,
      offsetPaginationPageSize: 15,
      offsetPaginationData: {},
      headers: [
        { label: 'Title', key: 'title', sortable: true },
        { label: 'Description', key: 'description', sortable: true },
        { label: 'Enabled', key: 'enabled', sortable: false }
      ],
      resizeHeaders: [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Enabled', key: 'enabled' }
      ],
      tableOptionsHeaders: [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Enabled', key: 'enabled' },
        { key: 'actions', hideLabel: true }
      ],
      tableOptionsRowAttrsHeaders: [
        { label: 'Type', key: 'type' },
        { label: 'Value', key: 'value' },
        { label: 'Enabled', key: 'enabled'}
      ],
      tableOptionsLinkHeaders: [
        { label: 'Company', key: 'company' },
        { label: 'Input', key: 'input' },
        { key: 'actions', hideLabel: true }
      ],
      tableOptionsLinkHeaders2: [
        { label: 'Company', key: 'company' },
        { label: 'Wrapped', key: 'wrapped' },
        { label: 'Pop', key: 'other' }
      ],
      tableOptionsCellAttrsHeaders: [
        { label: 'Name', key: 'name' },
        { label: 'Company', key: 'company' },
        { label: 'Description', key: 'description' }
      ],
      sortHandlerFnHeaders: [
        { label: 'Host', key: 'hostname', sortable: true },
        { label: 'Version', key: 'version', sortable: true },
        { label: 'Connected', key: 'connected', sortable: true },
        { label: 'Last Seen', key: 'last_seen', sortable: true, useSortHandlerFn: true }
      ],
      offsetPaginationHeaders: [
        { label: 'Host', key: 'hostname', sortable: false },
        { label: 'Version', key: 'version', sortable: false },
        { label: 'Connected', key: 'connected', sortable: false },
        { label: 'Last Seen', key: 'last_seen', sortable: false }
      ],
      cellSlotHeaders: [
        { label: 'Name', key: 'name', sortable: true },
        { label: 'ID', key: 'id' },
        { label: 'Enabled', key: 'enabled' }
      ]
    }
  },
  methods: {
    resolveAfter5MiliSec(count, pageSize, page, sortKey, sortOrder) {
      // simulate pagination and sort
      let limit = count
      if ((pageSize *page) < count) {
        limit = pageSize
      }
      let myItems = []
      for (let i = ((page-1)* pageSize); i < limit; i++) {
          let offset = sortOrder === 'asc' ? count-i : i+1
          myItems.push({
            title: "Item " + offset,
            description: "The item's description for number " + offset,
            enabled: offset % 2 === 0
          })
        }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(myItems);
        }, 500);
      });
    },
    async fetcher(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: await this.resolveAfter5MiliSec(20, payload.pageSize, payload.page, payload.sortColumnKey, payload.sortColumnOrder),
        total: 20
      }
      return params
    },
    tableOptionsFetcher () {
      return {
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
    },
    emptyFetcher () {
      return { data: [] }
    },
    tableOptionsLinkFetcher () {
      return {
        data: [
          { company: { href: 'http://www.creative.com', label: 'Creative Labs' } },
          { company: { href: 'http://www.bang-olufsen.com', label: 'Bang&Olufsen' } },
          { company: { href: 'http://www.klipsch.com', label: 'Klipsch' } },
          { company: { href: 'http://www.bose.com', label: 'Bose'} },
          { company: { href: 'http://www.sennheiser.com', label: 'Sennheiser'} }
        ]
      }
    },
    tableOptionsRowAttrsFetcher () {
      return {
        data: [
          {
            type: 'desktop',
            value: 'Windows 10',
            enabled: 'true'
          },
          {
            type: 'phone',
            value: 'LineageOS',
            enabled: 'false'
          },
          {
            type: 'tablet',
            value: 'ipadOS',
            enabled: 'true'
          }
        ]
      }
    },
    tableOptionsCellAttrsFetcher() {
      return {
        data: [
          {
            name: 'SageMaker',
            company: 'Amazon',
            description: 'Amazon SageMaker is a fully-managed service that enables developers and data scientists to quickly and easily build, train, and deploy machine learning models at any scale. Amazon SageMaker removes all the barriers that typically slow down developers who want to use machine learning.',
          },
          {
            name: 'Azure Machine Learning Studio',
            company: 'Microsoft',
            description: 'Azure Machine Learning Studio is a GUI-based integrated development environment for constructing and operationalizing Machine Learning workflow on Azure.',
          },
          {
            name: 'IBM Watson Machine Learning',
            company: 'IBM',
            description: 'IBM Watson Studio accelerates the machine and deep learning workflows required to infuse AI into your business to drive innovation.',
          },
          {
            name: 'TensorFlow',
            company: 'Google',
            description: 'TensorFlow is an open source software library for numerical computation using data flow graphs.',
          },
        ]
      }
    },
    sortHandlerFn({ key, prevKey, sortColumnOrder, data}) {
      return data.sort((a, b) => {
        if (key === 'last_seen') {
          if (sortColumnOrder === 'asc') {
            if (a.last_ping < b.last_ping) {
              return 1
            } else if (a.last_ping > b.last_ping) {
              return -1
            }

            return 0
          } else {
            if (a.last_ping < b.last_ping) {
              return -1
            } else if (a.last_ping > b.last_ping) {
              return 1
            }

            return 0
          }
        }
      })
    },
    sortHandlerFnFetcher() {
      return {
        data: [
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.0.0-enterprise-edition',
            hostname: '99e591ae3776',
            last_ping: 1648855072,
            connected: 'Disconnected',
            last_seen: '6 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.7.0.0-enterprise-edition',
            hostname: '19e591ae3776',
            last_ping: 1649362660,
            connected: 'Connected',
            last_seen: '3 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.1.0-enterprise-edition',
            hostname: '79e591ae3776',
            last_ping: 1649355460,
            connected: 'Connected',
            last_seen: '5 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.6.0.0-enterprise-edition',
            hostname: '89e591ae3776',
            last_ping: 1648155072,
            connected: 'Disconnected',
            last_seen: '14 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.2.0-enterprise-edition',
            hostname: '59e591ae3776',
            last_ping: 1649855072,
            connected: 'Connected',
            last_seen: 'Just now'
          },
        ]
      }
    },
    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    },
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (metaKeyPressed) {
        this.$toaster.open('MetaKey row click')
      } else {
        this.$toaster.open('Row click event fired!')
      }
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
    },
    clickHandler (msg) {
      this.$toaster.open(msg)
    },
    rowAttrsFn (rowItem) {
      return {
        class: {
          'enabled': rowItem.enabled === 'true',
          'disabled': rowItem.enabled === 'false'
        },
        'data-testid': 'row-item'
      }
    },
    cellAttrsFn ({ headerKey, row, rowIndex, colIndex }) {
      /**
       * Sets cell background color based on data returned in
       * the row parameter and the index of the cell
       */
      const backgroundColor = () => {
        if (row.company && row.company === 'Google') {
          if (colIndex === 0) {
            return '#4285F4'
          } else if (colIndex === 1) {
            return '#DB4437'
          } else {
            return '#F4B400'
          }
        }

        return ''
      }

      /**
       * Returns an object of attributes to be applied to cells
       */
      return {
        class: {
          'truncated-keys': headerKey === 'description' || headerKey === 'name',
        },
        'datatest-id': `row-${rowIndex + 1}-col-${headerKey}`,
        style: {
          'maxWidth': headerKey==='description' ? '50ch' : headerKey === 'name' ? '22ch' : '25ch',
          'backgroundColor': backgroundColor(),
        },
      }
    },
    async generateOffsetPaginationTableData(pgSize) {
      const pageSize = pgSize || this.offsetPaginationPageSize
      const data = []
      const offsetObj = {}
      const offsetVal = 'offset'

      for (let i = 0; i < 50; i++) {
        data.push({
          id: `08cc7d81-a9d8-4ae1-a42f-8d4e5a919d0${i}`,
          version: '2.8.0.0-enterprise-edition',
          hostname: `99e591ae377${i}`,
          last_ping: 1648855072,
          connected: 'Connected',
          last_seen: `${i} days ago`
        })
      }

      const totalPages = Math.ceil(data.length / pageSize)

      for (let i = 0; i < totalPages; i++) {
        const start = i * pageSize
        const end = pageSize * (i + 1)

        offsetObj[`${offsetVal}_${i}`] = { data: [], pagination: { offset: '' } }
        offsetObj[`${offsetVal}_${i}`].data = data.slice(start, end)

        if (i < totalPages - 1) {
          offsetObj[`${offsetVal}_${i}`].pagination.offset = `${offsetVal}_${i + 1}`
        }
      }

      this.offsetPaginationData = offsetObj
    },
    async offsetPaginationFetcher({ pageSize, offset }) {
      if (pageSize !== this.offsetPaginationPageSize) {
        this.offsetPaginationPageSize = pageSize
        this.generateOffsetPaginationTableData()
      }

      return offset
        ? this.offsetPaginationData[offset]
        : Object.values(this.offsetPaginationData)[0]
    },
    cellSlotFetcher () {
      return {
        data: [
          {
            name:'Basic Auth',
            img: {
              alt: 'Basic Auth Icon'
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            id: '517526354743085',
            enabled: 'true'
          },
          {
            name: 'Website Desktop',
            img: {
              alt: 'Website Desktop Icon'
            },
            description: 'Ut enim ad minim veniam',
            id: '328027447731198',
            enabled: 'false'
          },
          {
            name: 'Android App',
            img: {
              alt: 'Android App Icon'
            },
            description: 'Excepteur sint occaecat cupidatat non proident',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    },
    cellSlotAttrs ({ headerKey }) {
      if (headerKey === 'name') {
        return { class: 'custom-layout-cell' }
      }
    }
  },
  mounted() {
    this.generateOffsetPaginationTableData()
  }
})
</script>

<style lang="scss">
.k-table {
  display: table;

  th, tr, td {
    border: unset;
  }

  td.custom-layout-cell {
    display: flex;

    img {
      width: 30px;
      object-fit: contain;
    }

    .k-table-cell-description {
      max-width: 240px;
    }
  }
}

.horizontal-spacing {
  margin-right: $kui-space-40;
}

.truncated-keys {
  line-height: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.k-table-cell-description {
  line-height: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.eventful-row {
  display: inline-block;
}

.toolbar-container {
  display: flex;
  justify-content: space-between;
}
</style>
