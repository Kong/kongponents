<template>
  <div
    class="k-file-upload"
    v-bind="modifiedAttrs"
    :role="isDragAndDropAllowed ? 'region' : undefined"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent="isDragging = true"
    @drop.prevent="onDrop"
  >
    <KLabel
      v-if="label"
      v-bind="labelAttributes"
      :for="fileInputId"
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
        :class="{ 'placeholder': !fileName, 'has-icon': $slots.icon, 'disabled': disabled }"
      >
        {{ fileName ? fileName : placeholder }}
      </span>

      <KInput
        :id="fileInputId"
        :key="fileInputKey"
        ref="input"
        :accept="accept"
        class="upload-input"
        :class="{ 'dragging': isDragging && isDragAndDropAllowed }"
        :disabled="disabled"
        :error="hasError"
        :error-message="errorMessage || invalidFileTypeErrorMessage || fileSizeErrorMessage"
        :help="help"
        :placeholder="placeholder"
        title=""
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
          >
            {{ fileName ? 'Clear' : buttonText }}
          </KButton>
        </template>
      </KInput>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { computed, ref, useAttrs, useId, useTemplateRef, watch } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KButton from '@/components/KButton/KButton.vue'
import useUtilities from '@/composables/useUtilities'
import type { FileUploadProps, FileUploadEmits, FileUploadSlots } from '@/types'

const {
  labelAttributes = {},
  label = '',
  help,
  buttonText = 'Select file',
  placeholder = 'No file selected',
  accept,
  maxFileSize = null,
  error,
  errorMessage = '',
  disabled,
  allowDragAndDrop = true,
} = defineProps<FileUploadProps>()

const emit = defineEmits<FileUploadEmits>()

const slots = defineSlots<FileUploadSlots>()

const attrs = useAttrs()

const { stripRequiredLabel } = useUtilities()

const defaultId = useId()
const fileInputId = computed((): string => attrs.id ? String(attrs.id) : defaultId)

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  delete $attrs.id // delete id because we bind id to the input element

  return $attrs
})

const fileInput = useTemplateRef('input')
const hasLabelTooltip = computed((): boolean => !!(labelAttributes?.info || slots['label-tooltip']))
const strippedLabel = computed((): string => stripRequiredLabel(label, isRequired.value))
const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')

const hasFileSizeError = ref<boolean>(false)
const fileSizeErrorMessage = computed((): string => {
  if (hasFileSizeError.value) {
    let units = 'bytes'
    let maxFileSize = maximumFileSize.value
    if (maximumFileSize.value >= 1024 && maximumFileSize.value < 1024 * 1024) {
      maxFileSize = maximumFileSize.value / 1024
      units = 'KB'
    }
    if (maximumFileSize.value >= 1024 * 1024) {
      maxFileSize = maximumFileSize.value / (1024 * 1024)
      units = 'MB'
    }

    return `File size must be less than ${maxFileSize}${units}.`
  }

  return ''
})
const maximumFileSize = computed((): number => {
  if (maxFileSize || maxFileSize === 0) {
    return maxFileSize
  }

  return 5 * 1024 * 1024
})

const hasError = computed(() => invalidFileTypeError.value || hasFileSizeError.value || error)

// To clear the input value after reset
const fileInputKey = ref<number>(0)
// File fakepath
const fileName = ref<string>('')
// A copy of previously selected FileList to restore when user clicks reopen the file uploader and clicks on Cancel
const previousFiles = ref<FileList | null>(null)

const onFileChange = (evt: Event): void => {
  invalidFileTypeError.value = false // file picker only allows selecting accepted files

  // https://html.spec.whatwg.org/multipage/input.html#concept-input-apply
  // `.files` always exists for `<input type="file">` elements
  const files = (evt.target as HTMLInputElement).files!

  const fileSize = files[0]?.size

  if (Number(fileSize) > maximumFileSize.value) {
    fileInputKey.value++
    hasFileSizeError.value = true
    emit('error', files)
  }

  const inputElem = fileInput.value?.$el?.querySelector('input') as HTMLInputElement

  if (files.length) {
    previousFiles.value = files
    fileName.value = files[0].name || ''
    emit('file-added', files)
  } else {
    inputElem.files = previousFiles.value
    fileName.value = previousFiles.value?.[0]?.name || ''
  }
}

// When KButton for Select file is clicked
const onButtonClick = (): void => {
  if (fileName.value) {
    resetInput()

    return
  }

  const inputEl = fileInput.value?.$el?.querySelector('input') as HTMLInputElement

  if (inputEl) {
    // Simulate button click to trigger input click
    inputEl.click()
  }
}

// When Cancel button is clicked
const resetInput = (): void => {
  previousFiles.value = null
  fileName.value = ''
  fileInputKey.value++
  hasFileSizeError.value = false

  emit('file-removed')
}

const isDragAndDropAllowed = computed((): boolean => allowDragAndDrop && !disabled)
const isDragging = ref<boolean>(false)

const invalidFileTypeError = ref<boolean>(false)
const isAcceptedFile = (file: File): boolean => {
  return accept.some(acceptedType => {
    if (acceptedType.startsWith('.')) {
      // Match file extension
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
    } else if (acceptedType.endsWith('/*')) {
      // Match base MIME type, e.g., image/* -> image/jpeg
      const baseType = acceptedType.slice(0, -2)
      return file.type.startsWith(baseType)
    } else {
      // Match exact MIME type
      return file.type === acceptedType
    }
  })
}
const invalidFileTypeErrorMessage = computed((): string => {
  if (invalidFileTypeError.value) {
    return `Unsupported file type. Please upload one of the following: ${accept.join(', ')}`
  }

  return ''
})

const onDrop = (evt: DragEvent): void => {
  if (isDragAndDropAllowed.value) {
    fileInput.value?.input?.focus()
    isDragging.value = false
    const files = evt.dataTransfer?.files

    if (files && files.length) {
      const fileSize = files[0]?.size

      if (Number(fileSize) > maximumFileSize.value) {
        fileInputKey.value++
        hasFileSizeError.value = true
        emit('error', files)
        return
      }

      // TODO: validate file against accept
      if (isAcceptedFile(files[0])) {
        invalidFileTypeError.value = false
        previousFiles.value = files
        fileName.value = files[0].name || ''
        emit('file-added', files)
      } else {
        invalidFileTypeError.value = true
      }
    }
  }
}

watch(() => attrs.id, () => {
  fileInputKey.value++
}, { immediate: true })
</script>

<style lang="scss" scoped>
/* Component variables */

$kFileUploadInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kFileUploadInputPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin

/* Component styles */

.k-file-upload {
  :deep(.k-input) input[type="file"]::-webkit-file-upload-button,
  :deep(.k-input) input[type="file"]::file-selector-button {
    margin: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    width: 0;
  }

  :deep(.k-input) input[type="file"],
  :deep(.k-input) input[type="file"][disabled] {
    color: transparent !important;
  }

  .file-upload-input-wrapper {
    position: relative;

    .file-upload-input-text {
      @include inputText;

      // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
      // stylelint-disable-next-line no-duplicate-selectors
      & {
        @include truncate;
      }

      // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
      // stylelint-disable-next-line no-duplicate-selectors
      & {
        left: 0;
        margin-left: $kFileUploadInputPaddingX;
        margin-top: $kFileUploadInputPaddingY;
        max-width: 90%;
        pointer-events: none;
        position: absolute;
        top: 0;
        z-index: 1;
      }

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

    .upload-input.dragging {
      :deep(input) {
        @include inputHover;
      }
    }
  }
}
</style>
