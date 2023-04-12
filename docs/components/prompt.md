# Prompt

::: info
Are you looking for a modal with no close icon, centered text, and the ability to display an image in the header of the modal? Try [KModal](/components/modal.html) instead.
:::

The **KPrompt** component is used to display a dialog that prompts a user to take an action.

<KButton appearance="primary" @click="defaultIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="defaultIsOpen"
  message="Hello, World?"
  @canceled="defaultIsOpen = false"
  @proceed="defaultIsOpen = false"
/>

```html
<KButton appearance="primary" @click="defaultIsOpen = true">Prompt</KButton>

<KPrompt :is-visible="defaultIsOpen" message="Hello, World?" @canceled="defaultIsOpen = false" @proceed="defaultIsOpen = false" />
```

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const defaultIsOpen = ref(false)

    return {
      defaultIsOpen
    }
  }
})
```

## Props

### isVisible

Tells the component whether or not to render the open prompt.

### title

Text displayed in header if not using slot. If no title is provided, the prompt `type` is used.

### message

Text to display in body section if not using slot.

<KButton appearance="primary" @click="contentIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="contentIsOpen"
  title="Look Mah!"
  message="I'm prompting you"
  @canceled="contentIsOpen = false"
  @proceed="contentIsOpen = false"
/>

```html
<KPrompt :is-visible="contentIsOpen" title="Look Mah!" message="I'm prompting you" @canceled="contentIsOpen = false" @proceed="contentIsOpen = false" />
```

### actionButtonText

Change the text content of the submit/proceed button.

### cancelButtonText

Change the text content of the close/cancel button.

<KButton appearance="primary" @click="buttonsIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="buttonsIsOpen"
  message="Look at my button customizations"
  actionButtonText="Let's do it!"
  cancelButtonText="Abort"
  @canceled="buttonsIsOpen = false"
  @proceed="buttonsIsOpen = false"
/>

```html
<KPrompt :is-visible="contentIsOpen" actionButtonText="Let's do it!" cancelButtonText="Abort" @canceled="buttonsIsOpen = false" @proceed="buttonsIsOpen = false" />
```

### actionPending

This boolean indicates if an action is being taken on the dialog and we should disable the action button to prevent spam clicking.

<KButton appearance="primary" @click="pendingIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="pendingIsOpen"
  message="Click Cancel to close me"
  :action-pending="true"
  @canceled="pendingIsOpen = false"
  @proceed="pendingIsOpen = false"
/>

```html
<KPrompt :is-visible="pendingIsOpen" message="Click Cancel to close me" :action-pending="true" @canceled="pendingIsOpen = false" @proceed="pendingIsOpen = false" />
```

### type

This prop determines the look and feel of the dialog. Can be `danger`, `warning`, or `info`. Defaults to `info`.

#### Information

Use the `info` prompt type to notify the user about general information associated with the action about to be taken.

<KButton appearance="primary" @click="infoIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="infoIsOpen"
  message="You have been informed 🕵🏻‍♂️"
  @canceled="infoIsOpen = false"
  @proceed="infoIsOpen = false"
/>

```html
<KPrompt :is-visible="infoIsOpen" message="You have been informed 🕵🏻‍♂️" @canceled="infoIsOpen = false" @proceed="infoIsOpen = false" />
```

#### Warning

Use the `warning` prompt type if the user needs to be notified that there is a risk associated with the action about to be taken. We will display a warning icon and prepend the 'Warning:' in the title for this flavor.

<KButton appearance="primary" @click="warningIsOpen = true">Prompt</KButton>

<KPrompt :is-visible="warningIsOpen" title="Pay attention" message="I'm warning you 🤔" type="warning" @canceled="warningIsOpen = false" @proceed="warningIsOpen = false" />

```html
<KPrompt :is-visible="warningIsOpen" message="I'm warning you 🤔" type="warning" @canceled="warningIsOpen = false" @proceed="warningIsOpen = false" />
```

#### Danger

Use the `danger` prompt type if the user is taking an irreversible action, like deleting an item. You can use this type in conjuction with `confirmationText` to further restrict the action.

<KButton appearance="primary" @click="dangerIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="dangerIsOpen"
  type="danger"
  message="This is dangerous ☠️"
  @canceled="dangerIsOpen = false"
  @proceed="dangerIsOpen = false"
/>

```html
<KPrompt :is-visible="dangerIsOpen" type="danger" message="This is dangerous ☠️" @canceled="dangerIsOpen = false" @proceed="dangerIsOpen = false" />
```

### confirmationText

Provide a string the user must type before the action button becomes enabled

<KButton appearance="primary" @click="dangerConfirmIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="dangerConfirmIsOpen"
  type="danger"
  message="This is dangerous ☠️"
  confirmationText="I Agree"
  @canceled="dangerConfirmIsOpen = false"
  @proceed="dangerConfirmIsOpen = false"
/>

```html
<KPrompt :is-visible="dangerConfirmIsOpen" type="danger" message="This is dangerous ☠️" confirmationText="I Agree" @canceled="dangerConfirmIsOpen = false" @proceed="dangerConfirmIsOpen = false" />
```

### preventProceedOnEnter

If you don't want to `emit` the `proceed` event upon pressing the `Enter` key, you can prevent it using this prop. Defaults to `false`.

<KButton appearance="primary" @click="preventProceed = true">Prompt</KButton>

<KPrompt
  :is-visible="preventProceed"
  type="danger"
  message="I don't care if you press Enter"
  prevent-proceed-on-enter
  @canceled="preventProceed = false"
  @proceed="preventProceed = false"
/>

```html
<KPrompt :is-visible="preventProceed" type="danger" message="I don't care if you press Enter" prevent-proceed-on-enter @canceled="preventProceed = false" @proceed="preventProceed = false" />
```

### tabbableOptions
Options to be passed to [`focus-trap`](https://github.com/focus-trap/focus-trap), which is responsible for trapping focus inside the prompt box. If you're experiencing issues with testing `<KPrompt>` in `jsdom`, you can pass this prop according to the [focus-trap documentation](https://github.com/focus-trap/focus-trap#testing-in-jsdom).


## Slots

There are 3 designated slots you can use to display content in the modal.

- `header-content`
- `body-content`
- `action-buttons` - Contains cancel & action buttons by default.

<KButton appearance="primary" @click="slotsIsOpen = true">Prompt</KButton>

<KPrompt :is-visible="slotsIsOpen" @canceled="slotsIsOpen = false" @proceed="slotsIsOpen = false">
  <template v-slot:header-content>
    <KIcon icon="immunity" color="#7F01FE" class="mr-2" size="20" />
    Look Mah!
  </template>
  <template v-slot:body-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" @click="slotsIsOpen = false" class="non-visual-button">Close</KButton>
  </template>
</KPrompt>

```html
<KPrompt :is-visible="slotsIsOpen" @canceled="slotsIsOpen = false" @proceed="slotsIsOpen = false">
  <template v-slot:header-content>
    <KIcon icon="immunity" color="#7F01FE" class="mr-2" size="20" />
    Look Mah!
  </template>
  <template v-slot:body-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" @click="slotsIsOpen = false" class="non-visual-button">Close</KButton>
  </template>
</KPrompt>
```

## Events

- `@canceled` - Emitted when cancel/close button is clicked or the Escape key is pressed
- `@proceed` - Emitted when action button is clicked or the Enter key is pressed

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KPromptMaxHeight` | Max height of body content in prompt

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      buttonsIsOpen: false,
      contentIsOpen: false,
      dangerIsOpen: false,
      dangerConfirmIsOpen: false,
      defaultIsOpen: false,
      infoIsOpen: false,
      pendingIsOpen: false,
      slotsIsOpen: false,
      warningIsOpen: false,
      preventProceed: false
    }
  }
})
</script>
