<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTabs"
  >
    <div class="ktabs-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=297%3A3525&mode=dev">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="tabs">
        <KTabs
          :tabs="items"
        >
          <template #tab1>
            Tab 1 content
          </template>
          <template #tab2>
            Tab 2 content
          </template>
          <template #tab3>
            Tab 3 content
          </template>
        </KTabs>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="v-model">
        <KTabs
          v-model="vModel1"
          :tabs="items"
        >
          <template #tab1>
            Tab 1 content
          </template>
          <template #tab2>
            Tab 2 content
          </template>
          <template #tab3>
            Tab 3 content
          </template>
        </KTabs>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="hasPanels">
        <KTabs
          v-model="vModel2"
          :tabs="items"
        />
        <div v-if="vModel2 === '#tab1'">
          Tab 1 content
        </div>
        <div v-else-if="vModel2 === '#tab2'">
          Tab 2 content
        </div>
        <div v-else>
          Tab 3 content
        </div>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="anchor & panel">
        <KTabs
          :tabs="items"
        >
          <template #tab1-anchor>
            <KongIcon />
            Kong
          </template>
          <template #tab2-anchor>
            Updates
            <KBadge appearance="decorative">
              3
            </KBadge>
          </template>

          <template #tab1>
            Tab 1 content
          </template>
          <template #tab2>
            Tab 2 content
          </template>
          <template #tab3>
            Tab 3 content
          </template>
        </KTabs>
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="Dynamic router view">
        <KTabs
          :has-panels="false"
          :tabs="dynamicRouterViewItems"
        >
          <template
            v-for="item in dynamicRouterViewItems"
            :key="`${item.hash}-anchor`"
            #[`${item.hash}-anchor`]
          >
            <router-link
              :to="{
                name: item.hash.split('?').shift(),
                hash: `#${item.hash.split('?').pop()}`,
              }"
            >
              {{ item.title }}
            </router-link>
          </template>
        </KTabs>
        <router-view
          v-slot="{route}"
        >
          <h3>Router view content</h3>
          <p>{{ route.path }}{{ route.hash }}</p>
        </router-view>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'

const items = [
  { hash: '#tab1', title: 'Tab 1' },
  { hash: '#tab2', title: 'Tab 2' },
  { hash: '#tab3', title: 'Tab 3' },
  { hash: '#disabled', title: 'Disabled', disabled: true },
]

const vModel1 = ref<string>('#tab2')
const vModel2 = ref<string>('#tab2')

const dynamicRouterViewItems = [
  {
    title: 'One',
    hash: 'tabs?one',
  },
  {
    title: 'Two',
    hash: 'tabs?two',
  },
]
</script>
