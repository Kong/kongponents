# Dropdown Menu

<div v-if="hasMounted">

**KDropdownMenu** is a button (or any slotted content) that is clicked to trigger a menu popover beneath&nbsp;it.

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />

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

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />

```html
<KDropdownMenu label="Documentation" :items="items" />
```

The `selectionMenu` style is used when a visual indication of the currently selected menu item is needed. `selected` state is handled automatically when clicking a `KDropdownItem` if used in conjunction with the `items` prop. Each item should have a `label` and a `value`.

If using the `items` slot, you will have access to the `handleSelection()` method which should be called on each item's click event and takes the `item` data as a parameter. This will enable you to attach to the `@change` event (which returns the selected item) to track your selection.

<div>
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
</div>

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

<KDropdownMenu label="Documentation" button-appearance="creation" :items="deepClone(defaultItemsUnselected)" show-caret />

```html
<KDropdownMenu
  label="Documentation"
  button-appearance="creation"
  :items="items"
/>
```

### showCaret

Use this prop if you would like the trigger button to display the caret.

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" show-caret />

```html
<KDropdownMenu
  label="Documentation"
  :items="items"
  show-caret
/>
```

### icon

A string for the `KIcon` to be displayed on the dropdown button with or in place of the button label.

<KDropdownMenu icon="cogwheel" :items="deepClone(defaultItemsUnselected)" show-caret />

```html
<KDropdownMenu
  icon="cogwheel"
  :items="items"
  show-caret
/>
```

### width

The width of the dropdown body (defaults to `auto`). Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" width="500" />

```html
<KDropdownMenu
  label="Documentation"
  :items="items"
  width="500"
/>
```

### kpopAttributes

Use the `kpopAttributes` prop to configure the **KPop** [props](/components/popover.html) dropdown.

<div>
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
</div>

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

- `default` - The trigger element for opening/closing the menu.
- `items` - For an example of using the items slot see the [`KDropdownItem`](#KDropdownItem) section.

<div>
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
</div>

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

<div>
  <KDropdownMenu label="Variety">
    <template #items>
      <KDropdownItem :item="youAreHere" />
      <KDropdownItem @click="clickHandler('Button clicked!')">
        A button
      </KDropdownItem>
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
          color="var(--red-500)"
          class="ml-2"
        />
      </a>
    </KDropdownItem>
  </template>
</KDropdownMenu>
```

### Events

| Event     | Description         |
| :-------- | :------------------ |
| `@click` | Fires when a `button` type menu item is clicked |
| `@change` | Fires when items within a `selectionMenu` are clicked; returns the selected menu item object or `null` |
| `@toggleDropdown` | Fires when the button to toggle the menu is clicked; returns `true` if the menu is open, or `false` |

</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      hasMounted: false,
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
  mounted() {
    this.hasMounted = true
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
