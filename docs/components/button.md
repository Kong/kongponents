# Button

**KButton** is probably the most used Kongponent. It supports a number of variations
and configuration options.

<KButton appearance="primary">I'm a button</KButton> 
```vue
<KButton appearance="primary">I'm a button</KButton> 
```  

## Props
### Appearances
The Button component can take 1 of 7 appearance values:

- `secondary`  
- `primary`  
- `danger`
- `outline-primary`  
- `outline-danger`  
- `btn-link`  
- `btn-link-danger`

<KButton class="mr-2 mb-2" appearance='primary'>primary</KButton>
<KButton class="mr-2 mb-2" appearance='danger'>danger</KButton>
<KButton class="mr-2 mb-2" appearance="secondary">secondary</KButton>
<KButton class="mr-2 mb-2" appearance='outline-primary'>outline-primary</KButton>
<KButton class="mr-2 mb-2" appearance='outline-danger'>outline-danger</KButton>
<KButton class="mr-2 mb-2" appearance='btn-link'>btn-link</KButton>
<KButton class="mr-2 mb-2" appearance='btn-link-danger'>btn-link-danger</KButton>

```vue
<KButton appearance='primary'>primary</KButton>
<KButton appearance='danger'>danger</KButton>
<KButton appearance="secondary">secondary</KButton>
<KButton appearance='outline-primary'>outline-primary</KButton>
<KButton appearance='outline-danger'>outline-danger</KButton>
<KButton appearance='btn-link'>btn-link</KButton>
<KButton appearance='btn-link-danger'>btn-link-danger</KButton>
```

### Sizes
Currently we only support small however, larger sizes may be supported later.

- `small`  

<KButton
  appearance="secondary"
  size="small">Small</KButton>

```vue
<KButton
  appearance="secondary"
  size="small">Small</KButton>
```

### Caret
- `isOpen`

KButton can display a dropdown caret to the right hand side. This is useful for buttons that control dropdowns and popovers. When the prop `isOpen` is `false`, the caret will display pointing down. You can rotate the caret (active state) to point up by setting `isOpen` to `true`.

<Komponent :data="{ isActive: false}" v-slot="{ data }">
  <KButton appearance="primary" :isOpen="data.isActive" @click="data.isActive = !data.isActive">I'm a button</KButton> 
</Komponent>

> The `Komponent` component is used in this example to create state.
```vue
<Komponent:data="{ isActive: false }" v-slot="{ data }">
  <KButton
    appearance="primary"
    :isOpen="data.isActive"
    @click="data.isActive = !data.isActive">
    I'm a button
  </KButton> 
</Komponent>
```

### Anchor Tag
KButton can render either a `<a>` or `<router-link>` by simply passing the `to` prop. If it receives an object it will render a router link. If it receives a string it will render an HTML anchor tag

- `to`  

<KButton
  :to="{path: '/'}"
  appearance="btn-link">Router Link!</KButton>
<KButton
  to="http://google.com"
  appearance="btn-link">Anchor Link!</KButton>

```vue
<KButton
  :to="{path: '/'}"
  appearance="btn-link">Router Link!</KButton>
<KButton
  to="http://google.com"
  appearance="btn-link">Anchor Link!</KButton>
```

### Disabled HTML Attribute
KButton also supports the disabled attribute with both Button and Anchor types.

<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton
  to="http://google.com"
  appearance="btn-link"
  disabled>Disabled Native Anchor Link</KButton>
  
```vue
<KButton appearance="danger" disabled>Disabled Danger</KButton>
<KButton
  to="http://google.com"
  appearance="btn-link"
  disabled>Disabled Native Anchor Link</KButton>
```

## Slots
### Icon
KButton supports using an icon either before the text or without text.  

<KButton appearance="secondary">
  <template v-slot:icon>
    <KIcon icon="externalLink" />
  </template>
  With Text
</KButton>
<KButton appearance="secondary">
  <template v-slot:icon>
    <KIcon icon="gear" />
  </template>
</KButton>

```vue
<KButton appearance="secondary">
  <template v-slot:icon>
    <KIcon icon="externalLink" />
  </template>
  With Text
</KButton>
<KButton appearance="secondary">
  <template v-slot:icon>
    <KIcon icon="gear" />
  </template>
</KButton>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KButtonPrimaryBase `| Primary background
| `--KButtonPrimaryHover`| Primary hover state
| `--KButtonPrimaryActive`| Primary active state
| `--KButtonSecondaryBase`| Secondary background
| `--KButtonSecondaryBorder`| Secondary border
| `--KButtonSecondaryHover`| Secondary hover state
| `--KButtonSecondaryHoverBorder`| Secondary hover border
| `--KButtonSecondaryActive`| Secondary active state 
| `--KButtonSecondaryActiveBorder`| Secondary active state border
| `--KButtonSecondaryFocus` | Secondary focus box shadow color
| `--KButtonDangerBase`| Danger background
| `--KButtonDangerHover`| Danger hover state
| `--KButtonDangerActive`| Danger active state
| `--KButtonOutlinePrimaryColor` | Primary outline text color
| `--KButtonOutlinePrimaryBorder`| Primary outline border
| `--KButtonOutlinePrimaryHoverBorder`| Primary outline hover state border
| `--KButtonOutlinePrimaryActive`| Primary outline active state
| `--KButtonOutlinePrimaryActiveBorder`| Primary outline active state border
| `--KButtonOutlineDangerColor` | Danger outline text color
| `--KButtonOutlineDangerBorder`| Danger outline border
| `--KButtonOutlineDangerHoverBorder`| Danger outline hover state
| `--KButtonOutlineDangerActive`| Danger outline active state
| `--KButtonOutlineDangerActiveBorder`| Danger outline active state border
| `--KButtonLink`| Button link variant
| `--KButtonLinkDanger`| Button Danger link variant
| `--KButtonPaddingY`| Button vertical (top and bottom) padding
| `--KButtonPaddingX`| Button horizontal (left and right) padding
| `--KButtonRadius` | Button corner radius

\
An Example of changing the primary KButton variant to purple instead of blue might
look like.  

<template>
  <KButton class="purple-button" appearance="primary">PURPLE!</KButton>
</template>

```vue
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
.preview-code .preview div {
  display: flex;
  flex-wrap: wrap;
  .button {
    margin-right: .5rem;
    margin-bottom: .5rem;
  }
}
.purple-button {
  --KButtonPrimaryBase: #494ca2;
  --KButtonPrimaryHover: #6c6ebd;
  --KButtonPrimaryActive: #3c3f86;
}
</style>
