<!-- One script setup that's used in both table-view.md and table-data.md -->
<!-- Contains functions used in both docs files -->

<script setup lang="ts">
import { ref } from 'vue'
import { AddIcon, SearchIcon, MoreIcon } from '@kong/icons'
import { ToastManager } from '@/index'

const toaster = new ToastManager()

const basicHeaders = (actions: boolean = false, sortable: string | null = null, hidable: string | null = null, bulkActions: boolean = false): Array<TableViewHeader> => {
  const keys = {
    ...(bulkActions && {
      actions: {
        key: 'bulkActions',
        label: 'Bulk actions',
      },
    }),
    name: {
      key: 'name',
      label: 'Full Name'
    },
    username: {
      key: 'username',
      label: 'Username',
      tooltip: 'Unique for each user.'
    },
    email: {
      key: 'email',
      label: 'Email'
    },
    ...(actions && {
      actions: {
        key: 'actions',
        label: 'Row actions',
      },
    })
  }

  const headers = []
  for (const [key, value] of Object.entries(keys)) {
    if ((!sortable && !hidable) || (sortable !== key && hidable !== key)) {
      headers.push({ ...value })
    } else if (sortable && sortable === key) {
      headers.push({ ...value, sortable: true })
    } else if (hidable && hidable === key) {
      headers.push({ ...value, hidable: true })
    }
  }

  return headers
}

const basicData: TableViewData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
]

const basicDataSortable = ref<TableViewData>(basicData)

const sortBasicData = (sortData: TableSortPayload): void => {
  const data = [...basicData]
  const { sortColumnKey, sortColumnOrder } = sortData || { sortColumnKey: 'username', sortColumnOrder: 'asc' }

  data.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (sortColumnKey === 'username') {
      if (sortColumnOrder === 'asc') {
        if (a.username > b.username) {
          return 1
        } else if (a.username < b.username) {
          return -1
        }

        return 0
      } else {
        if (a.username > b.username) {
          return -1
        } else if (a.username < b.username) {
          return 1
        }

        return 0
      }
    }

    return 0
  })

  basicDataSortable.value = data
}

const extraRecords: TableViewData = [
  {
    id: 11,
    name: 'Chris Lo',
    username: 'Krislow',
    email: 'dj@kris.low',
  },
  {
    id: 12,
    name: 'Vitaliy Yarmak',
    username: 'Tamarack',
    email: 'Right@sail.xyz',
  },
]
const basicPaginatedData: TableViewData = [...basicData, ...extraRecords]
const paginatedPageSize = ref<number>(5)
const paginatedData = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize.value))
const onPageChange = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData.value = basicPaginatedData.slice(0, paginatedPageSize.value)
  } else {
    paginatedData.value = basicPaginatedData.slice((paginatedPageSize.value * (page - 1)), (paginatedPageSize.value * (page - 1)) + paginatedPageSize.value)
  }
}
const onPageSizeChange = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize.value = pageSize
}

const paginatedPageSize1 = ref<number>(5)
const paginatedData1 = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize1.value))
const onPageChange1 = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData1.value = basicPaginatedData.slice(0, paginatedPageSize1.value)
  } else {
    paginatedData1.value = basicPaginatedData.slice((paginatedPageSize1.value * (page - 1)), (paginatedPageSize1.value * (page - 1)) + paginatedPageSize1.value)
  }
}
const onPageSizeChange1 = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize1.value = pageSize
}

const getRowLink = (row: Record<string, any>): TableRowAttributes => ({
  // using static route for demonstration purposes
  // but you can generate dynamic routes based on the row data
  to: { path: '/' }, // pass a string to render the link as an anchor element instead of a router-link
  target: '_blank',
})

const numberedHeaders: Array<TableViewHeader> = [
  {
    key: 'column1',
    label: 'Column 1'
  },
  {
    key: 'column2',
    label: 'Column 2'
  },
  {
    key: 'column3',
    label: 'Column 3'
  }
]

const numberedColumnsData: TableViewData = [
  {
    column1: 'Row 1 cell 1',
    column2: 'Row 1 cell 2',
    column3: 'Row 1 cell 3'
  },
  {
    column1: 'Row 2 cell 1',
    column2: 'Row 2 cell 2',
    column3: 'Row 2 cell 3'
  },
  {
    column1: 'Row 3 cell 1',
    column2: 'Row 3 cell 2',
    column3: 'Row 3 cell 3'
  }
]

const onRowClick = (event, row) => {
  toaster.open({ appearance: 'success', title: 'Row clicked! Row data:', message: row })
}

const onButtonClick = () => {
  toaster.open({ appearance: 'system', title: 'Button clicked!', message: 'Button click is handled separately from row or cell clicks.' })
}

const onCellClick = (event, cell) => {
  toaster.open({ title: 'Cell clicked! Cell data:', message: cell })
}

const toggleModel = ref<boolean[]>([false, false, false])

const getRowBulkAction = (data: Record<string, any>): RowBulkAction => {
  if (data.id === 2) {
    return false
  }

  if (data.id === 3) {
    return { enabled: false }
  }

  if (data.id === 4) {
    return {
      enabled: false,
      disabledTooltip: 'This row is disabled.',
    }
  }

  return true
}

const userTypeHeaders = [...basicHeaders().filter(header => header.key !== 'email'), { key: 'type', label: 'Type' }]
const userTypeData: TableViewData = basicData.map(row => row.id % 2 === 0 ? { ...row, type: 'External' } : { ...row, type: 'Internal' })

const teamsHeaders: TableViewHeader[] = [
  {
    key: 'name',
    label: 'Team Name',
  },
  {
    key: 'manager',
    label: 'Manager',
  },
  {
    key: 'channel',
    label: 'Slack Channel',
    hidable: true,
  },
]

const teamsData: TableViewData = [
  {
    name: 'Design',
    manager: 'Leanne Graham',
    channel: '#team-design',
  },
  {
    name: 'Engineering',
    manager: 'Ervin Howell',
    channel: '#team-engineering',
  },
  {
    name: 'Data',
    manager: 'Clementine Bauch',
    channel: '#team-data',
  },
  {
    name: 'Support',
    manager: 'Patricia Lebsack',
    channel: '#team-support',
  },
]

const cpGroupsHeaders: TableViewHeader[] = [
  {
    key: 'name',
    label: 'Control Plane',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'nodes',
    label: 'Nodes',
    hidable: true,
  },
  {
    key: 'actions',
    label: 'Row actions',
  }
]

const cpGroupsData: TableViewData = [
  {
    name: 'Group 1',
    type: 'Control Plane Group',
    nodes: 3,
  },
  {
    name: 'Group 2',
    type: 'Control Plane Group',
    nodes: 3,
  },
  {
    name: 'Group 3',
    type: 'Control Plane Group',
    nodes: 3,
  },
  {
    name: 'Cloud 1',
    type: 'Cloud Gateway',
    nodes: 2,
  },
  {
    name: 'Group 4',
    type: 'Control Plane Group',
    nodes: 3,
  },
]

const cpData: TableViewData = [
  {
    name: 'Control Plane 1',
    type: 'Self-Managed Gateway',
    nodes: 2,
  },
  {
    name: 'Control Plane 2',
    type: 'Self-Managed Gateway',
    nodes: 1,
  },
  {
    name: 'Control Plane 3',
    type: 'Self-Managed Gateway',
    nodes: 0,
  },
  {
    name: 'Control Plane 4',
    type: 'Self-Managed Gateway',
    nodes: 0,
  },
  {
    name: 'Control Plane 5',
    type: 'Self-Managed Gateway',
    nodes: 0,
  },
  {
    name: 'Control Plane 6',
    type: 'Self-Managed Gateway',
    nodes: 0,
  },
]

const basicFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: responseData,
    total: responseData.length,
  }
}

// use hardcoded response instead of basicFetcher when you need data in the table to match the data in the example
// in case data returned by https://jsonplaceholder.typicode.com/users endpoint ever changes
const hardcodedFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const responseData = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca'
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info'
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz'
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me'
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io'
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz'
    }
  ]

  return {
    data: responseData,
    total: responseData.length,
  }
}

const basicSortHandlerFunction = ({ key, sortColumnOrder, data }: any) => {
  return data.sort((a: any, b: any) => {
    if (key === 'username') {
      if (sortColumnOrder === 'asc') {
        if (a.username > b.username) {
          return 1
        } else if (a.username < b.username) {
          return -1
        }

        return 0
      } else {
        if (a.username > b.username) {
          return -1
        } else if (a.username < b.username) {
          return 1
        }

        return 0
      }
    }

    return data
  })
}
</script>
