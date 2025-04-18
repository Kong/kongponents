<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTabs"
  >
    <div class="ktabs-sandbox">
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
            <div>
              Tab 1 content
            </div>
            <br>
            <KButton size="small">
              Dummy button
            </KButton>
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
      <SandboxSectionComponent title="hidePanels">
        <KTabs
          v-model="vModel2"
          hide-panels
          :tabs="items"
        >
          <template #tab1>
            Tab 1 panel
          </template>
        </KTabs>
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
      <SandboxSectionComponent title="beforeChange">
        <KTabs
          :before-change="onBeforeTabChange"
          :model-value="confirmedTab"
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

        <KPrompt
          message="Notice that the tab doesn't change until you've confirmed your action."
          :visible="confirmPromptVisible"
          @cancel="onCancel"
          @proceed="onConfirm"
        />
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
          <template #disabled-anchor>
            <KTooltip text="This tab item is disabled.">
              <div>Disabled</div>
            </KTooltip>
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
      <SandboxSectionComponent title="Dynamic router view without panels">
        <KTabs
          hide-panels
          :tabs="dynamicRouterViewItems"
          @change="(hash: string) => $router.replace({ hash })"
        />
        <router-view v-slot="{ route }">
          <p>{{ route.path }}{{ route.hash }}</p>
        </router-view>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Dynamic router view with panels">
        <KTabs
          v-model="$route.hash"
          :tabs="items"
          @change="(hash: string) => $router.replace({ hash })"
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
const confirmedTab = ref<string>('#tab1')

const dynamicRouterViewItems = [
  {
    title: 'One',
    hash: '#one',
    to: { hash: '#one' },
  },
  {
    title: 'Two',
    hash: '#two',
    to: { hash: '#two' },
  },
]

const confirmPromptVisible = ref<boolean>(false)
const targetTab = ref<string | null>(null)
const onBeforeTabChange = async (tab: string) => {
  confirmPromptVisible.value = true
  targetTab.value = tab

  return false
}
const onConfirm = () => {
  confirmPromptVisible.value = false
  confirmedTab.value = targetTab.value!
  targetTab.value = null
}
const onCancel = () => {
  confirmPromptVisible.value = false
  targetTab.value = null
}
</script>
