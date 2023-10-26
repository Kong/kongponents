# Dropdown

KDropdown is a button (or any slotted content) that is clicked to trigger a fly-out menu popover.

KDropdown provides a popover menu of options, shown by clicking on the dropdown trigger. The trigger defaults to an instance of KButton; however, you may provide slotted content for a custom trigger.

<ClientOnly>
  <KDropdown trigger-text="Documentation" :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KDropdown trigger-text="Documentation" :items="items" />
```

## Props

### triggerText

The text for the dropdown trigger button. The trigger content can also be [slotted in](#default) should you desire a custom UI.

### items

An array of objects containing a required `label` property and other optional properties which will render a menu of [KDropdownItems](#KDropdownItem).

<ClientOnly>
  <KDropdown trigger-text="Documentation" :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KDropdown
  trigger-text="Documentation"
  :items="[
    { label: 'Props', to: { path: '/components/dropdown#props' } },
    { label: 'Slots', to: { path: '/components/dropdown#slots' } },
    { label: 'Top', to: { path: '/components/dropdown' } }
  ]"
/>
```

### appearance

Use this prop to customize the default trigger KButton's [appearance prop](/components/button.html#appearance).

<ClientOnly>
  <KDropdown trigger-text="Documentation" appearance="danger" :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KDropdown
  trigger-text="Documentation"
  appearance="danger"
  :items="items"
/>
```

### showCaret

Use this prop if you would like the trigger button to display a caret icon.

<ClientOnly>
  <KDropdown trigger-text="Documentation" :items="deepClone(defaultItems)" show-caret />
</ClientOnly>

```html
<KDropdown
  trigger-text="Documentation"
  show-caret
  :items="items"
/>
```

### icon

:::warning NOTE
This prop will be removed in the `9.0.0-beta.0` release. Icons can be provided in the `default` slot
:::

A string for the `KIcon` to be displayed on the dropdown button with or in place of the button label.

<ClientOnly>
  <KDropdown icon="cogwheel" :items="deepClone(defaultItems)" show-caret />
</ClientOnly>

```html
<KDropdown icon="cogwheel" :items="items" show-caret />
```

### width

The width of the dropdown body (defaults to `auto`). Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

<ClientOnly>
  <KDropdown trigger-text="Documentation" :items="deepClone(defaultItems)" width="700" />
</ClientOnly>

```html
<KDropdown
  trigger-text="Documentation"
  width="700"
  :items="items"
/>
```

### kpopAttributes

Use the `kpopAttributes` prop to configure the KPop [props](/components/popover) dropdown.

<ClientOnly>
  <KDropdown trigger-text="Documentation" :kpop-attributes="{ placement: 'leftStart' }" :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KDropdown 
  trigger-text="Documentation"
  :kpop-attributes="{ placement: 'leftStart' }"
  :items="items"
/>
```

### disabled

Use this prop to disable the dropdown, can be used in conjunction with [`disabledTooltip` prop](#disabledtooltip).

### disabledTooltip

Text to display on hover if dropdown is disabled.

<ClientOnly>
  <KDropdown
    trigger-text="Documentation"
    disabled
    disabled-tooltip="You can't click me"
    :items="deepClone(defaultItems)"
  />
</ClientOnly>

```html
<KDropdown
  trigger-text="Documentation"
  disabled
  disabled-tooltip="You can't click me"
  :items="items"
/>
```

### selectionMenu

Defaults to `false`.

Use this prop when a visual indication of the currently selected menu item is needed. 

By default the dropdown has no notion of "selection". When `selectionMenu` is `true`, `selected` state is handled automatically when clicking a KDropdownItem if used in conjunction with the `items` prop. Each item should have a `label` and a `value`. To keep track of changes in your host app you can utilize [`@change` event](#events).

<ClientOnly>
  <KDropdown
    selection-menu
    :items="selectionMenuItems"
    trigger-text="Select region"
    @change="handleSelectionMenuUpdate"
    show-caret
  />
</ClientOnly>

```vue
<template>
  <KDropdown
    selection-menu
    :items="[{ label: 'US (United States)', value: 'us' }, 
      { label: 'FR (France)', value: 'fr' }]"
    trigger-text="Select region"
    @change="handleSelectionMenuUpdate"
    show-caret
  />
</template>

<script setup lang="ts">
const selectedItem = ref<DropdownItem>()

const handleSelectionMenuUpdate = (item: DropdownItem): void => {
  selectedItem.value = item
}
</script>
```

If using the [`items` slot](#items-1), you will have access to the `handleSelection()` method which should be called on each item's click event and takes the `item` data as a parameter. This will enable you to attach to the `@change` event (which returns the selected item) to track your selection.

<ClientOnly>
  <KDropdown
    selection-menu
    trigger-text="Select region (with items slot)"
    @change="handleSelectionMenuUpdate"
    show-caret
  >
    <template #items="{ handleSelection }">
      <KDropdownItem
        v-for="item in selectionMenuItems"
        :key="item.value"
        :item="item"
        :selected="item.value === selectionMenuSelectedItem?.value"
        @click="handleSelection(item)"
      />
    </template>
  </KDropdown>
</ClientOnly>

```vue
<template>
  <KDropdown
    selection-menu
    trigger-text="Select region (with items slot)"
    @change="handleSelectionMenuUpdate"
    show-caret
  >
    <template #items="{ handleSelection }">
      <KDropdownItem
        v-for="item in [{ label: 'US (United States)', value: 'us' }, 
          { label: 'FR (France)', value: 'fr' }]"
        :key="item.value"
        :item="item"
        :selected="item.value === selectedItem?.value"
        @click="handleSelection(item)"
      />
    </template>
  </KDropdown>  
</template>

<script setup lang="ts">
const selectionMenuSelectedItem = ref<DropdownItem>()

const handleSelectionMenuUpdate = (item: DropdownItem): void => {
  selectedItem.value = item
}
</script>
```

## Slots

### default

The trigger element for opening/closing the menu.

<ClientOnly>
  <KDropdown :items="deepClone(defaultItems)">
    <KButton appearance="secondary" class="icon-button">
      <CogIcon />
    </KButton>
  </KDropdown>
</ClientOnly>

```html
<KDropdown :items="items">
  <KButton appearance="secondary" class="icon-button">
    <CogIcon />
  </KButton>
</KDropdown>
```

### items

You can customize the appearance of dropdown items using this slot.

Slot props:
- `closeDropdown`
  - type: `Function`
  - Function that triggers dropdown close.
- `handleSelection`
  - type: `Function`
  - Function that lets KDropdown track selected item when `selectionMenu` is `true`.

KDropdownItem takes care of icon color, size and spacing as long as you use icons provided by [@kong/icons](https://github.com/Kong/icons) package.

<ClientOnly>
  <KDropdown
    trigger-text="Customized dropdown items"
    width="250"
  >
    <template #items>
      <KDropdownItem>
        Updates
        <KBadge
          class="dropdown-item-content-end"
          shape="rectangular"
        >
          14
        </KBadge>
      </KDropdownItem>
      <KDropdownItem>
        Support
        <KBadge
          appearance="success"
          shape="rectangular"
        >
          Enterprise
        </KBadge>
        <ExternalLinkIcon class="dropdown-item-content-end" />
      </KDropdownItem>
      <KDropdownItem>
        <BookIcon />
        Docs
        <KTooltip
          class="dropdown-item-content-end"
          label="This is a tooltip"
        >
          <InfoIcon />
        </KTooltip>
      </KDropdownItem>
    </template>
  </KDropdown>
</ClientOnly>

```vue
<template>
  <KDropdownItem>
    <BookIcon />
    Docs
    <KTooltip
      class="dropdown-item-content-end"
      label="This is a tooltip"
    >
      <InfoIcon />
    </KTooltip>
  </KDropdownItem>
</template>

<style lang="scss" scoped>
.dropdown-item-content-end {
  margin-left: $kui-space-auto;
}
</style>
```

:::tip TIP
Should you decide to use your own custom icons, you can use design tokens exported by the [@kong/design-tokens](https://github.com/Kong/design-tokens) package to set icon size. The recommended icon size is `20px` or `kui-icon-size-40`.

We also recommend setting the icon style `color` property to a value of `currentColor` to utilize default KDropdownItem styling for slotted content.
:::

## KDropdownItem

KDropdown generates a KDropdownItem for each object in the `items` prop array. At the most basic level, KDropdownItem is a wrapper around each item to display it correctly inside KDropdown. You can use the `items` slot of the KDropdown to manually create your own menu items.

### Props

| Prop          | Description                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`        | The properties the link is built from, it expects a `label` and optionally a `to` or `value` (when `selectionMenu` is `true`). If `to` is `typeof object`, the item will be rendered as a `<router-link>`. Otherwise, if `to` is `typeof string`, it will be rendered as an `<a>` element with the value of `to` applied to the `href` attribute. |
| `disabled`    | A boolean (defaults to `false`), indicating whether or not to disable the item.                                                                                                                                                                                                                                                                   |
| `selected`    | A boolean (defaults to `false`), indicating whether or not the item is selected when the `selectionMenu` prop is `true`.                                                                                                                                                                                                                          |
| `hasDivider`  | A boolean (defaults to `false`), indicating whether or not the item should have a divider bar displayed above it.                                                                                                                                                                                                                                 |
| `isDangerous` | A boolean (defaults to `false`), indicating whether or not to apply danger styles (text color is red).                                                                                                                                                                                                                                            |

<ClientOnly>
  <KDropdown trigger-text="All kinds of dropdown items">
    <template #items="{ closeDropdown }">
      <KDropdownItem
        @click="clickHandler"
      >
        Regular button
      </KDropdownItem>
      <KDropdownItem
        :item="{ label: 'Dropdown', to: { path: '/components/dropdown' } }"
        target="_blank"
      >
        Router link
      </KDropdownItem>
      <KDropdownItem
        :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
        target="_blank"
      >
        External link
      </KDropdownItem>
      <KDropdownItem
        disabled
        has-divider
        @click="clickHandler"
      >
        Disabled button
      </KDropdownItem>
      <KDropdownItem
        disabled
        :item="{ label: 'Dropdown', to: { path: '/components/dropdown' } }"
      >
        Disabled router link
      </KDropdownItem>
      <KDropdownItem
        disabled
        :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
      >
        Disabled external link
      </KDropdownItem>
      <KDropdownItem
        has-divider
        @click="clickHandler"
      >
        Button with action
        <CogIcon
          class="dropdown-item-content-end"
          role="button"
          tabindex="0"
          @click.stop="actionClickHandler(closeDropdown)"
        />
      </KDropdownItem>
      <KDropdownItem
        has-divider
        is-dangerous
        @click="clickHandler"
      >
        Danger button
      </KDropdownItem>
    </template>
  </KDropdown>
</ClientOnly>

```vue
<template>
  <KDropdown trigger-text="All kinds of dropdown items">
    <template #items="{ closeDropdown }">
      <KDropdownItem
        @click="clickHandler"
      >
        Regular button
      </KDropdownItem>
      <KDropdownItem
        :item="{ label: 'Dropdown', to: { path: '/components/dropdown' } }"
        target="_blank"
      >
        Router link
      </KDropdownItem>
      <KDropdownItem
        :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
        target="_blank"
      >
        External link
      </KDropdownItem>
      <KDropdownItem
        disabled
        has-divider
        @click="clickHandler"
      >
        Disabled button
      </KDropdownItem>
      <KDropdownItem
        disabled
        :item="{ label: 'Dropdown', to: { path: '/components/dropdown' } }"
      >
        Disabled router link
      </KDropdownItem>
      <KDropdownItem
        disabled
        :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
      >
        Disabled external link
      </KDropdownItem>
      <KDropdownItem
        has-divider
        @click="clickHandler"
      >
        Button with action
        <CogIcon
          role="button"
          tabindex="0"
          @click.stop="actionClickHandler(closeDropdown)"
        />
      </KDropdownItem>
      <KDropdownItem
        has-divider
        is-dangerous
        @click="clickHandler"
      >
        Danger button
      </KDropdownItem>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
const clickHandler = (): void => {
  window.alert('Item was clicked')
}

const actionClickHandler = (closeDropdown: () => void): void => {
  window.alert('Item action was clicked')
  closeDropdown()
}
</script>
```

:::tip TIP
If you want to make an icon slotted into KDropdownItem clickable (like the one next to button with action in the example above), you can assign `role="button"` and appropriate `tabindex` attributes to that element and bind an event handler (note that you will have to use `.stop` [event modifier](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)). 

If implemented as described here, KDropdownItem will take care of styling the different states (hover, active, disabled). Also note that you will have to trigger closing the dropdown via the `closeDropdown()` slot prop.
:::

### Attribute Binding

You can pass any attribute to the KDropdownItem and it will get properly bound to the element.

```html
<KDropdownItem
  target="_blank"
  rel="noopener"
  :item="{ label: 'Leave the page', to: 'https://kongponents.konghq.com/' }" 
/>
```

### Events

#### click

You can bind event handlers to `@click` event just like you would normally do with buttons.

#### change

Fires when items are clicked when `selectionMenu` is `true`. Returns the selected menu item object or `null`.

#### toggleDropdown

Fires when the button to toggle the menu is clicked. Returns `true` if the menu is open, otherwise returns `false`.

<script setup lang="ts">
import { ref } from 'vue'
import { CogIcon, ExternalLinkIcon, BookIcon, InfoIcon } from '@kong/icons'
import type { DropdownItem } from '@/types'

const defaultItems = [
  { label: 'Props', to: { path: '/components/dropdown#props' } },
  { label: 'Slots', to: { path: '/components/dropdown#slots' } },
  { label: 'Top', to: { path: '/components/dropdown' } },
]

const selectionMenuSelectedItem = ref<DropdownItem>()

const selectionMenuItems = ref<Array<DropdownItem>>([{
  label: 'US (United States)',
  value: 'us',
},
{
  label: 'FR (France)',
  value: 'fr',
}])

const handleSelectionMenuUpdate = (item: DropdownItem): void => {
  selectedItem.value = item
}

const clickHandler = (): void => {
  window.alert('Item was clicked')
}

const actionClickHandler = (closeDropdown: () => void): void => {
  window.alert('Item action was clicked')
  closeDropdown()
}

const deepClone = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="scss" scoped>
.dropdown-item-content-end {
  margin-left: $kui-space-auto;
}
</style>
