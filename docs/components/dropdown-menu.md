# DropdownMenu

**KDropdownMenu** - Dropdown Menu component

<div>
  <KDropdownMenu :kpop-attributes="{ placement: 'bottomStart', width: '200' }">
    <template #default="{ isOpen }">
      <KButton
        :is-open="isOpen"
        appearance="creation"
        icon="gearFilled"
      />
    </template>
    <template #items>
      <KDropdownItem
        :item="{ label: 'I am a link', to: { path: '/' } }"
        disabled
      />
      <KDropdownItem>
        Generic item
      </KDropdownItem>
      <KDropdownItem
        has-divider
        class="danger"
        @click="clickHandler"
      >
        Danger button
      </KDropdownItem>
    </template>
  </KDropdownMenu>
</div>

```html
<KDropdownMenu :kpop-attributes="{ placement: 'bottomStart', width: '200' }">
  <template #default="{ isOpen }">
    <KButton
      :is-open="isOpen"
      appearance="creation"
      icon="gearFilled"
    />
  </template>
  <template #items>
    <KDropdownItem
      :item="{ label: 'I am a link', to: { path: '/' } }"
      disabled
    />
    <KDropdownItem>
      Generic item
    </KDropdownItem>
    <KDropdownItem
      has-divider
      class="danger"
      @click="clickHandler"
    >
      Danger button
    </KDropdownItem>
  </template>
</KDropdownMenu>
```

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

### Prop1

Description of prop1

Actual component using prop1
<KDropdownMenu />

```html
<KDropdownMenu prop1="variation1" />
```

## Slots

- `default` - default slot description
- `slot1` - slot1 description

```html
<KDropdownMenu>
  here is some slot content
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
      defaultIsOpen: false
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
