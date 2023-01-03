# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

This is a new paragraph.

<KAlert alert-message="I'm an alert" />

```html
<KAlert alert-message="I'm an alert" />
```

## Props

### alertMessage

The main content of the alert.

### isShowing

Set whether or not the alert box is shown.

> Note: By default is-showing is set to true.
- `is-showing`

```html
<KAlert
  :is-showing="false"
  alert-message="is-showing set to false"
/>
```

### type

The display type of the alert.

> Note: By default `appearance="info"`.
- `alert` (default)

<div>
  <KAlert alert-message="I'm an alert" />
</div>

```html
<KAlert alert-message="I'm an alert" />
```

- `banner`

`type="banner"` will have a white background and display an ellipse on the left to indicate appearance.

<div>
  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
  />
</div>

```html
<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
/>
```

### dismissType

KAlert allows for dismissal of the banner using an icon or button. An alert is not dismissible if "none" is passed.

- `none` (default)
- `icon`
- `button`

<div>
  <KAlert
    alert-message="Alert that can not be dismissed"
    type="alert"
    dismiss-type="none"
  />

  <KAlert
    alert-message="Info alert message that is dismissible"
    dismiss-type="icon"
    :is-showing="dismissTypeIcon"
    @closed="dismissTypeIcon = false"
  />

  <KAlert
    alert-message="Alert with dismiss type as button"
    type="banner"
    dismiss-type="button"
    :is-showing="dismissTypeBtn"
    @closed="dismissTypeBtn = false"
  />
</div>

```html
<KAlert
  alert-message="Alert that can not be dismissed"
  type="alert"
  dismiss-type="none"
/>

<KAlert
  alert-message="Info alert message that is dismissible"
  dismiss-type="icon"
  :is-showing="isShowing"
  @closed="isShowing = false"
/>

<KAlert
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  :is-showing="isShowing"
  @closed="isShowing = false"
/>
```

### appearance

What color and purpose the Alert should be. Shares similar appearances to those of [KButton](/components/button). `appearance` will influence the colors of action/dismiss buttons.

- `info` (default)

<div>
  <KAlert alert-message="Info alert message" />

  <KAlert
    :is-showing="infoIsOpen"
    alert-message="Info alert message that is dismissible"
    dismiss-type="icon"
    @closed="infoIsOpen = false"
  />

  <KAlert
    :is-showing="infoIsOpen2"
    alert-message="I'm an alert"
    dismiss-type="button"
    @closed="infoIsOpen2 = false"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
  />

  <KAlert
    :is-showing="infoIsOpen3"
    alert-message="Alert with dismiss type as button"
    type="banner"
    dismiss-type="button"
    @closed="infoIsOpen3 = false"
  />
</div>

```html
<KAlert alert-message="Info alert message" />

<KAlert
  :is-showing="isShowing"
  alert-message="Info alert message that is dismissible"
  dismiss-type="icon"
  @closed="isShowing = false"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="I'm an alert"
  dismiss-type="button"
  @closed="isShowing = false"
/>

<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  @closed="isShowing = false"
/>
```

- `warning`

<div>
  <KAlert alert-message="Warning alert message" appearance="warning" />

  <KAlert
    :is-showing="warningIsOpen"
    alert-message="Alert message that is dismissible"
    dismiss-type="icon"
    appearance="warning"
    @closed="warningIsOpen = false"
  />

  <KAlert
    :is-showing="warningIsOpen2"
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="warning"
    @closed="warningIsOpen2 = false"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
    appearance="warning"
  />

  <KAlert
    :is-showing="warningIsOpen3"
    alert-message="Alert with dismiss type as button"
    type="banner"
    dismiss-type="button"
    appearance="warning"
    @closed="warningIsOpen3 = false"
  />
</div>

```html
<KAlert
  alert-message="Warning alert message"
  appearance="warning"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert message that is dismissible"
  dismiss-type="icon"
  appearance="warning"
  @closed="isShowing = false"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="warning"
  @closed="isShowing = false"
/>

<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
  appearance="warning"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  appearance="warning"
  @closed="isShowing = false"
/>
```

- `success`

<div>
  <KAlert alert-message="Success alert message" appearance="success" />

  <KAlert
    :is-showing="successIsOpen"
    alert-message="Alert message that is dismissible"
    dismiss-type="icon"
    appearance="success"
    @closed="successIsOpen = false"
  />

  <KAlert
    :is-showing="successIsOpen2"
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="success"
    @closed="successIsOpen2 = false"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
    appearance="success"
  />

  <KAlert
    :is-showing="successIsOpen3"
    alert-message="Alert with dismiss type as button"
    type="banner"
    dismiss-type="button"
    appearance="success"
    @closed="successIsOpen3 = false"
  />
</div>

```html
<KAlert
  alert-message="Success alert message"
  appearance="success"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert message that is dismissible"
  dismiss-type="icon"
  appearance="success"
  @closed="isShowing = false"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="success"
  @closed="isShowing = false"
/>

<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
  appearance="success"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  appearance="success"
  @closed="isShowing = false"
/>
```

- `danger`

<div>
  <KAlert alert-message="Danger alert message" appearance="danger" />

  <KAlert
    :is-showing="dangerIsOpen"
    alert-message="Alert message that is dismissible"
    dismiss-type="icon"
    appearance="danger"
    @closed="dangerIsOpen = false"
  />

  <KAlert
    :is-showing="dangerIsOpen2"
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="danger"
    @closed="dangerIsOpen2 = false"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
    appearance="danger"
  />

  <KAlert
    :is-showing="dangerIsOpen3"
    alert-message="Alert with dismiss type as button"
    type="banner"
    dismiss-type="button"
    appearance="danger"
    @closed="dangerIsOpen3 = false"
  />
</div>

```html
<KAlert
  alert-message="Danger alert message"
  appearance="danger"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert message that is dismissible"
  dismiss-type="icon"
  appearance="danger"
  @closed="isShowing = false"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="danger"
  @closed="isShowing = false"
/>

<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
  appearance="danger"
/>

<KAlert
  :is-showing="isShowing"
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  appearance="danger"
  @closed="isShowing = false"
/>
```

### size

Controls size (height) and default font-size of an alert.

- `small`

<div>
  <KAlert
    size="small"
    alert-message="Small alert"
  />
</div>

```html
<KAlert
  size="small"
  alert-message="Small alert"
/>
```

- `large`

`size="large"` allows further customization options. You can specify an icon, description text, and additional buttons using the `actionButtons` slot. See the full [Example](#description).

### icon

Specify an icon to display to the left of the alert content. If using `type="banner"` this will override the colored ellipse.

> Note: only available with `size="large"`.
### iconSize

The size of the `icon` being displayed (default is `24`).

### iconColor

The color of the `icon` being displayed.

### description

Descriptive text to be displayed below the main alert content.

> Note: only available with `size="large"`.
<div>
  <KAlert
    :is-showing="extraMsg"
    alert-message="You’ve had 12 new mentions since you last logged in"
    description="across 3 services"
    icon="support"
    icon-color="var(--purple-400)"
    type="banner"
    dismiss-type="button"
    size="large"
    @closed="extraMsg = false"
  >
    <template #actionButtons>
      <KButton appearance="primary" size="small">Review</KButton>
    </template>
  </KAlert>
</div>

```html
<KAlert
  :is-showing="isShowing"
  alert-message="You’ve had 12 new mentions since you last logged in"
  description="across 3 services"
  dismiss-type="button"
  type="banner"
  icon="support"
  icon-color="var(--purple-400)"
  size="large"
  @closed="isShowing = false"
>
  <template #actionButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
</KAlert>
```

### title

You can specify a title for the alert in situations where the message is more wordy. This content is displayed directly above the main alert content.

<div>
  <KAlert
    :is-showing="extraMsg2"
    title="Error: Something went wrong!"
    alert-message="Since I have a title, my font-size is smaller."
    appearance="danger"
    @closed="extraMsg2 = false"
  >
    <template #icon>
      <KIcon icon="errorFilled" color="var(--red-500)" size="16" />
    </template>
  </KAlert>
</div>

```html
<KAlert
  :is-showing="isShowing"
  title="Error: Something went wrong!"
  alert-message="Since I have a title, my font-size is smaller."
  appearance="danger"
  @closed="isShowing = false"
>
  <template #icon>
    <KIcon icon="errorFilled" color="var(--red-500)" size="16" />
  </template>
</KAlert>
```

### isBordered

Adds border around alert. Used for [KToaster](/components/toaster).

<KAlert is-bordered alert-message="Info bordered" />

```html
<KAlert
  alert-message="Info bordered"
  is-bordered
/>
```

### hasLeftBorder

Adds border to the left side. Typically used for alerts that show info that may link away like documentation.

<KAlert has-left-border alert-message="Bordered alert" />

```html
<KAlert
  alert-message="Bordered alert"
  has-left-border
/>
```

### hasRightBorder

Adds border to the right side. Typically used for alerts that show info that may link away like documentation.

<KAlert has-right-border alert-message="Bordered alert" />

```html
<KAlert
  alert-message="Bordered alert"
  has-right-border
/>
```

### hasTopBorder

Adds border to the top.

<KAlert has-top-border alert-message="Bordered alert" />

```html
<KAlert
  alert-message="Bordered alert"
  has-top-border
/>
```

### hasBottomBorder

Adds border to the bottom.

<KAlert has-bottom-border alert-message="Bordered alert"/>

```html
<KAlert
  alert-message="Bordered alert"
  has-bottom-border
/>
```

### isFixed

Fixes KAlert to the top of the container.

> Note: Not demoed
```html
<KAlert is-fixed alert-message="Info fixed" />
```

## Slots

- `alertMessage` - Default message slot
- `icon` - Icon to the left of the main alert content
- `title` - Text displayed directly above the main alert content (font will be bolded)
- `description` - Descriptive text displayed directly beneath the main alert content (`size='large'` required)
- `actionButtons` - Slot specifically meant for adding buttons other than Dismiss button

<div>
  <KAlert
    :is-showing="extraBtnSlot"
    dismiss-type="button"
    size="large"
    appearance="success"
    @closed="extraBtnSlot = false"
  >
    <template #icon>
      <KIcon icon="lock" size="20" color="var(--yellow-400)" />
    </template>
    <template #title>
      Look, Mah!
    </template>
    <template #alertMessage>
      Check out my awesome slots
    </template>
    <template #description>
      I like cats 🐈‍⬛
    </template>
    <template #actionButtons>
      <KButton appearance="secondary" size="small">🐈‍⬛</KButton>
      <KButton appearance="creation" size="small">🐶</KButton>
    </template>
  </KAlert>
</div>

```html
<KAlert
  :is-showing="isShowing"
  dismiss-type="button"
  size="large"
  appearance="success"
  @closed="isShowing = false"
>
  <template #icon>
    <KIcon icon="lock" size="20" color="var(--yellow-400)" />
  </template>
  <template #title>
    Look, Mah!
  </template>
  <template #alertMessage>
    Check out my awesome slots
  </template>
  <template #description>
    I like cats 🐈‍⬛
  </template>
  <template #actionButtons>
    <KButton appearance="secondary" size="small">🐈‍⬛</KButton>
    <KButton appearance="creation" size="small">🐶</KButton>
  </template>
</KAlert>
```

## Events

- `@closed` - emitted when the dismiss button is clicked
- `@proceed` - emitted when a default action button is clicked

## Variations

### Long Content / Prose

<KAlert appearance="info" class="mt-5">
  <template #alertMessage>
    <div class="mt-2 bold-600">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>

```html
<KAlert appearance="info" class="mt-5">
  <template #alertMessage>
    <div class="mt-2 bold-600">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>
```

### Word Wrap long urls

<KAlert appearance="warning" class="mt-5">
  <template #alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>

```html
<KAlert appearance="warning" class="mt-5">
  <template #alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KAlertInfoColor`| Info variant text  color
| `--KAlertInfoBorder`| Info variant border
| `--KAlertInfoBackground` | Info variant background color
| `--KAlertSuccessColor`| Success variant text  color
| `--KAlertSuccessBorder`| Success variant border
| `--KAlertSuccessBackground` | Success variant background color
| `--KAlertDangerColor`| Danger variant text  color
| `--KAlertDangerBorder`| Danger variant border
| `--KAlertDangerBackground` | Danger variant background color
| `--KAlertWarningColor`| Warning variant text  color
| `--KAlertWarningBorder`| Warning variant border
| `--KAlertWarningBackground` | Warning variant background color

\
An Example of changing the success KAlert variant to lime instead of Kong's green might
look like.

> Note: We are scoping the overrides to a wrapper in this example

<div class="alert-wrapper">
  <KAlert appearance="success" alert-message="Im Lime" />
</div>

```html
<template>
  <div class="alert-wrapper">
    <KAlert appearance="success" alert-message="Im Lime" />
  </div>
</template>

<style>
.alert-wrapper {
  --KAlertSuccessBackground: lime;
  --KAlertSuccessColor: forestgreen;
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      dismissTypeBtn: true,
      dismissTypeIcon: true,
      infoIsOpen: true,
      infoIsOpen2: true,
      infoIsOpen3: true,
      warningIsOpen: true,
      warningIsOpen2: true,
      warningIsOpen3: true,
      successIsOpen: true,
      successIsOpen2: true,
      successIsOpen3: true,
      dangerIsOpen: true,
      dangerIsOpen2: true,
      dangerIsOpen3: true,
      extraMsg: true,
      extraMsg2: true,
      extraBtnSlot: true
    }
  }
})
</script>

<style lang="scss">
.k-alert {
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
}

.alert-wrapper {
  --KAlertSuccessBackground: lime;
  --KAlertSuccessColor: forestgreen;
}
</style>
