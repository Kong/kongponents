<template>
  <div class="k-file-upload">
    <KLabel
      v-if="label"
      :for="inputId"
      v-bind="labelAttributes"
      :required="isRequired"
    >
      {{ strippedLabel }}

      <template
        v-if="hasLabelTooltip"
        #tooltip
      >
        <slot name="label-tooltip" />
      </template>
    </KLabel>

    <div class="file-upload-input-wrapper">
      <span
        :key="fileInputKey"
        class="file-upload-input-text"
        :class="{ 'placeholder': !fileValue, 'has-icon': $slots.icon, 'disabled': disabled }"
      >
        {{ fileValue ? fileValue : placeholder }}
      </span>

      <KInput
        :id="inputId"
        :key="fileInputKey"
        :accept="accept"
        class="upload-input"
        :disabled="disabled"
        :error="hasUploadError || error"
        :error-message="errorMessage || fileSizeErrorMessage"
        :help="help"
        :max-file-size="maximumFileSize"
        :placeholder="placeholder"
        type="file"
        @change="onFileChange"
      >
        <template
          v-if="$slots.icon"
          #before
        >
          <slot name="icon" />
        </template>

        <template #after>
          <KButton
            appearance="tertiary"
            class="file-upload-button"
            data-testid="file-upload-button"
            :disabled="disabled"
            size="small"
            @click="onButtonClick"
            @keydown.space.prevent
            @keyup.space="onButtonClick"
          >
            {{ fileValue ? 'Clear' : buttonText }}
          </KButton>
        </template>
      </KInput>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, useAttrs, useSlots } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KButton from '@/components/KButton/KButton.vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'

const props = defineProps({
  labelAttributes: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: String,
    default: '',
  },
  help: {
    type: String,
    default: undefined,
  },
  buttonText: {
    type: String,
    default: 'Select file',
  },
  placeholder: {
    type: String,
    default: 'No file selected',
  },
  accept: {
    type: Array as PropType<string[]>,
    required: true,
  },
  maxFileSize: {
    type: Number,
    default: null,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const attrs = useAttrs()
const slots = useSlots()

const emit = defineEmits<{
  (e: 'file-added', val: File[]): void
  (e: 'file-removed'): void
  (e: 'error', val: File[]): void
}>()

const { stripRequiredLabel } = useUtilities()

const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.info || slots['label-tooltip']))
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')

const hasFileSizeError = ref<boolean>(false)
const fileSizeErrorMessage = computed((): string => {
  if (hasFileSizeError.value) {
    let units = 'bytes'
    let maxFileSize = maximumFileSize.value
    if (maximumFileSize.value >= 1000 && maximumFileSize.value < 1000000) {
      maxFileSize = maximumFileSize.value / 1000
      units = 'KB'
    }
    if (maximumFileSize.value >= 1000000) {
      maxFileSize = maximumFileSize.value / 1000000
      units = 'MB'
    }

    return `File size must be less than ${maxFileSize}${units}.`
  }

  return ''
})
const maximumFileSize = computed((): number => {
  if (props.maxFileSize || props.maxFileSize === 0) {
    return props.maxFileSize
  }

  return 5250000
})

const hasUploadError = ref<boolean>(false)

// This holds the FileList
const fileInput = ref<File[]>([])
// To clear the input value after reset
const fileInputKey = ref(0)
// File fakepath
const fileValue = ref<string>('')
// Array to store the previously selected FileList when user clicks reopen the file uploader and clicks on Cancel
const fileClone = ref<File[]>([])

const onFileChange = (evt: any): void => {
  fileInput.value = evt.target?.files
  fileValue.value = String(fileInput?.value[0]?.name)

  const fileSize = fileInput?.value[0]?.size

  hasUploadError.value = Number(fileSize) > maximumFileSize.value

  if (hasUploadError.value) {
    fileInputKey.value++

    if (Number(fileSize) > maximumFileSize.value) {
      hasFileSizeError.value = true
    }

    emit('error', fileInput.value)
  }

  const inputElem = document.getElementById(inputId.value) as HTMLInputElement

  if (fileSize) {
    // @ts-ignore
    fileClone.value.push(fileInput.value)
  } else {
    // @ts-ignore
    inputElem.files = fileClone.value[fileClone.value.length - 1]
    // @ts-ignore
    fileInput.value = inputElem.files

    if (inputElem.files) {
      fileValue.value = String(inputElem.files[inputElem.files.length - 1]?.name)
    }
  }

  emit('file-added', fileInput.value)
}

// When KButton for Select file is clicked
const onButtonClick = (): void => {
  if (fileValue.value) {
    resetInput()

    return
  }

  const inputEl = document.getElementById(inputId.value) as HTMLInputElement

  if (inputEl) {
    // Simulate button click to trigger input click
    inputEl.click()
  }
}

// When Cancel button is clicked
const resetInput = (): void => {
  fileInput.value = []
  fileValue.value = ''
  fileClone.value = []
  fileInputKey.value++
  hasUploadError.value = false
  hasFileSizeError.value = false

  emit('file-removed')
}
</script>

<style lang="scss" scoped>
/* Component variables */

$kFileUploadInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kFileUploadInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin

/* Component styles */

.k-file-upload {
  :deep(.k-input-wrapper) input[type="file"]::-webkit-file-upload-button,
  :deep(.k-input-wrapper) input[type="file"]::file-selector-button {
    margin: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    width: 0;
  }

  :deep(.k-input-wrapper) input[type="file"],
  :deep(.k-input-wrapper) input[type="file"][disabled] {
    color: transparent;
  }

  :deep(.k-input) {
    padding-right: 90px !important; // offset to account for button
  }

  .file-upload-input-wrapper {
    position: relative;

    .file-upload-input-text {
      @include inputText;
      @include truncate;

      left: 0;
      margin-left: $kFileUploadInputPaddingX;
      margin-top: $kFileUploadInputPaddingY;
      max-width: 90%;
      pointer-events: none;
      position: absolute;
      top: 0;
      z-index: 1;

      &.placeholder {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      }

      &.has-icon {
        // default spacing + icon size + icon spacing
        /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
        margin-left: calc($kFileUploadInputPaddingX + var(--kui-icon-size-40, $kui-icon-size-40) + var(--kui-space-40, $kui-space-40));
        max-width: 80%;
      }

      &.disabled {
        color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      }
    }
  }
}
</style>
