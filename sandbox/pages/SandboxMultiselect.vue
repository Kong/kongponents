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
        <p>Old approach with group property (alphabetical): Series 1, Series 2</p>
        <KMultiselect :items="multiselectItemsWithGroupProperty" />
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
        title="kpopAttributes"
      >
        <KMultiselect
          :items="multiselectItems"
          :kpop-attributes="{ target: 'body' }"
          label="Label"
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
        title="dropdownFooterPosition"
      >
        <KMultiselect
          dropdown-footer-position="static"
          dropdown-footer-text="You've reached the bottom."
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
        title="enableItemCreation & itemCreationValidator"
      >
        <KMultiselect
          enable-filtering
          enable-item-creation
          :items="multiselectItems"
        />
        <KMultiselect
          enable-filtering
          enable-item-creation
          :item-creation-validator="itemCreationValidator"
          :items="multiselectItems"
          @query-change="onItemCreationQueryChange"
        >
          <template
            v-if="showNewItemValidationError"
            #dropdown-footer
          >
            <span class="item-creation-validation-error-message">New item should be at least 3 characters long.</span>
          </template>
        </KMultiselect>
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
      <SandboxSectionComponent
        title="placeholder"
      >
        <KMultiselect
          :items="multiselectItemsUnselected"
          label="I have a placeholder"
          placeholder="Trigger element placeholder"
          search-placeholder="Search placeholder"
        />
        <KMultiselect
          collapsed-context
          :items="multiselectItemsUnselected"
          label="I have a placeholder (collapsedContext)"
          search-placeholder="Search placeholder"
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
        title="dropdown-footer"
      >
        <KMultiselect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="multiselectItems"
        >
          <template #dropdown-footer>
            <KButton
              appearance="tertiary"
              size="small"
              @click="onDropdownFooterAction"
            >
              <AddIcon />
              Interactive footer action
            </KButton>
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
      <SandboxSectionComponent title="itemBadgeIcon">
        <KMultiselect :items="multiselectItems">
          <template #item-badge-icon="{ item }">
            <DisabledIcon
              v-if="item.disabled"
              decorative
            />
            <KongIcon
              v-else
              decorative
            />
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
      <SandboxSectionComponent title="programmatic selection order">
        <div class="ordered-model-example">
          <div class="ordered-model-controls">
            <KMultiselect
              v-model="orderedSelection"
              :items="orderedItems"
            />
            <div class="ordered-model-actions">
              <KButton
                size="small"
                @click="randomizeOrderedSelection"
              >
                Randomize selection order
              </KButton>
              <KButton
                size="small"
                @click="insertOrderedItem"
              >
                Insert Item
              </KButton>
            </div>
          </div>
          <div>
            <strong>Current modelValue</strong>
            <pre>{{ orderedSelectionJson }}</pre>
          </div>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="Respecting siblings on resize">
        <div class="select-multiselect-row">
          <KSelect
            :items="[{
              label: 'Route 1',
              value: 'route1',
            }, {
              label: 'Route 2',
              value: 'route2',
            }]"
          />
          <KMultiselect
            :items="multiselectItems"
          />
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { MultiselectEntry, MultiselectItem } from '@/types'
import { KongIcon, DisabledIcon, AddIcon } from '@kong/icons'

const multiselectItems: MultiselectEntry[] = [
  {
    label: 'Series 2',
    items: [
      {
        label: 'Service A2',
        value: 'a2',
      },
      {
        label: 'Service B2',
        value: 'b2',
      },
    ],
  },
  {
    label: 'Series 1',
    items: [
      {
        label: 'Service B1',
        value: 'b1',
      },
      {
        label: 'Service A1',
        value: 'a1',
      },
    ],
  },
  {
    label: 'Service A (long truncated with ellipsis item)',
    value: 'a',
    selected: true,
  },
  {
    label: 'Service B',
    value: 'b',
  },
  {
    label: 'Service F',
    value: 'f',
    disabled: true,
    selected: true,
  },
]

const multiselectItemsSelected = JSON.parse(JSON.stringify(multiselectItems)).map((item: MultiselectItem) => {
  item.selected = true

  return item
})

const multiselectItemsUnselected = JSON.parse(JSON.stringify(multiselectItems)).map((item: MultiselectItem) => {
  item.selected = false

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

const orderedItems = ref<MultiselectItem[]>([
  { label: 'Name', value: 'name' },
  { label: 'Environment', value: 'env' },
  { label: 'Team', value: 'team' },
  { label: 'Region', value: 'region' },
])
const orderedSelection = ref(orderedItems.value.map(item => item.value))
const orderedSelectionJson = computed(() => JSON.stringify(orderedSelection.value, undefined, 2))
let orderedItemCount = 0

const randomizeOrderedSelection = (): void => {
  const randomizedSelection = [...orderedSelection.value].sort(() => Math.random() - 0.5)

  if (JSON.stringify(randomizedSelection) === JSON.stringify(orderedSelection.value)) {
    const firstValue = randomizedSelection.shift()

    if (firstValue) {
      randomizedSelection.push(firstValue)
    }
  }

  orderedSelection.value = randomizedSelection
}

const insertOrderedItem = (): void => {
  orderedItemCount++
  const item = { label: `Item ${orderedItemCount}`, value: `item${orderedItemCount}` }

  orderedItems.value = [
    ...orderedItems.value.slice(0, 1),
    item,
    ...orderedItems.value.slice(1),
  ]
  orderedSelection.value = [
    ...orderedSelection.value.slice(0, 1),
    item.value,
    ...orderedSelection.value.slice(1),
  ]
}

const showNewItemValidationError = ref<boolean>(false)
const itemCreationValidator = (value: string) => value.length >= 3

const onItemCreationQueryChange = (query: string): void => {
  showNewItemValidationError.value = query ? !itemCreationValidator(query) : false
}

const onDropdownFooterAction = (): void => {
  window.alert('Interactive dropdown footer action clicked!')
}

// Example using old group property approach
const multiselectItemsWithGroupProperty: MultiselectItem[] = [
  {
    label: 'Service B2',
    value: 'b2',
    group: 'Series 2',
  },
  {
    label: 'Service A (long truncated with ellipsis item)',
    value: 'a',
    selected: true,
  },
  {
    label: 'Service B',
    value: 'b',
  },
  {
    label: 'Service F',
    value: 'f',
    disabled: true,
    selected: true,
  },
  {
    label: 'Service A1',
    value: 'a1',
    group: 'Series 1',
  },
  {
    label: 'Service B1',
    value: 'b1',
    group: 'Series 1',
    selected: true,
  },
  {
    label: 'Service A2',
    value: 'a2',
    group: 'Series 2',
  },
]
</script>

<style lang="scss" scoped>
.kmultiselect-sandbox {
  .custom-item {
    display: flex;
    flex-direction: row;
    gap: var(--kui-space-30, $kui-space-30);

    &-title-container {
      flex: 1;
    }

    &-title {
      display: block;
    }

    &-description {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: block;
      font-size: var(--kui-font-size-20, $kui-font-size-20);
    }
  }

  .select-multiselect-row {
    display: flex;
    flex-direction: row;
    gap: var(--kui-space-30, $kui-space-30);
  }

  .ordered-model-example {
    align-items: flex-start;
    display: grid;
    gap: var(--kui-space-50, $kui-space-50);
    grid-template-columns: minmax(0, 1fr) minmax(180px, auto);
  }

  .ordered-model-controls {
    display: grid;
    gap: var(--kui-space-40, $kui-space-40);
  }

  .ordered-model-actions {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--kui-space-30, $kui-space-30);
  }

  .item-creation-validation-error-message {
    color: var(--kui-color-text-danger, $kui-color-text-danger);
  }
}
</style>
