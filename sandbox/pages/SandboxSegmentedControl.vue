<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSegmentedControl"
  >
    <div class="ksegmentedcontrol-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1244%3A14989&mode=dev">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="options">
        <KSegmentedControl
          v-model="vModel"
          :options="items"
        />
        <KSegmentedControl
          v-model="vModel"
          :options="[
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
          ]"
        />
        <KSegmentedControl
          v-model="vModel"
          :options="[
            { label: 'Item 1', value: 'item1' },
          ]"
        />
        <KSegmentedControl
          v-model="vModel"
          :options="[
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
            { label: 'Item 3', value: 'item3' },
            { label: 'Item 4', value: 'item4' },
          ]"
        />
        <KSegmentedControl
          v-model="vModel"
          :options="[
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
            { label: 'Item 3', value: 'item3' },
            { label: 'Item 4', value: 'item4' },
            { label: 'Item 5', value: 'item5' },
            { label: 'Item 6', value: 'item6' },
            { label: 'Item 7', value: 'item7' },
            { label: 'Item 8', value: 'item8' },
            { label: 'Item 9', value: 'item9' },
            { label: 'Item 10', value: 'item10' },
          ]"
        />
        <KSegmentedControl
          v-model="vModel"
          :options="[
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
            { label: 'Item 3', value: 'item3' },
            { label: 'Item 4', value: 'item4' },
            { label: 'Item 5', value: 'item5' },
            { label: 'Item 6', value: 'item6' },
            { label: 'Item 7', value: 'item7' },
            { label: 'Item 8', value: 'item8' },
            { label: 'Item 9', value: 'item9' },
            { label: 'Item 10', value: 'item10' },
            { label: 'Item 11', value: 'item11' },
            { label: 'Item 12', value: 'item12' },
            { label: 'Item 13', value: 'item13' },
            { label: 'Item 14', value: 'item14' },
            { label: 'Item 15', value: 'item15' },
            { label: 'Item 16', value: 'item16' },
            { label: 'Item 17', value: 'item17' },
            { label: 'Item 18', value: 'item18' },
          ]"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="size">
        <KSegmentedControl
          v-model="vModel"
          :options="items"
          size="large"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabled">
        <KSegmentedControl
          v-model="vModel"
          disabled
          :options="items"
        />
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="option-label">
        <KSegmentedControl
          v-model="vModel"
          :options="items"
        >
          <template #option-label="{ option }">
            <KongIcon />
            Option {{ option.label }}
          </template>
        </KSegmentedControl>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject, ref } from 'vue'
import { KongIcon } from '@kong/icons'

const vModel = ref('item1')

const items = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3', disabled: true },
]
</script>
