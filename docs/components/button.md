# Button

**KButton** is probably the most used Kongponent. It supports a number of variations
and configuration options.

```vue live
<KButton appearance="primary">I'm a button</KButton> 
```  

### Appearances
The Button component can take 1 of 7 appearance values:

`secondary`  
`primary`  
`danger`  
`outline-primary`  
`outline-danger`  
`btn-link`  
`btn-link-danger`

```vue live
<KButton>default</KButton>
<KButton appearance="secondary">secondary</KButton>
<KButton appearance='primary'>primary</KButton>
<KButton appearance='danger'>danger</KButton>
<KButton appearance='outline-primary'>outline-primary</KButton>
<KButton appearance='outline-danger'>outline-danger</KButton>
<KButton appearance='btn-link'>btn-link</KButton>
<KButton appearance='btn-link-danger'>btn-link-danger</KButton>
```

### Sizes
Currently we only support small however, larger sizes may be supported later.

`small`

```vue live
<KButton appearance="secondary" size="small">Small</KButton>
```

### Buttons with an icon
Buttons support using an icon either before the text or without text.

```vue live
<KButton appearance="secondary">
  <KIcon slot="icon" icon="gear" />
  With Text
</KButton>
<KButton appearance="secondary">
  <KIcon slot="icon" icon="gear" />
</KButton>
```

### Button Props

| prop         | type   | Description
| :----------  | :----  | :----------
| `appearance` | string | the color variation
| `size`       | string | size of button (only small)


<style lang="scss">
.preview-code .preview div {
  display: flex;
  flex-wrap: wrap;
  .button {
    margin-right: .5rem;
    margin-bottom: .5rem;
  }
}
</style>
