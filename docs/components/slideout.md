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
## Slots

There is one default slot which is used to place content into the slideout panel.

```html
<KSlideout :is-visible="isToggled" @close="toggle">
  <div>
    <h1>Default Slot</h1>
    <p>Anything here will render in the panel</p>
  </div>
</KSlideout>
```

## Events

- `@close` - Emitted when the close button is clicked, anything outside the panel is clicked, or the `esc` key is pressed.

<style lang="scss" scoped>
.vertical-spacing {
  margin-top: $kui-space-40;
}
</style>