<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTreeList"
  >
    <div class="ktreelist-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A12779&mode=dev&t=sqzAn4PCrvEoYpdz-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="item">
        <KTreeList :items="items" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disableDrag">
        <KTreeList
          disable-drag
          :items="items"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxDepth">
        <KTreeList
          :items="items"
          :max-depth="4"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="width">
        <KTreeList
          :items="items"
          width="300"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideIcons">
        <KTreeList
          hide-icons
          :items="items"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="item-icon">
        <KTreeList :items="items">
          <template #item-icon="{ item }">
            <InboxIcon v-if="item.id.includes('folder')" />
          </template>
        </KTreeList>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="item-label">
        <KTreeList :items="items">
          <template #item-label="{ item }">
            <span v-if="item.id.includes('folder')">
              <strong>{{ item.name }}</strong>
            </span>
            <span v-else>
              {{ item.name }}
            </span>
          </template>
        </KTreeList>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { TreeListItem } from '@/types'
import { InboxIcon } from '@kong/icons'

const items = ref<TreeListItem[]>([
  {
    name: 'Components',
    id: 'components-folder',
    children: [
      {
        name: 'ProfileCard.vue',
        id: 'profile-card',
      },
    ],
  },
  {
    name: 'Pages',
    id: 'pages-folder',
    children: [
      {
        name: 'Home.vue',
        id: 'home',
      },
      {
        name: 'User',
        id: 'user-folder',
        children: [
          {
            name: 'UserList.vue',
            id: 'user-list',
          },
          {
            name: 'UserDetail.vue',
            id: 'user-detail',
          },
          {
            name: 'Settings',
            id: 'settings-folder',
          },
        ],
      },
    ],
  },
  {
    name: 'Types',
    id: 'types-folder',
    children: [{
      name: 'user.d.ts',
      id: 'user-types',
    }],
  },
])
</script>
