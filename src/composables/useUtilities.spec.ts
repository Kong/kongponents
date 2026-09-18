import { describe, it, expect } from 'vitest'
import useUtilities from '@/composables/useUtilities'

const { clientSideSorter, stripRequiredLabel } = useUtilities()

describe('Client-side sorting (deprecated in favor of server-side sorting)', () => {
  it('clientSideSorter(): sorts the items by string', () => {
    const items = [
      {
        custom_id: '1234',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        username: 'henry',
      }, {
        custom_id: '1345',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        username: 'bobby',
      }, {
        custom_id: '13445',
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        username: 'zach',
      },
    ]

    expect(items[0].username).toBe('henry')

    const { previousKey: sortKey1, sortOrder: sortOrder1 } = clientSideSorter('username', '', 'ascending', items)

    expect(items[0].username).toBe('bobby')
    expect(sortKey1).toBe('username')
    expect(sortOrder1).toBe('ascending')

    const { previousKey: sortKey2, sortOrder: sortOrder2 } = clientSideSorter('username', 'username', sortOrder1, items)

    expect(items[0].username).toBe('zach')
    expect(sortKey2).toBe('username')
    expect(sortOrder2).toBe('descending')
  })

  it('clientSideSorter(): sorts the items by number', () => {
    const items = [
      {
        custom_id: 1234,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        username: 'henry',
      }, {
        custom_id: 0,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        username: 'bobby',
      }, {
        custom_id: 13445,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        username: 'zach',
      },
    ]

    const { previousKey: sortKey1, sortOrder: sortOrder1 } = clientSideSorter('custom_id', '', 'ascending', items)

    expect(items[0].username).toBe('bobby')
    expect(items[0].custom_id).toBe(0)
    expect(sortKey1).toBe('custom_id')
    expect(sortOrder1).toBe('ascending')

    const { previousKey: sortKey2, sortOrder: sortOrder2 } = clientSideSorter('custom_id', 'custom_id', sortOrder1, items)

    expect(items[0].username).toBe('zach')
    expect(items[0].custom_id).toBe(13445)
    expect(sortKey2).toBe('custom_id')
    expect(sortOrder2).toBe('descending')
  })

  it('clientSideSorter(): sorts undefined and null values', () => {
    const items = [
      {
        custom_id: 2145,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        username: 'bobby',
      }, {
        custom_id: 13445,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        username: 'zach',
      },
      {
        custom_id: 3145,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb5',
        username: undefined,
      },
      {
        custom_id: 1234,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        username: null,
      },
    ]

    expect(items[0].username).toBe('bobby')
    expect(items[0].custom_id).toBe(2145)

    const { previousKey: sortKey1, sortOrder: sortOrder1 } = clientSideSorter('username', '', 'ascending', items)

    expect(items[0].username).toBe(undefined)
    expect(items[0].custom_id).toBe(3145)
    expect(sortKey1).toBe('username')
    expect(sortOrder1).toBe('ascending')

    const { previousKey: sortKey2, sortOrder: sortOrder2 } = clientSideSorter('username', 'username', sortOrder1, items)

    expect(items[0].username).toBe('zach')
    expect(items[0].custom_id).toBe(13445)
    expect(sortKey2).toBe('username')
    expect(sortOrder2).toBe('descending')
  })

  it('clientSideSorter(): sorts the items by first item in the array', () => {
    const items = [
      {
        custom_id: 1234,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        usernames: ['henry', 'jacob'],
      }, {
        custom_id: 145,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        usernames: ['bobby', 'jones'],
      }, {
        custom_id: 13445,
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        usernames: ['zach', 'hondo'],
      },
    ]

    const { previousKey: sortKey1, sortOrder: sortOrder1 } = clientSideSorter('usernames', '', 'ascending', items)

    expect(items[0].usernames[0]).toBe('bobby')
    expect(items[0].custom_id).toBe(145)
    expect(sortKey1).toBe('usernames')
    expect(sortOrder1).toBe('ascending')

    const { previousKey: sortKey2, sortOrder: sortOrder2 } = clientSideSorter('usernames', 'usernames', sortOrder1, items)

    expect(items[0].usernames[0]).toBe('zach')
    expect(items[0].custom_id).toBe(13445)
    expect(sortKey2).toBe('usernames')
    expect(sortOrder2).toBe('descending')
  })

  it('clientSideSorter(): sorts the items by first item in the array - number', () => {
    const items = [
      {
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
        favoriteNumbers: [1234, 2],
      }, {
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
        favoriteNumbers: [145],
      }, {
        id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
        favoriteNumbers: [-1],
      },
    ]

    const { previousKey: sortKey1, sortOrder: sortOrder1 } =
      clientSideSorter('favoriteNumbers', '', 'ascending', items)

    expect(items.map(i => ({ favoriteNumbers: i.favoriteNumbers }))).toEqual([
      { favoriteNumbers: [-1] },
      { favoriteNumbers: [145] },
      { favoriteNumbers: [1234, 2] },
    ])
    expect(sortKey1).toBe('favoriteNumbers')
    expect(sortOrder1).toBe('ascending')

    const { previousKey: sortKey2, sortOrder: sortOrder2 } =
      clientSideSorter('favoriteNumbers', 'favoriteNumbers', sortOrder1, items)

    expect(items.map(i => ({ favoriteNumbers: i.favoriteNumbers }))).toEqual([
      { favoriteNumbers: [1234, 2] },
      { favoriteNumbers: [145] },
      { favoriteNumbers: [-1] },
    ])
    expect(sortKey2).toBe('favoriteNumbers')
    expect(sortOrder2).toBe('descending')
  })
})

describe('stripRequiredLabel(): ', () => {
  it('does not change non-required fields', () => {
    const label = 'Name**'
    const result = stripRequiredLabel(label, false)

    expect(result).toBe(label)
  })

  it('correctly modifies required fields with space', () => {
    const label = 'Name *'
    const expected = 'Name'
    const result = stripRequiredLabel(label, true)

    expect(result).toBe(expected)
  })

  it('correctly modifies required fields with no space', () => {
    const label = 'Name*'
    const expected = 'Name'
    const result = stripRequiredLabel(label, true)

    expect(result).toBe(expected)
  })
})
