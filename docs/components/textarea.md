# TextArea

**KTextArea** - Text areas are primarily used in modal views (wizards).
<KTextArea />
```vue
<KTextArea />
```

### Label
String to be used as the textarea label. Make sure that if you are using the built in label you specify the `--KInputBackground` theming variable. This variable is used for the background of the label as well as the textarea element. 

- `label`

<KTextArea placeholder="I'm labelled!" />

```vue
<KTextArea label="Name" placeholder="I'm labelled!" />
```

If the label is omitted it can be handled with another component, like **KLabel**. This is meant to be used before **KTextArea** will be styled appropriately. 

<KLabel>Label</KLabel>
<KTextArea placeholder="I have a label" />

```vue
<template>
  <KLabel>Label</KLabel>
  <KTextArea placeholder="I have a label" />
</template>
```

