# Button

KButton is probably the most used Kongponent. It supports a number of variations
and configuration options.

<KButton appearance="primary">I'm a button</KButton>

```html
<KButton appearance="primary">I'm a button</KButton>
```

## Props

### appearance

The Button component can take 1 of 5 appearance values:

- `primary`
- `secondary`
- `tertiary`
- `danger`
- `none`

<div class="spacing-container">
  <KButton appearance="primary">Primary</KButton>
  <KButton appearance="secondary">Secondary</KButton>
  <KButton appearance="tertiary">Tertiary</KButton>
  <KButton appearance="danger">Danger</KButton>
  <KButton appearance="none">None</KButton>
</div>

```html
<KButton appearance="primary">Primary</KButton>
<KButton appearance="secondary">Secondary</KButton>
<KButton appearance="tertiary">Tertiary</KButton>
<KButton appearance="danger">Danger</KButton>
<KButton appearance="none">None</KButton>
```

### size

KButton comes in `small`, `medium`, and `large` sizes. Defaults to `medium`.

<div class="spacing-container">
  <KButton size="large">Large</KButton>
  <KButton size="medium">Medium</KButton>
  <KButton size="small">Small</KButton>
</div>

```html
<KButton size="large">Large</KButton>
<KButton size="medium">Medium</KButton>
<KButton size="small">Small</KButton>
```

### to

KButton can render either a `<a>` or `<router-link>` by simply passing the `to` prop. If it receives an object it will render a router link. If it receives a string it will render an HTML anchor tag

<KButton :to="{path: '/'}" appearance="tertiary">Router Link!</KButton>
<KButton to="https://konghq.com/" appearance="tertiary">Anchor Link!</KButton>

```html
<KButton :to="{path: '/'}" appearance="tertiary">Router Link!</KButton>
<KButton to="https://konghq.com/" appearance="tertiary">Anchor Link!</KButton>
```

### icon

Optional boolean flag that you can use when the only content you are passing to KButton is icon and you need to make the button square (_left and right padding = top and bottom_). Defaults to `false`.

<KButton icon>
  <KongIcon />
</KButton>

```html
<KButton icon>
  <KongIcon />
</KButton>
```

### Disabled HTML Attribute

KButton also supports the disabled attribute with both Button and Anchor types.

<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton to="https://konghq.com/" appearance="tertiary" disabled>Disabled Native Anchor Link</KButton>

```html
<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton to="https://konghq.com/" appearance="tertiary" disabled>Disabled Native Anchor Link</KButton>
```

## Slots

### default

The default slot allows you to provide the button text as well as to slot in other button content such as an icon. KButton takes care of icon color, size and spacing as long as you use icons provided by [@kong/icons](https://github.com/Kong/icons) package.

<div class="spacing-container">
  <KButton size="large">
    <WorldIcon />
    Button One
  </KButton>
  <KButton appearance="secondary">
    Button Two
    <ChevronDownIcon />
  </KButton>
</div>

```html
<KButton size="large">
  <WorldIcon />
  Button One
</KButton>
<KButton appearance="secondary">
  Button Two
  <ChevronDownIcon />
</KButton>
```

:::tip TIP
When utilizing icons inside KButton, some sizes work better than others. You can use the `kui-icon-size-*` tokens exported by the [@kong/design-tokens](https://github.com/Kong/design-tokens) package, or manually set the size.

For utilizing icons in KButton not sourced from `@kong/icons`, we recommend the following dimensions given the button `size`:

- `large`: `24px` or `kui-icon-size-50`
- `medium`: `20px` or `kui-icon-size-40`
- `small`: `16px` or `kui-icon-size-30`

We also recommend setting the icon style `color` property to a value of `currentColor` to inherit the default KButton styling for slotted content.
:::

## Events

KButton supports all events a native `button` and `a` elements do. Simply bind your event handler function to event with any modifiers.

<form>
  <KButton
    type="submit"
    @click.prevent="onButtonClick"
    @keydown.enter.prevent="onButtonEnter"
  >
    Simple button
  </KButton>
</form>

```html
<form>
  <KButton
    type="submit"
    @click.prevent="onButtonClick"
    @keydown.enter.prevent="onButtonEnter"
  >
    Simple button
  </KButton>
</form>
```

<script setup lang="ts">
import { WorldIcon, ChevronDownIcon, KongIcon } from '@kong/icons'

const onButtonClick = () => {
  alert('Button was clicked')
}

const onButtonEnter = () => {
  alert('Enter was pressed')
}
</script>

<style lang="scss" scoped>
.preview-code .preview div {
  display: flex;
  flex-wrap: wrap;

  .button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}

.icon-prop-demo-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  column-gap: 10px;

  @media screen and (min-width: $kui-breakpoint-mobile) {
    flex-direction: row;
  }
}

.spacing-container {
  display: flex;
  gap: $kui-space-40;
  flex-direction: row;
  align-items: flex-end;
}
</style>
