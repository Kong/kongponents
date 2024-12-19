<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTableData + SWRV beta"
  >
    <div class="horizontal-container">
      <KInput v-model="query" />
      <KButton @click="deleteZach()">
        Delete Zach (revalidate)
      </KButton>
      <KButton @click="deleteZach(false)">
        Delete Zach (no revalidate)
      </KButton>
      <KButton @click="show = !show">
        Toggle Table
      </KButton>
    </div>
    <div class="swrv-sandbox">
      <KTableData
        v-if="show"
        cache-identifier="table"
        :fetcher="fetcher"
        :fetcher-cache-key="String(cacheKey)"
        :headers="headers"
        :search-input="query"
      />
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { TableDataFetcherParams, TableDataHeader } from '@/types'

const headers: TableDataHeader[] = [
  { key: 'actions', label: 'Row actions' },
  { key: 'name', label: 'Full Name' },
  {
    key: 'username',
    label: 'Username',
    tooltip: 'Columns with a tooltip.',
    sortable: true,
  },
  { key: 'email', label: 'Email', hidable: true },
]

const cacheKey = ref(1)

const query = ref('')
const show = ref(true)

const data: Item[] = [
  { name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com' },
  { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@example.com' },
  { name: 'Alice Johnson', username: 'alicej', email: 'alicej@example.com' },
  { name: 'Bob Brown', username: 'bobbrown', email: 'bobbrown@example.com' },
  { name: 'Charlie Davis', username: 'charlied', email: 'charlied@example.com' },
  { name: 'David Wilson', username: 'davidw', email: 'davidw@example.com' },
  { name: 'Eva Green', username: 'evagreen', email: 'evagreen@example.com' },
  { name: 'Frank Harris', username: 'frankh', email: 'frankh@example.com' },
  { name: 'Grace Lee', username: 'gracelee', email: 'gracelee@example.com' },
  { name: 'Henry King', username: 'henryk', email: 'henryk@example.com' },
  { name: 'Ivy Scott', username: 'ivyscott', email: 'ivyscott@example.com' },
  { name: 'Jack White', username: 'jackwhite', email: 'jackwhite@example.com' },
  { name: 'Karen Young', username: 'kareny', email: 'kareny@example.com' },
  { name: 'Leo Walker', username: 'leowalker', email: 'leowalker@example.com' },
  { name: 'Mia Hall', username: 'miahall', email: 'miahall@example.com' },
  { name: 'Noah Allen', username: 'noahallen', email: 'noahallen@example.com' },
  { name: 'Olivia Wright', username: 'oliviawright', email: 'oliviawright@example.com' },
  { name: 'Paul Adams', username: 'pauladams', email: 'pauladams@example.com' },
  { name: 'Quinn Baker', username: 'quinnb', email: 'quinnb@example.com' },
  { name: 'Rachel Clark', username: 'rachelc', email: 'rachelc@example.com' },
  { name: 'Sam Evans', username: 'samevans', email: 'samevans@example.com' },
  { name: 'Tina Foster', username: 'tinaf', email: 'tinaf@example.com' },
  { name: 'Uma Garcia', username: 'umag', email: 'umag@example.com' },
  { name: 'Victor Hill', username: 'victorh', email: 'victorh@example.com' },
  { name: 'Wendy Johnson', username: 'wendyj', email: 'wendyj@example.com' },
  { name: 'Xander Lee', username: 'xanderl', email: 'xanderl@example.com' },
  { name: 'Yara Martinez', username: 'yaram', email: 'yaram@example.com' },
  { name: 'Zach Nelson', username: 'zachn', email: 'zachn@example.com' },
  { name: 'Amy O\'Connor', username: 'amyo', email: 'amyo@example.com' },
  { name: 'Brian Peterson', username: 'brianp', email: 'brianp@example.com' },
  { name: 'Cathy Quinn', username: 'cathyq', email: 'cathyq@example.com' },
  { name: 'Derek Roberts', username: 'derekr', email: 'derekr@example.com' },
  { name: 'Ella Stevens', username: 'ellas', email: 'ellas@example.com' },
  { name: 'Felix Turner', username: 'felixt', email: 'felixt@example.com' },
  { name: 'Gina Underwood', username: 'ginau', email: 'ginau@example.com' },
  { name: 'Hank Vance', username: 'hankv', email: 'hankv@example.com' },
  { name: 'Iris West', username: 'irisw', email: 'irisw@example.com' },
  { name: 'Jake Young', username: 'jakey', email: 'jakey@example.com' },
  { name: 'Kara Zane', username: 'karaz', email: 'karaz@example.com' },
  { name: 'Liam Brown', username: 'liamb', email: 'liamb@example.com' },
  { name: 'Mona Clark', username: 'monac', email: 'monac@example.com' },
  { name: 'Nina Davis', username: 'ninad', email: 'ninad@example.com' },
  { name: 'Oscar Edwards', username: 'oscare', email: 'oscare@example.com' },
  { name: 'Penny Foster', username: 'pennyf', email: 'pennyf@example.com' },
  { name: 'Quincy Green', username: 'quincyg', email: 'quincyg@example.com' },
  { name: 'Rita Harris', username: 'ritah', email: 'ritah@example.com' },
  { name: 'Steve Irwin', username: 'stevei', email: 'stevei@example.com' },
  { name: 'Tara Jones', username: 'taraj', email: 'taraj@example.com' },
]

interface Item {
  name: string
  username: string
  email: string
}

async function fetcher({
  pageSize,
  page,
  query,
  sortColumnOrder, // sort by `username`
}: TableDataFetcherParams) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const start = pageSize! * (page! - 1)
  const end = start + pageSize!
  const filteredData = data.filter(({ name, username, email }: Item) => {
    const q = query?.toLowerCase() ?? ''
    return [name, username, email].some(value => value.toLowerCase().includes(q))
  })
  const sortedData = filteredData.sort((a: Item, b: Item) => {
    return sortColumnOrder === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
  })
  return {
    data: sortedData.slice(start, end),
    total: sortedData.length,
  }
}

function deleteZach(revalidate = true) {
  const index = data.findIndex((item) => item.name === 'Zach Nelson')
  if (index !== -1) {
    data.splice(index, 1)
    if (revalidate) {
      cacheKey.value++
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  gap: $kui-space-40;
  justify-content: space-between;
}
</style>
