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
<KInput class="mb-2" type="search" value="search"/>
<KInput class="mb-2" type="email" value="error"/>

```vue
<KInput placeholder="placeholder" />
<KInput type="password" value="123" />
<KInput type="number" value="1"/>
<KInput type="email" value="john.doe@konghq.com"/>
<KInput disabled value="disabled"/>
<KInput type="search" value="search"/>
<KInput type="email" value="error"/>
```

Additionally you you can use in conjunction with **KLabel** and or a paragraph with the utility class of `.hint`. These are meant to be used before and after KInput and will be styled appropriately. 

<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label & hint" />
<p class="hint">Hint</p>

```vue
<template>
  <KLabel for="my-input">Label</KLabel>
  <KInput id="my-input" type="text" placeholder="I have a label & hint" />
  <p class="hint">Hint</p>
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

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KInput-wrapper">
    <KInput type="email" value="error" />
  </div>
</template>

```vue
<template>
  <div class="KInput-wrapper">
    <KInput type="email" value="error" />
  </div>
</template>

<style>
.KInput-wrapper {
  --KInputError: hotpink;
}
</style>
```

<style lang="scss">
.KInput-wrapper {
  --KInputError: hotpink;
}
</style>
