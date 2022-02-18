# Prompt

The **KPrompt** component is used to display a dialog that prompts a user to take an action.

<KButton appearance="primary" @click="defaultIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="defaultIsOpen"
  message="Hello, World?"
  @canceled="defaultIsOpen = false"
  @proceed="defaultIsOpen = false"
/>

```vue
<KButton
  appearance="primary"
  @click="defaultIsOpen = true"
>
  Prompt
</KButton>

<KPrompt
  :is-visible="defaultIsOpen"
  message="Hello, World?"
  @canceled="defaultIsOpen = false"
  @proceed="defaultIsOpen = false"
/>
```

```js
export default {
  data () {
    return {
      defaultIsOpen: false
    }
  }
}
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

```vue
<KPrompt
  :is-visible="contentIsOpen"
  title="Look Mah!"
  message="I'm prompting you"
  @canceled="contentIsOpen = false"
  @proceed="contentIsOpen = false"
/>
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

```vue
<KPrompt
  :is-visible="contentIsOpen"
  actionButtonText="Let's do it!"
  cancelButtonText="Abort"
  @canceled="buttonsIsOpen = false"
  @proceed="buttonsIsOpen = false"
/>
```

### type

This prompt determines the look and feel of the dialog. Can be `danger`, `warning`, or `info`. Defaults to `info`.

Use the `info` prompt type to notify the user about general information associated with the action about
to be taken.

<KButton appearance="primary" @click="infoIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="infoIsOpen"
  message="You have been informed 🕵🏻‍♂️"
  @canceled="infoIsOpen = false"
  @proceed="infoIsOpen = false"
/>

```vue
<KPrompt
  :is-visible="infoIsOpen"
  message="You have been informed 🕵🏻‍♂️"
  @canceled="infoIsOpen = false"
  @proceed="infoIsOpen = false"
/>
```

Use the `warning` prompt type if the user needs to be notified that there is a risk associated with the action
about to be taken. We will display a warning icon and prepend the 'Warning:' in the title for this flavor.

<KButton appearance="primary" @click="warningIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="warningIsOpen"
  title="Pay attention"
  message="I'm warning you 🤔"
  type="warning"
  @canceled="warningIsOpen = false"
  @proceed="warningIsOpen = false"
/>

```vue
<KPrompt
  :is-visible="warningIsOpen"
  message="I'm warning you 🤔"
  type="warning"
  @canceled="warningIsOpen = false"
  @proceed="warningIsOpen = false"
/>
```

Use the `danger` prompt type if the user is taking an irreversible action, like deleting an item. You can use this
type in conjuction with `confirmationText` to further restrict the action.

<KButton appearance="primary" @click="dangerIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="dangerIsOpen"
  type="danger"
  message="This is dangerous ☠️"
  @canceled="dangerIsOpen = false"
  @proceed="dangerIsOpen = false"
/>

```vue
<KPrompt
  :is-visible="dangerIsOpen"
  type="danger"
  message="This is dangerous ☠️"
  @canceled="dangerIsOpen = false"
  @proceed="dangerIsOpen = false"
/>
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

```vue
<KPrompt
  :is-visible="dangerConfirmIsOpen"
  type="danger"
  message="This is dangerous ☠️"
  confirmationText="I Agree"
  @canceled="dangerConfirmIsOpen = false"
  @proceed="dangerConfirmIsOpen = false"
/>
```

## Slots

There are 3 designated slots you can use to display content in the modal.

- `header-content`
- `body-content`
- `action-buttons` - Contains cancel & action buttons by default.

<KButton appearance="primary" @click="slotsIsOpen = true">Prompt</KButton>

<KPrompt
  :is-visible="slotsIsOpen"
  @canceled="slotsIsOpen = false"
  @proceed="slotsIsOpen = false">
  <template v-slot:header-content>
    <KIcon
      icon="immunity"
      color="#7F01FE"
      class="mr-2"
      size="20" />
    Look Mah!
  </template>
  <template v-slot:body-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" @click="slotsIsOpen = false" class="non-visual-button">Close</KButton>
  </template>
</KPrompt>

```vue
<KPrompt
  :is-visible="slotsIsOpen"
  @canceled="slotsIsOpen = false"
  @proceed="slotsIsOpen = false">
  <template v-slot:header-content>
    <KIcon
      icon="immunity"
      color="#7F01FE"
      class="mr-2"
      size="20" />
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

<script>
export default {
  data () {
    return {
      buttonsIsOpen: false,
      contentIsOpen: false,
      dangerIsOpen: false,
      dangerConfirmIsOpen: false,
      defaultIsOpen: false,
      infoIsOpen: false,
      slotsIsOpen: false,
      warningIsOpen: false
    }
  }
}
</script>
