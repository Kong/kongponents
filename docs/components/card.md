# Card

**KCard** is meant to highlight content in grids or group relative information together.

<KCard title="Card Title" body="Body Content"/>

```html
<KCard title="Card Title" body="Body Content"/>
```

## Props

### title

String to be used in the title slot.

<KCard title="Title">
  <template v-slot:body>
    I am the body.
  </template>
</KCard>

```html
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

```html
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
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Kong Enterprise Edition</h2>
        <KButton appearance="outline" to="https://docs.konghq.com/enterprise" target="_blank">
          Docs
        </KButton>
      </div>
      <div>
        <p>Kong Enterprise adds features, functionality, and performance to Kong. This documentation doesn’t cover the general practices that are common to both Kong and Kong Enterprise—learn the basics in Kong documentation.</p>
      </div>
    </div>
  </template>
</KCard>

```html
<KCard :hasHover="true">
  <template v-slot:body>
    <KAlert alert-message="Welcome to Kong!" />
    <div>
      <div>
        <h2>Kong Enterprise Edition</h2>
        <KButton appearance="outline" to="https://docs.konghq.com/enterprise" target="_blank">
          Docs
        </KButton>
      </div>
      <div>
        <p>Kong Enterprise adds features, functionality, and performance to Kong. This documentation doesn’t cover the general practices that are common to both Kong and Kong Enterprise—learn the basics in Kong documentation.</p>
      </div>
    </div>
  </template>
</KCard>
```

### status

String to be used in the `statusHat` slot.

<KCard status="My status" title="My title" body="My body" />

```html
<KCard status="My status" title="My title" body="My body" />
```

### body

String to be used in the body slot.

<KCard body="I am the body."/>

```html
<KCard body="I am the body."/>
```

### borderVariant

Sets top border or no border. If neither set default will have border

- `borderTop`
- `noBorder`

<div class="borderless-cards">
  <KCard title="Card without border" body="Body Content" border-variant="noBorder"/>

  <KCard title="Card with top border" body="Body Content" border-variant="borderTop"/>
</div>

```html
<KCard title="Card without border" body="Body Content" border-variant="noBorder"/>

<KCard title="Card with top border" body="Body Content" border-variant="borderTop"/>
```

### hasHover

Set if card should have shadow state (shadow) on hover

<KCard title="hasHover" body="This card only has a shadow on hover" has-hover />

```html
<KCard title="hasHover" body="This card only has a shadow on hover" has-hover />
```

### hasShadow

Set if the card should always have shadow state (shadow)

<KCard title="hasShadow" body="This card always has a shadow" has-shadow />

```html
<KCard title="hasShadow" body="This card always has a shadow" has-shadow />
```

## Using flex box

Cards can be arranged with flex box.

<div class="card-flex-container">
  <KCard
    title="Left"
    body="This card only has a title"
  />
  <KCard
    title="Center"
    body="This card always has a icon button"
  >
    <template v-slot:actions>
      <KButton size="small" appearance="outline">
        <KIcon
          icon="gearFilled"
          size="16"
          view-box="0 0 16 16"
        />
      </KButton>
    </template>
  </KCard>
  <KCard
    title="Right"
    body="This card always has a button"
  >
    <template v-slot:actions>
      <KButton size="small" appearance="outline">View All</KButton>
    </template>
  </KCard>
</div>

```html
<KCard title="Left" body="This card only has a title" />
<KCard title="Center" body="This card always has a icon button">
  <template v-slot:actions>
    <KButton>
      <KIcon
        icon="gearFilled"
        size="16"
        view-box="0 0 16 16"
      />
    </KButton>
  </template>
</KCard>
<KCard title="Right" body="This card always has a button">
  <template v-slot:actions>
    <KButton>View All</KButton>
  </template>
</KCard>

<style lang="scss">
.card-flex-container {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
</style>
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
      class="horizontal-spacing"
      color="#07A88D"
      size="24"
    />
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

```html
<KCard>
  <template v-slot:statusHat>
    <KIcon
      icon="check"
      color="#07A88D"
      size="24" />
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

<style lang="scss">
.borderless-cards {
  padding: 16px;
  background: rgba(27,31,35,0.05);
  border-radius: 3px;
  .kong-card {
    background: #fff;
  }
}

.horizontal-spacing {
  margin-right: $kui-space-40;
}

.card-flex-container {
  display: flex;
  flex-direction: row;
  gap: $kui-space-40;
}
</style>
