<template>
  <div
    class="k-upload w-100"
  >
    <KLabel
      v-if="label && appearance === 'file'"
      :for="uploadId"
      v-bind="labelAttributes"
      data-testid="k-upload-label"
    >
      {{ label }}
    </KLabel>

    <KInput
      :id="customInputId"
      ref="fileInput"
      :key="fileInputKey"
      type="file"
      :accept="fileInputAcceptTypes"
      :help="help"
      :class="[
        'w-100',
        'upload-input',
        'cursor-pointer',
        { 'file-upload': appearance === 'file' },
        { 'image-upload': appearance === 'image' },
        { 'input-error' : hasUploadError }
      ]"
      @change="onFileChange"
    />
    <KIcon
      v-if="appearance === 'image'"
      class="image-upload-icon"
      icon="image"
      size="26"
      @click="updateFile"
    />
    <p
      v-if="appearance === 'image'"
      class="image-upload-description"
      @click="updateFile"
    >
      {{ uploadImagePlaceholder }}
    </p>
    <KButton
      v-if="fileValue && appearance === 'file' && isRemovable && !hasUploadError"
      id="pseudoCancel"
      type="reset"
      appearance="primary"
      size="small"
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
      v-if="appearance === 'file'"
      :appearance="buttonAppearance"
      class="k-upload-btn"
      data-testid="k-upload-button"
      size="small"
      @click="updateFile"
      @keyup.enter="updateFile"
    >
      {{ buttonText }}
    </KButton>
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
  name: 'KUpload',

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
    icon: {
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
    isRemovable: {
      type: Boolean,
      default: false,
    },
    uploadImagePlaceholder: {
      type: String,
      default: '',
    },
    /**
     * Set whether its file upload or image upload
     */
    appearance: {
      type: String,
      default: 'file',
      validator: (value: string): boolean => {
        return ['file', 'image'].includes(value)
      },
    },
    fileInputAcceptTypes: {
      type: Array as PropType<string[]>,
      required: true,
    },
    maxImageSize: {
      type: Number,
      default: 1000000,
    },
    maxFileSize: {
      type: Number,
      default: 5242880,
    },
  },

  emits: ['canceled', 'file-added', 'file-removed', 'file-upload-error', 'image-upload-error'],

  setup(props, { attrs, emit }) {
    const uploadId = computed((): string => (attrs.id ? String(attrs.id) : props.testMode ? 'test-textArea-id-1234' : uuidv1()))
    const customInputId = computed((): string => props.testMode ? 'test-select-text-id-1234' : uuidv1())

    const hasUploadError = ref(false)

    // This holds the FileList
    const fileInput = ref([]) as any
    // To clear the input value after reset
    const fileInputKey = ref(0)
    // File fakepath
    const fileValue = ref('') as any
    // Array to store the previously selected FileList when user clicks reopen the file uploader and clicks on Cancel
    const fileClone = ref([]) as any

    const onFileChange = (e: { target: { files: any; value: any } }): void => {
      fileInput.value = e.target?.files
      fileValue.value = e.target?.value

      const fileSize = fileInput?.value[0]?.size

      if (props.appearance === 'file') {
        hasUploadError.value = fileSize > props.maxFileSize
        if (hasUploadError.value) fileInputKey.value++
        emit('file-upload-error', fileInput.value)
      } else {
        hasUploadError.value = fileSize > props.maxImageSize
        if (hasUploadError.value) fileInputKey.value++
        emit('image-upload-error', fileInput.value)
      }

      const inputElem = document.getElementById(customInputId.value) as HTMLInputElement

      if (fileSize) {
        fileClone.value.push(fileInput.value)
      } else {
        inputElem.files = fileClone.value[fileClone.value.length - 1]
        fileInput.value = inputElem.files
        if (inputElem.files) {
          fileValue.value = inputElem.files[inputElem.files.length - 1].name
        }
      }
      emit('file-added', fileInput.value)
    }

    // If KButton for Select file is clicked
    const updateFile = (): void => {
      const inputEl = document.getElementById(customInputId.value)
      if (inputEl) {
      // Simulate button click to trigger input click
        inputEl.click()
      }
    }

    // If Cancel button is clicked
    const resetInput = (): void => {
      fileInput.value = ''
      fileValue.value = ''
      fileClone.value = []
      fileInputKey.value++

      emit('file-removed')
    }

    return {
      uploadId,
      fileInput,
      customInputId,
      resetInput,
      onFileChange,
      fileInputKey,
      fileValue,
      updateFile,
      hasUploadError,
      fileClone,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-upload {
  position: relative;
}

.k-upload .k-upload-btn.k-button {
    position: absolute;
    right: 15px;
    top: 35px;
    border-radius: 100px;
    height: 29px;
}

.k-upload :deep(.k-input-wrapper) input[type="file"]::-webkit-file-upload-button {
  display: none;
}

.k-upload :deep(.k-input-wrapper) input[type="file"].image-upload {
  color: transparent;
}

#pseudoCancel {
  position: absolute;
  top: 30px;
  right: 120px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 6px;
}

.image-upload-icon {
  position: absolute;
  top: 10px;
  left: 8px;
  cursor: pointer;
}

.image-upload-description {
  position: absolute;
  left: 44px;
  top: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--blue-500);
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}
</style>
