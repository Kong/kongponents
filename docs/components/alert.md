# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

<KAlert alert-message="I'm an alert" />
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

### Dismissible
KAlert allows for dismissal of the banner.

- `is-dismissible`  

<KAlert
  class="dismissible"
  is-dismissible
  alert-message="I can be dismissed!"/>
```vue
<KAlert
  class="dismissible"
  is-dismissible
  alert-message="I can be dismissed!"/>
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

- `hasLeftBorder`  

<KAlert
  hasLeftBorder
  alert-message="Bordered alert"/>

```vue
<KAlert
  hasLeftBorder
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
- `alertMessage` - Default message slot

<KAlert appearance="info">
  <template slot="alertIcon">
    <KIcon icon="portal" />
  </template>
  <template slot="alertMessage">
    I have an icon and a <a href="">Link</a>!
  </template>
</KAlert>

```vue
<KAlert appearance="info">
  <template slot="alertIcon">
    <KIcon icon="portal" />
  </template>
  <template slot="alertMessage">
    I have an icon and a <a href="">Link</a>!
  </template>
</KAlert>
```

## Variations

### Long Content / Prose

<KAlert appearance="info" class="mt-5">
  <template slot="alertMessage">
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>

```vue
<KAlert appearance="info" class="mt-5">
  <template slot="alertMessage">
    <div class="mt-2 bold">Failure Modes</div>
    <p>Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be <b>domineering</b>, <b>bottlenecked</b>, <b>status-oriented</b>, or <b>inert</b>.</p>
  </template>
</KAlert>
```

### Word Wrap long urls

<KAlert appearance="warning" class="mt-5">
  <template slot="alertMessage">
    Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).
  </template>
</KAlert>

```vue
<KAlert appearance="info" class="mt-5">
  <template slot="alertMessage">
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
