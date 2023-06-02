export const offsetPaginationHeaders = [
  { label: 'Host', key: 'hostname', sortable: false },
  { label: 'Version', key: 'version', sortable: false },
  { label: 'Connected', key: 'connected', sortable: false },
  { label: 'Last Seen', key: 'last_seen', sortable: false },
]

export const generateOffsetPaginationTableData = async (pgSize: number) => {
  const pageSize = pgSize
  const data = [] as any
  const offsetObj = {} as any
  const offsetVal = 'abc'

  for (let i = 0; i < 50; i++) {
    data.push({
      id: `08cc7d81-a9d8-4ae1-a42f-8d4e5a919d0${i}`,
      version: '2.8.0.0-enterprise-edition',
      hostname: `99e591ae377${i}`,
      last_ping: 1648855072,
      connected: 'Connected',
      last_seen: `${i} days ago`,
    })
  }

  const totalPages = Math.ceil(data.length / pageSize)

  for (let i = 0; i < totalPages; i++) {
    const start = i * pageSize
    const end = pageSize * (i + 1)
    const index = `${offsetVal}_${i}`

    offsetObj[index] = { data: [], pagination: { offset: 'abc' } }
    offsetObj[index].data = data.slice(start, end)

    if (i < totalPages - 1) {
      offsetObj[index].pagination.offset = `${offsetVal}_${i + 1}`
    }
  }

  return offsetObj
}

export const offsetPaginationFetcher = async ({ pageSize = 15, offset = 'abc' }) => {
  const offsetPaginationData = await generateOffsetPaginationTableData(pageSize)

  return offset
    ? offsetPaginationData[offset]
    : Object.values(offsetPaginationData)[0]
}
