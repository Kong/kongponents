# Dropdown Menu

**KDropdownMenu** is a button (or any slotted content) that is clicked to trigger a menu popover beneath&nbsp;it.

<ClientOnly>
  <KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />
</ClientOnly>

## Props

### label

The label for the menu trigger.

### items

An array of objects containing a required `label` property and other optional properties which will render a menu of [`KDropdownItems`](#KDropdownItem) .

```html
<KDropdownMenu
  label="Documentation"
  :items="[
    { label: 'Props', to: { path: '/components/dropdown-menu.html', hash: '#props' } },
    { label: 'Slots', to: { path: '/components/dropdown-menu.html', hash: '#slots' } },
    { label: 'Top', to: { path: '/components/dropdown-menu.html' } }
  ]"
/>
```

### appearance

Use this prop to specify the display style for the dropdown menu. Can be either `menu` (default) or `selectionMenu`.
The `menu` style is the standard you have seen in the example above. Uses a standard `primary` `KButton` with hover state over items and no notion of "selection".

<ClientOnly>
  <KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />
</ClientOnly>

```html
<KDropdownMenu label="Documentation" :items="items" />
```

The `selectionMenu` style is used when a visual indication of the currently selected menu item is needed. `selected` state is handled automatically when clicking a `KDropdownItem` if used in conjunction with the `items` prop. Each item should have a `label` and a `value`.

If using the `items` slot, you will have access to the `handleSelection()` method which should be called on each item's click event and takes the `item` data as a parameter. This will enable you to attach to the `@change` event (which returns the selected item) to track your selection.

<ClientOnly>
  <KDropdownMenu
    :label="selectedItem.label"
    appearance="selectionMenu"
    @change="handleChange"
  >
    <template #items="{ handleSelection }">
      <KDropdownItem
        v-for="item in menuItems"
        :selected="selectedItem.value === item.value"
        @click="handleSelection(item)"
      >
        {{ item.label }}
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</ClientOnly>

```html
<KDropdownMenu
  :label="selectedItem.label"
  appearance="selectionMenu"
  @change="handleChange"
>
  <template #items="{ handleSelection }">
    <KDropdownItem
      v-for="item in menuItems"
      :selected="selectedItem.value === item.value"
      @click="handleSelection(item)"
    >
      {{ item.label }}
    </KDropdownItem>
  </template>
</KDropdownMenu>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      selectedItem: {
        label: 'Select an item',
        value: ''
      },
      menuItems: [{
        label: 'US (United States)',
        value: 'us'
      },
      {
        label: 'FR (France)',
        value: 'fr'
      }]
    }
  },
  methods: {
    handleChange (item) {
      this.selectedItem = item
      this.$toaster.open(`${item.label} clicked!`)
    }
  }
})
</script>
```

### buttonAppearance

Use this prop to customize the trigger **KButton** [appearance](/components/button.html#appearance).

<ClientOnly>
  <KDropdownMenu label="Documentation" button-appearance="creation" :items="deepClone(defaultItemsUnselected)" show-caret />
</ClientOnly>

```html
<KDropdownMenu
  label="Documentation"
  button-appearance="creation"
  :items="items"
/>
```

### showCaret

Use this prop if you would like the trigger button to display the caret.

<ClientOnly>
  <KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" show-caret />
</ClientOnly>

```html
<KDropdownMenu
  label="Documentation"
  :items="items"
  show-caret
/>
```

### caretColor

::: tip NOTE
Use this prop in conjunction with the `showCaret` prop
:::

Use this prop to customize the color of the caret

<ClientOnly>
  <KDropdownMenu
    caret-color="var(--steel-300)"
    label="Select Type"
    :items="items"
    show-caret
  />
</ClientOnly>

```html
<KDropdownMenu
  caret-color="var(--steel-300)"
  label="Select Type"
  :items="items"
  show-caret
/>
```

### icon

A string for the `KIcon` to be displayed on the dropdown button with or in place of the button label.

<ClientOnly>
  <KDropdownMenu icon="cogwheel" :items="deepClone(defaultItemsUnselected)" show-caret />
</ClientOnly>

```html
<KDropdownMenu
  icon="cogwheel"
  :items="items"
  show-caret
/>
```

### width

The width of the dropdown body (defaults to `auto`). Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

<ClientOnly>
  <KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" width="500" />
</ClientOnly>

```html
<KDropdownMenu
  label="Documentation"
  :items="items"
  width="500"
/>
```

### kpopAttributes

Use the `kpopAttributes` prop to configure the **KPop** [props](/components/popover) dropdown.

<ClientOnly>
  <KCard
    title="KPopAttributes FTW"
    body="Click the three dots in the upper right corner to see the example in action"
  >
    <template #actions>
      <KDropdownMenu
        :kpop-attributes="{
          popoverClasses: 'mt-5',
          maxWidth: '100'
        }"
        :items="deepClone(defaultItemsUnselected)"
      >
        <template #default>
          <KButton
            appearance="secondary"
            size="small"
            class="non-visual-button"
          >
            <template #icon>
              <KIcon
                icon="more"
                color="var(--black-400)"
                size="16"
              />
            </template>
          </KButton>
        </template>
      </KDropdownMenu>
    </template>
  </KCard>
</ClientOnly>

```html
<KCard
  title="KPopAttributes FTW"
  body="Click the three dots in the upper right corner to see the example in action"
>
  <template #actions>
    <KDropdownMenu
      :kpop-attributes="{
        popoverClasses: 'mt-5',
        maxWidth: '100'
      }"
      :items="deepClone(defaultItemsUnselected)"
    >
      <template #default>
        <KButton
          appearance="secondary"
          size="small"
          class="non-visual-button"
        >
          <template #icon>
            <KIcon
              icon="more"
              color="var(--black-400)"
              size="16"
            />
          </template>
        </KButton>
      </template>
    </KDropdownMenu>
  </template>
</KCard>
```

### disabled

Use this prop to disable the dropdown, can be used in conjunction with `disabledTooltip` prop.

### disabledTooltip

Text to display on hover if dropdown is disabled.

<ClientOnly>
  <KDropdownMenu
    label="Documentation"
    :disabled="true"
    disabled-tooltip="You can't click me"
    :items="deepClone(defaultItemsUnselected)"
  />
</ClientOnly>

```html
<KDropdownMenu
  label="Documentation"
  :disabled="true"
  disabled-tooltip="You can't click me"
  :items="deepClone(defaultItemsUnselected)"
/>
```

## Slots

There are 2 supported slots:

### default

The trigger element for opening/closing the menu.

<ClientOnly>
  <KDropdownMenu :items="deepClone(defaultItemsUnselected)">
    <template #default>
        <KButton
          show-caret
          appearance="creation"
        >
          Menu
        </KButton>
      </template>
  </KDropdownMenu>
</ClientOnly>

```html
<KDropdownMenu :items="items">
  <template #default>
      <KButton
        show-caret
        appearance="creation"
      >
        Menu
      </KButton>
    </template>
</KDropdownMenu>
```

### items

You can customize the appearance of dropdown items using this slot.

Slot props:
- `closeDropdown`
  - type: `Function`
  - Function that triggers dropdown close.

For an example of using the items slot see the [`KDropdownItem`](#KDropdownItem) section.

## KDropdownItem

**KDropdownMenu** generates a **KDropdownItem** for each object in the `items` prop array. At the most basic level, **KDropdownItem** is a wrapper around each item to display it correctly inside `KDropdownMenu`. You can use the `items` slot of the `KDropdownMenu` to manually create your own menu items.

### Properties

- `item` - the properties the router-link is built from, it expects a `label` and optionally a `to` (for a router-link item) or `value` (for a `selectionMenu` item).
- `disabled` - a boolean (defaults to `false`), whether or not to disable the item.
- `selected` - a boolean (defaults to `false`), whether or not the item is selected if using `selectionMenu` appearance.
- `hasDivider` - a boolean (defaults to `false`), whether or not the item should have a divider bar displayed above it
- `isDangerous` - a boolean (defaults to `false`), whether or not to apply danger styles (text color is red)

```html
<KDropdownItem :item="{ label: 'Leave the page', to: { path: '/' } }" />
```

There are 3 primary item types:

- `link`
  - the generic type generated using the `items` prop on `KDropdownMenu`
  - the generic type generated using the `item` prop on `KDropdownItem`
- `button` - this item is generated if a handler is specified for the `@click` event on a `KDropdownItem`
- `custom` - no special handling, you completely control the content

<ClientOnly>
  <KDropdownMenu label="Variety" width="250">
    <template #items="{ closeDropdown }">
      <KDropdownItem :item="youAreHere" />
      <KDropdownItem
        :item="{ label: 'A button with a a long long long long long long looooooooooooooooooooooooooooooooooooooooooooooong name' }"
        has-divider
        @click="clickHandler('Button clicked!')"
      />
      <KDropdownItem
        disabled
        @click="clickHandler"
      >
        Disabled button
      </KDropdownItem>
      <KDropdownItem
        :item="youAreHere"
        disabled
        @click="clickHandler"
      >
        Disabled to link
      </KDropdownItem>
      <KDropdownItem @click="clickHandler('Button clicked!')" class="dropdown-with-remove-action">
        Button w/ action
        <KButton
          appearance="btn-link"
          @click.stop="() => { clickHandler('Button action clicked!'); closeDropdown() }"
        >
          <KIcon icon="trash" />
        </KButton>
      </KDropdownItem>
      <KDropdownItem
        has-divider
        is-dangerous
        class="d-inline-block"
      >
        <a
          href="http://www.google.com"
          rel="noopener"
          target="_blank"
        >
          External link
          <KIcon
            icon="externalLink"
            size="12"
            color="var(--red-500)"
            class="ml-2"
          />
        </a>
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</ClientOnly>

```html
<KDropdownMenu label="Variety" width="250">
  <template #items="{ closeDropdown }">
    <KDropdownItem :item="youAreHere" />
    <KDropdownItem
      :item="{ label: 'A button with a a long long long long long long looooooooooooooooooooooooooooooooooooooooooooooong name' }"
      has-divider
      @click="clickHandler('Button clicked!')"
    />
    <KDropdownItem
      disabled
      @click="clickHandler"
    >
      Disabled button
    </KDropdownItem>
    <KDropdownItem
      :item="{ label: 'You are here 2', to: { path: '/components/dropdown-menu.html' } }"
      disabled
      @click="clickHandler"
    >
      Disabled to link
    </KDropdownItem>
    <KDropdownItem
      @click="clickHandler"
    >
      Button w/ action
      <KButton
        appearance="btn-link"
        @click.stop="() => { actionClickHandler(); closeDropdown(); }"
      >
        <KIcon icon="trash" />
      </KButton>
    </KDropdownItem>
    <KDropdownItem
      has-divider
      is-dangerous
      class="d-inline-block"
    >
      <a
        href="http://www.google.com"
        rel="noopener"
        target="_blank"
      >
        External link
        <KIcon
          icon="externalLink"
          size="12"
          color="var(--red-500)"
          class="ml-2"
        />
      </a>
    </KDropdownItem>
  </template>
</KDropdownMenu>
```

### Events

| Event             | Description                                                                                            |
| :---------------- | :----------------------------------------------------------------------------------------------------- |
| `@click`          | Fires when a `button` type menu item is clicked                                                        |
| `@change`         | Fires when items within a `selectionMenu` are clicked; returns the selected menu item object or `null` |
| `@toggleDropdown` | Fires when the button to toggle the menu is clicked; returns `true` if the menu is open, or `false`    |

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      selectedItem: {
        value: '',
        label: 'Select an item'
      },
      menuItems: [{
        label: 'US (United States)',
        value: 'us'
      },
      {
        label: 'FR (France)',
        value: 'fr'
      }],
      defaultItemsUnselected: [
        { label: 'Props', to: { path: '/components/dropdown-menu.html', hash: '#props' } },
        { label: 'Slots', to: { path: '/components/dropdown-menu.html', hash: '#slots' } },
        { label: 'Top', to: { path: '/components/dropdown-menu.html' } }
      ],
      youAreHere: { label: 'You are here', to: { path: '/components/dropdown-menu.html' } }
    }
  },
  methods: {
    handleChange (item) {
      this.selectedItem = item
      this.$toaster.open(`${item.label} clicked!`)
    },
    clickHandler (msg) {
      let text = 'Button was clicked'

      if (msg) {
        text = msg
      }

      this.$toaster.open(text)
    },
    deepClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
})
</script>

<style lang="scss">
.dropdown-with-remove-action {
  button {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  svg {
    margin-right: 0 !important;
  }

  &:hover {
    svg path {
      fill: var(--red-500);
    }
  }
}
</style>
