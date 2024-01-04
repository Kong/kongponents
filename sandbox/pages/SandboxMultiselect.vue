<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KMultiselect"
  >
    <div class="kmultiselect-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent
        title="items"
      >
        <KMultiselect :items="multiselectItems" />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="label"
      >
        <KMultiselect
          :items="multiselectItems"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="labelAttributes"
      >
        <KMultiselect
          :items="multiselectItems"
          label="Label"
          :label-attributes="{ info: 'I use KLabels `info` prop.' }"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="selectedRowCount"
      >
        <KMultiselect
          :items="multiselectItemsSelected"
          :selected-row-count="2"
          width="500"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="collapsedContext"
      >
        <KMultiselect
          collapsed-context
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="help"
      >
        <KMultiselect
          help="Help text."
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="error"
      >
        <KMultiselect
          error
          :items="multiselectItems"
        />
        <KMultiselect
          collapsed-context
          error
          help="Help text turns into error text."
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="width"
      >
        <KMultiselect
          :items="multiselectItems"
          width="400"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownMaxHeight"
      >
        <KMultiselect
          dropdown-max-height="100"
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
        <KMultiselect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterTextPosition"
      >
        <KMultiselect
          dropdown-footer-text="You've reached the bottom."
          dropdown-footer-text-position="static"
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableFiltering"
      >
        <KMultiselect
          enable-filtering
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableItemCreation"
      >
        <KMultiselect
          enable-filtering
          enable-item-creation
          :items="multiselectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="required"
      >
        <KMultiselect
          :items="multiselectItems"
          label="Label"
          required
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="disabled"
      >
        <KMultiselect
          disabled
          :items="multiselectItems"
          label="Disabled"
        />
        <KMultiselect
          collapsed-context
          disabled
          :items="multiselectItems"
          label="Disabled"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="readonly"
      >
        <KMultiselect
          :items="multiselectItems"
          label="Read only"
          readonly
        />
        <KMultiselect
          collapsed-context
          :items="multiselectItems"
          label="Read only"
          readonly
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="labelTooltip"
      >
        <KMultiselect
          :items="multiselectItems"
          label="My Tooltip"
        >
          <template #label-tooltip>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
        </KMultiselect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="itemTemplate"
      >
        <KMultiselect
          :items="multiselectItems"
        >
          <template #item-template="{ item }">
            <div class="custom-item">
              <KongIcon />
              <div class="custom-item-title-container">
                <span class="custom-item-title">{{ item?.label }} {{ item.value === 'dogs' ? 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' : '' }}</span>
                <span class="custom-item-description">Some random description.</span>
              </div>
            </div>
          </template>
        </KMultiselect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
        <KMultiselect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="multiselectItems"
        >
          <template #dropdown-footer-text>
            I am slotted.
          </template>
        </KMultiselect>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty">
        <KMultiselect :items="[]">
          <template #empty>
            Empty 🤷‍♂️
          </template>
        </KMultiselect>
      </SandboxSectionComponent>

      <!-- Examples -->
      <SandboxTitleComponent
        is-subtitle
        title="Examples"
      />
      <SandboxSectionComponent title="programmatic deselect">
        <KMultiselect
          v-model="example1Selected"
          autosuggest
          collapsed-context
          :items="example1Items"
          :selected-row-count="1"
          @query-change="example1OnQueryChange"
        />
        <pre>
          {{ example1ModelJson }}
        </pre>
        <KButton
          size="small"
          @click="example1DeselectItem"
        >
          Deselect Item
        </KButton>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { MultiselectItem } from '@/types'
import { KongIcon } from '@kong/icons'

const multiselectItems: MultiselectItem[] = [{
  label: 'Service A',
  value: 'a',
  selected: true,
}, {
  label: 'Service B',
  value: 'b',
}, {
  label: 'Service F',
  value: 'f',
  disabled: true,
  selected: true,
}, {
  label: 'Service A1',
  value: 'a1',
  group: 'Series 1',
}, {
  label: 'Service B1',
  value: 'b1',
  group: 'Series 1',
  selected: true,
}, {
  label: 'Service A2',
  value: 'a2',
  group: 'Series 2',
}, {
  label: 'Service B2',
  value: 'b2',
  group: 'Series 2',
}]

const multiselectItemsSelected = JSON.parse(JSON.stringify(multiselectItems)).map((item: MultiselectItem) => {
  item.selected = true

  return item
})

// programmatic deselect example logic

const example1AllItems = ref(Array.from(new Array(100)).map((_, i) => ({ label: `Item ${i}`, value: `${i}` })))
const example1Selected = ref(Array.from(new Array(10)).map((_, i) => `${i}`))

const example1Items = ref(example1AllItems.value.slice(0, 10))

const example1OnQueryChange = () => {
  setTimeout(() => {
    example1Items.value = example1AllItems.value.slice(5, 20)
  }, 100)
}

const example1DeselectItem = () => {
  example1Selected.value = example1Selected.value.filter((_item, idx) => idx !== 2)
}

const example1ModelJson = computed(() => JSON.stringify(example1Selected.value, undefined, 2))
</script>

<style lang="scss" scoped>
.kmultiselect-sandbox {
  .custom-item {
    display: flex;
    flex-direction: row;
    gap: $kui-space-30;

    &-title-container {
      flex: 1;
    }

    &-title {
      display: block;
    }

    &-description {
      color: $kui-color-text-neutral;
      display: block;
      font-size: $kui-font-size-20;
    }
  }
}
</style>
