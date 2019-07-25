# Card

**KCard** is meant to highlight content in grids or group relative information together.

&nbsp;
<KCard title="Card Title" body="Body Content"/>

```vue
<KCard title="Card Title" body="Body Content"/>
```

## Props
### title
String to be used in the title slot.

- `title`

### Body
String to be used in the body slot.

- `body`

### Border Variants
Sets top border or no border. If neither set default will have border

- `borderTop`
- `noBorder`

<div class="borderless-cards">
  <KCard
    title="Card without border"
    body="Body Content"
    borderVariant="noBorder"/>

  <KCard
    title="Card with top border"
    body="Body Content"
    borderVariant="borderTop"/>
</div>

```vue
<KCard
  title="Card without border"
  body="Body Content"
  borderVariant="noBorder"/>

<KCard
  title="Card with top border"
  body="Body Content"
  borderVariant="borderTop"/>
```

### Hover
Sets if card has hover state (shadow)

- `hasHover` 

<KCard
  title="Card Title"
  body="Body Content"
  hasHover/>

```vue
<KCard
  title="Card Title"
  body="Body Content"
  hasHover/>
```

## Slots
- `title`
- `body`
- `actions` - Right side of title. Used for links, buttons, etc

&nbsp;
<KCard>
  <template slot="title">Look Mah!</template>
  <template slot="actions"><a href="#">View All</a></template>
  <template slot="body">
    <h3>We're slotted!</h3>
  </template>
</KCard>

```vue
<KCard>
  <template slot="title">Look Mah!</template>
  <template slot="actions"><a href="#">View All</a></template>
  <template slot="body">
    <h3>We're slotted!</h3>
  </template>
</KCard>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KCardTitle `| Card title text color
| `--KCardBorder`| Card border color

\
An Example of changing the KCard border color to lime might look like. 

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="card-wrapper">
    <KCard title="Card Title" body="Body Content"/>
  </div>
</template>

```vue
<template>
  <div class="card-wrapper">
    <KCard title="Card Title" body="Body Content"/>
  </div>
</template>

<style>
.card-wrapper {
  --KCardBorder: lime;
}
</style>
```

<style lang="scss">
.borderless-cards {
  padding: 1rem;
  background: rgba(27,31,35,0.05);
  border-radius: 3px;
  .kong-card {
    background: #fff;
  }
}
.card-wrapper {
  --KCardBorder: lime;
}
</style>
