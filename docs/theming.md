---
sidebarDepth: 2
---
# Custom Theming
Kongponents use styles from our base styleguide.css file by default. You can "theme" a component by overriding some of it's default values. To theme a component we use [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) which should be defined in the `:root: {}` tag of your project.

## Inputs
| Variable | Purpose
|:-------- |:-------
| `--KInputBackground `| Default background
| `--KInputBorder `| Default border
| `--KInputColor `| Default font color
| `--KInputFocus `| Focus color
| `--KInputDisabledBackground `| Disabled background
| `--KInputError `| Error border


\
An Example of changing the error border of `KInput` to a different red instead 
would look like
```
<style>
:root {
  --KInputError: #f50086;
}
</style>

<KInput type="email" value="error"/>
```

<style>
#theme-page-kinput {
  --KInputError: #f50086;
}
</style>

<KInput id="theme-page-kinput" type="email" value="error"/>

<br>
<br>

## Popovers
| Variable | Purpose
|:-------- |:-------
| `--KPopBackground `| Default background
| `--KPopBorder `| Default border
| `--KPopColor `| Default font color


\
An Example of changing the color of KPopover text
```
<style>
:root {
  --KPopColor: orange;
}
</style>

<KPop title="email"><button>Click me</button><div slot="content">I have different colored text.</div></KPop>
```

<style>
.theme-container {
  --KPopColor: orange;
}
</style>
<KPop title="email" target=".theme-container"><button>Click me</button><div slot="content">I have different colored text.</div></KPop>
