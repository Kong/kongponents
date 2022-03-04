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
      class="k-modal-fullscreen-dialog"
    >
      <div class="k-modal-fullscreen-header">
        <div
          v-if="!$scopedSlots.title"
          class="k-modal-fullscreen-header-description mb-5"
          role="heading"
          aria-level="2">
          <div class="k-modal-fullscreen-title">
            <span
              class="header-icon">
              <KIcon
                :icon="iconString"
                class="mr-2" />
            </span>
            <span class="header-content">
              <slot name="header-content">{{ title }}</slot>
            </span>
          </div>
          <div class="k-modal-fullscreen-action ml-3">
            <div class="k-modal-fullscreen-action-buttons">
              <slot name="action-buttons">
                <KButton
                  :appearance="cancelButtonAppearance"
                  @click="close"
                >
                  {{ cancelButtonText }}
                </KButton>
                <KButton
                  :appearance="actionButtonAppearance"
                  @click="proceed"
                >
                  {{ actionButtonText }}
                </KButton>
              </slot>
            </div>
          </div>
        </div>
        <div>
          <hr>
        </div>
      </div>
      <div class="k-modal-fullscreen-body-description">
        <slot name="body-header-description">{{ bodyHeaderDescription }}</slot>
      </div>
      <div class="k-modal-fullscreen-body">
        <slot name="body-content">{{ content }}</slot>
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
     * Text to display Page title and description
     */
    bodyHeaderDescription: {
      type: String,
      default: ''
    },
    /**
     * Set the text of the body content
     */
    content: {
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
        window.scrollTo(0, 0)
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
$screen-md: 992px;

.k-modal-fullscreen-dialog {
  padding: var(--spacing-xl, spacing(xl)) 0 14px 0;
  background: var(--white);
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
}

.k-modal-fullscreen-header {
  position: relative;
  display: flex;
  flex-direction: column;

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

.header-icon {
  margin-right: 6px;
  border-right: 1px solid var(--grey-300);
}

.k-modal-fullscreen-body-description,
.k-modal-fullscreen-body {
  margin-left: 230px;
  margin-right: 230px;
  color: var(--KModalFullscreenColor, var(--black-500, color(black-500)));
}

.k-modal-fullscreen-body-description {
  font-size: 32px;
  line-height: 32px;
  font-weight: 600;

    p:first-child {
      margin-bottom: -4px;
    }

    p:last-child {
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      color: var(--grey-600);
      margin-top: 20px;
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
  margin-top: var(--spacing-xxs, spacing(xxs))
}

.k-modal-fullscreen-action-buttons {
    margin-left: auto;
}

@media only screen and (max-width: $screen-md) {
  .k-modal-fullscreen-dialog {
    .k-modal-fullscreen-body-description,
    .k-modal-fullscreen-body {
      padding: 0 10%;
      margin: 0 auto;
    }
  }
}

</style>
