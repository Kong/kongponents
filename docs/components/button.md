---
pageClass: docs-kbutton
---
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

<KButton appearance='primary'>primary</KButton>
<KButton appearance='danger'>danger</KButton>
<KButton appearance="secondary">secondary</KButton>
<KButton appearance='outline-primary'>outline-primary</KButton>
<KButton appearance='outline-danger'>outline-danger</KButton>
<KButton appearance='btn-link'>btn-link</KButton>
<KButton appearance='btn-link-danger'>btn-link-danger</KButton>

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
  <KIcon
    slot="icon"
    icon="gear" />With Text
</KButton>
<KButton appearance="secondary">
  <KIcon
    slot="icon"
    icon="gear" />
</KButton>

```vue
<KButton appearance="secondary">
  <KIcon
    slot="icon"
    icon="gear" />
  With Text
</KButton>
<KButton appearance="secondary">
  <KIcon
    slot="icon"
    icon="gear" />
</KButton>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KButtonPrimaryBase `| Primary background
| `--KButtonPrimaryHover`| Primary hover state
| `--KButtonPrimaryActive`| Primary active state
| `--KButtonSecondaryColor`| Secondary text color
| `--KButtonSecondaryBase`| Secondary background
| `--KButtonSecondaryBorder`| Secondary border
| `--KButtonSecondaryHover`| Secondary hover state
| `--KButtonSecondaryHoverBorder`| Secondary hover border
| `--KButtonSecondaryActive`| Secondary active state 
| `--KButtonSecondaryActiveBorder`| Secondary active state border
| `--KButtonDangerBase`| Danger background
| `--KButtonDangerHover`| Danger hover state
| `--KButtonDangerActive`| Danger active state
| `--KButtonOutlineBackground`| Primary outline background (white 50%)
| `--KButtonOutlinePrimaryBorder`| Primary outline border
| `--KButtonOutlinePrimaryHover`| Primary outline hover state
| `--KButtonOutlinePrimaryActive`| Primary outline active state
| `--KButtonOutlineDangerBorder`| Danger outline border
| `--KButtonOutlineDangerHover`| Danger outline hover state
| `--KButtonOutlineDangerActive`| Danger outline active state
| `--KButtonLink`| Button link variant
| `--KButtonLinkDanger`| Button Danger link variant
| `--KButtonPaddingY`| Button vertical (top and bottom) padding
| `--KButtonPaddingX`| Button horizontal (left and right) padding

\
An Example of changing the primary KButton variant to purple instead of blue might
look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="button-wrapper">
    <KButton appearance="primary">PURPLE!</KButton>
  </div>
</template>

```vue
<template>
  <div class="button-wrapper">
    <KButton appearance="primary">PURPLE!</KButton>
  </div>
</template>

<style>
.button-wrapper {
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
.button-wrapper {
  --KButtonPrimaryBase: #494ca2;
  --KButtonPrimaryHover: #6c6ebd;
  --KButtonPrimaryActive: #3c3f86;
}
</style>
