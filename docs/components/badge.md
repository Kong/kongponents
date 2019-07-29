# Badge

**KBadge** - Badges, pills, or whatever you wanna call them. Slap it on
something.

<KBadge appearance="success">SUCCESS</KBadge> <br><br>

```vue
<KBadge appearance="success">SUCCESS</KBadge>
```

## Props

### appearance

The Button component can take 1 of 4 appearance values:

- `success`
- `danger`
- `warning`
- `custom`

<KBadge appearance="success">SUCCESS</KBadge>
<KBadge appearance="warning">WARNING</KBadge>
<KBadge appearance="danger">DANGER</KBadge>

```vue
<KBadge appearance="success">SUCCESS</KBadge>
<KBadge appearance="warning">WARNING</KBadge>
<KBadge appearance="danger">DANGER</KBadge>
```
<br>

### color, background-color

Using the `custom` appearance in conjunction with `color` and `background-color`:

<KBadge color="var(--yellow-darker)" background-color="var(--yellow-base)">Custom</KBadge>
<KBadge color="var(--red-lightest)" background-color="var(--red-light)">Badge</KBadge>
<KBadge color="var(--blue-lighter)" background-color="var(--blue-base)">👋🏻 Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>

```vue
<KBadge color="var(--yellow-darker)" background-color="var(--yellow-base)">Custom</KBadge>
<KBadge color="var(--red-lightest)" background-color="var(--red-light)">Badge</KBadge>
<KBadge color="var(--blue-lighter)" background-color="var(--blue-base)">👋🏻 Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
```

## Slots

- `default` - innerHTML inside badge

```vue
<KBadge type="success">SUCCESS</KBadge>
```

## Theming

| Variable               | Purpose              |
| :--------------------- | :------------------- |
| `--KBadgeBorderRadius` | KBadge border radius |

An example of making the badges more like pills

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KBadge-wrapper">
    <KBadge appearance="danger">HIGH</KBadge>
  </div>
</template>

```vue
<template>
  <div class="KBadge-wrapper">
    <KBadge appearance="danger">HIGH</KBadge>
  </div>
</template>

<style>
.KBadge-wrapper {
  --KBadgeBorderRadius: 50px;
}
</style>
```

<style lang="scss">
.KBadge-wrapper {
  --KBadgeBorderRadius: 50px;
}
</style>
