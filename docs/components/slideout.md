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
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
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
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>
```

## Props

### isVisible

* **Type**: `boolean`
* **Required**: no
* **Default**: `false`

Tells the component whether or not to render the open panel.

### closeButtonAlignment

* **Type**: `'start' | 'end'`
* **Required**: no
* **Default**: `'start'`

Controls the close button alignment, can be `start` (default) or `end`.

### offsetTop

* **Type**: `number | string`
* **Required**: no
* **Default**: `0`

Allows a host app to define the offset from the top of the page. If the value is a number, it will be treated as a pixel value (e.g. `60` becomes `'60px'`); otherwise, it will be used as-is.

### hasOverlay

* **Type**: `boolean`
* **Required**: no
* **Default**: `true`

Tells the component whether or not to enable / disable overlay when the slideout content is visible, defaults to `true`.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Disabled Overlay</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel</KButton>
        <KSlideout :is-visible="isToggled.value" @close="toggle" has-overlay close-button-alignment="end">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>
```

### preventCloseOnBlur

* **Type**: `boolean`
* **Required**: no
* **Default**: `false`

Persists the slideout, ignoring clicks outside of the panel. Defaults to `false`.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle persistent Panel</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false"
    prevent-close-on-blur close-button-alignment="end" title="GET/account/kong.docs.dev">
      <div>
        <h2>Lorem ipsum turkey bacon</h2>
        <p>This panel can only be closed via Escape key, or the Close button in the upper right.</p>
      </div>
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle persistent Panel</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false"
    prevent-close-on-blur close-button-alignment="end" title="GET/account/kong.docs.dev">
      <div>
        <h2>Lorem ipsum turkey bacon</h2>
        <p>This panel can only be closed via Escape key, or the Close button in the upper right.</p>
      </div>
    </KSlideout>
  </div>
</KToggle>
```

### title

* **Type**: `string`
* **Required**: no
* **Default**: `''`

This prop takes a string that will be displayed as the title of the slide-out.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end" title="GET/account/kong.admin.servicekjagfabxncbadrtyuwefef">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end" title="GET/account/kong.admin.servicekjagfabxncbadrtyuwefef">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>
```

### maxWidth

* **Type**: `string`
* **Required**: no
* **Default**: `500px`

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel Custom Width</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end" title="Width test" max-width="650px">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel Custom Width</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end" title="Width test" max-width="650px">
      <div>
        <h2>Not only can you put any html in here like the paragraph below but you can also use other components</h2>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
      <KButton appearance="primary">Buttons</KButton>
      <KCard class="vertical-spacing">
        <template #body>
          Something in a KCard
        </template>
      </KCard>
      <KAlert
        alert-message="Or even an alert!"
        class="vertical-spacing" />
    </KSlideout>
  </div>
</KToggle>
```

## Slots

### default

Used to place content into the slideout panel.

```html
<KSlideout :is-visible="isToggled" @close="toggle">
  <div>
    <h1>Default Slot</h1>
    <p>Anything here will render in the panel</p>
  </div>
</KSlideout>
```

### before-title

Used to customize the header to add content before title.

### title

Used to place title content into the header area.

<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end">
      <template #before-title>
        <KIcon icon="kong" />
      </template>
      <template #title>
        <router-link to="route">Title</router-link>
      </template>
      <template #after-title>
        <KIcon icon="check" />
      </template>
      Default content
    </KSlideout>
  </div>
</KToggle>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">Toggle Panel With Title</KButton>
    <KSlideout :is-visible="isToggled.value" @close="toggle" :has-overlay="false" close-button-alignment="end">
      <template #before-title>
        <KIcon icon="kong" />
      </template>
      <template #title>
        <router-link to="route">Title</router-link>
      </template>
      <template #after-title>
        <KIcon icon="check" />
      </template>
      Default content
    </KSlideout>
  </div>
</KToggle>
```

### after-title

Used to customize the header to add content after title.


## Events

- `close` - Emitted when the close button is clicked, anything outside the panel is clicked, or the `esc` key is pressed.

<style lang="scss" scoped>
.vertical-spacing {
  margin-top: $kui-space-40;
}
</style>
