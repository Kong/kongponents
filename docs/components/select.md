# Select

KSelect is custom component alternative for native `<select>` element.

<ClientOnly>
  <KSelect :items="selectItems" />
</ClientOnly>

```html
<KSelect :items="selectItems" />
```

## Props

### v-model

Use `v-model` for two-way value binding.

<div class="spacing-container">
  <span>Selected service: {{ vModel || 'none' }}</span>

  <ClientOnly>
    <KSelect
      v-model="vModel"
      :items="selectItemsUnselected"
    />
  </ClientOnly>
</div>

```html
Selected service: {{ selectValue || 'none' }}

<KSelect
  v-model="selectValue"
  :items="selectItems"
/>
```

### items

Prop for providing select item options. Supports grouping items under one group name through providing optional `group` property.

```ts
interface SelectItem {
  label: string
  value: string | number
  key?: string // optional parameter that will be appended with `-selected` when selected
  selected?: boolean
  disabled?: boolean
  group?: string
}
```

<ClientOnly>
  <KSelect :items="[{
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
  }, {
    label: 'Service A1',
    value: 'a1',
    group: 'Series 1',
  }, {
    label: 'Service B1',
    value: 'b1',
    group: 'Series 1',
  }, {
    label: 'Service A2',
    value: 'a2',
    group: 'Series 2',
  }, {
    label: 'Service B2',
    value: 'b2',
    group: 'Series 2',
  }]" />
</ClientOnly>

```html
<KSelect :items="[{
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
}, {
  label: 'Service A1',
  value: 'a1',
  group: 'Series 1',
}, {
  label: 'Service B1',
  value: 'b1',
  group: 'Series 1',
}, {
  label: 'Service A2',
  value: 'a2',
  group: 'Series 2',
}, {
  label: 'Service B2',
  value: 'b2',
  group: 'Series 2',
}]" />
```

### label

Label associated with the input element.

<ClientOnly>
  <KSelect label="Label" :items="selectItems" />
</ClientOnly>

```html
<KSelect label="Label" :items="selectItems" />
```

### labelAttributes

Label attributes to be passed to underlying [KLabel component](/components/label#props).

<ClientOnly>
  <KSelect :label-attributes="{ info: 'I use the KLabel `info` prop' }" label="Label" :items="selectItems" />
</ClientOnly>

```html
<KSelect :label-attributes="{ info: 'I use the KLabel `info` prop' }" label="Label" :items="selectItems" />
```

### placeholder

Placeholder to be displayed when no item is selected.

<ClientOnly>
  <KSelect placeholder="Select service" :items="selectItemsUnselected" />
</ClientOnly>

```html
<KSelect placeholder="Select service" :items="selectItems" />
```

### clearable

When set to `true`, the clear icon will be displayed in front of selected item.

<ClientOnly>
  <KSelect clearable :items="selectItems" />
</ClientOnly>

```html
<KSelect clearable :items="selectItems" />
```

### help

Help text to be displayed below the select element.

<ClientOnly>
  <KSelect help="Helpful text." :items="selectItems" />
</ClientOnly>

```html
<KSelect help="Helpful text." :items="selectItems" />
```

### error

When set to `true`, error styling will apply.

<ClientOnly>
  <KSelect error help="You can use `help` prop for displaying error messages." :items="selectItems" />
</ClientOnly>

```html
<KSelect error help="You can use `help` prop for displaying error messages." :items="selectItems" />
```

### width

Use this prop to limit element's width.

<ClientOnly>
  <KSelect width="200" :items="selectItems" />
</ClientOnly>

```html
<KSelect width="200" :items="selectItems" />
```

### dropdownMaxHeight

Maximum height for dropdown container. Defaults to `300px`.

<ClientOnly>
  <KSelect dropdown-max-height="300" :items="selectItems" />
</ClientOnly>

```html
<KSelect dropdown-max-height="300" :items="selectItems" />
```

### dropdownFooterText

Text to be displayed at the bottom of the dropdown container. Can also be [slotted](#dropdown-footer-text).

<ClientOnly>
  <KSelect dropdown-footer-text="Helpful text in the dropdown." :items="selectItems" />
</ClientOnly>

```html
<KSelect dropdown-footer-text="Helpful text in the dropdown." :items="selectItems" />
```

### dropdownFooterTextPosition

Defaults to `sticky`, but also accepts `static` value should you want text passed through `dropdownFooterText` prop to be displayed at the bottom of dropdown container after all items.

<ClientOnly>
  <KSelect dropdown-footer-text-position="static" dropdown-footer-text="Helpful text in the dropdown." :items="selectItems" />
</ClientOnly>

```html
<KSelect dropdown-footer-text-position="static" dropdown-footer-text="Helpful text in the dropdown." :items="selectItems" />
```

### enableFiltering

By default, items passed to KSelect are not searchable. When `enableFiltering` prop is true, clicking on the select element will turn it into input field. You may filter items by typing in the input which will hide non-matching items.

<ClientOnly>
  <KSelect enable-filtering placeholder="Try searching for 'service a'" :items="selectItemsUnselected" />
</ClientOnly>

```html
<KSelect enable-filtering placeholder="Try searching for 'service a'" :items="selectItems" />
```

### filterFunction

A custom function to perform item filtering. Expects an object with query string and items to filter through. To keep track of user input you can listen to [`@query-change` event](#query-change).

```ts
interface SelectFilterFunctionParams {
  query: string
  items: SelectItem[]
}
```

:::tip TIP
When using `filterFunction` prop in conjunction with `enableItemCreation` set to `true` you must keep track of added and removed custom items to be able to provide the most up to date items to `filterFunction`. To achieve that you want to utilize [`@item-added`](#item-added) and [`@item-removed`](#item-added) events.
:::

<ClientOnly>
  <KSelect enable-filtering :filter-function="envFilter" placeholder="Try searching for 'dev' or 'prod'" :items="selectItemsUnselectedEnv">
    <template #item-template="{ item }">
      {{ item?.label }}
      <KBadge v-if="item.env">{{ item.env }}</KBadge>
    </template>
  </KSelect>
</ClientOnly>

```vue
<template>
  <KSelect enable-filtering :filter-function="envFilter" placeholder="Try searching for 'dev' or 'prod'" :items="selectItems">
    <template #item-template="{ item }">
      {{ item?.label }}
      <KBadge v-if="item.env">{{ item.env }}</KBadge>
    </template>
  </KSelect>
</template>

<script setup lang="ts">
import type { SelectItem, SelectFilterFunctionParams } from '@kong/kongponents'

const selectItems: SelectItem[] = [{
  label: 'Service A',
  value: 'a',
}, {
  label: 'Service B',
  value: 'b',
  env: 'dev',
}, {
  label: 'Service F',
  value: 'f',
  disabled: true,
}, {
  label: 'Service A1',
  value: 'a1',
  group: 'Series 1',
}, {
  label: 'Service B1',
  value: 'b1',
  group: 'Series 1',
}, {
  label: 'Service A2',
  value: 'a2',
  group: 'Series 2',
  env: 'prod',
}, {
  label: 'Service B2',
  value: 'b2',
  group: 'Series 2',
  env: 'prod',
}]

const envFilter = (params: SelectFilterFunctionParams) => 
  params?.items?.filter((item: SelectItem) => 
  item.label?.toLowerCase().includes(params.query?.toLowerCase())
    || item.env?.includes(params.query?.toLowerCase()))
</script>
```

:::tip TIP
Should you need to disable the default filter function while still allowing filtering (for example when you want to handle filtering asynchronously by querying an API), you can provide a function that always returns boolean `true` to this prop, like so: 

```html
<KSelect
  enable-filtering
  :filter-function="() => true"
  :items="selectItems"
/>
```
:::

### reuseItemTemplate

Reuse the same display format provided via the [`item-template` slot](#itemtemplate) for the selected item.

<ClientOnly>
  <KSelect
    :items="selectItems"
    reuse-item-template
  >
    <template #item-template="{ item }">
      <KongIcon />
      {{ item?.label }}
    </template>
  </KSelect>
</ClientOnly>

```html
<KSelect
  :items="selectItems"
  reuse-item-template
>
  <template #item-template="{ item }">
    <KongIcon />
    {{ item?.label }}
  </template>
</KSelect>
```

### enableItemCreation

KSelect can offer users the ability to add custom items to the list by typing the item they want to and then **clicking the** `... (Add new value)` **item at the bottom of the list**, which will also automatically select it.

Newly created items will have a `label` consisting of the user input and a randomly generated id for the `value` to ensure uniqueness. The item will also have an attribute `custom` set to `true`. This action triggers an `item-added` event containing the added item data.

Deselecting the item will completely remove it from the list and underlying data, and trigger a `item-removed` event containing the removed item's data.

:::tip NOTE
You cannot add an item if the `label` matches the `label` of a pre-existing item. In that scenario the `... (Add new value)` item will not be displayed.
:::

<ClientOnly>
  <KSelect enable-item-creation enable-filtering placeholder="Try searching for 'service d'" :items="selectItemsUnselected" />
</ClientOnly>

```html
<KSelect enable-item-creation enable-filtering placeholder="Try searching for 'service d'" :items="selectItems" />
```

### itemCreationValidator

Prop for passing a function for input validation when item creation is enabled.

The function takes the query input string as a single parameter and must return a `boolean` value.

When the function passed through `itemCreationValidator` returns `false`, the "Add new value" button will be disabled.

<KSelect
  enable-filtering
  enable-item-creation
  :item-creation-validator="itemCreationValidator"
  :items="selectItemsUnselected"
  @query-change="onItemCreationQueryChange"
>
  <template
    v-if="showNewItemValidationError"
    #dropdown-footer-text
  >
    <span class="item-creation-validation-error-message">
      New item should be at least 3 characters long.
    </span>
  </template>
</KSelect>

```vue
<template>
  <KSelect
    enable-filtering
    enable-item-creation
    :item-creation-validator="itemCreationValidator"
    :items="selectItems"
    @query-change="onQueryChange"
  >
    <template
      v-if="showNewItemValidationError"
      #dropdown-footer-text
    >
      <span class="item-creation-validation-error-message">
        New item should be at least 3 characters long.
      </span>
    </template>
  </KSelect>
</template>

<script setup lang="ts">
import type { SelectItem } from '@kong/kongponents'

const selectItems: SelectItem[] = [...]

const showNewItemValidationError = ref<boolean>(false)
const itemCreationValidator = (value: string) => value.length >= 3

const onQueryChange = (query: string): void => {
  showNewItemValidationError.value = query ? !itemCreationValidator(query) : false
}
</script>

<style lang="scss" scoped>
.item-creation-validation-error-message {
  color: $kui-color-text-danger;
}
</style>
```

### loading

Pass `true` to display loader instead of items in the dropdown. KSelect's `item` prop is reactive to changes by design, so that should you need to perform async item fetching/filtering you can execute that logic within the host app and pass items back to KSelect. 

The example below utilizes the [`@query-change` event](#query-change) to simulate async item fetching behind the scenes.

<div class="spacing-container">
  <span>Selected service: {{ asyncItemsModel || 'none' }}</span>

  <ClientOnly>
    <KSelect
      v-model="asyncItemsModel"
      enable-filtering
      :items="asyncItems"
      :loading="asyncItemsLoading"
      @query-change="onAsyncQueryChange"
    />
  </ClientOnly>
</div>

```vue
<template>
  <KSelect
    v-model="asyncItemsModel"
    enable-filtering
    :items="asyncItems"
    :loading="asyncItemsLoading"
    @query-change="onAsyncQueryChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectItem } from '@kong/kongponents'

const asyncItems: SelectItem[] = [{
  label: 'Service A',
  value: 'a',
}, {
  label: 'Service B',
  value: 'b',
}, {
  label: 'Service F',
  value: 'f',
  disabled: true,
}, ...]
const asyncItemsInitial: SelectItem[] = JSON.parse(JSON.stringify(asyncItems.value))

const asyncItemsModel = ref<string>('')
const asyncItemsQuery = ref<string>('')
const asyncItemsLoading = ref<boolean>(false)

const onAsyncQueryChange = (query: string): void => {
  if (asyncItemsQuery.value !== query) {
    asyncItemsQuery.value = query

    fetchAsyncItems()
  }
}

const fetchAsyncItems = (): void => {
  asyncItemsLoading.value = true

  setTimeout(() => {
    // normally we would perform api fetching here
    // but for the sake of this example let's just filter items locally with some timeout
    const items = JSON.parse(JSON.stringify(asyncItemsInitial))
    asyncItems.value = items.filter((item: SelectItem) => item.label?.toLowerCase().includes(asyncItemsQuery.value?.toLowerCase()))

    asyncItemsLoading.value = false
  }, 2000)
}
</script>
```

### kpopAttributes

Attributes to be passed to underlying KPopover component. See [KPopover's props](/components/popover#props) for more info.

### HTML Attributes

#### required

KSelect will display a red dot next to label when `required` attribute is passed.

<ClientOnly>
  <KSelect
    label="Label"
    required
    :items="selectItems"
  />
</ClientOnly>

```html
<KSelect
  label="Label"
  required
  :items="selectItems"
/>
```

#### disabled

Use this attribute to disable interaction with the element.

<ClientOnly>
  <KSelect
    label="Disabled"
    disabled
    :items="selectItems"
  />
</ClientOnly>

```html
<KSelect
  label="Disabled"
  disabled
  :items="selectItems"
/>
```

## Slots

### item-template

Use this slot to pass custom content to the items. The slot exposes `item` slot prop.

<ClientOnly>
  <KSelect :items="selectItems">
    <template #item-template="{ item }">
      <div class="custom-item">
        <KongIcon />
        <div class="custom-item-title-container">
          <span class="custom-item-title">{{ item?.label }}</span>
          <span class="custom-item-description">{{ item?.label }} description.</span>
        </div>
      </div>
    </template>
  </KSelect>
</ClientOnly>

```vue
<template>
  <KSelect :items="selectItems">
    <template #item-template="{ item }">
      <div class="custom-item">
        <KongIcon />
        <div class="custom-item-title-container">
          <span class="custom-item-title">{{ item?.label }}</span>
          <span class="custom-item-description">{{ item?.label }} description.</span>
        </div>
      </div>
    </template>
  </KSelect>
</template>

<style lang="scss" scoped>
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
</style>
```

### selected-item-template

Use this slot to provide custom content to the selected item. The slot exposes `item` slot prop.

<ClientOnly>
  <KSelect :items="selectItems">
    <template #selected-item-template="{ item }">
      <KongIcon />
      {{ item?.label }}
    </template>
  </KSelect>
</CLientOnly>

```html
<KSelect :items="selectItems">
  <template #selected-item-template="{ item }">
    <KongIcon />
    {{ item?.label }}
  </template>
</KSelect>
```

### dropdown-footer-text

A slot alternative for [`dropdownFooterText` prop](#dropdownfootertext).

<ClientOnly>
  <KSelect :items="selectItems">
    <template #dropdown-footer-text>
      <KongIcon />
      Dropdown footer content.
    </template>
  </KSelect>
</CLientOnly>

```html
<KSelect :items="selectItems">
  <template #dropdown-footer-text>
    <KongIcon />
    Dropdown footer content.
  </template>
</KSelect>
```

### loading

Content to be displayed when [`loading` prop](#loading-1) is `true`. Note that this slot only applies when `enableFiltering` is `true`.

<ClientOnly>
  <KToggle toggled v-slot="{ isToggled, toggle }">
    <div class="spacing-container">
      <KInputSwitch v-model="isToggled.value" label="Loading" />
      <KSelect :loading="isToggled.value" enable-filtering :items="selectItems">
        <template #loading>
          Services loading...
        </template>
      </KSelect>
    </div>
  </KToggle>
</CLientOnly>

```html
<KSelect :loading="loading" enable-filtering :items="selectItems">
  <template #loading>
    Services loading...
  </template>
</KSelect>
```

### empty

Slot to display custom content when items is empty or no items match filter query.

<ClientOnly>
  <KSelect :items="[]">
    <template #empty>
      No services found.
    </template>
  </KSelect>
</CLientOnly>

```html
<KSelect :items="[]">
  <template #empty>
    No services found.
  </template>
</KSelect>
```

### label-tooltip

Use this slot to pass any custom content to label tooltip.

<ClientOnly>
  <KSelect label="Label" :items="selectItems">
    <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
  </KSelect>
</ClientOnly>

```html
<KSelect label="Label" :items="selectItems">
  <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
</KSelect>
```

### before

Use this slot for inserting icons before the input field.

<ClientOnly>
  <KSelect :items="selectItems">
    <template #before>
      <SearchIcon />
    </template>
  </KSelect>
</ClientOnly>

## Events

### selected

Event payload is select item.

### input and update:modelValue

Event payload is selected item `value`.

### change

Event payload is select [item](#items).

### query-change

Event payload is query string.

### item-added

Event payload is added [item](#items).

### item-removed

Event payload is removed [item](#items).

<script setup lang="ts">
import { ref } from 'vue'
import { KongIcon, SearchIcon } from '@kong/icons'

const selectItems: SelectItem[] = [{
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
}, {
  label: 'Service A1',
  value: 'a1',
  group: 'Series 1',
}, {
  label: 'Service B1',
  value: 'b1',
  group: 'Series 1',
}, {
  label: 'Service A2',
  value: 'a2',
  group: 'Series 2',
}, {
  label: 'Service B2',
  value: 'b2',
  group: 'Series 2',
}]

const selectItemsUnselected: SelectItem[] = JSON.parse(JSON.stringify(selectItems)).map((item: SelectItem) => ({ ...item, selected: false }))
const selectItemsUnselectedEnv: SelectItem[] =  JSON.parse(JSON.stringify(selectItemsUnselected)).map((item: SelectItem) => ({ ...item, selected: false, ...(item.value === 'b' && { env: 'dev' }), ...(item.value === 'a2' && { env: 'prod' }), ...(item.value === 'b2' && { env: 'prod' }) }))

const envFilter = (params: SelectFilterFunctionParams) => params?.items?.filter((item: SelectItem) => item.label?.toLowerCase().includes(params.query?.toLowerCase()) || item.env?.includes(params.query?.toLowerCase()))

const asyncItemsModel = ref<string>('')
const asyncItemsQuery = ref<string>('')
const asyncItemsLoading = ref<boolean>(false)
const asyncItems = ref<SelectItem[]>(JSON.parse(JSON.stringify(selectItemsUnselected)))
const asyncItemsInitial: SelectItem[] = JSON.parse(JSON.stringify(selectItemsUnselected))

const onAsyncQueryChange = (query: string): void => {
  if (asyncItemsQuery.value !== query) {
    asyncItemsQuery.value = query

    fetchAsyncItems()
  }
}

const fetchAsyncItems = (): void => {
  asyncItemsLoading.value = true

  setTimeout(() => {
    const items = JSON.parse(JSON.stringify(asyncItemsInitial))
    asyncItems.value = items.filter((item: SelectItem) => item.label?.toLowerCase().includes(asyncItemsQuery.value?.toLowerCase()))

    asyncItemsLoading.value = false
  }, 2000)
}

const vModel = ref<string>('f')

const showNewItemValidationError = ref<boolean>(false)
const itemCreationValidator = (value: string) => value.length >= 3

const onItemCreationQueryChange = (query: string): void => {
  showNewItemValidationError.value = query ? !itemCreationValidator(query) : false
}
</script>

<style lang="scss" scoped>
.spacing-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
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

.item-creation-validation-error-message {
  color: $kui-color-text-danger;
}
</style>
