# Icon

**KIcon** - Icon component for displaying SVG symbols. Currently Size, color and viewbox vary between icons, so the implementor must be mindful when using. 

<KIcon icon="dashboard" />

```vue
<KIcon icon="dashboard" />
```

## Props
### icon - required
The name of the icon. This required prop will only recognize icons from the 
following list. It tells KIcon which svg to render.

<div>
  <KToggle v-slot="{ isToggled, toggle }">
    <div>
      <KButton
        appearance="outline-primary"
        class="mb-4"
        @click="toggle">Toggle viewbox {{ isToggled ? 'off' : 'on' }}</KButton>
      <div class="icon-row">
        <div
          v-for="icon in $icons"
          class="icon-cell"
          :class="{ hasBg: isToggled }">
          <KIcon
            :icon="icon"
            :color="(icon === 'info' || icon === 'spinner') ? '#A3BBCC' : ''" />
          <span>{{ icon }}</span>
        </div>
      </div>
    </div>
  </KToggle>
</div>
&nbsp;

### size
This prop takes a string that will replace the SVG default height and width. If height and width is not present by default `24` is applied.

<KIcon icon="gear" size="50" />

```vue
<KIcon icon="gear" size="50" />
```

### color
Overrides the default svg color.

<KIcon  icon="vitals" color="red" />

```vue
<KIcon icon="vitals" color="red" />
```

::: tip Note
Some SVGs have a set **fill-opacity** and these cannot be overridden and will 
render at whichever percent opacity of the passed color.

Prevent color override in an SVG by setting the attribute `id="preserveColor"` 
within the SVG.
e.g. `<path id="preserveColor" d="M9 11v2H7v-2h2zm0-8v6.5H7V3h2z" fill="#FFF"/>`
:::

### viewBox
This prop takes a formatted string that will replace the SVG default viewBox. If one is not present by default `0 0 24 24` is applied.
You can read more about the viewBox attribute
[here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)

- `viewBox`

<KIcon icon="portal" viewBox="0 0 10 10" />

```vue
<KIcon icon="portal" viewBox="0 0 10 10" />
```

## Usage
:::warning
KIcon imports .svg file types directly, so a loader is needed in order to render in your application such as the webpack
[raw-loader](https://webpack.js.org/loaders/raw-loader/)
:::

Check out the [contributing](/contributing/adding-an-icon.html) docs to learn about adding new icons to `KIcon`.

<style lang="scss" scoped>
.icon-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  .icon-cell {
    display: flex;
    align-items: center;
    &.hasBg svg {
      background-color: var(--blue-200);
    }
  }
  span {
    margin: 0 .5rem;
  }
}
</style> 
