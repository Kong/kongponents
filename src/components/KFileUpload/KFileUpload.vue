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
      :class="{
        'image-upload': type === 'image',
        'input-error' : hasUploadError
      }"
      @change="onFileChange"
    />

    <KIcon
      v-if="type === 'image'"
      :size="iconSize"
      :color="iconColor"
      :icon="icon"
      class="image-upload-icon"
      @click="updateFile"
    />

    <a
      v-if="type === 'image'"
      href="#"
      class="image-upload-description"
      @click="updateFile"
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
      default: '',
    },
    /**
     * Set icon color
     */
    iconColor: {
      type: String,
      default: '',
    },
  },

  emits: ['file-added', 'file-removed', 'error'],

  setup(props, { emit }) {
    const customInputId = computed((): string => props.testMode ? 'test-file-upload-id-1234' : uuidv1())
    const maximumFileSize = computed((): Number => props.type === 'file' ? 5242880 : 1000000)

    const hasUploadError = ref(false)

    // This holds the FileList
    const fileInput = ref([]) as any
    // To clear the input value after reset
    const fileInputKey = ref(0)
    // File fakepath
    const fileValue = ref('') as any
    // Array to store the previously selected FileList when user clicks reopen the file uploader and clicks on Cancel
    const fileClone = ref([]) as any

    const onFileChange = (evt: any): void => {
      fileInput.value = evt.target?.files
      fileValue.value = fileInput?.value[0]?.name

      const fileSize = fileInput?.value[0]?.size

      if (props.type === 'file') {
        hasUploadError.value = fileSize > maximumFileSize.value

        if (hasUploadError.value) {
          fileInputKey.value++
        }

        emit('error', fileInput.value)
      } else {
        hasUploadError.value = fileSize > maximumFileSize.value

        if (hasUploadError.value) {
          fileInputKey.value++
        }

        emit('error', fileInput.value)
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
      fileInput.value = ''
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
    right: 15px;
    top: 35px;
    border-radius: 100px;
    height: 29px;
  }

  // To hide the thumbnail that appears in Safari after uploading a file
  & :deep(.k-input-wrapper) input[type="file"]::-webkit-file-upload-button {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    opacity: 0;
    cursor: inherit;
  }

  & :deep(.k-input-wrapper) input[type="file"],
  & :deep(.k-input-wrapper) input[type="file"].image-upload {
    color: transparent;
  }

  .remove-button {
    position: absolute;
    top: 30px;
    right: 120px;
    border: none;
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
  .upload-input {
    height: 44px;
  }

  input[type=file]{
    color:transparent;
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
