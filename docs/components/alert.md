# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

<KAlert alert-message="I'm an alert"/>

```vue
<KAlert alert-message="I'm an alert" />
```

## Props
### Appearances
What color and purpose the Alert should be. Shares similar appearances to those of [KButton](/components/button).

- `info`
- `warning`
- `success`
- `danger`

<KAlert
  appearance="info"
  alert-message="Info alert message" />
<KAlert
  appearance="warning"
  alert-message="Warning alert message" />
<KAlert
  appearance="success"
  alert-message="Success alert message" />
<KAlert
  appearance="danger"
  alert-message="Danger alert message" />

```vue
<KAlert
  appearance="info"
  alert-message="Info alert message" />
<KAlert
  appearance="warning"
  alert-message="Warning alert message" />
<KAlert
  appearance="success"
  alert-message="Success alert message" />
<KAlert
  appearance="danger"
  alert-message="Danger alert message" />
```

### Type
What purpose the Alert should be.

- `banner`
- `alert`

<KAlert alert-message="I'm a banner type alert" type="banner" />

```vue
<KAlert alert-message="I'm a banner type alert" type="banner" />
```

<KAlert alert-message="I'm an alert" type="alert" />

```vue
<KAlert alert-message="I'm an alert" type="alert" />
```

### Dismiss Type
KAlert allows for dismissal of the banner using an icon or button. An alert is not dismissible if "none" is passed

- `none`
- `icon`
- `button`

<KAlert alert-message="Alert that can not be dismissed" type="alert" dismissType="none" />

```vue
<KAlert alert-message="Alert that can not be dismissed" 
  type="alert" 
  dismissType="none" />
```

<KAlert 
  alert-message="Info alert message that is dismissible" 
  appearance="info" 
  type="alert" 
  dismissType="icon" 
  :isShowing="infoIsOpen" 
  @closed="infoIsOpen = false" />

```vue
<KAlert 
  alert-message="Info alert message that is dismissible" 
  appearance="info" 
  type="alert" 
  dismissType="icon" 
  :isShowing="infoIsOpen" 
  @closed="infoIsOpen = false" />
```

<KAlert 
  alert-message="Warning alert message that is dismissible" 
  appearance="warning" 
  type="alert" 
  ismissType="icon" 
  :isShowing="warningIsOpen" 
  @closed="warningIsOpen = false" />

```vue
<KAlert 
  alert-message="Warning alert message that is dismissible" 
  appearance="warning" 
  type="alert" 
  ismissType="icon" 
  :isShowing="warningIsOpen" 
  @closed="warningIsOpen = false" />
```

<KAlert 
  alert-message="Success alert message that is dismissible" 
  appearance="success" 
  type="alert" 
  dismissType="icon" 
  :isShowing="successIsOpen" 
  @closed="successIsOpen = false" />

```vue
<KAlert 
  alert-message="Success alert message that is dismissible" 
  appearance="success" 
  type="alert" 
  dismissType="icon" 
  :isShowing="successIsOpen" 
  @closed="successIsOpen = false" />
```

<KAlert 
  alert-message="Danger alert message that is dismissible" 
  appearance="danger" 
  type="alert" 
  dismissType="icon" 
  :isShowing="dangerIsOpen" 
  @closed="dangerIsOpen = false" />


```vue
<KAlert 
  alert-message="Danger alert message that is dismissible" 
  appearance="danger" 
  type="alert" 
  dismissType="icon" 
  :isShowing="dangerIsOpen" 
  @closed="dangerIsOpen = false" />
```

<KAlert alert-message="Alert with dismiss type as button" type="banner" dismissType="button" :isShowing="dismissTypeBtn" @closed="dismissTypeBtn = false"/>

```vue
<KAlert 
  alert-message="Alert with dismiss type as button" 
  type="banner" 
  dismissType="button" 
  :isShowing="dismissTypeBtn" 
  @closed="defaultIdismissTypeBtnsOpen = false"/>
```

### Bordered
Adds border around alert. Used for [KToaster]().

- `is-bordered`

<KAlert
  is-bordered
  appearance="info"
  alert-message="Info bordered"/>
```vue
<KAlert
  is-bordered
  appearance="info"
  alert-message="Info bordered"/>
```

### Left Border
Adds border to the left side. Typically used for alerts that show info that may link away like documentation.

- `has-left-border`

<KAlert
  has-left-border
  alert-message="Bordered alert"/>

```vue
<KAlert
  has-left-border
  alert-message="Bordered alert"/>
```

### Right Border
Adds border to the right side. Typically used for alerts that show info that may link away like documentation.

- `has-right-border`

<KAlert
  has-right-border
  alert-message="Bordered alert"/>

```vue
<KAlert
  has-right-border
  alert-message="Bordered alert"/>
```

### Top Border
Adds border to the top.

- `has-top-border`

<KAlert
  has-top-border
  alert-message="Bordered alert"/>

```vue
<KAlert
  has-top-border
  alert-message="Bordered alert"/>
```

### Bottom Border
Adds border to the bottom.

- `has-bottom-border`

<KAlert
  has-bottom-border
  alert-message="Bordered alert"/>

```vue
<KAlert
  has-bottom-border
  alert-message="Bordered alert"/>
```

### Size
Controls size of alert. Currently only *small* is supported.

- `small`

<KAlert
  style="width:250px"
  size="small"
  alert-message="Small alert"/>

```vue
<KAlert
  style="width:250px"
  size="small"
  alert-message="Small alert"/>
```

### Fixed
Fixes KAlert to the top of the container.

> Note: Not demoed

- `is-fixed`

```vue
<KAlert
  is-fixed
  alert-message="Info bordered"/>
```

### Large
To have an icon on the left(customizable), alertmessage(default/additional), along with the buttons on right, KAlert has to have: <br>*is-large**<br>*dismissType="button"*<br>*type="banner"* <br><br>
To have an ellipse on left, alertmessage(default), along with the buttons on right, KAlert has to have: <br>*is-large*<br>*type="banner"*

- `is-large`

<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="warning" 
  icon="support" 
  is-large
  :isShowing="extraMsg" 
  @closed="extraMsg = false">
  <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
  <template v-slot:alertMessage>
    You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:additionalAlertMessage>
    across 3 services
  </template>
</KAlert>

```vue
<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="warning" 
  is-large 
  icon="support" >
  <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
  <template v-slot:alertMessage>
    You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:additionalAlertMessage>
    across 3 services
  </template>
</KAlert> 
```

## Slots
- `extraButtons` - Slot specifically meant for adding buttons other than Dismiss button
- `alertMessage` - Default message slot
- `additionalAlertMessage` - Additional message slot available when alert type is banner, has *is-large* prop and the alertMessage slot is rendered


<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="success"  
  :isShowing="extraBtnSlot" 
  @closed="extraBtnSlot = false">
  <template v-slot:alertMessage>
    I'm an alert with multiple buttons
  </template>
 <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Upgrade</KButton>
    <KButton appearance="primary" size="small">Downgrade</KButton>
  </template>
</KAlert>

```vue
<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="success"  
  :isShowing="extraBtnSlot" 
  @closed="extraBtnSlot = false">
    <template v-slot:alertMessage>
    I'm an alert with multiple buttons
  </template>
 <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Upgrade</KButton>
    <KButton appearance="primary" size="small">Downgrade</KButton>
  </template>
</KAlert>
```

<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="warning" 
  is-large 
  :isShowing="extraMsg" 
  @closed="extraMsg = false">
  <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
  <template v-slot:alertMessage>
    You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:additionalAlertMessage>
    across 3 services
  </template>
</KAlert>

```vue
<KAlert 
  type="banner" 
  dismissType="button" 
  appearance="warning" 
  is-large 
  :isShowing="extraMsg" 
  @closed="extraMsg = false">
  <template v-slot:extraButtons>
    <KButton appearance="primary" size="small">Review</KButton>
  </template>
  <template v-slot:alertMessage>
    You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:additionalAlertMessage>
    across 3 services
  </template>
</KAlert> 
```
## Variations

### Long Content / Prose

<KAlert appearance="success" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>

```vue
<KAlert appearance="info" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>
```

### Word Wrap long urls

<KAlert appearance="warning" class="mt-5">
  <template v-slot:alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>

```vue
<KAlert appearance="info" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KAlertInfoColor `| Info variant text  color
| `--KAlertInfoBorder`| Info variant border
| `--KAlertInfoBackground` | Info variant background color
| `--KAlertSuccessColor `| Success variant text  color
| `--KAlertSuccessBorder`| Success variant border
| `--KAlertSuccessBackground` | Success variant background color
| `--KAlertDangerColor `| Danger variant text  color
| `--KAlertDangerBorder`| Danger variant border
| `--KAlertDangerBackground` | Danger variant background color
| `--KAlertWarningColor `| Warning variant text  color
| `--KAlertWarningBorder`| Warning variant border
| `--KAlertWarningBackground` | Warning variant background color


\
An Example of changing the success KAlert variant to lime instead of Kong's green might
look like.

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="alert-wrapper">
    <KAlert appearance="success" alert-message="Im Lime" />
  </div>
</template>

```vue
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
      extraMsg: true
    }
  }
}
</script>

<style lang="scss">
.k-alert {
  box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}
.alert-wrapper {
  --KAlertSuccessBackground: lime;
  --KAlertSuccessColor: forestgreen;
}
</style>