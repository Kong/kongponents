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

:::warning NOTE
Should you need to use a KTooltip component on a KButton with `disabled` attribute, don't forget to wrap an additional tag around your KButton, like shown in the example below. Otherwise KTooltip won't be triggered since elements with `disabled` attribute don't trigger pointer events.
:::

<KCard>
  <template #body>
    <div class="spacing-container">
      <KTooltip label="I won't pop up">
        <KButton disabled>❌</KButton>
      </KTooltip>
      <KTooltip label="I will pop up">
        <span>
          <KButton disabled>✅</KButton>
        </span>
      </KTooltip>
    </div>
  </template>
</KCard>

```html
<KTooltip label="I won't show up">
  <KButton disabled>❌</KButton>
</KTooltip>
<KTooltip label="I will pop up">
  <span>
    <KButton disabled>✅</KButton>
  </span>
</KTooltip>
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

<style scoped lang="scss">
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
  align-items: baseline;
}
</style>
