# KModalFullscreen

**KModalFullscreen** - A Fullscreen Modal

<KModalFullscreen />
```vue
<KModalFullscreen />
```

## Props

### Prop1

Description of prop1

Actual component using prop1
<KModalFullscreen />

```vue
<KModalFullscreen prop1="variation1" />
<KModalFullscreen prop1="variation2" />
<KModalFullscreen prop1="variation3" />
```

## Slots

- `default` - default slot description
- `slot1` - slot1 description

```vue
<KModalFullscreen>
  here is some slot content
</KModalFullscreen>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KModalFullscreenBorderColor`| KModalFullscreen border color

An Example of changing the border color of KModalFullscreen to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KModalFullscreen-wrapper">
    <KModalFullscreen />
  </div>
</template>

```vue
<template>
  <div class="KModalFullscreen-wrapper">
    <KModalFullscreen />
  </div>
</template>

<style>
.KModalFullscreen-wrapper {
  --KModalFullscreen-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KModalFullscreen-wrapper {
  --KModalFullscreen-wrapperBorderColor: lime;
}
</style>
