<template>
  <KModal
    :action-button-appearance="actionButtonAppearance"
    :action-button-disabled="actionButtonDisabledValue"
    :action-button-text="actionButtonText"
    :cancel-button-appearance="cancelButtonAppearance"
    :cancel-button-disabled="cancelButtonDisabled"
    :cancel-button-text="cancelButtonText"
    class="k-prompt"
    :title="title"
    :visible="visible"
    v-bind="{ ...sanitizedAttrs, ...modalAttributes}"
    @canceled="$emit('canceled')"
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
        class="prompt-message"
      >
        <slot
          name="default"
        >
          <p>
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
          :id="confirmationInputId"
          ref="confirmationInputElement"
          v-model="confirmationInput"
          autocapitalize="off"
          autocomplete="off"
          data-testid="confirmation-input"
        />
      </div>
    </template>
  </KModal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, useAttrs, watch, nextTick } from 'vue'
import KModal from '@/components/KModal/KModal.vue'
import KInput from '@/components/KInput/KInput.vue'
import type { ButtonAppearance, ModalAttributes } from '@/types'
import { v4 as uuidv4 } from 'uuid'

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
})

const attrs = useAttrs()

defineEmits<{
  (e: 'canceled'): void
  (e: 'proceed'): void
}>()

const sanitizedAttrs = computed(() => {
  const attributes = Object.assign({}, attrs) as Record<string, any>

  // delete attributes that are handled through modalAttributes prop
  delete attributes['tabbable-options']
  delete attributes.width
  delete attributes['max-height']
  delete attributes['close-on-backdrop-click']
  delete attributes['proceed-on-enter']

  return attributes
})

const confirmationInput = ref<string>('')
const confirmationInputId = uuidv4()

const actionButtonDisabledValue = computed(() => {
  if (props.actionButtonDisabled) {
    return true
  }

  return props.confirmationText ? props.confirmationText !== confirmationInput.value : false
})

const confirmationPromptText = computed((): string[] => {
  return props.confirmationPrompt.split('{confirmationText}')
})

watch(() => props.visible, async (visible) => {
  if (visible) {
    await nextTick()
    confirmationInput.value = ''
    document.getElementById(confirmationInputId)?.focus()
  }
})
</script>

<style lang="scss" scoped>
.k-prompt {
  .prompt-message + .prompt-confirmation-container {
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
