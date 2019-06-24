# Alert

**KAlert** is used to display contextual information to a user. These are typically used to notify something may be disabled or there may be an error.

```vue live
<KAlert
  is-showing
  alert-message="I'm an alert" />
```  

## Appearances
KAlert shares similar appeances to those of [KButton](/components/button).

`info` - Default, Used when providing context or general information to a user.  
`warning`    
`success`  
`danger`
``` vue live
<KAlert 
  is-showing
  appearance="info"
  alert-message="Info alert message" />
<KAlert 
  is-showing
  appearance="warning"
  alert-message="Warning alert message" />
<KAlert 
  is-showing
  appearance="success"
  alert-message="Success alert message" />
<KAlert 
  is-showing
  appearance="danger"
  alert-message="Danger alert message" />
```

#Dismissible

KAlert allows for dismissal of the banner. By providing `is-dismissible` a close
icon will show and allow the alert to be removed.

```vue live
<KAlert
  class="dismissible"
  is-showing
  is-dismissible
  alert-message="I can be dismissed!"/>
``` 

<style lang="scss">
  .k-alert {
    display: block;
    width: calc(100% - 2rem);;
  }
  .preview .k-alert:not(:last-of-type) {
    margin-bottom: 1rem;
  }
</style>
