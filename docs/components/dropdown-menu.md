# DropdownMenu

**KDropdownMenu** is a button (or any slotted content) that is clicked to trigger a popover containing menu items beneath it.

HOW DOES THIS DIFFER FROM KSELECT

<div>
  <KDropdownMenu
    class="more-actions-dropdown"
    :kpop-attributes="{
      placement: 'bottomEnd',
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

<div>
  <KDropdownMenu
    class="top-bar-dropdown-menu d-flex mr-1"
    :kpop-attributes="{ placement: 'bottomStart', width: '220', disabled: false }"
    :disabled="false"
    disabled-tooltip="tooltip text"
    :class="{ 'global-switcher-disabled': false }"
  >
    <template #default="{ isOpen }">
      <KButton
        class="top-bar-dropdown-trigger"
        :class="{ 'is-active': isOpen }"
        :is-open="isOpen"
        :disabled="false"
        data-testid="top-bar-dropdown-menu-toggle-button"
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
        class="danger"
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
      class="danger"
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
    }
  }
}
</script>

<style lang="scss">
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
