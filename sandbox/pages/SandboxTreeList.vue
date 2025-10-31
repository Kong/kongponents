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
      <SandboxSectionComponent title="group">
        <KComponent
          v-slot="{ data }"
          :data="{ grouping: true }"
        >
          <KInputSwitch
            v-model="data.grouping"
            :label="data.grouping ? 'Different groups' : 'Same group'"
          />
          <div class="groups-example">
            <KTreeList :items="items2" />
            <KTreeList
              :group="data.grouping ? 'i-stand-alone' : undefined"
              :items="items3"
            />
          </div>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disableDrag">
        <KComponent
          v-slot="{ data }"
          :data="{ allowDragging: false }"
        >
          <KInputSwitch
            v-model="data.allowDragging"
            label="Allow dragging"
          />
          <KTreeList
            :disable-drag="!data.allowDragging"
            :items="items4"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="ignoreDragSelectors">
        <KTreeList
          ignore-drag-selectors=".internal-button"
          :items="items12"
        >
          <template #item-label="{ item }">
            <KButton
              appearance="secondary"
              class="internal-button"
              size="small"
            >
              {{ item.name }}
            </KButton>
          </template>
        </KTreeList>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxDepth">
        <KTreeList
          :items="items5"
          :max-depth="4"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="width">
        <KTreeList
          :items="items6"
          width="300"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hideIcons">
        <KTreeList
          hide-icons
          :items="items7"
        />
      </SandboxSectionComponent>

      <SandboxSectionComponent title="collapsible">
        <KInputSwitch
          v-model="toggleItems"
          :label="toggleItems ? 'Collapse All' : 'Expand All'"
        />

        <KTreeList
          ref="k-tree-ref"
          :collapsible="true"
          :items="items10"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="initialCollapseAll">
        <KTreeList
          :collapsible="true"
          :initial-collapse-all="true"
          :items="items11"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="item-icon">
        <KTreeList :items="items8">
          <template #item-icon="{ item }">
            <InboxIcon
              v-if="item.id.includes('folder')"
              :color="item.selected ? KUI_COLOR_TEXT_DECORATIVE_PURPLE : KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG"
            />
          </template>
        </KTreeList>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="item-label">
        <KTreeList :items="items9">
          <template #item-label="{ item }">
            <div class="slotted-item-container">
              <span v-if="item.id.includes('folder')">
                <strong>{{ item.name }}</strong>
              </span>
              <span v-else>
                {{ item.name }}
              </span>

              <KDropdown :kpop-attributes="{ placement: 'bottom-end' }">
                <KButton
                  appearance="tertiary"
                  icon
                  size="small"
                >
                  <MoreIcon />
                </KButton>

                <template #items>
                  <KDropdownItem>
                    Edit
                  </KDropdownItem>
                  <KDropdownItem
                    danger
                    has-divider
                  >
                    Delete
                  </KDropdownItem>
                </template>
              </KDropdown>
            </div>
          </template>
        </KTreeList>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref, watch, useTemplateRef } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { TreeListItem } from '@/types'
import { InboxIcon, MoreIcon } from '@kong/icons'
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
const items8 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items9 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items10 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items11 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))
const items12 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(defaultItems)))

const toggleItems = ref<boolean>(true)
const kTreeRef = useTemplateRef('k-tree-ref')

watch(toggleItems, (val, oldVal) => {
  if (val !== oldVal) {
    if (val) {
      kTreeRef.value?.expandAll()
    } else {
      kTreeRef.value?.collapseAll()
    }
  }
})
</script>

<style lang="scss" scoped>
.groups-example {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;

  @media (min-width: $kui-breakpoint-mobile) {
    flex-direction: row;
  }
}

.slotted-item-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
