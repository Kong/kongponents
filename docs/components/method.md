# Method

**KMethod** is a component that provides pre-configured styles for displaying HTTP request methods like `GET`, `POST`, etc. It simplifies the process of showcasing different methods in a visually appealing and consistent manner.

<KMethod method="get"/>

```html
<KMethod method="get"/>
```

## Props

### method

Method the component should display. Supported methods:

- `get`
- `post` 
- `put` 
- `patch`
- `delete`
- `head`
- `options`
- `trace`
- `connect`
- `custom` (for any custom methods)

This prop is required.

<div class="methods-container">
  <KMethod 
    v-for="method in ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom']" :key="method" 
    :method="method"
  />
</div>

```html
<template>
  <KMethod 
    v-for="method in ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom']" 
    :key="method" 
    :method="method" 
  />
</template>
```

### label

KMethod automatically displays method passed through [`method`](#method-1) prop in uppercase, but in case you are displaying any custom methods, you can use this prop.

<KMethod method="custom" label="XYZ" />

```html
<KMethod method="custom" label="XYZ" />
```

### appearance

Appearance of badge. Accepted values are `rounded` (default) and `rectangular`.

<div class="methods-container">
  <KMethod method="options" />
  <KMethod method="options" appearance="rectangular" />
</div>

```html
<KMethod method="options" appearance="rounded" />
<KMethod method="options" appearance="rectangular" />
```

### color

KMethod comes with all styles out of the box, however should you need to configure custom colors for any custom methods - you can use this prop for setting text color. Refer to [`backgroundColor` prop](#backgroundcolor) to see example.

### backgroundColor

Prop for setting method badge background color.

<KMethod method="custom" label="XYZ" color="#FFFF00" background-color="orange" />

```html
<KMethod method="custom" label="XYZ" color="#FFFF00" background-color="orange" />
```

<style lang="scss">
.methods-container {
  display: flex;
  gap: 10px;
}
</style>
