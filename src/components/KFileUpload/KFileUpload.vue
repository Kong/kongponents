<template>
  <div
    class="k-file-upload w-100"
  >
    <KLabel
      v-if="label"
      :for="customInputId"
      v-bind="labelAttributes"
      class="cursor-pointer"
      data-testid="k-file-upload-label"
    >
      {{ label }}
    </KLabel>

    <KInput
      :id="customInputId"
      :key="fileInputKey"
      type="file"
      :accept="accept"
      :help="help"
      :max-file-size="maximumFileSize"
      class="w-100 upload-input cursor-pointer"
      :has-error="hasUploadError"
      :error-message="errorMessage"
      :class="{
        'image-upload': type === 'image'
      }"
      @change="onFileChange"
    />

    <KIcon
      v-if="type === 'image'"
      :size="iconSize"
      :color="iconColor"
      :icon="icon"
      class="image-upload-icon"
      @click.prevent="updateFile"
    />

    <a
      v-if="type === 'image'"
      href="#"
      class="image-upload-description"
      @click.prevent="updateFile"
    >
      {{ fileValue ? fileValue : placeholder }}
    </a>
    <KButton
      v-if="fileValue && removable"
      class="remove-button"
      :class="type !== 'file' ? 'move-btn-right' : ''"
      type="reset"
      appearance="primary"
      size="small"
      data-testid="remove-button"
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
      data-testid="k-file-upload-button"
      size="small"
      @click="updateFile"
      @keyup.enter="updateFile"
    >
      {{ buttonText }}
    </KButton>
    <a
      v-if="type === 'file'"
      class="display-name cursor-pointer"
      href="#"
      @click="updateFile"
      @keyup.enter="updateFile"
    >
      {{ fileValue ? fileValue : placeholder }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import KInput from '@/components/KInput/KInput.vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { v1 as uuidv1 } from 'uuid'

export default defineComponent({
  name: 'KFileUpload',

  components: {
    KLabel,
    KInput,
    KButton,
    KIcon,
  },

  props: {
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
      type: String,
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
      type: String,
      default: 'file',
      validator: (value: string): boolean => {
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
      default: '26',
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
  },

  emits: ['file-added', 'file-removed', 'error'],

  setup(props, { emit }) {
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

      hasUploadError.value = fileSize > maximumFileSize.value

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

    return {
      fileInput,
      customInputId,
      resetInput,
      onFileChange,
      fileInputKey,
      fileValue,
      updateFile,
      hasUploadError,
      fileClone,
      maximumFileSize,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-file-upload {
  position: relative;

  .k-file-upload-btn.k-button {
    position: absolute;
    right: 12px;
    top: 35px;
    border-radius: 100px;
    height: 29px;
  }

  // To hide the thumbnail that appears in Safari after uploading a file
  :deep(.k-input-wrapper) input[type="file"]::-webkit-file-upload-button {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    opacity: 0;
    cursor: inherit;
  }

  :deep(.k-input-wrapper) input[type="file"],
  :deep(.k-input-wrapper) input[type="file"].image-upload {
    color: transparent;
  }

  .remove-button {
    position: absolute;
    top: 38px;
    right: 118px;
    border: none;
    height: var(--spacing-lg);
    background-color: transparent;
    cursor: pointer;
    padding: var(--type-xxs) 6px;

    &:hover,
    &:active {
      background-color: transparent !important;
      box-shadow: 0 0 0 2px var(--white, #ffffff), 0 0 0 4px var(--KButtonPrimaryBase, var(--blue-500, #1155cb));
    }
  }

  .move-btn-right {
    right: 10px;
  }

  .image-upload-icon {
    position: absolute;
    top: var(--type-xxs);
    left: var(--spacing-xs);
    cursor: pointer;
  }

  .image-upload-description {
    position: absolute;
    left: 44px;
    top: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--blue-500);
    font-size: 13px;
    line-height: 20px;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.k-file-upload {
  .k-input {
    height: 44px;
  }

  input[type=file]{
    color:transparent;

    &:hover {
      cursor: pointer;
    }
  }

  .display-name {
    color: var(--black-70);
    position: absolute;
    pointer-events: none;
    top: 40px;
    left: 20px;
  }
}
</style>
