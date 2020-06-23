# Input

**KInput** provides a wrapper around general `text` input's and provides specific Kong styling and state treatments (error, focus, etc).

<KInput class="w-100"/>
```vue
<KInput class="w-100"/>
```

## Props
You can pass any input attribute and it will get properly bound to the element.

<KInput class="mb-2" placeholder="placeholder" />
<KInput class="mb-2" type="password" value="123" />
<KInput class="mb-2" type="number" value="1"/>
<KInput class="mb-2" type="email" value="john.doe@konghq.com"/>
<KInput class="mb-2" disabled value="disabled"/>
<KInput class="mb-2" readonly value="readonly"/>
<KInput class="mb-2" type="search" value="search"/>
<KInput class="mb-2 input-error" type="email" value="error"/>

> Note: Add the `input-error` class to add custom error styling

```vue
<KInput placeholder="placeholder" />
<KInput type="password" value="123" />
<KInput type="number" value="1"/>
<KInput type="email" value="john.doe@konghq.com"/>
<KInput disabled value="disabled"/>
<KInput read-only value="read-only"/>
<KInput type="search" value="search"/>
<KInput type="email" value="error" class="input-error"/>
```

Additionally you you can use in conjunction with **KLabel** and or a paragraph with the utility class of `.help`. These are meant to be used before and after KInput and will be styled appropriately. 

<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label & help" />
<p class="help">Help text</p>

```vue
<template>
  <KLabel for="my-input">Label</KLabel>
  <KInput id="my-input" type="text" placeholder="I have a label & help" />
  <p class="help">help</p>
</template>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KInputColor` | Input text color
| `--KInputBorder` | Input border color
| `--KInputBackground` | Input background color
| `--KInputFocus` | Input focus border color
| `--KInputDisabledBackground` | Input disabled background color
| `--KInputError` | Input error border color


An Example of changing the error border color of KInput to pink might look like:

<template>
  <KInput class="custom-input input-error" type="email" value="error" />
</template>

```vue
<template>
  <KInput class="custom-input input-error" type="email" value="error" />
</template>

<style>
.custom-input {
  --KInputError: hotpink;
}
</style>
```

<style lang="scss">
.custom-input {
  --KInputError: hotpink;
}
</style>
