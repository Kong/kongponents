<template>
  <KModal
    v-bind="{ ...sanitizedAttrs, ...modalAttributes }"
    :action-button-appearance="actionButtonAppearance"
    :action-button-disabled="actionButtonDisabledValue"
    :action-button-text="actionButtonText"
    :cancel-button-appearance="cancelButtonAppearance"
    :cancel-button-disabled="cancelButtonDisabled"
    :cancel-button-text="cancelButtonText"
    class="k-prompt"
    :input-autofocus="modalAttributes.inputAutofocus === undefined ? true : modalAttributes.inputAutofocus"
    :title="title || 'Confirm your action'"
    :visible="visible"
    @cancel="$emit('cancel')"
    @proceed="$emit('proceed')"
  >
    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>
    <template #default>
      <div
        v-if="$slots.default || message"
        class="prompt-content"
      >
        <slot name="default">
          <p class="prompt-message">
            {{ message }}
          </p>
        </slot>
      </div>

      <div
        v-if="confirmationText"
        class="prompt-confirmation-container"
      >
        <p class="prompt-confirmation-text">
          {{ confirmationPromptText[0] }} <span class="confirmation-text">"{{ confirmationText }}"</span>
          {{ confirmationPromptText[1] ? confirmationPromptText[1] : '' }}
        </p>
        <KInput
          v-model="confirmationInput"
          :aria-label="`${confirmationPromptText[0]}'${confirmationText}'${(confirmationPromptText[1] ? confirmationPromptText[1] : '')}`"
          autocapitalize="off"
          autocomplete="off"
          data-testid="confirmation-input"
          :error="displayErrorState"
          :error-message="errorMessage"
          @keydown.enter.prevent="onEnter"
        />
      </div>
    </template>
  </KModal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, useAttrs, watch } from 'vue'
import KModal from '@/components/KModal/KModal.vue'
import KInput from '@/components/KInput/KInput.vue'
import type { ButtonAppearance, ModalAttributes } from '@/types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  actionButtonText: {
    type: String,
    default: 'Confirm',
  },
  actionButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  actionButtonDisabled: {
    type: Boolean,
    default: false,
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
  cancelButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'tertiary',
  },
  cancelButtonDisabled: {
    type: Boolean,
    default: false,
  },
  confirmationText: {
    type: String,
    default: '',
  },
  confirmationPrompt: {
    type: String,
    default: 'Type {confirmationText} to confirm your action.',
  },
  modalAttributes: {
    type: Object as PropType<ModalAttributes>,
    default: () => ({}),
  },
  errorMessage: {
    type: String,
    default: 'You must enter the text as indicated above to confirm.',
  },
})

const attrs = useAttrs()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'proceed'): void
}>()

const sanitizedAttrs = computed(() => {
  const attributes = Object.assign({}, attrs) as Record<string, any>

  // delete attributes that are handled through modalAttributes prop
  delete attributes['tabbable-options']
  delete attributes['max-width']
  delete attributes['max-height']
  delete attributes['close-on-backdrop-click']
  delete attributes['input-autofocus']
  // delete KModal props that are not available in KPrompt
  delete attributes['hide-close-icon']
  delete attributes['hide-cancel-button']
  delete attributes['full-screen']

  return attributes
})

const confirmationInput = ref<string>('')
const displayErrorState = ref<boolean>(false)

const actionButtonDisabledValue = computed(() => {
  if (props.actionButtonDisabled) {
    return true
  }

  return props.confirmationText ? props.confirmationText !== confirmationInput.value : false
})

const confirmationPromptText = computed((): string[] => {
  return props.confirmationPrompt.split('{confirmationText}')
})

const onEnter = () => {
  if (!actionButtonDisabledValue.value) {
    emit('proceed')
  } else {
    displayErrorState.value = true
  }
}

watch(() => props.visible, (visible: boolean) => {
  if (!visible) {
    confirmationInput.value = ''
    displayErrorState.value = false
  }
})

watch(confirmationInput, (value: string) => {
  if (value && value === props.confirmationText) {
    displayErrorState.value = false
  }
})
</script>

<style lang="scss" scoped>
.k-prompt {
  .prompt-content + .prompt-confirmation-container {
    margin-top: var(--kui-space-80, $kui-space-80);
  }

  .prompt-confirmation-container {
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-40, $kui-space-40);

    .prompt-confirmation-text {
      .confirmation-text {
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      }
    }
  }
}
</style>
