<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTreeList"
  >
    <div class="ktreelist-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="item">
        <KTreeList :items="items1" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disableDrag">
        <KTreeList
          disable-drag
          :items="items2"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxDepth">
        <KTreeList
          :items="items3"
          :max-depth="4"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="width">
        <KTreeList
          :items="items4"
          width="300"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideIcons">
        <KTreeList
          hide-icons
          :items="items5"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="item-icon">
        <KTreeList :items="items6">
          <template #item-icon="{ item }">
            <InboxIcon
              v-if="item.id.includes('folder')"
              :color="item.selected ? KUI_COLOR_TEXT_DECORATIVE_PURPLE : KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG"
            />
          </template>
        </KTreeList>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="item-label">
        <KTreeList :items="items7">
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
import { KUI_COLOR_TEXT_DECORATIVE_PURPLE, KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG } from '@kong/design-tokens'

const defaultItems = [
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
]

const items1 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items2 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items3 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items4 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items5 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items6 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items7 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
</script>
