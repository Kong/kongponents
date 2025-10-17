# Popover

KPop is a popover component that comes in handy when you need to display more content than can fit in a tooltip.

<KComponent
  v-slot="{ data }"
  :data="{ data1: false, data2: true }"
>
  <KPop
    button-text="Open popover"
    title="Communications settings"
    width="350"
  >
    <template #content>
      <div class="vertical-container">
        <KInputSwitch label="Receive marketing communications" v-model="data.data1" />
        <KInputSwitch label="Receive important updates" v-model="data.data2" />
      </div>
    </template>
    <template #footer>
      <KButton class="button-right">Apply</KButton>
    </template>
  </KPop>
</KComponent>

```html
<KPop
  button-text="Open popover"
  title="Communications settings"
  width="350"
>
  <template #content>
    <KInputSwitch label="Receive marketing communications" />
    <KInputSwitch label="Receive important updates" />
  </template>
  <template #footer>
    <KButton>Apply</KButton>
  </template>
</KPop>
```

:::tip NOTE
Check out [KTooltip](/components/tooltip) if you're looking for a component for showing tooltips. KPop is ideal for displaying more complex popover dialogs that might need to have interactive elements.
:::

## Props

### buttonText

Popover trigger button text. If you want to use your custom element as a popover trigger, check out the [`default` slot](#default).

<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
</KPop>
```

### title

Popover container title. Can also be [slotted](#title-1).

<KPop
  title="Popover title"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  title="Popover title"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### placement

Placement of the popover.

Accepted values are:

<ul>
  <li v-for="placement in PopPlacementsArray" :key="`${placement}-placement`">
    <code>{{ placement }}</code> 
    <span v-if="placement === 'auto'">(default)</span>
  </li>
</ul>

<div class="horizontal-container">
  <KPop
    v-for="placement in PopPlacementsArray"
    :key="placement"
    :button-text="placement"
    :placement="placement"
  >
    <template #content>
      Popover content.
    </template>
  </KPop>
</div>

```html
<KPop
  placement="bottom-end"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### trigger

Whether popover should be opened on trigger element click or mouseover.

Accepted values are:

- `click` (default)
- `hover`

<KPop
  trigger="hover"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  trigger="hover"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### popoverTimeout

When [`trigger` prop](#trigger) is `hover`, you can provide a timeout for popover to wait before it closes. Default value is 300 milliseconds.

<KPop
  :popover-timeout="3000"
  trigger="hover"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  :popover-timeout="3000"
  trigger="hover"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### disabled

Boolean to control whether popover should be disabled. Defaults to `false`.

<KPop
  disabled
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  disabled
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### hideCaret

Boolean to control whether the popover caret should be visible. Defaults to `false`.

<KPop
  hide-caret
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  hide-caret
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### closeOnPopoverClick

Boolean to control whether or not the popover should close when a user clicks within the popover content. Default to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ closeOnPopoverClick: false }"
>
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.closeOnPopoverClick"
      label="Close on popover click"
    />
    <KPop
      :close-on-popover-click="data.closeOnPopoverClick"
      button-text="Open popover"
    >
      <template #content>
        <KButton size="small">
          Click here
        </KButton>
      </template>
    </KPop>
  </div>
</KComponent>

```html
<KPop
  close-on-popover-click
  button-text="Open popover"
>
  <template #content>
    <KButton size="small">
      Click here
    </KButton>
  </template>
</KPop>
```

### hideCloseIcon

Boolean to hide close button in popover content.

<KComponent
  v-slot="{ data }"
  :data="{ hideCloseIcon: false }"
>
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.hideCloseIcon"
      label="Hide close icon"
    />
    <KPop
      button-text="Open popover"
      :hide-close-icon="data.hideCloseIcon"
    >
      <template #content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </template>
    </KPop>
  </div>
</KComponent>

```html
<KPop
  hide-close-icon
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### width

Width of the popover container. Default value is `200px`.

<KPop
  width="500px"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  width="500px"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### maxWidth

Maximum width of the popover container. Default value is `none`.

<KPop
  max-width="120px"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop
  max-width="120px"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### tag

KPop wrapper element type. Default value is `div`.

### popoverClasses

List of class names you want to assign to `.popover` element.

```html
<KPop
  popover-classes="foo bar"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### popoverAttributes

List of class names you want to assign to `.popover` element.

```html
<KPop
  :popover-attributes="{
    'data-testid': 'foobar'
  }"
  button-text="Open popover"
>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### zIndex

Pass a number to use for the `z-index` property. Default value is `1000`.

### offset

Prop for specifying popover offset (string). Default value is `16px`.

<KPop
  offset="50px"
  button-text="Open popover"
>
  <template #content>
    Popover offset by 50px.
  </template>
</KPop>

```html
<KPop
  offset="50px"
  button-text="Open popover"
>
  <template #content>
    Popover offset by 50px.
  </template>
</KPop>
```

### target

In certain scenarios, you may want to attach the popover to other target elements. To achieve this, use the `target` prop to specify a selector for the element where the popover will be teleported. When falsy value us passed, the teleport will be disabled, therefore popover won't be [teleported](https://vuejs.org/guide/built-ins/teleport). Defaults to `null`.

<KPop
  target="body"
  button-text="Open popover"
>
  <template #content>
    Popover teleported to body.
  </template>
</KPop>

```html
<KPop
  target="body"
  button-text="Open popover"
>
  <template #content>
    Popover teleported to body.
  </template>
</KPop>
```

## Slots

### content

Slot for passing popover content.

<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
</KPop>
```

### default

Slot for passing custom popover trigger element.

:::tip NOTE
When providing your custom element as popover trigger, make sure to set appropriate `tabindex` attribute in order to make popover accessible for assistive technology users.
:::

<KPop hide-close-icon>
  <KInput
    label="Password"
    type="password"
    placeholder="Enter a strong password"
  />
  <template #content>
    Must contain at least one special character: *!&#.
  </template>
</KPop>

```html
<KPop hide-close-icon>
  <KInput
    label="Password"
    type="password"
    placeholder="Enter a strong password"
  />
  <template #content>
    Must contain at least one special character: *!&#.
  </template>
</KPop>
```

:::danger
KPop logic is built on the presumption that trigger element is going to be in the DOM when the component is mounted. If you need to render the element conditionally, avoid setting `v-if` directive on the trigger element directly and render the entire KPop component conditionally instead.

<span class="inline-title">
  <CheckIcon :size="KUI_ICON_SIZE_30" :color="KUI_COLOR_TEXT_SUCCESS" /> <b>Correct:</b>
</span>

```html
<KPop v-if="!loading">
  <KButton>Open popover</KButton>
  <template #content>
    ...
  </template>
</KPop>
```

<span class="inline-title">
  <CloseIcon :size="KUI_ICON_SIZE_30" :color="KUI_COLOR_TEXT_DANGER" /> <b>Incorrect:</b>
</span>

```html
<KPop>
  <KButton v-if="!loading">Open popover</KButton>
  <template #content>
    ...
  </template>
</KPop>
```

<span class="inline-title">
  <CloseIcon :size="KUI_ICON_SIZE_30" :color="KUI_COLOR_TEXT_DANGER" /> <b>Incorrect:</b>
</span>

```html
<KPop>
  <template
    #default
    v-if="!loading"
  >
    <KButton>Open popover</KButton>
  </template>
  <template #content>
    ...
  </template>
</KPop>
```
:::

### title

Slot for passing custom popover title.

<KPop button-text="Open popover">
  <template #title>
    Popover title
  </template>
  <template #content>
    Popover content.
  </template>
</KPop>

```html
<KPop button-text="Open popover">
  <template #title>
    Popover title
  </template>
  <template #content>
    Popover content.
  </template>
</KPop>
```

### footer

Slot for passing footer content that goes directly underneath main popover content.

<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
  <template #footer>
    <KBadge>Footer</KBadge>
  </template>
</KPop>

```html
<KPop button-text="Open popover">
  <template #content>
    Popover content.
  </template>
  <template #footer>
    <KBadge>Footer</KBadge>
  </template>
</KPop>
```

## Events

### open

Fires when the popover is opened.

### close

Fires when the popover is closed.

### popover-click

Fires when the popover content is clicked.

## Expose

### showPopover

Call this method for opening the popover programmatically.

### hidePopover

Call this method for closing the popover programmatically.

<script setup lang="ts">
import { PopPlacementsArray } from '@/types'
import { CheckIcon, CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30, KUI_COLOR_TEXT_SUCCESS, KUI_COLOR_TEXT_DANGER } from '@kong/design-tokens'
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-50;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
}

.button-right {
  margin-left: $kui-space-auto;
}

.inline-title {
  display: flex;
  gap: $kui-space-30;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: $kui-space-40;
  }
}
</style>
