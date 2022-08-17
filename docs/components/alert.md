# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

<KAlert alert-message="I'm an alert" />

```html
<KAlert alert-message="I'm an alert" />
```

## Props

### Appearances

What color and purpose the Alert should be. Shares similar appearances to those of [KButton](/components/button).

> Note: `appearance` is `info` by default.

- `info`
- `warning`
- `success`
- `danger`

<div>
  <KAlert
    appearance="info"
    alert-message="Info alert message"
  />
  <KAlert
    appearance="warning"
    alert-message="Warning alert message"
  />
  <KAlert
    appearance="success"
    alert-message="Success alert message"
  />
  <KAlert
    appearance="danger"
    alert-message="Danger alert message"
  />
</div>

```html
<KAlert
  appearance="info"
  alert-message="Info alert message"
/>
<KAlert
  appearance="warning"
  alert-message="Warning alert message"
/>
<KAlert
  appearance="success"
  alert-message="Success alert message"
/>
<KAlert
  appearance="danger"
  alert-message="Danger alert message"
/>
```

### Type

The display type of the alert.

- `banner`

`type="banner"` will have a white background and display an ellipse on the left to indicate appearance.

> Note: By default `appearance="info"`. `appearance` will influence the colors of action/dismiss buttons.

<div>
  <KAlert
    alert-message="I'm a banner type alert"
    type="banner"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    appearance="success"
    type="banner"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    appearance="danger"
    type="banner"
  />

  <KAlert
    alert-message="I'm a banner type alert"
    appearance="warning"
    type="banner"
  />
</div>

```html
<KAlert
  alert-message="I'm a banner type alert"
  type="banner"
/>
<KAlert
  alert-message="I'm a banner type alert"
  appearance="success"
  type="banner"
/>
<KAlert
  alert-message="I'm a banner type alert"
  appearance="danger"
  type="banner"
/>
<KAlert
  alert-message="I'm a banner type alert"
  appearance="warning"
  type="banner"
/>
```

- `alert`

`type="alert"` will have a background based on `appearance`.

> Note: By default `appearance="info"`. `appearance` will influence the colors of action/dismiss buttons.

<div>
  <KAlert
    alert-message="I'm an alert"
    dismiss-type="button"
    type="alert"
    :is-showing="alert1IsOpen"
    @closed="alert1IsOpen = false"
  />

  <KAlert
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="success"
    type="alert"
    :is-showing="alert2IsOpen"
    @closed="alert2IsOpen = false"
  />

  <KAlert
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="danger"
    type="alert"
    :is-showing="alert3IsOpen"
    @closed="alert3IsOpen = false"
  />

  <KAlert
    alert-message="I'm an alert"
    dismiss-type="button"
    appearance="warning"
    type="alert"
    :is-showing="alert4IsOpen"
    @closed="alert4IsOpen = false"
  />
</div>

```html
<KAlert
  alert-message="I'm an alert"
  dismiss-type="button"
  type="alert"
  :is-showing="alert1IsOpen"
  @closed="alert1IsOpen = false"
/>

<KAlert
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="success"
  type="alert"
  :is-showing="alert2IsOpen"
  @closed="alert2IsOpen = false"
/>

<KAlert
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="danger"
  type="alert"
  :is-showing="alert3IsOpen"
  @closed="alert4IsOpen = false"
/>

<KAlert
  alert-message="I'm an alert"
  dismiss-type="button"
  appearance="warning"
  type="alert"
  :is-showing="alert5IsOpen"
  @closed="alert5IsOpen = false"
/>
```

### title

You can specify a title for the alert in situations where the message is more wordy.

<div>
  <KAlert
    :is-showing="extraMsg2"
    appearance="danger"
    title="Error: Something went wrong!"
    @closed="extraMsg2 = false"
  >
    <template #icon>
      <KIcon icon="errorFilled" color="var(--red-500)" size="16" />
    </template>
    <template v-slot:alertMessage>
      Since I have a title, my font-size is smaller.
    </template>
  </KAlert>
</div>

```html
<KAlert
  :is-showing="extraMsg2"
  appearance="danger"
  title="Error: Something went wrong!"
  @closed="extraMsg2 = false"
>
  <template #icon>
    <KIcon icon="errorFilled" color="var(--red-500)" size="16" />
  </template>
  <template v-slot:alertMessage>
    Since I have a title, my font-size is smaller.
  </template>
</KAlert>
```

### Dismiss Type

KAlert allows for dismissal of the banner using an icon or button. An alert is not dismissible if "none" is passed.

- `none`
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
    appearance="info"
    type="alert"
    dismiss-type="icon"
    :is-showing="infoIsOpen"
    @closed="infoIsOpen = false"
  />

  <KAlert
    alert-message="Warning alert message that is dismissible"
    appearance="warning"
    type="alert"
    dismiss-type="icon"
    :is-showing="warningIsOpen"
    @closed="warningIsOpen = false"
  />

  <KAlert
    alert-message="Success alert message that is dismissible"
    appearance="success"
    type="alert"
    dismiss-type="icon"
    :is-showing="successIsOpen"
    @closed="successIsOpen = false"
  />

  <KAlert
    alert-message="Danger alert message that is dismissible"
    appearance="danger"
    type="alert"
    dismiss-type="icon"
    :is-showing="dangerIsOpen"
    @closed="dangerIsOpen = false"
  />

  <KAlert
    alert-message="Alert with dismiss type as button"
    type="banner" dismiss-type="button"
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
  appearance="info"
  type="alert"
  dismiss-type="icon"
  :is-showing="infoIsOpen"
  @closed="infoIsOpen = false"
/>

<KAlert
  alert-message="Warning alert message that is dismissible"
  appearance="warning"
  type="alert"
  dismiss-type="icon"
  :is-showing="warningIsOpen"
  @closed="warningIsOpen = false"
/>

<KAlert
  alert-message="Success alert message that is dismissible"
  appearance="success"
  type="alert"
  dismiss-type="icon"
  :is-showing="successIsOpen"
  @closed="successIsOpen = false"
/>

<KAlert
  alert-message="Danger alert message that is dismissible"
  appearance="danger"
  type="alert"
  dismiss-type="icon"
  :is-showing="dangerIsOpen"
  @closed="dangerIsOpen = false"
/>

<KAlert
  alert-message="Alert with dismiss type as button"
  type="banner"
  dismiss-type="button"
  :is-showing="dismissTypeBtn"
  @closed="defaultIdismissTypeBtnsOpen = false"
/>
```

### Hide/Display

Set whether or not the alert box is shown.

> Note: By default is-showing is set to true.

- `is-showing`

```html
<KAlert
  :is-showing="false"
  alert-message="is-showing set to false"
/>
```

### Bordered

Adds border around alert. Used for [KToaster](/components/toaster.html).

- `is-bordered`

<KAlert is-bordered appearance="info" alert-message="Info bordered" />

```html
<KAlert
  is-bordered
  appearance="info"
  alert-message="Info bordered"
/>
```

### Left Border

Adds border to the left side. Typically used for alerts that show info that may link away like documentation.

- `has-left-border`

<KAlert has-left-border alert-message="Bordered alert" />

```html
<KAlert
  has-left-border
  alert-message="Bordered alert"
/>
```

### Right Border

Adds border to the right side. Typically used for alerts that show info that may link away like documentation.

- `has-right-border`

<KAlert has-right-border alert-message="Bordered alert" />

```html
<KAlert
  has-right-border
  alert-message="Bordered alert"
/>
```

### Top Border

Adds border to the top.

- `has-top-border`

<KAlert has-top-border  alert-message="Bordered alert" />

```html
<KAlert
  has-top-border
  alert-message="Bordered alert"
/>
```

### Bottom Border

Adds border to the bottom.

- `has-bottom-border`

<KAlert has-bottom-border  alert-message="Bordered alert"/>

```html
<KAlert
  has-bottom-border
  alert-message="Bordered alert"
/>
```

### Size

Controls size of alert.

- `small`

<div>
  <KAlert
    style="width:250px"
    size="small"
    alert-message="Small alert"
  />
</div>

```html
<KAlert
  style="width:250px"
  size="small"
  alert-message="Small alert"
/>
```

- `large`

`size="large"` allows further customization options. You can specify an icon to be displayed on the left in place of the colored ellipse using the `icon` property, description text to be displayed below the main alert message using the `description` slot and additional buttons using the `actionButtons` slot.

<div>
  <KAlert
    type="banner"
    dismiss-type="button"
    appearance="warning"
    icon="support"
    size="large"
    :is-showing="extraMsg"
    @closed="extraMsg = false"
  >
    <template v-slot:actionButtons>
      <KButton appearance="primary" size="small">Review</KButton>
    </template>
    <template v-slot:alertMessage>
      You’ve had 12 new mentions since you last logged in
    </template>
    <template v-slot:description>
      across 3 services
    </template>
  </KAlert>
</div>

```html
<KAlert
  type="banner"
  dismiss-type="button"
  appearance="warning"
  icon="support"
  size="large"
  :is-showing="extraMsg"
  @closed="extraMsg = false"
>
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
  <template v-slot:alertMessage>
    You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:description>
    across 3 services
  </template>
</KAlert>
```

### Fixed

Fixes KAlert to the top of the container.

> Note: Not demoed

- `is-fixed`

```html
<KAlert is-fixed  alert-message="Info bordered" />
```

## Slots

- `actionButtons` - Slot specifically meant for adding buttons other than Dismiss button
- `alertMessage` - Default message slot
- `description` - Alert message description slot available when these conditions are met: `type='banner'`, `size='large'` and `alertMessage` slot is rendered

<div>
  <KAlert
    type="banner"
    dismiss-type="button"
    appearance="success"
    :is-showing="extraBtnSlot"
    @closed="extraBtnSlot = false"
  >
    <template v-slot:alertMessage>
      I'm an alert with action buttons
    </template>
    <template v-slot:actionButtons>
      <KButton appearance="primary" size="small">Upgrade</KButton>
      <KButton appearance="primary" size="small">Downgrade</KButton>
    </template>
  </KAlert>
</div>

```html
<KAlert
  type="banner"
  dismiss-type="button"
  appearance="success"
  :is-showing="extraBtnSlot"
  @closed="extraBtnSlot = false"
>
    <template v-slot:alertMessage>
    I'm an alert with action buttons
  </template>
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Upgrade</KButton>
    <KButton appearance="primary" size="small">Downgrade</KButton>
  </template>
</KAlert>
```

## Variations

### Long Content / Prose

<KAlert appearance="success" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>
      Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.
    </p>
  </template>
</KAlert>

```html
<KAlert appearance="info" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>
      Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.
    </p>
  </template>
</KAlert>
```

### Word Wrap long urls

<KAlert appearance="warning" class="mt-5">
  <template v-slot:alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>

```html
<KAlert appearance="warning" class="mt-5">
  <template v-slot:alertMessage>
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

An Example of changing the success KAlert variant to lime instead of Kong's green might look like.

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

<script>
export default {
  data () {
    return {
      infoIsOpen: true,
      warningIsOpen: true,
      successIsOpen: true,
      dangerIsOpen: true,
      defaultIsClosed: true,
      defaultClosed: true,
      dismissTypeBtn: true,
      extraBtnSlot: true,
      extraMsg: true,
      extraMsg2: true,
      alert1IsOpen: true,
      alert2IsOpen: true,
      alert3IsOpen: true,
      alert4IsOpen: true
    }
  }
}
</script>

<style lang="scss">
.k-alert {
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}

.alert-wrapper {
  --KAlertSuccessBackground: lime;
  --KAlertSuccessColor: forestgreen;
}
</style>
