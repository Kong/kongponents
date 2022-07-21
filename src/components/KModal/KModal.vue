<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="(evt) => close(false, evt)"
    >
      <div class="k-modal-dialog modal-dialog">
        <div
          v-if="enableDismiss"
          class="close-button"
        >
          <KButton
            class="non-visual-button"
            aria-label="Close"
            @click="close(true)"
          >
            <KIcon
              icon="close"
              :color="dismissButtonColor"
              size="15"
            />
          </KButton>
        </div>
        <div class="k-modal-content modal-content">
          <div
            v-if="hasHeaderImage"
            class="k-modal-header-image d-flex"
          >
            <slot name="header-image">
              <!-- Use canvas for calculating dismissButtonShade off header image -->
              <canvas
                v-if="dismissButtonShade === 'auto' && imageStats.width && imageStats.height"
                :id="canvasId"
                :width="imageStats.width"
                :height="imageStats.height"
                :title="headerImageText"
              />
              <!-- Otherwise standard img handling -->
              <img
                v-else
                :id="imageId"
                :src="headerImageSrc"
                :alt="headerImageText"
              >
            </slot>
          </div>
          <div
            v-if="$slots['header-content'] || !hideTitle"
            role="heading"
            aria-level="2"
            :class="{
              'header-left': textAlignment === 'left',
              'header-centered': textAlignment === 'center',
              'header-right': textAlignment === 'right',
              'mb-5': !hasHeaderImage,
              'mb-4': hasHeaderImage
            }"
            class="k-modal-header modal-header"
          >
            <slot name="header-content">
              {{ title }}
            </slot>
          </div>
          <div
            :class="{
              'content-left': textAlignment === 'left',
              'content-centered': textAlignment === 'center',
              'content-right': textAlignment === 'right',
            }"
            class="k-modal-body modal-body"
          >
            <slot name="body-content">
              {{ content }}
            </slot>
          </div>
          <div class="k-modal-footer modal-footer d-flex">
            <slot name="footer-content">
              <KButton
                v-if="!hideCancelButton"
                :appearance="cancelButtonAppearance"
                @click="close(true)"
                @keyup.esc="close(true)"
              >
                {{ cancelButtonText }}
              </KButton>
              <div class="k-modal-action-buttons">
                <slot name="action-buttons">
                  <KButton
                    :appearance="actionButtonAppearance"
                    @click="proceed"
                    @keyup.enter="proceed"
                  >
                    {{ actionButtonText }}
                  </KButton>
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUpdated, onUnmounted, watchEffect } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import KButton from '@/components/KButton/KButton.vue'

export default defineComponent({
  name: 'KModal',
  components: { KButton },

  props: {
    /**
     * Set a path for the image to display in the header-image slot
     */
    headerImageSrc: {
      type: String,
      default: '',
    },
    /**
     * Alt text for the header image
     */
    headerImageText: {
      type: String,
      default: 'Header image',
    },
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
      type: Boolean,
      default: false,
    },
    /**
     * Set to true to render an 'x' dismiss button
     */
    enableDismiss: {
      type: Boolean,
      default: false,
    },
    /**
     * Controls whether the dismiss button is light or dark shade.
     */
    dismissButtonShade: {
      type: String,
      default: 'auto',
      validator: (val: string): boolean => ['auto', 'light', 'dark'].includes(val),
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: '',
    },
    /**
     * Set the alignment for the title and content
     */
    textAlignment: {
      type: String,
      default: 'center',
      validator: (val: string): boolean => ['left', 'center', 'right'].includes(val),
    },
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
      type: String,
      default: 'Submit',
    },
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
      type: String,
      default: 'primary',
    },
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline',
    },
    /**
     * Set to not render the cancel button
     */
    hideCancelButton: {
      type: Boolean,
      default: false,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['canceled', 'proceed'],

  setup(props, { emit, slots }) {
    const canvas = ref<CanvasRenderingContext2D>()
    const hasHeaderImage = computed((): boolean => {
      return !!(slots['header-image'] || props.headerImageSrc)
    })
    const imageStats = ref({
      height: 0,
      width: 0,
    })

    const dismissButtonColor = computed((): string => {
      // base color on dismissButtonShade prop if it exists
      if (props.dismissButtonShade === 'dark') {
        return 'var(--grey-600)'
      }

      if (props.dismissButtonShade === 'light') {
        return 'var(--grey-400)'
      }
      // if on 'auto' base it off computedImageDarkness
      if (computedImageDarkness.value === 'light') {
        return 'var(--grey-600)'
      } else if (computedImageDarkness.value === 'dark') {
        return 'var(--grey-400)'
      }
      // default
      return 'var(--grey-600)'
    })

    const handleKeydown = (e: any): void => {
      if (props.isVisible && e.keyCode === 27) {
        close(true)
      }
    }

    const close = (force = false, event?: any): void => {
      // Close if force === true or if the user clicks on .k-modal-backdrop
      if (force || event?.target?.classList?.contains('k-modal-backdrop')) {
        emit('canceled')
      }
    }

    const proceed = (): void => {
      emit('proceed')
    }

    // only bother with this if we have a src for the header image and a dismiss button with 'auto' for the dismissButtonShade
    const shouldComputeImageDarkness = computed(() => {
      return !!(props.headerImageSrc && props.enableDismiss && props.dismissButtonShade === 'auto')
    })
    const computedImageDarkness = ref('none')
    const getComputedImageDarkness = () => {
      // don't bother unless the dialog is visible, the canvas has been initialized, and
      // we should
      if (props.isVisible && canvas.value && shouldComputeImageDarkness.value) {
        const ctx = canvas.value
        const img = document.createElement('img')
        img.src = props.headerImageSrc

        img.style.display = 'none'
        document.body.appendChild(img)

        img.onload = function() {
          imageStats.value.height = img.naturalHeight
          imageStats.value.width = img.naturalWidth
          const width = imageStats.value.width
          const height = imageStats.value.height
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, width, height)

          const data = imageData.data
          let r, g, b, avg
          let colorSum = 0

          for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x]
            g = data[x + 1]
            b = data[x + 2]

            avg = Math.floor((r + g + b) / 3)
            colorSum += avg
          }

          const brightness = Math.floor(colorSum / (width * height))

          if (brightness > 70) {
            computedImageDarkness.value = 'dark'
          } else {
            computedImageDarkness.value = 'light'
          }
        }
      }
    }

    watchEffect(() => {
      if (typeof document !== 'undefined') {
        if (props.isVisible) {
          // Hide body overflow
          document?.body?.classList.add('k-modal-overflow-hidden')
        } else {
          // Reset body overflow
          document?.body?.classList.remove('k-modal-overflow-hidden')
        }
      }
    })

    const imageId = computed((): string => props.testMode ? 'test-modal-image-1234' : uuidv1())
    const canvasId = computed((): string => props.testMode ? 'test-modal-image-canvas-1234' : uuidv1())
    onUpdated(() => {
      if (props.isVisible && hasHeaderImage.value && shouldComputeImageDarkness.value) {
        // TODO: generated ID
        const headerImageElem = document.getElementById(imageId.value) as HTMLImageElement
        if (headerImageElem) {
          imageStats.value.height = headerImageElem.naturalHeight
          imageStats.value.width = headerImageElem.naturalWidth
        }

        const canvasElem = document.getElementById(canvasId.value) as HTMLCanvasElement
        if (canvasElem) {
          const ctx = canvasElem.getContext('2d') as CanvasRenderingContext2D
          canvas.value = ctx
        }

        getComputedImageDarkness()
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)

      if (props.isVisible) {
        // Hide body overflow
        document?.body?.classList.add('k-modal-overflow-hidden')
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      // Reset body overflow
      document?.body?.classList.remove('k-modal-overflow-hidden')
    })

    return {
      hasHeaderImage,
      computedImageDarkness,
      dismissButtonColor,
      canvas,
      imageId,
      canvasId,
      imageStats,
      close,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--KModalBackdrop, rgba(11, 23, 45, .6));
  z-index: 1100;
}

// Allow modal backdrop to scroll if viewport is shorter than modal
.k-modal-overflow-hidden .k-modal-backdrop {
  overflow: auto;
}

.k-modal {
  // use a var to ensure correct sizing of .k-modal-header-image
  --KModalPadding: var(--spacing-xl, spacing(xl));

  .k-modal-dialog {
    position: relative;
    width: auto;
    max-width: var(--KModalMaxWidth, 500px);
    margin: 50px auto;
    padding: var(--KModalPadding);
    border-radius: 3px;
    border: var(--KModalBorder);
    box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));
    background: #fff;
    z-index: 9999;

    .close-button {
      position: absolute;
      right: 0px;
      top: var(--spacing-md);
      // 1 more than .k-modal-dialog
      z-index: 1000;
    }
  }

  .k-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;

    .k-modal-header-image {
      margin-top: calc(#{var(--KModalPadding)} * -1);
      margin-left: calc(#{var(--KModalPadding)} * -1);
      margin-right: calc(#{var(--KModalPadding)} * -1);
      margin-bottom: var(--spacing-xl, spacing(xl));
    }

    .k-modal-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--KModalHeaderColor, var(--black-500, color(black-500)));
      font-size: var(--KModalHeaderSize, 20px);
      font-weight: var(--KModalHeaderWeight, 600);

      &.header-centered {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }

      &.header-left {
        text-align: left;
        margin-left: 0;
        margin-right: auto;
      }

      &.header-right {
        text-align: right;
        margin-left: auto;
        margin-right: 0;
      }
    }

    .k-modal-body {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, spacing(lg)));
      color: var(--KModalColor, var(--grey-500, color(grey-500)));
      font-size: var(--KModalFontSize, 13px);
      line-height: 20px;

      &.content-centered {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }

      &.content-left {
        text-align: left;
        margin-left: 0;
        margin-right: auto;
      }

      &.content-right {
        text-align: right;
        margin-left: auto;
        margin-right: 0;
      }
    }

    .k-modal-footer .k-modal-action-buttons {
      margin-left: auto;
    }
  }
}
</style>

<style lang="scss">
// Leave unscoped to target 'body' element
body.k-modal-overflow-hidden {
  overflow: hidden;
}
</style>
