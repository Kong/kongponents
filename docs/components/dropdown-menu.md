# DropdownMenu

**KDropdownMenu** is a button (or any slotted content) that is clicked to trigger a menu popover beneath it.

<div>
  <KDropdownMenu
    class="more-actions-dropdown"
    :kpop-attributes="{
      popoverClasses: 'mt-5 more-actions-popover',
      width: '150'
    }"
  >
    <template #default>
      <KButton
        appearance="secondary"
        size="small"
        class="float-right non-visual-button"
        data-testid="more-actions-btn"
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
    <template #items>
      <KDropdownItem
        :item="{
          to: { path: '/components/button.html' },
          label: 'View KButton docs'
        }"
      />
      <KDropdownItem
        :disabled="false"
        class="danger"
        @click.prevent="clickHandler('Deleted successfully!')"
      >
        Delete
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</div>

## Props

### label

The label for the menu.

### items

An array of items containing a `label` and `to` will render a menu of router-links.

<KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" />

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

<div>
  <KDropdownMenu
    :kpop-attributes="{ width: '220' }"
    appearance="selectionMenu"
  >
    <template #default="{ isOpen }">
      <KButton
        class="top-bar-dropdown-trigger"
        :class="{ 'is-active': isOpen }"
        :is-open="isOpen"
      >
        Selected Item
      </KButton>
    </template>
    <template #items>
      <KDropdownItem
        @click="clickHandler('US selected')"
      >
        US (United States)
      </KDropdownItem>
      <KDropdownItem
        :class="{'top-bar-dropdown-selected-option': false }"
        @click="clickHandler('US selected')"
      >
        US2 (United States)
      </KDropdownItem>
      <KDropdownItem
        v-if="false"
        has-divider
        data-testid="geo-switcher-global-more-regions-option"
      >
        <ExternalLink
          :href="pricingURL"
          hide-icon
          class="w-100"
          data-testid="geo-switcher-global-more-regions-option-link"
        >
          <div class="d-block">
            <div>{{ english.geo.moreRegions }}</div>
            <div class="mt-2">
              <HelpKonnectEnterpriseLogo />
            </div>
          </div>
        </ExternalLink>
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</div>

### kpopAttributes

Use the `kpopAttributes` prop to configure the **KPop** [props](/components/popover.html) dropdown.

<div>
  <KDropdownMenu label="Documentation" :items="deepClone(defaultItemsUnselected)" :kpop-attributes="{
      popoverClasses: 'mt-2 a-custom-popover',
      width: '150'
    }"
  />
</div>

```html
<KDropdownMenu
  label="Documentation"
  :items="items"
  :kpop-attributes="{
    popoverClasses: 'mt-2 a-custom-popover',
    width: '150'
  }"
/>
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

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KDropdownMenuBorderColor`| KDropdownMenu border color

An Example of changing the border color of KDropdownMenu to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KDropdownMenu-wrapper">
    <KDropdownMenu />
  </div>
</template>

```html
<template>
  <div class="KDropdownMenu-wrapper">
    <KDropdownMenu />
  </div>
</template>

<style>
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
```

<script>
export default {
  data () {
    return {
      defaultIsOpen: false,
      defaultItemsUnselected: [
        { label: 'Home', to: { path: '/' } },
        { label: 'Button docs', to: { path: '/components/button.html' } },
        { label: 'My docs', to: { path: '/components/dropdown-menu.html' } }
      ],
      youAreHere: { label: 'You are here', to: { path: '/components/dropdown-menu.html' } }
    }
  },
  methods: {
    clickHandler (msg) {
      let text = 'Button was clicked'

      if (msg) {
        text = msg
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
