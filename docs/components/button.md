# Button

**KButton** is probably the most used Kongponent. It supports a number of variations
and configuration options.

<KButton appearance="primary">I'm a button</KButton>

```html
<KButton appearance="primary">I'm a button</KButton>
```

## Props

### appearance

The Button component can take 1 of 6 appearance values:

- `primary`
- `secondary`
- `outline`
- `danger`
- `creation`
- `btn-link`

<div class="spacing-container">
  <KButton appearance="primary">Primary</KButton>
  <KButton appearance="secondary">Secondary</KButton>
  <KButton appearance="outline">Outline</KButton>
  <KButton appearance="danger">Danger</KButton>
  <KButton appearance="creation">Creation</KButton>
  <KButton appearance="btn-link">btn-link</KButton>
</div>

```html
<KButton appearance="primary">Primary</KButton>
<KButton appearance="secondary">Secondary</KButton>
<KButton appearance="outline">Outline</KButton>
<KButton appearance="danger">Danger</KButton>
<KButton appearance="creation">Creation</KButton>
<KButton appearance="btn-link">btn-link</KButton>
```

### size

We support `small`, `medium`, and `large` sizes, default to `medium`.

- `small`
- `medium`
- `large`

<div class="spacing-container">
  <KButton appearance="secondary" size="small">Small</KButton>
  <KButton appearance="secondary" size="medium">Medium</KButton>
  <KButton appearance="secondary" size="large">Large</KButton>
</div>

```html
<KButton appearance="secondary" size="small">Small</KButton>
<KButton appearance="secondary" size="medium">Medium</KButton>
<KButton appearance="secondary" size="large">Large</KButton>
```

### showCaret

Use this prop if you would like the KButton to display a dropdown caret to the right hand side.

<KComponent :data="{ isActive: false}" v-slot="{ data }">
  <KButton :appearance="data.isActive ? 'primary' : 'outline'" @click="data.isActive = !data.isActive" show-caret>I'm an {{ data.isActive ? 'active' : 'inactive' }} button</KButton>
</KComponent>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ isActive: false }" v-slot="{ data }">
  <KButton :appearance="data.isActive ? 'primary' : 'outline'" @click="data.isActive = !data.isActive" show-caret>
    I'm an {{ data.isActive ? 'active' : 'inactive' }} button
  </KButton>
</KComponent>
```

### caretColor

::: tip NOTE
Use this prop in conjunction with the `showCaret` prop
:::

Use this prop to customize the color of the caret

<KButton
  caret-color="lightblue"
  show-caret
>
  Select Item
</KButton>

```html
<KButton caret-color="lightblue" show-caret>
  Select Item
</KButton>
```

### isRounded

The buttons are rounded by default. This can be disabled by setting `isRounded` prop to `false`.

<div class="spacing-container">
  <KButton appearance="primary" :isRounded="false">I'm a button</KButton>
  <KButton appearance="primary" >I'm a button</KButton>
</div>

```html
<KButton appearance="primary" :isRounded="false">I'm a button</KButton>
<KButton appearance="primary" >I'm a button</KButton>
```

### icon

A string for the `KIcon` name to be displayed to the left of the button's content. Specifying a value for `icon` will automatically indicate that it should be visible.

If the disable state of the button can be changed, it is recommended to use the `icon` property instead of the slot, as using the prop will apply correct
coloring to the icon depending on the `disabled` state of the button.

<div class="icon-prop-demo-section">
  <KButton appearance="primary" icon="spinner">I'm a button</KButton>
  <KButton appearance="primary" icon="spinner" disabled>I'm a button</KButton>
</div>

```html
<KButton appearance="primary" icon="spinner">I'm a button</KButton>
<KButton appearance="primary" icon="spinner" disabled>I'm a button</KButton>
```

### to

KButton can render either a `<a>` or `<router-link>` by simply passing the `to` prop. If it receives an object it will render a router link. If it receives a string it will render an HTML anchor tag

<KButton :to="{path: '/'}" appearance="btn-link">Router Link!</KButton>
<KButton to="http://google.com" appearance="btn-link">Anchor Link!</KButton>

```html
<KButton :to="{path: '/'}" appearance="btn-link">Router Link!</KButton>
<KButton to="http://google.com" appearance="btn-link">Anchor Link!</KButton>
```

### Disabled HTML Attribute

KButton also supports the disabled attribute with both Button and Anchor types.

<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton to="http://google.com" appearance="btn-link" disabled>Disabled Native Anchor Link</KButton>

```html
<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton to="http://google.com" appearance="btn-link" disabled>Disabled Native Anchor Link</KButton>
```

## Slots

### Icon

KButton supports using an icon either before the text or without text. If you are using the slot you must maintain the icon color yourself when the button is enabled or disabled.

<div class="spacing-container">
  <KButton appearance="secondary">
    <template v-slot:icon>
      <KIcon icon="externalLink" color="#003694"/>
    </template>
    With Text
  </KButton>
  <KButton appearance="secondary" size="small">
    <template v-slot:icon>
      <KIcon icon="gear" color="#003694"/>
    </template>
  </KButton>
</div>

```html
<KButton appearance="secondary">
  <template v-slot:icon>
    <KIcon icon="externalLink" />
  </template>
  With Text
</KButton>
<KButton appearance="secondary" size="small">
  <template v-slot:icon>
    <KIcon icon="gear" />
  </template>
</KButton>
```

## Theming

| Variable                       | Purpose                                    |
| :----------------------------- | :----------------------------------------- |
| `--KButtonPrimaryBase`         | Primary background                         |
| `--KButtonPrimaryHover`        | Primary hover state                        |
| `--KButtonPrimaryActive`       | Primary active state                       |
| `--KButtonSecondaryBase`       | Secondary background                       |
| `--KButtonSecondaryHover`      | Secondary hover state                      |
| `--KButtonSecondaryActive`     | Secondary active state                     |
| `--KButtonSecondaryFocus`      | Secondary focus box shadow color           |
| `--KButtonDangerBase`          | Danger background                          |
| `--KButtonDangerHover`         | Danger hover state                         |
| `--KButtonDangerActive`        | Danger active state                        |
| `--KButtonCreationBase`        | Creation background                        |
| `--KButtonCreationHover`       | Creation hover state                       |
| `--KButtonCreationActive`      | Creation active state                      |
| `--KButtonOutlineColor`        | Outline text color                         |
| `--KButtonOutlineBorder`       | Outline border                             |
| `--KButtonOutlineHoverBorder`  | Outline hover state border                 |
| `--KButtonOutlineActive`       | Outline active state                       |
| `--KButtonOutlineActiveBorder` | Outline active state border                |
| `--KButtonLink`                | Button link variant                        |
| `--KButtonLinkDanger`          | Button Danger link variant                 |
| `--KButtonPaddingY`            | Button vertical (top and bottom) padding   |
| `--KButtonPaddingX`            | Button horizontal (left and right) padding |
| `--KButtonRadius`              | Button corner radius                       |

An Example of changing the primary KButton variant to purple instead of blue might
look like.

<KButton class="purple-button" appearance="primary">PURPLE!</KButton>

```html
<template>
  <KButton class="purple-button" appearance="primary">PURPLE!</KButton>
</template>

<style>
.purple-button {
  --KButtonPrimaryBase: #494ca2;
  --KButtonPrimaryHover: #6c6ebd;
  --KButtonPrimaryActive: #3c3f86;
}
</style>
```

<style scoped lang="scss">
@import '@/styles/variables';

.preview-code .preview div {
  display: flex;
  flex-wrap: wrap;
  .button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.purple-button {
  --KButtonPrimaryBase: #494ca2;
  --KButtonPrimaryHover: #6c6ebd;
  --KButtonPrimaryActive: #3c3f86;
}
.icon-prop-demo-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  column-gap: 10px;

  @media screen and (min-width: $viewport-sm) {
    flex-direction: row;
  }
}
.spacing-container {
  display: flex;
  gap: $kui-space-40;
  flex-direction: row;
  align-items: baseline;
}
</style>
