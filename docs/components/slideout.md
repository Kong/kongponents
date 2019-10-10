# Slideout

**KSlideout** - provides a container/wrapper to show content that may not always be important to show all of the time. It is a user initiated component and should only show with a click.

Below we demonstrate wrapping KSlideout in the [KToggle](/components/renderless/ktoggle.html) component. This allows us to easily toggle the open state without needing to set a data prop in the parent component.

<KToggle>
  <div slot-scope="{ isToggled, toggle }">
    <KButton @click="toggle">Toggle Panel</KButton>
    <KSlideout 
      :is-visible="isToggled"
      @close="toggle">
      <div>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
    </KSlideout>
  </div>
</KToggle>

```vue
<KToggle>
  <div slot-scope="{ isToggled, toggle }">
    <KButton @click="toggle">Toggle</KButton>
    <KSlideout 
      :is-visible="isToggled"
      @close="toggle">
      <div>
        <p>Anim officia eiusmod duis est consequat nulla tempor ad non magna Lorem ullamco nostrud amet. Occaecat voluptate dolor enim eiusmod do qui nulla pariatur enim. Et elit elit consequat do do duis enim est ullamco id sunt sunt amet eiusmod. Do minim mollit irure ea sunt officia minim sint eiusmod enim amet. Quis exercitation in ullamco quis aliqua.</p>
      </div>
    </KSlideout>
  </div>
</KToggle>
```

## Props
-  `isVisible` - Tells the component whether or not to render the open panel
- `@close` - Emitted when the close button is clicked, anything outside the panel is clicked, or the `esc` key is pressed.

## Slots
There is one default slot which is used to place content into the slideout panel.

```vue
<KSlideout
  :is-visible="isToggled"
  @close="toggle">
  <div>
    <h1>Default Slot</h1>
    <p>Anything here will render in the panel</p>
  </div>
</KSlideout>
```
