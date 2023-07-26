# Slideout

**KSlideout** - provides a container/wrapper to show content that may not always be important to show all of the time. It is a user-initiated component and should only show with a click.

Below we demonstrate wrapping `KSlideout` in the [`KToggle`](/components/renderless/toggle) component. This allows us to easily toggle the open state without needing to set a data prop in the parent component.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>
```

## Props

### isVisible

Tells the component whether or not to render the open panel.

### closeButtonAlignment

Controls the close button alignment, defaults to `start`.

### offsetTop

Allows a host app to define the offset from the top of the page, defaults to `0`.

### overlayEnabled

Tells the component whether or not to enable / disable overlay, defaults to `true`.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Disabled Overlay</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :overlay-enabled="false" close-button-alignment="end">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel</KButton>
        <KSlideout :is-visible="isToggled.value" @close="toggle" overlay-enabled close-button-alignment="end">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>
```
### hasOnlyTitle

Determines whether the header will display only `Title` or has other attributes like `Badge`, `Icon` etc, defaults to `false`.

### title

This prop takes a string that will be displayed as the `Title`.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Only Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :overlay-enabled="false" close-button-alignment="end" :has-only-title="true" title="I only have a Title">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Only Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :overlay-enabled="false" close-button-alignment="end" :has-only-title="true" title="I only have a Title">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>
```

### badgeValue

This prop takes a string that will be displayed as the value for the `Badge`.

### badgeAppearance

Determines the appearance values for the Badge, defaults to `warning`.

### badgeShape

Determines the shape of the Badge, defaults to `rectangular`.

### iconType

Determines the icon type that is placed next to Title, defaults to `copy`.

### iconColor

Determines the icon color that is placed next to Title, defaults to `blue`.

### iconSize

Determines the icon size that is placed next to Title, defaults to `16`.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Badge/Title/Icon</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :overlay-enabled="false" close-button-alignment="end" badge-value="401" title="GET/account/kong.admin.servicekjagfabxncbadrtyu">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Badge/Title/Icon</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :overlay-enabled="false" close-button-alignment="end" badge-value="401" title="GET/account/kong.admin.servicekjagfabxncbadrtyu">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="mt-2">
        <template v-slot:body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        appearance="info"
        alert-message="Or even an alert!"
        class="mt-2" />
    </KSlideout>
  </div>
</KToggle>
```

## Slots

- `default` - used to place content into the slideout panel

```html
<KSlideout :is-visible="isToggled" @close="toggle">
  <div>
    <h1>Default Slot</h1>
    <p>Anything here will render in the panel</p>
  </div>
</KSlideout>
```

- `badgeContent` - used to customize `badge` inside the header
- `titleContent` - used to customize `title` inside the header
- `iconContent` - used to customize `icon` inside the header

## Events

- `close` - Emitted when the close button is clicked, anything outside the panel is clicked, or the `esc` key is pressed.

- `kclipboard-icon-clicked` - Emitted when the `icon` next to `title` is clicked.