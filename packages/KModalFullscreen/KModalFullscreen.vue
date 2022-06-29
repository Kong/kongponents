<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal-fullscreen isOpen"
    role="dialog"
    aria-modal="true"
    @keyup.esc="close"
    @keyup.enter="proceed">
    <div
      ref="modalBodyContent"
      class="k-modal-fullscreen-dialog"
      tabindex="0"
    >
      <div class="k-modal-fullscreen-body-header">
        <div
          v-if="$slots['body-header'] || bodyHeader"
          class="body-header">
          <slot name="body-header">{{ bodyHeader }}</slot>
        </div>
        <div
          v-if="$slots['body-header-description'] || bodyHeaderDescription"
          class="body-header-description">
          <slot name="body-header-description">{{ bodyHeaderDescription }}</slot>
        </div>
      </div>

      <div class="k-modal-fullscreen-body">
        <slot name="default" />
      </div>

      <!-- Header at the bottom to allow proper tabindex -->
      <div class="k-modal-fullscreen-header">
        <div
          class="k-modal-fullscreen-header-description"
          role="heading"
          aria-level="2">
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

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KModalfullscreen',
  components: { KButton, KIcon },

  props: {
    /**
     * Set the text of the title, if using title slot
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Set the title in the body
     */
    bodyHeader: {
      type: String,
      default: ''
    },
    /**
     * Text to display as a description of the body's title
     */
    bodyHeaderDescription: {
      type: String,
      default: ''
    },
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false
    },
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
      type: String,
      default: 'Save'
    },
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
      type: String,
      default: 'primary'
    },
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline'
    },
    /**
      *  Pass the type of icon for the header on the left
      */
    iconString: {
      type: String,
      default: 'kong'
    }
  },

  computed: {
    isOpen () {
      return !!this.isVisible
    }
  },

  watch: {
    isVisible: function () {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden'

        this.$nextTick(() => {
          this.$refs.modalBodyContent.focus()
        })
      } else {
        document.body.style.overflow = ''
      }
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  destroyed () {
    document.body.style.overflow = ''
  },

  methods: {
    handleKeydown (e) {
      if (this.isVisible) {
        if (e.keyCode === 27) { // `esc` key
          this.close()
        } else if (e.keyCode === 13) { // `enter` key
          this.proceed()
        }
      }
    },
    close () {
      this.$emit('canceled')
    },
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';
$screen-sm: 768px;
$screen-md: 992px;
$fullscreen-modal-padding: 64px;

.k-modal-fullscreen-dialog {
  padding-top: $fullscreen-modal-padding * 2;
  background: var(--white);
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;

  @media only screen and (min-width: ($screen-sm + 1px)) {
    padding-top: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-header {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  flex-direction: column;
  padding: var(--spacing-lg) 0;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey-300);

  .k-modal-fullscreen-header-description {
    display: flex;
    justify-content: space-between;
    font-size: var(--KModalFullscreenHeaderSize, 20px);
    font-weight: var(--KModalFullscreenHeaderWeight, 500);
    color: var(--KModalFullscreenHeaderColor, var(--black-500, color(black-500)));
  }

  .k-modal-fullscreen-body {
    text-align: center;
    position: relative;
    flex: 1 1 auto;
    font-size: var(--KModalFullscreenFontSize, 13px);
    line-height: 20px;
  }
}

.k-modal-fullscreen-title {
  display: inline-flex;
  position: relative;
  margin-left: 36px;
}

.k-modal-fullscreen-action {
  display: inline-flex;
  margin-right: var(--spacing-xl, spacing(xl));

  & button {
    height: 40px;
    margin-left: var(--spacing-md, spacing(md));
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
  }
}

.k-modal-fullscreen-body-header,
.k-modal-fullscreen-body {
  color: var(--KModalFullscreenColor, var(--black-500, color(black-500)));
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);

  @media only screen and (min-width: ($screen-sm + 1px)) {
    padding-left: 120px;
    padding-right: 120px;
  }

  @media only screen and (min-width: ($screen-md + 1px)) {
    padding-left: 230px;
    padding-right: 230px;
  }
}

.k-modal-fullscreen-body-header {
  padding-top: 0;
  padding-bottom: 0;
}

.k-modal-fullscreen-body {
  padding-bottom: var(--spacing-lg);

  @media only screen and (min-width: ($screen-sm + 1px)) {
    padding-bottom: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-body-header {
  margin-top: $fullscreen-modal-padding;
  margin-bottom: 54px;

  .body-header {
    font-size: 32px;
    line-height: 32px;
    font-weight: 600;
    margin-bottom: -4px;
  }

  .body-header-description {
    font-weight: 200;
    font-size: 14px;
    line-height: 22px;
    color: var(--grey-600);
    margin-top: var(--spacing-md);
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
  margin-top: var(--spacing-xxs, spacing(xxs));
  padding-left: 6px;
  border-left: 1px solid var(--grey-300);
  line-height: 24px;
}

.k-modal-fullscreen-action-buttons {
  margin-left: auto;
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
