<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    aria-modal="true"
    class="k-modal-fullscreen isOpen"
    role="dialog"
    @keyup.enter="proceed"
    @keyup.esc="close"
  >
    <div
      ref="modalBodyContent"
      class="k-modal-fullscreen-dialog"
      tabindex="0"
    >
      <div class="k-modal-fullscreen-body-header">
        <div
          v-if="$slots['body-header'] || bodyHeader"
          class="body-header"
        >
          <slot name="body-header">
            {{ bodyHeader }}
          </slot>
        </div>
        <div
          v-if="$slots['body-header-description'] || bodyHeaderDescription"
          class="body-header-description"
        >
          <slot name="body-header-description">
            {{ bodyHeaderDescription }}
          </slot>
        </div>
      </div>

      <div class="k-modal-fullscreen-body">
        <slot name="default" />
      </div>

      <!-- Header at the bottom to allow proper tabindex -->
      <div class="k-modal-fullscreen-header">
        <div
          aria-level="2"
          class="k-modal-fullscreen-header-description"
          role="heading"
        >
          <div class="k-modal-fullscreen-title">
            <span class="header-icon pr-2 my-auto">
              <slot name="header-icon">
                <KIcon :icon="iconString" />
              </slot>
            </span>
            <span class="header-content my-auto">
              <slot name="header-content">{{ title }}</slot>
            </span>
          </div>
          <div class="k-modal-fullscreen-action ml-3">
            <div class="k-modal-fullscreen-action-buttons">
              <slot name="action-buttons">
                <KButton
                  :appearance="cancelButtonAppearance"
                  class="cancel-button"
                  @click="close"
                >
                  {{ cancelButtonText }}
                </KButton>
                <KButton
                  :appearance="actionButtonAppearance"
                  class="proceed-button"
                  @click="proceed"
                >
                  {{ actionButtonText }}
                </KButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KModalFullscreen',
  components: { KButton, KIcon },
  props: {
    /**
     * Set the text of the title, if using title slot
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Set the title in the body
     */
    bodyHeader: {
      type: String,
      default: '',
    },
    /**
     * Text to display as a description of the body's title
     */
    bodyHeaderDescription: {
      type: String,
      default: '',
    },
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
      type: String,
      default: 'Save',
    },
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
      type: String,
      default: 'primary',
    },
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline',
    },
    /**
      *  Pass the type of icon for the header on the left
      */
    iconString: {
      type: String,
      default: 'kong',
    },
  },
  emits: ['canceled', 'proceed'],
  setup(props, { emit }) {
    const modalBodyContent = ref(null)
    const isOpen = computed(() => {
      return !!props.isVisible
    })

    watch(() => props.isVisible, async () => {
      if (isOpen.value) {
        document.body.style.overflow = 'hidden'

        await nextTick()

        if (modalBodyContent.value) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          modalBodyContent.value.focus()
        }
      } else {
        document.body.style.overflow = ''
      }
    })

    const handleKeydown = (e: any) => {
      if (props.isVisible) {
        if (e.keyCode === 27) { // `esc` key
          close()
        } else if (e.keyCode === 13) { // `enter` key
          proceed()
        }
      }
    }

    const close = () => {
      emit('canceled')
    }

    const proceed = () => {
      emit('proceed')
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.body.style.overflow = ''
    })

    return {
      isOpen,
      modalBodyContent,
      handleKeydown,
      close,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
$screen-md: 992px;
$fullscreen-modal-padding: 64px;

.k-modal-fullscreen-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  padding-top: $fullscreen-modal-padding * 2;
  background: var(--white);

  @media only screen and (min-width: ($viewport-md + 1px)) {
    padding-top: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-header {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-lg) 0;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey-300);

  .k-modal-fullscreen-header-description {
    display: flex;
    justify-content: space-between;
    font-size: var(--KModalFullscreenHeaderSize, 20px);
    font-weight: var(--KModalFullscreenHeaderWeight, 600);
    color: var(--KModalFullscreenHeaderColor, var(--black-500, color(black-500)));
  }

  .k-modal-fullscreen-body {
    position: relative;
    flex: 1 1 auto;
    font-size: var(--KModalFullscreenFontSize, 13px);
    line-height: 20px;
    text-align: center;
  }
}

.k-modal-fullscreen-title {
  position: relative;
  display: inline-flex;
  margin-left: 36px;
}

.k-modal-fullscreen-action {
  display: inline-flex;
  margin-right: var(--spacing-xl, spacing(xl));

  & button,
  & :deep(button) {
    height: 40px;
    margin-left: var(--spacing-md, spacing(md));
    font-size: 13px;
    font-weight: 600;
    line-height: 13px;
  }
}

.k-modal-fullscreen-body-header,
.k-modal-fullscreen-body {
  padding-right: var(--spacing-lg);
  padding-left: var(--spacing-lg);
  color: var(--KModalFullscreenColor, var(--black-500, color(black-500)));

  @media only screen and (min-width: ($viewport-md + 1px)) {
    padding-right: 120px;
    padding-left: 120px;
  }

  @media only screen and (min-width: ($screen-md + 1px)) {
    padding-right: 230px;
    padding-left: 230px;
  }
}

.k-modal-fullscreen-body {
  padding-bottom: var(--spacing-lg);
  @media only screen and (min-width: ($viewport-md + 1px)) {
    padding-bottom: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-body-header {
  margin-top: $fullscreen-modal-padding;
  margin-bottom: var(--spacing-xl);
  padding-top: 0;
  padding-bottom: 0;

  .body-header {
    margin-bottom: -4px;
    font-size: 32px;
    font-weight: 600;
    line-height: 32px;
  }

  .body-header-description {
    margin-top: var(--spacing-md);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: var(--grey-600);
  }
}

.k-modal-fullscreen-body-description h2 {
  border: none;
}

.k-modal-fullscreen.isOpen .k-modal-fullscreen-dialog {
  overflow-y: auto;
}

.header-content {
  display: inline-block;
  padding-left: 6px;
  margin-top: var(--spacing-xxs, spacing(xxs));
  line-height: 24px;
  border-left: 1px solid var(--grey-300);
}

.k-modal-fullscreen-action-buttons {
  margin-left: auto;

  button,
  :deep(button) {
    margin-left: var(--spacing-md, spacing(md));
  }
}
</style>

<style lang="scss">
.header-icon {
  .kong-icon.kong-icon-kong {
    position: relative;
    top: 1px;
  }
}
</style>
