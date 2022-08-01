# DropdownMenu

**KDropdownMenu** is a button (or any slotted content) that is clicked to trigger a menu popover beneath it.

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />

## Props

### label

The label for the menu.

### items

An array of items containing a `label` and other optional properties will render a menu of [`KDropdownItems`](#KDropdownItem) .

```html
<KDropdownMenu
  label="Documentation"
  :items="[
    { label: 'Home', to: { path: '/' } },
    { label: 'Button docs', to: { path: '/components/button.html' } },
    { label: 'My docs', to: { path: '/components/dropdown-menu.html' } }
  ]"
/>
```

### appearance

Use this prop to specify the display style for the dropdown menu. Can be either `menu` (default) or `selectionMenu`.
The `menu` style is the standard you have seen in the example above.

The `selectionMenu` style is good for a clearer representation of what is selected. `selected` state is handled automatically when
clicking a `KDropdownItem` if used in conjunction with the `items` prop. You will need to manually control selectedness if you are using the `items` slot.

<div>
  <KDropdownMenu
    :kpop-attributes="{ width: '220' }"
    appearance="selectionMenu"
  >
    <template #default="{ isOpen }">
      <KButton
        :class="{ 'is-active': isOpen }"
        :is-open="isOpen"
      >
        {{ selectedLabel }}
      </KButton>
    </template>
    <template #items>
      <KDropdownItem
        :selected="selectedItem === 'us'"
        @click="clickHandler('US selected', 'us', 'US (United States)')"
      >
        US (United States)
      </KDropdownItem>
      <KDropdownItem
        :selected="selectedItem === 'fr'"
        @click="clickHandler('France selected', 'fr', 'FR (France)')"
      >
        FR (France)
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</div>

```html
<KDropdownMenu
  :kpop-attributes="{ width: '220' }"
  appearance="selectionMenu"
>
  <template #default="{ isOpen }">
    <KButton
      :class="{ 'is-active': isOpen }"
      :is-open="isOpen"
    >
      {{ selectedLabel }}
    </KButton>
  </template>
  <template #items>
    <KDropdownItem
      :selected="selectedItem === 'us'"
      @click="clickHandler('US selected', 'us', 'US (United States)')"
    >
      US (United States)
    </KDropdownItem>
    <KDropdownItem
      :selected="selectedItem === 'fr'"
      @click="clickHandler('France selected', 'fr', 'FR (France)')"
    >
      FR (France)
    </KDropdownItem>
  </template>
</KDropdownMenu>

<script>
export default {
  data() {
    return {
      selectedItem: '',
      selectedLabel: 'Select an item'
    }
  },
  methods: {
    clickHandler (msg, val, label) {
      if (val !== undefined) {
        this.selectedItem = val
      }

      if (label) {
        this.selectedLabel = label
      }

      this.$toaster.open(msg)
    }
  }
}
</script>
```

### kpopAttributes

Use the `kpopAttributes` prop to configure the **KPop** [props](/components/popover.html) dropdown.

<div>
  <KCard
    title="Card Title"
    body="Body Content"
  >
    <template #actions>
      <KDropdownMenu
        :kpop-attributes="{
          popoverClasses: 'mt-5',
          width: '180'
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
</div>

```html
<KCard
  title="Card Title"
  body="Body Content"
>
  <template #actions>
    <KDropdownMenu
      :kpop-attributes="{
        popoverClasses: 'mt-5',
        width: '180'
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

<div>
  <KDropdownMenu
    label="Documentation"
    :disabled="true"
    disabled-tooltip="You can't click me"
    :items="deepClone(defaultItemsUnselected)"
  />
</div>

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

- `default` - The trigger element for opening/closing the menu. Returns the `isOpen` state.
- `items` - For an example of using the items slot see the [`KDropdownItem`](#KDropdownItem) section.

<div>
  <KDropdownMenu :items="deepClone(defaultItemsUnselected)">
    <template #default="{ isOpen }">
        <KButton
          :is-open="isOpen"
          appearance="creation"
        >
          Menu
        </KButton>
      </template>
  </KDropdownMenu>
</div>

```html
<KDropdownMenu :items="items">
  <template #default="{ isOpen }">
      <KButton
        :is-open="isOpen"
        appearance="creation"
      >
        Menu
      </KButton>
    </template>
</KDropdownMenu>
```

## KDropdownItem

**KDropdownMenu** generates a **KDropdownItem** for each item in the `items` property. At the most basic level, **KDropdownItem** is a wrapper around each item to display it correctly inside `KDropdownMenu`. You can use the `items` slot of the `KDropdownMenu` to manually create your own menu items.

### Properties

- `item` - the properties the router-link is built from, it expects a `label` and a `to`.
- `disabled` - a boolean (default to `false`), whether or not to disable the item.
- `selected` - a boolean (default to `false`), whether or not the item is selected.
- `hasDivider` - a boolean (default to `false`), whether or not the item should have a divider bar displayed above it
- `isDangerous` - a boolean (default to `false`), whether or not to apply danger styles (text color is red)
- `selectionMenuChild` - a boolean (default to `false`), whether the parent is a `selectionMenu` or not (used for events)

```html
<KDropdownItem :item="{ label: 'Leave the page', to: { path: '/' } }" />
```

There are 3 primary item types:

- `router-link`
  - the generic type generated using the `items` prop on `KDropdownMenu`
  - the generic type generated using the `item` prop on `KDropdownItem`
- `button` - this item is generated if a handler is specified for the `@click` event on a `KDropdownItem`
- `custom` - no special handling, you completely control the content

<div>
  <KDropdownMenu label="Variety">
    <template #items>
      <KDropdownItem :item="youAreHere" />
      <KDropdownItem @click="clickHandler">
        A button
      </KDropdownItem>
      <KDropdownItem
        disabled
        @click="clickHandler"
      >
        Disabled button
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
            class="ml-2"
          />
        </a>
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</div>

```html
<KDropdownMenu label="Variety">
  <template #items>
    <KDropdownItem :item="{ label: 'You are here', to: { path: '/components/dropdown-menu.html' } }" />
    <KDropdownItem @click="clickHandler">
      A button
    </KDropdownItem>
    <KDropdownItem
      disabled
      @click="clickHandler"
    >
      Disabled button
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
          class="ml-2"
        />
      </a>
    </KDropdownItem>
  </template>
</KDropdownMenu>
```

### Events

| Event     | Description             |
| :-------- | :------------------ |
| `clicked` | Fires when a menu item is clicked |
| `changed` | Fires when items with `selectionMenuChild` prop are clicked; returns `selectedItem` Object or null |

<script>
export default {
  data () {
    return {
      selectedLabel: 'Selected an item',
      selectedItem: '',
      defaultItemsUnselected: [
        { label: 'Home', to: { path: '/' } },
        { label: 'Button docs', to: { path: '/components/button.html' } },
        { label: 'My docs', to: { path: '/components/dropdown-menu.html' } }
      ],
      youAreHere: { label: 'You are here', to: { path: '/components/dropdown-menu.html' } }
    }
  },
  methods: {
    clickHandler (msg, val, label) {
      let text = 'Button was clicked'

      if (msg) {
        text = msg
      }

      if (val !== undefined) {
        this.selectedItem = val
      }

      if (label) {
        this.selectedLabel = label
      }

      this.$toaster.open(text)
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>

<style lang="scss">
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
