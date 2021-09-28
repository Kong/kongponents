# TextArea

**KTextArea** - Text area component

<KTextArea />
```vue
<KTextArea />
```

## Props
### Prop1
Description of prop1

Actual component using prop1
<KTextArea />

```vue
<KTextArea prop1="variation1" />
<KTextArea prop1="variation2" />
<KTextArea prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KTextArea>
  here is some slot content
</KTextArea>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KTextAreaBorderColor `| KTextArea border color


An Example of changing the border color of KTextArea to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTextArea-wrapper">
    <KTextArea />
  </div>
</template>

```vue
<template>
  <div class="KTextArea-wrapper">
    <KTextArea />
  </div>
</template>

<style>
.KTextArea-wrapper {
  --KTextArea-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTextArea-wrapper {
  --KTextArea-wrapperBorderColor: lime;
}
</style>
