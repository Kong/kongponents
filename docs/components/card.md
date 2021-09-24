# Card

**KCard** is meant to highlight content in grids or group relative information together.

&nbsp;
<KCard title="Card Title" body="Body Content"/>

```vue
<KCard title="Card Title" body="Body Content"/>
```

## Props
### Title
String to be used in the title slot.

- `title`

<KCard title="Title">
  <template v-slot:body>
    I am the body.
  </template>
</KCard>

```vue
<KCard title="Title">
  <template v-slot:body>
    I am the body.
  </template>
</KCard>
```

If the title is omitted, then KCard acts as a generic Box element.

<KCard>
  <template v-slot:body>
    I am a box. I have padding and a border. Useful for composing other components
  </template>
</KCard>

```vue
<KCard>
  <template v-slot:body>
    I am a box. I have padding and a border. Useful for composing other components
  </template>
</KCard>
```

Example composing `KCard` with other Kongponents to make another component:

<KCard :hasHover="true">
  <template v-slot:body>
    <KAlert alert-message="Welcome to Kong!" />
    <div class="mx-4">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Kong Enterprise Edition</h2>
        <KButton appearance="outline" to="https://docs.konghq.com/enterprise" target="_blank">
          Docs
        </KButton>
      </div>
      <div class="mt-2">
        <p>Kong Enterprise adds features, functionality, and performance to Kong. This documentation doesn’t cover the general practices that are common to both Kong and Kong Enterprise—learn the basics in Kong documentation.</p>
      </div>
    </div>
  </template>
</KCard>


```vue
<KCard :hasHover="true">
  <template v-slot:body>
    <KAlert alert-message="Welcome to Kong!" />
    <div class="mx-4">
      <div>
        <h2>Kong Enterprise Edition</h2>
        <KButton appearance="outline" to="https://docs.konghq.com/enterprise" target="_blank">
          Docs
        </KButton>
      </div>
      <div class="mt-2">
        <p>Kong Enterprise adds features, functionality, and performance to Kong. This documentation doesn’t cover the general practices that are common to both Kong and Kong Enterprise—learn the basics in Kong documentation.</p>
      </div>
    </div>
  </template>
</KCard>
```

### Body
String to be used in the body slot.

- `body`

<KCard body="I am the body."/>

```vue
<KCard body="I am the body."/>
```

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

### Shadow
Sets if card has shadow state (shadow)

- `hasHover` only set shadow on hover
- `hasShadow` always setShadow

<KCard
  title="hasHover"
  class="mb-2"
  body="This card only has a shadow on hover"
  hasHover/>

<KCard
  title="hasShadow"
  body="This card always has a shadow"
  hasShadow/>

```vue
<KCard
  title="hasHover"
  class="mb-2"
  body="This card only has a shadow on hover"
  hasHover/>

<KCard
  title="hasShadow"
  body="This card always has a shadow"
  hasShadow/>
```

### Side by side
Cards can be arranged with flex box.

<div class="d-flex flex-row">
  <KCard
    title="Left"
    class="w-auto"
    body="This card only has a title"
  />
  <KCard
    title="Center"
    class="w-auto mx-5"
    body="This card always has a icon button"
  >
    <template v-slot:actions>
      <KButton size="small" appearance="outline">
        <KIcon
            icon="gearFilled"
            width="16px"
            view-box="0 0 16 16"
            class="pr-0"
          />
      </KButton>
    </template>
  </KCard>
  <KCard
    title="Right"
    class="w-auto"
    body="This card always has a button"
  >
    <template v-slot:actions>
      <KButton size="small" appearance="outline">View All</KButton>
    </template>
  </KCard>
</div>

```vue
<div class="d-flex flex-row">
  <KCard
    title="Left"
    class="w-auto"
    body="This card only has a title"
  />
  <KCard
    title="Center"
    class="w-auto mx-5"
    body="This card always has a icon button"
  >
    <template v-slot:actions>
      <KButton>
        <KIcon
            icon="gearFilled"
            width="16px"
            view-box="0 0 16 16"
            class="pr-0"
          />
      </KButton>
    </template>
  </KCard>
  <KCard
    title="Right"
    class="w-auto"
    body="This card always has a button"
  >
    <template v-slot:actions>
      <KButton>View All</KButton>
    </template>
  </KCard>
</div>
```

## Slots
- `statusHat` - Small text directly above the title
- `title`
- `body`
- `actions` - Right side of the header section. Used for links, buttons, etc
- `notifications` - Right side of the body section. Used for badges, icons, etc

&nbsp;
<KCard>
  <template v-slot:statusHat>
    <KIcon
      icon="check"
      color="#07A88D"
      class="mr-2"
      size="12" />
      Approved
  </template>          
  <template v-slot:title>Look Mah!</template>
  <template v-slot:actions><a href="#">View All</a></template>
  <template v-slot:body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.</template>
  <template v-slot:notifications>
    <KIcon
      icon="profile"
      color="#7F01FE"
      size="44" />
  </template>
</KCard>

```vue
<KCard>
  <template v-slot:statusHat>
    <KIcon
      icon="check"
      color="#07A88D"
      class="mr-2"
      size="12" />
      Approved
  </template>          
  <template v-slot:title>Look Mah!</template>
  <template v-slot:actions><a href="#">View All</a></template>
  <template v-slot:body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.</template>
  <template v-slot:notifications>
    <KIcon
      icon="profile"
      color="#7F01FE"
      size="44" />
  </template>
</KCard>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KCardPaddingY `| Vertical top/bottom spacing
| `--KCardPaddingX` | Horizontal left/right padding
| `--KCardBorderRadius` |
| `--KCardBorder`| Replaces border size & color
| `--KCardShadow`| Replaces shadow size and color
| `--KCardBackground`|


\
An Example of changing the background might look like.

<div class="card-wrapper">
  <KCard
    title="Colorful Title"
    body="Body Content"
    hasShadow />
</div>

```vue
<template>
  <KCard
    title="Colorful Title"
    body="Body Content"
    hasShadow />
</template>

<style>
:root {
  --KCardBackground: lavender;
  --KCardShadow: 0 4px 8px lavender;
  --KCardBorder: 2px solid purple;
  --KCardBorderRadius: 12px;
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
  --KCardBackground: lavender;
  --KCardShadow: 0 4px 8px lavender;
  --KCardBorder: 2px solid purple;
  --KCardBorderRadius: 12px;
}
</style>
