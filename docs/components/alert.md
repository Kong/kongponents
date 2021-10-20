# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

<KAlert is-dismissible alert-message="I'm an alert" />

```vue
<KAlert is-dismissible alert-message="I'm an alert" />
```

## Props
### Appearances
What color and purpose the Alert should be. Shares similar appearances to those of [KButton](/components/button).

- `info`
- `warning`
- `success`
- `danger`

<KAlert
  has-button
  has-ellipse
  appearance="info"
  alert-message="Info alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Primary</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
 </KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="warning"
  alert-message="Warning alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Warning</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="success"
  alert-message="Success alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Success</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="danger"
  alert-message="Danger alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Warning</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>


```vue
<KAlert
  has-button
  has-ellipse
  appearance="info"
  alert-message="Info alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Primary</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
 </KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="warning"
  alert-message="Warning alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Warning</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="success"
  alert-message="Success alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Success</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>
<KAlert
  has-button
  has-ellipse
  appearance="danger"
  alert-message="Danger alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Warning</KButton>
    <KButton appearance="outline" size="small">Outline</KButton>
  </template>
</KAlert>
```

### Dismissible
KAlert allows for dismissal of the banner.

- `is-dismissible`

<KAlert
  is-dismissible
  appearance="info"
  alert-message="Info alert message" />
<KAlert
  is-dismissible
  appearance="warning"
  alert-message="Warning alert message" />
<KAlert
  is-dismissible
  appearance="success"
  alert-message="Success alert message" />
<KAlert
  is-dismissible
  appearance="danger"
  alert-message="Danger alert message" />

```vue
<KAlert
  is-dismissible
  appearance="info"
  alert-message="Info alert message" />
<KAlert
  is-dismissible
  appearance="warning"
  alert-message="Warning alert message" />
<KAlert
  is-dismissible
  appearance="success"
  alert-message="Success alert message" />
<KAlert
  is-dismissible
  appearance="danger"
  alert-message="Danger alert message" />
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

## Slots
- `alertIcon` - Slot specifically meant for adding an icon
- `mainMessageText` - Primary message slot
- `secMessageText` - Secondary message slot

<KAlert is-wide-banner>
  <template v-slot:alertIcon>
    <KIcon icon="notificationInbox" color="var(--red-500)" size="32" />
  </template>
  <template v-slot:mainMessageText>
   You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:secMessageText>
    across 3 services  
  </template>
  <template v-slot:actionButtons>
    <KButton size="small" appearance='secondary'>Review</KButton>
    <KButton size="small">Dismiss</KButton>
  </template>
</KAlert>

```vue
<KAlert is-wide-banner>
  <template v-slot:alertIcon>
    <KIcon icon="notificationInbox" color="var(--red-500)" size="32" />
  </template>
  <template v-slot:mainMessageText>
   You’ve had 12 new mentions since you last logged in
  </template>
  <template v-slot:secMessageText>
    across 3 services  
  </template>
  <template v-slot:actionButtons>
    <KButton size="small" appearance='secondary'>Review</KButton>
    <KButton size="small">Dismiss</KButton>
  </template>
</KAlert>
```

- `alertMessage` - Default message slot
- `actionButtons` - Default button slot

<KAlert
  has-button
  has-ellipse
  appearance="warning"
  alert-message="Warning alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Dismiss</KButton>
  </template>
</KAlert>

```vue
<KAlert
  has-button
  has-ellipse
  appearance="warning"
  alert-message="Warning alert message">
  <template v-slot:actionButtons>
    <KButton appearance="primary" size="small">Dismiss</KButton>
  </template>
</KAlert>
```

## Variations

### Long Content / Prose

<KAlert isShowing appearance="info" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>

```vue
<KAlert isShowing appearance="info" class="mt-5">
  <template v-slot:alertMessage>
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>
```

### Word Wrap long urls

<KAlert isShowing appearance="warning" class="mt-5">
  <template v-slot:alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>

```vue
<KAlert isShowing appearance="warning" class="mt-5">
  <template v-slot:alertMessage>
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
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

<style lang="scss">
.k-alert {
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}

.k-alert.isWideBanner {
  right: 20%;
}

.alert-wrapper {
  --KAlertSuccessBackground: lime;
  --KAlertSuccessColor: forestgreen;
}

.alert-action {
  &.info button.primary {
    color: var(--blue-500);
    background-color: var(--blue-100);
    --KButtonPrimaryBase: var(--blue-300);
    --KButtonPrimaryHover: var(--blue-300);
  }
  &.info button.outline {
    color: var(--blue-400);
    border: 1px solid var(--blue-400);
    --KButtonOutlineBorder: var(--blue-300);
    --KButtonOutlineHoverBorder: var(--blue-300);
    --KButtonOutlineActiveBorder: var(--blue-300);
  }
  &.warning button.primary {
    color: var(--yellow-500);
    background-color: var(--yellow-100);
    --KButtonPrimaryBase: var(--yellow-300);
    --KButtonPrimaryHover: var(--yellow-300);
  }
  &.warning button.outline {
    color: var(--yellow-400);
    border: 1px solid var(--yellow-400);
    --KButtonOutlineBorder: var(--yellow-300);
    --KButtonOutlineHoverBorder: var(--yellow-300);
    --KButtonOutlineActiveBorder: var(--yellow-300);
  }
  &.success button.primary {
    color: var(--green-600);
    background-color: var(--green-100);
    border: var(--green-100);
    --KButtonPrimaryBase: var(--green-300);
    --KButtonPrimaryHover: var(--green-300);
  }
  &.success button.outline {
    color: var(--green-600);
    border: 1px solid var(--green-600);
    --KButtonOutlineBorder: var(--green-400);
    --KButtonOutlineHoverBorder: var(--green-400);
    --KButtonOutlineActiveBorder: var(--green-400);
  }
  &.danger button.primary {
    color: var(--red-700);
    background-color: var(--red-100);
    border: var(--red-100);
    --KButtonPrimaryBase: var(--red-500);
    --KButtonPrimaryHover: var(--red-500);
  }
  &.danger button.outline {
    color: var(--red-700);
    border: 1px solid var(--red-700);
    --KButtonOutlineBorder: var(--red-500);
    --KButtonOutlineHoverBorder: var(--red-500);
    --KButtonOutlineActiveBorder: var(--red-500);
  }
}
</style>
