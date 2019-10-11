# Icon

**KIcon** - Icon component for displaying SVG symbols.

<KIcon icon="dashboard" />

```vue
<KIcon icon="dashboard" />
```

## Props
### icon - required
The name of the icon. This required prop will only recognize icons from the 
following list. It tells KIcon which svg to render.

<div class="icon-row">
  <div
    v-for="icon in $icons"
    class="icon-cell">
    <KIcon
      :icon="icon"
      :color="(icon === 'info' || icon === 'spinner' || icon === 'close') ? '#A3BBCC' : ''" />
    <span>{{ icon }}</span>
  </div>
</div>
&nbsp;

### size
Size will override the default height and width with a single value
- `size`

<KIcon  icon="gear" size="56" />

```vue
<KIcon icon="gear" size="56" />
```

### color
Use the color prop to override the default svg color.

::: tip Note
Some SVGs have a set **fill-opacity** and these cannot be overridden and will 
render at whichever percent opacity of the passed color.


Prevent color override in an SVG by setting the attribute `id="preserveColor"` 
within the SVG.
e.g. `<path id="preserveColor" d="M9 11v2H7v-2h2zm0-8v6.5H7V3h2z" fill="#FFF"/>`
:::

- `color`

<KIcon  icon="vitals" color="red" />
```vue
<KIcon icon="vitals" color="red" />
```

### viewBox
This prop takes a formatted string that will replace the SVG default viewBox. 
You can read more about the viewBox attribute 
[here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)

- `viewBox`

<KIcon icon="portal" viewBox="0 0 10 10" />

```vue
<KIcon icon="portal" viewBox="0 0 10 10" />
```

## Usage
:::warning
KIcon imports .svg file types directly, so a loader is needed such as 
[raw-loader](https://webpack.js.org/loaders/raw-loader/)
:::

<style lang="scss" scoped>
.icon-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  .icon-cell {
    display: flex;
    align-items: center;
  }
  span {
    margin: 0 .5rem;
  }
}
</style> 
