<template>
  <div class="kmultiselect-sandbox">
    <SandboxTitleComponent
      title="KMultiselect"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1297%3A5913&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent
      title="items"
    >
      <KMultiselect
        :items="[{
          label: 'Cats',
          value: 'cats',
          selected: true
        }, {
          label: 'Dogs',
          value: 'dogs',
          disabled: true,
        }, {
          label: 'Bunnies',
          value: 'bunnies'
        }, {
          label: 'Duck',
          value: 'duck',
          group: 'Birds'
        }, {
          label: 'Oriole',
          value: 'oriole',
          group: 'Birds'
        }, {
          label: 'Trout',
          value: 'trout',
          group: 'Fish'
        }, {
          label: 'Salmon',
          value: 'salmon',
          group: 'Fish'
        }]"
      />
    </SandboxSectionComponent>

    <!-- Examples -->
    <SandboxTitleComponent title="Examples" />
    <SandboxSectionComponent title="Programmatic deselect">
      <KMultiselect
        v-model="pdSelectedItems"
        autosuggest
        collapsed-context
        :items="pdItems"
        :selected-row-count="1"
        @query-change="onQueryChange"
      />
      <pre>
    {{ pdModelJson }}
  </pre>
      <button
        type="button"
        @click="deselectItem"
      >
        Deselect Item
      </button>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KMultiselect, KExternalLink } from '@/components'

// Programmatic deselect example logic

const pdAllItems = ref(Array.from(new Array(100)).map((_, i) => ({ label: `Item ${i}`, value: `${i}` })))
const pdSelectedItems = ref(Array.from(new Array(10)).map((_, i) => `${i}`))

const pdItems = ref(pdAllItems.value.slice(0, 10))

const onQueryChange = () => {
  setTimeout(() => {
    pdItems.value = pdAllItems.value.slice(5, 20)
  }, 100)
}

const deselectItem = () => {
  pdSelectedItems.value = pdSelectedItems.value.filter((_item, idx) => idx !== 2)
}

const pdModelJson = computed(() => JSON.stringify(pdSelectedItems.value, undefined, 2))
</script>

<style lang="scss" scoped>
.kmultiselect-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
