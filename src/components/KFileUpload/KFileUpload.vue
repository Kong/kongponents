<template>
  <div class="k-file-upload">
    <KLabel
      v-if="label"
      v-bind="labelAttributes"
      class="k-file-upload-label"
      data-testid="k-file-upload-label"
      :for="customInputId"
    >
      {{ label }}
    </KLabel>

    <KInput
      :id="customInputId"
      :key="fileInputKey"
      :accept="accept"
      class="upload-input"
      :class="{
        'image-upload': type === 'image'
      }"
      :error-message="errorMessage"
      :has-error="hasUploadError"
      :help="help"
      :max-file-size="maximumFileSize"
      type="file"
      @change="onFileChange"
    />

    <KIcon
      v-if="type === 'image'"
      class="image-upload-icon"
      :color="iconColor"
      :icon="icon"
      :size="iconSize"
      @click.prevent="updateFile"
    />

    <a
      v-if="type === 'image'"
      class="image-upload-description"
      href="#"
      @click.prevent="updateFile"
    >
      {{ fileValue ? fileValue : placeholder }}
    </a>
    <KButton
      v-if="fileValue && removable"
      appearance="primary"
      class="remove-button"
      :class="[label ? 'k-file-upload-btn-with-label' : 'k-file-upload-btn-without-label', { 'move-btn-right': type !== 'file' }]"
      data-testid="remove-button"
      size="small"
      type="reset"
      @click="resetInput"
      @keyup.enter="resetInput"
    >
      <template #icon>
        <KIcon
          icon="close"
          size="16"
        />
      </template>
    </KButton>
    <KButton
      v-if="type === 'file'"
      :appearance="buttonAppearance"
      class="k-file-upload-btn"
      :class="[label ? 'k-file-upload-btn-with-label' : 'k-file-upload-btn-without-label']"
      data-testid="k-file-upload-button"
      size="small"
      @click="updateFile"
      @keyup.enter="updateFile"
    >
      {{ buttonText }}
    </KButton>
    <a
      v-if="type === 'file'"
      class="display-name"
      :class="[label ? 'has-label' : 'has-no-label']"
      href="#"
      @click="updateFile"
      @keyup.enter="updateFile"
    >
      {{ fileValue ? fileValue : placeholder }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { v1 as uuidv1 } from 'uuid'
import type { FileUploadType, ButtonAppearance } from '@/types'
import { KUI_ICON_SIZE_50 } from '@kong/design-tokens'

const props = defineProps({
  labelAttributes: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: String,
    default: '',
  },
  /**
  * Test mode - for testing only, strips out generated ids
  */
  testMode: {
    type: Boolean,
    default: false,
  },
  help: {
    type: String,
    default: undefined,
  },
  buttonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  buttonText: {
    type: String,
    default: 'Select file',
  },
  fileModel: {
    type: String,
    default: undefined,
  },
  removable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: 'No file selected',
  },
  /**
  * Set whether its file upload or image upload type
  */
  type: {
    type: String as PropType<FileUploadType>,
    default: 'file',
    validator: (value: FileUploadType): boolean => {
      return ['file', 'image'].includes(value)
    },
  },
  accept: {
    type: Array as PropType<string[]>,
    required: true,
  },
  maxFileSize: {
    type: Number,
    default: null,
  },
  /**
  * Set icon size
  */
  iconSize: {
    type: String,
    default: KUI_ICON_SIZE_50,
  },
  icon: {
    type: String,
    default: 'image',
  },
  /**
  * Set icon color
  */
  iconColor: {
    type: String,
    default: undefined,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'Please check file size.',
  },
})

const emit = defineEmits<{
  (e: 'file-added', val: File[]): void
  (e: 'file-removed'): void
  (e: 'error', val: File[]): void
}>()

const customInputId = computed((): string => props.testMode ? 'test-file-upload-id-1234' : uuidv1())
const maximumFileSize = computed((): Number => {
  if (props.maxFileSize || props.maxFileSize === 0) {
    return props.maxFileSize
  }
  return props.type === 'file' ? 5250000 : 1000000
})

const hasUploadError = ref(false)

// This holds the FileList
const fileInput = ref<File[]>([])
// To clear the input value after reset
const fileInputKey = ref(0)
// File fakepath
const fileValue = ref('')
// Array to store the previously selected FileList when user clicks reopen the file uploader and clicks on Cancel
const fileClone = ref<File[]>([])

const onFileChange = (evt: any): void => {
  fileInput.value = evt.target?.files
  fileValue.value = fileInput?.value[0]?.name

  const fileSize = fileInput?.value[0]?.size

  hasUploadError.value = Number(fileSize) as Number > maximumFileSize.value

  if (hasUploadError.value) {
    fileInputKey.value++
    emit('error', fileInput.value)
  }

  const inputElem = document.getElementById(customInputId.value) as HTMLInputElement

  if (fileSize) {
    // @ts-ignore
    fileClone.value.push(fileInput.value)
  } else {
    // @ts-ignore
    inputElem.files = fileClone.value[fileClone.value.length - 1]
    // @ts-ignore
    fileInput.value = inputElem.files
    if (inputElem.files) {
      fileValue.value = inputElem.files[inputElem.files.length - 1].name
    }
  }
  emit('file-added', fileInput.value)
}

// When KButton for Select file is clicked
const updateFile = (): void => {
  const inputEl = document.getElementById(customInputId.value)
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

  emit('file-removed')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-file-upload {
  position: relative;
  width: 100% !important;
  $kInputPaddingY: var(--kui-space-40, $kui-space-40);
  $kInputLabelMarginBottom: var(--KInputLabelMargin, var(--spacing-xs, var(--kui-space-40, $kui-space-40))); // matching KLabel margin bottom
  $kInputLabelLineHeight: var(--KInputLabelLineHeight, var(--type-lg, var(--kui-line-height-30, $kui-line-height-30))); // matching KLabel line height
  $kInputLineHeight: var(--kui-line-height-40, $kui-line-height-40); // matching KInput line height

  .k-file-upload-label {
    cursor: pointer !important;
  }

  .upload-input {
    width: 100% !important;
  }

  .k-file-upload-btn.k-button {
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
    height: 29px;
    position: absolute;
    right: 8px;
  }

  .k-file-upload-btn-with-label.k-button {
    top: 36px;
  }

  .k-file-upload-btn-without-label.k-button {
    top: 8px;
  }

  // To hide the button and thumbnail that appears in Safari and firefox after uploading a file
  :deep(.k-input-wrapper) input[type="file"]::-webkit-file-upload-button,
  :deep(.k-input-wrapper) input[type="file"]::file-selector-button {
    cursor: inherit;
    min-height: 100%;
    min-width: 100%;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  :deep(.k-input-wrapper) input[type="file"],
  :deep(.k-input-wrapper) input[type="file"].image-upload {
    color: transparent;
  }

  .remove-button {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: none;
    cursor: pointer;
    height: var(--spacing-lg, '24px');
    padding: var(--kui-space-30, $kui-space-30);
    position: absolute;
    right: 120px;

    &:hover,
    &:active {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent) !important;
      box-shadow: 0 0 0 2px var(--white, var(--kui-color-background, $kui-color-background)), 0 0 0 4px var(--KButtonPrimaryBase, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary)));
    }
  }

  .move-btn-right {
    right: 8px;
  }

  .image-upload-icon {
    cursor: pointer;
    left: 8px;
    position: absolute;
    top: 4px;
  }

  .image-upload-description {
    color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
    cursor: pointer;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    left: 40px;
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 12px;
    white-space: nowrap;
  }
}
</style>

<style lang="scss">
.k-file-upload {
  .k-input {
    height: 44px;

    + .help {
      cursor: default;
    }
  }

  input[type=file]{
    color: transparent;

    &:hover {
      cursor: pointer;
    }
  }

  .display-name {
    color: var(--black-70, var(--kui-color-text, $kui-color-text));
    cursor: pointer !important;
    left: 20px;
    pointer-events: none;
    position: absolute;

    &.has-label {
      top: 40px;
    }

    &.has-no-label {
      top: 12px;
    }
  }
}
</style>
