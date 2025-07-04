<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSelect"
  >
    <div class="kselect-sandbox">
      <!-- Examples -->
      <SandboxTitleComponent
        is-subtitle
        title="Examples"
      />
      <SandboxSectionComponent title="async items">
        <KSelect
          v-model="asyncItemsModel"
          clearable
          enable-filtering
          enable-item-creation
          :items="asyncItems"
          :loading="asyncItemsLoading"
          @item-added="handeAsyncItemAdded"
          @item-removed="handeAsyncItemRemoved"
          @query-change="asyncQueryChange"
        >
          <template #loading>
            Loading...
          </template>
        </KSelect>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent
        title="items"
      >
        <KSelect :items="selectItems" />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="label"
      >
        <KSelect
          :items="selectItems"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="labelAttributes"
      >
        <KSelect
          :items="selectItems"
          label="Label"
          :label-attributes="{ info: 'I use KLabels `info` prop.' }"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="clearable"
      >
        <KSelect
          clearable
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="help"
      >
        <KSelect
          help="Help text."
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="error"
      >
        <KSelect
          error
          help="Help text."
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="width"
      >
        <KSelect
          :items="selectItems"
          width="700"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownMaxHeight"
      >
        <KSelect
          dropdown-max-height="100"
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
        <KSelect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterTextPosition"
      >
        <KSelect
          dropdown-footer-text="You've reached the bottom."
          dropdown-footer-text-position="static"
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableFiltering"
      >
        <KSelect
          enable-filtering
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="reuseItemTemplate">
        <KSelect
          :items="selectItems"
          reuse-item-template
        >
          <template #item-template="{ item }">
            <div class="custom-selected-item-container">
              <div class="title">
                <KongIcon />
                {{ item?.label }}
              </div>
              <KBadge v-if="item.label.toLocaleLowerCase() === 'cats' || item.label.toLocaleLowerCase() === 'dogs'">
                {{ item.label.toLocaleLowerCase() === 'cats' ? 'Feline' : 'Canine' }}
              </KBadge>
            </div>
          </template>
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableItemCreation & itemCreationValidator"
      >
        <KSelect
          enable-filtering
          enable-item-creation
          :items="selectItems"
        />
        <KSelect
          enable-filtering
          enable-item-creation
          :item-creation-validator="itemCreationValidator"
          :items="selectItems"
          @query-change="onItemCreationQueryChange"
        >
          <template
            v-if="showNewItemValidationError"
            #dropdown-footer-text
          >
            <span class="item-creation-validation-error-message">New item should be at least 3 characters long.</span>
          </template>
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="required"
      >
        <KSelect
          :items="selectItems"
          label="Label"
          required
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="disabled"
      >
        <KSelect
          disabled
          :items="selectItems"
          label="Disabled"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="readonly"
      >
        <KSelect
          :items="selectItems"
          label="Readonly"
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
        <KSelect
          :items="selectItems"
          label="Label"
        >
          <template #label-tooltip>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="before"
      >
        <KSelect :items="selectItems">
          <template #before>
            <KongIcon />
          </template>
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="itemTemplate">
        <KSelect
          :items="selectItems"
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
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="selectedItemTemplate"
      >
        <KSelect
          clearable
          enable-filtering
          :items="selectItems"
        >
          <template #selected-item-template="{ item }">
            <div class="custom-selected-item-container">
              <div class="title">
                <KongIcon />
                {{ item?.label }}
              </div>
              <KBadge v-if="item?.label.toLocaleLowerCase() === 'cats' || item?.label.toLocaleLowerCase() === 'dogs'">
                {{ item?.label.toLocaleLowerCase() === 'cats' ? 'Feline' : 'Canine' }}
              </KBadge>
            </div>
          </template>
        </KSelect>
        <p>Truncation of long content is NOT handled by the component.</p>
        <KSelect
          clearable
          help="Help text."
          :items="selectItems"
          label="Label"
          width="300"
        >
          <template #selected-item-template="{ item }">
            <KongIcon />
            <span class="long-item-title">{{ item?.label }} with very long names tend to be more than one line. In this case the text should hopefully get truncated.</span>
          </template>
        </KSelect>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
        <KSelect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="selectItems"
        >
          <template #dropdown-footer-text>
            I am slotted.
          </template>
        </KSelect>
      </SandboxSectionComponent>

      <!-- Events -->
      <SandboxTitleComponent
        is-subtitle
        title="Events"
      />
      <SandboxSectionComponent>
        <div class="horizontal-spacing">
          <KSelect
            v-model="vModel"
            :items="selectItems"
            label="v-model"
          />
          <KButton
            size="large"
            @click="vModel = 'dogs'"
          >
            Select dogs
          </KButton>
        </div>
        <KSelect
          :items="selectItems"
          label="@selected"
          @selected="onSelected"
        />
        <KSelect
          :items="selectItems"
          label="@input"
          @input="onInput"
        />
        <KSelect
          :items="selectItems"
          label="@change"
          @change="onChange"
        />
        <KSelect
          enable-filtering
          :items="selectItems"
          label="@query-change"
          @query-change="onQueryChange"
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'
import type { SelectItem } from '@/types'

const selectItems: SelectItem[] = [
  {
    label: 'Salmon',
    value: 'salmon',
    group: 'Fish',
  },
  {
    label: 'Cats',
    value: 'cats',
    selected: true,
  },
  {
    label: 'Dogs',
    value: 'dogs',
  },
  {
    label: 'Bunnies',
    value: 'bunnies',
    disabled: true,
  },
  {
    label: 'Duck',
    value: 'duck',
    group: 'Birds',
  },
  {
    label: 'Trout',
    value: 'trout',
    group: 'Fish',
  },
  {
    label: 'Oriole',
    value: 'oriole',
    group: 'Birds',
  },
]

const vModel = ref<string>('cats')

const onSelected = (item: SelectItem): void => {
  console.log('@selected', '\n', item)
}

const onInput = (value: string | number | null): void => {
  console.log('@input', '\n', value)
}

const onChange = (item: SelectItem | null): void => {
  console.log('@change', '\n', item)
}

const onQueryChange = (query: string): void => {
  console.log('@query-change', '\n', query)
}

const selectItemsInitial = ref<SelectItem[]>([{
  label: 'Cats',
  value: 'cats',
}, {
  label: 'Dogs',
  value: 'dogs',
}, {
  label: 'Bunnies',
  value: 'bunnies',
  disabled: true,
}, {
  label: 'Duck',
  value: 'duck',
  group: 'Birds',
}, {
  label: 'Oriole',
  value: 'oriole',
  group: 'Birds',
}, {
  label: 'Trout',
  value: 'trout',
  group: 'Fish',
}, {
  label: 'Salmon',
  value: 'salmon',
  group: 'Fish',
}])
const asyncItemsQuery = ref<string>('')
const asyncItemsLoading = ref<boolean>(false)
const asyncItemsModel = ref<string>('')
const asyncItems = ref<SelectItem[]>([])

const setAsyncItems = (): void => {
  asyncItemsLoading.value = true

  setTimeout(() => {
    const aItems = JSON.parse(JSON.stringify(selectItemsInitial.value))
    asyncItems.value = asyncItemsQuery.value ? aItems.filter((item: SelectItem) => item.label?.toLowerCase().includes(asyncItemsQuery.value?.toLowerCase())) : aItems

    asyncItemsLoading.value = false
  }, 2000)
}

const asyncQueryChange = (query: string): void => {
  if (asyncItemsQuery.value !== query) {
    asyncItemsQuery.value = query
    setAsyncItems()
  }
}

const handeAsyncItemAdded = (item: SelectItem): void => {
  selectItemsInitial.value.push(item)
}

const handeAsyncItemRemoved = (item: SelectItem): void => {
  selectItemsInitial.value = selectItemsInitial.value.filter(i => i.value !== item.value)
}

const showNewItemValidationError = ref<boolean>(false)
const itemCreationValidator = (value: string) => value.length >= 3

const onItemCreationQueryChange = (query: string): void => {
  showNewItemValidationError.value = query ? !itemCreationValidator(query) : false
}

onMounted(() => {
  setAsyncItems()
})
</script>

<style lang="scss" scoped>
.kselect-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }

  .long-item-title {
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

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

  .custom-selected-item-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .title {
      display: flex;
      gap: $kui-space-30;
    }
  }

  .item-creation-validation-error-message {
    color: $kui-color-text-danger;
  }
}
</style>
