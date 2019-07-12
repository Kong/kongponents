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

## Slots
### Icon
KButton supports using an icon either before the text or without text.  

<KButton appearance="secondary">
  <KIcon
    slot="icon"
    icon="gear" />With Text</KButton>
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
| `--kButtonPrimaryBase `| Primary background
| `--kButtonPrimaryHover`| Primary hover state
| `--kButtonPrimaryActive`| Primary active state
| `--kButtonSecondaryColor`| Secondary text color
| `--kButtonSecondaryBase`| Secondary background
| `--kButtonSecondaryBorder`| Secondary border
| `--kButtonSecondaryHover`| Secondary hover state
| `--kButtonSecondaryHoverBorder`| Secondary hover border
| `--kButtonSecondaryActive`| Secondary active state 
| `--kButtonSecondaryActiveBorder`| Secondary active state border
| `--kButtonDangerBase`| Danger background
| `--kButtonDangerHover`| Danger hover state
| `--kButtonDangerActive`| Danger active state
| `--kButtonOutlineBackground`| Primary outline background (white 50%)
| `--kButtonOutlinePrimaryBorder`| Primary outline border
| `--kButtonOutlinePrimaryHover`| Primary outline hover state
| `--kButtonOutlinePrimaryActive`| Primary outline active state
| `--kButtonOutlineDangerBorder`| Danger outline border
| `--kButtonOutlineDangerHover`| Danger outline hover state
| `--kButtonOutlineDangerActive`| Danger outline active state
| `--kButtonLink`| Button link variant
| `--kButtonLinkDanger`| Button Danger link variant

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
