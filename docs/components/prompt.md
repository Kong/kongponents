# Prompt

KPrompt is a pop-up window that temporarily interrupts the user's interaction with the main content, usually to require user confirmation before proceeding with an action. This component uses [KModal](/components/modal) under the hood.

:::tip NOTE
Consider using [KModal](/components/modal) instead if your use case is one of the below:
* you need to display some information to the user but their input/interaction is not required
* you need to customize the appearance of elements in the modal (e.g. hide the title or provide custom footer content)
* you need to provide a custom modal layout that differs significantly from the default layout (modal header, followed by content section, followed by footer)
:::

<KButton @click="prompt1Visible = true">Prompt</KButton>
<KPrompt
  confirmation-text="confirm"
  :visible="prompt1Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  confirmation-text="confirm"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

## Props

### visible

A boolean that defines whether the prompt is shown.

<KButton @click="prompt2Visible = true">Prompt</KButton>
<KPrompt
  :visible="prompt2Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```vue
<template>
  <KButton @click="promptVisible = true">Prompt</KButton>

  <KPrompt
    :visible="promptVisible"
    title="Prompt"
    @cancel="handlePromptClose"
    @proceed="handlePromptClose"
  />
</template>

<script setup lang="ts">
const promptVisible = ref<boolean>(false)

const handlePromptClose = () => {
  promptVisible.value = false
}
</script>
```

### title

A string to be displayed as the prompt dialog title. Can also be [slotted](#title-1). If no title provided, defaults to "Confirm your action".

<KButton @click="prompt3Visible = true">Prompt</KButton>
<KPrompt
  title="Long prompt title gets truncated with an ellipsis"
  :visible="prompt3Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  title="Long prompt title gets truncated with an ellipsis"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### confirmationText

A string the user must type before the action button becomes enabled.

<KButton @click="prompt4Visible = true">Prompt</KButton>
<KPrompt
  confirmation-text="confirm"
  :visible="prompt4Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  confirmation-text="confirm"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### message

Message string to be displayed in prompt content section.

<KButton @click="prompt5Visible = true">Prompt</KButton>
<KPrompt
  message="This action cannot be reversed."
  confirmation-text="confirm"
  :visible="prompt5Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  message="This action cannot be reversed."
  confirmation-text="confirm"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### confirmationPrompt

String above the input field when `confirmationText` prop is present.

Defaults to 'Type "{confirmationText}"" to confirm your action.' where `{confirmationText}` is replaced with the string passed through the `confirmationText` prop.

<KButton @click="prompt6Visible = true">Prompt</KButton>
<KPrompt
  confirmation-prompt="Please type {confirmationText} below to delete this resource permanently."
  confirmation-text="delete permanently"
  :visible="prompt6Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  confirmation-prompt="Please type {confirmationText} below to delete this resource permanently."
  confirmation-text="delete permanently"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### actionButtonText

Text to be displayed in action button. Defaults to "Confirm".

<KButton @click="prompt7Visible = true">Prompt</KButton>
<KPrompt
  action-button-text="Acknowledge"
  :visible="prompt7Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  action-button-text="Acknowledge"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### actionButtonAppearance

Appearance of action button. See [KButton `appearance`](/components/button#appearance) prop for more details. Defaults to `primary`.

<KButton @click="prompt8Visible = true">Prompt</KButton>
<KPrompt
  action-button-appearance="danger"
  :visible="prompt8Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  action-button-appearance="danger"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### actionButtonDisabled

Set to `true` to disable the action button. Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ actionEnabled: false }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="prompt9Visible = true">Prompt</KButton>
    </div>
    <KInputSwitch
      v-model="data.actionEnabled"
      label="Action button enabled"
    />
  </div>

  <KPrompt
    :action-button-disabled="!data.actionEnabled"
    :visible="prompt9Visible"
    title="Prompt"
    @cancel="closeAllPrompts"
    @proceed="closeAllPrompts"
  />
</KComponent>

```html
<KPrompt
  :action-button-disabled="false"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### cancelButtonText

Text to be displayed in cancel button. Defaults to "Cancel".

<KButton @click="prompt10Visible = true">Prompt</KButton>
<KPrompt
  cancel-button-text="Leave"
  :visible="prompt10Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  cancel-button-text="Leave"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### cancelButtonAppearance

Appearance of cancel button. See [KButton `appearance`](/components/button#appearance) prop for more details. Defaults to `tertiary`.

<KButton @click="prompt11Visible = true">Prompt</KButton>
<KPrompt
  cancel-button-appearance="secondary"
  :visible="prompt11Visible"
  title="Prompt"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  cancel-button-appearance="secondary"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### cancelButtonDisabled

Set to `true` to disable the cancel button. Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ cancelEnabled: false }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="prompt12Visible = true">Prompt</KButton>
    </div>
    <KInputSwitch
      v-model="data.cancelEnabled"
      label="Cancel button enabled"
    />
  </div>

  <KPrompt
    :cancel-button-disabled="!data.cancelEnabled"
    :visible="prompt12Visible"
    title="Prompt"
    @cancel="closeAllPrompts"
    @proceed="closeAllPrompts"
  />
</KComponent>

```html
<KPrompt
  :cancel-button-disabled="false"
  :visible="promptVisible"
  title="Prompt"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

### modalAttributes

KPrompt provides a `modalAttributes` prop to expose  secondary KModal component props for customization (check out [KModal props](/components/modal#props) for details).

```ts
interface ModalAttributes {
  tabbableOptions?: Object
  maxWidth?: string
  maxHeight?: string
  closeOnBackdropClick?: boolean
}
```

<KButton @click="prompt13Visible = true">Prompt</KButton>
<KPrompt
  :modal-attributes="{ maxWidth: '90%' }"
  :visible="prompt13Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
/>

```html
<KPrompt
  :modal-attributes="{ maxWidth: '90%' }"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
/>
```

## Slots

### default

Slot for prompt content.

<KButton @click="prompt14Visible = true">Prompt</KButton>
<KPrompt
  title="Prompt"
  :visible="prompt14Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
>
  <div class="vertical-container">
    <KInput label="First name" required autocapitalize="off" autocomplete="off" />
    <KInput label="Last name" required autocapitalize="off" autocomplete="off" />
  </div>
</KPrompt>

```html
<KPrompt
  title="Prompt"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
>
  <KInput label="First name" required />
  <KInput label="Last name" required />
</KPrompt>
```

### title

Slot for title string.

<KButton @click="prompt15Visible = true">Prompt</KButton>
<KPrompt
  title="Title"
  :visible="prompt15Visible"
  @cancel="closeAllPrompts"
  @proceed="closeAllPrompts"
>
  <template #title>
    Slotted title
  </template>
</KPrompt>

```html
<KPrompt
  title="Title"
  :visible="promptVisible"
  @cancel="handlePromptClose"
  @proceed="handlePromptProceed"
>
  <template #title>
    Slotted title
  </template>
</KPrompt>
```

## Events

### proceed

Emitted when action button is clicked. Doesn't pass any payload.

### cancel

Emitted when cancel button or close icon (when not hidden) is clicked. Doesn't pass any payload.

<script setup lang="ts">
import { ref } from 'vue'
import { BackIcon, ForwardIcon } from '@kong/icons'

const closeAllPrompts = () => {
  prompt1Visible.value = false
  prompt2Visible.value = false
  prompt3Visible.value = false
  prompt4Visible.value = false
  prompt5Visible.value = false
  prompt6Visible.value = false
  prompt7Visible.value = false
  prompt8Visible.value = false
  prompt9Visible.value = false
  prompt10Visible.value = false
  prompt11Visible.value = false
  prompt12Visible.value = false
  prompt13Visible.value = false
  prompt14Visible.value = false
  prompt15Visible.value = false
}

const prompt1Visible = ref<boolean>(false)
const prompt2Visible = ref<boolean>(false)
const prompt3Visible = ref<boolean>(false)
const prompt4Visible = ref<boolean>(false)
const prompt5Visible = ref<boolean>(false)
const prompt6Visible = ref<boolean>(false)
const prompt7Visible = ref<boolean>(false)
const prompt8Visible = ref<boolean>(false)
const prompt9Visible = ref<boolean>(false)
const prompt10Visible = ref<boolean>(false)
const prompt11Visible = ref<boolean>(false)
const prompt12Visible = ref<boolean>(false)
const prompt13Visible = ref<boolean>(false)
const prompt14Visible = ref<boolean>(false)
const prompt15Visible = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>