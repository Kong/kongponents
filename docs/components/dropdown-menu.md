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
<KDropdownMenu :kpop-attributes="{ placement: 'bottomEnd', width: '200' }">
  <template #default="{ isOpen }">
    <KButton
      :is-open="isOpen"
      appearance="creation"
      icon="gearFilled"
    />
  </template>
  <template #items>
    <KDropdownItem
      :item="{ label: 'I am a link', to: '/' }"
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
    clickHandler () {
      this.$toaster.open('Button was clicked')
    }
  }
}
</script>

<style lang="scss">
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
