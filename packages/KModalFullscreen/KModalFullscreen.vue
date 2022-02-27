<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal-fullscreen isOpen"
    role="dialog"
    aria-modal="true">
    <div
      class="k-modal-dialog"
    >
      <div class="k-modal-header">
        <div
          v-if="!$scopedSlots.title"
          class="k-modal-header-description mb-5"
          role="heading"
          aria-level="2">
          <div class="k-modal-title">
            <span
              class="header-icon">
              <KIcon
                :icon="iconHeader"
                class="mr-2" />
            </span>
            <span class="header-content">
              <slot name="header-content">{{ title }}</slot>
            </span>
          </div>
          <div class="k-modal-action ml-3">
            <slot name="action-buttons">
              <KButton
                appearance="outline"
                class=" mr-2"
                @click="close">
                {{ cancelButtonText }}
              </KButton>
              <KButton
                :appearance="type === 'danger' ? 'danger' : 'primary'"
                @click="proceed">
                {{ actionButtonText }}
              </KButton>
            </slot>
          </div>
        </div>
        <div>
          <hr>
        </div>
      </div>
      <div class="k-modal-body-description">
        <slot name="body-header-description">{{ bodyHeaderDescription }}</slot>
      </div>
      <div class="k-modal-body">
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
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return [
          'info',
          'warning',
          'danger'
        ].includes(value)
      }
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
    actionButtonText: {
      type: String,
      default: 'Save'
    },
    /**
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline'
    },
    /**
      *  Pass whether or not the modal should have icon in the header on the left
      */
    iconHeader: {
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
        document.body.style.overflow = this.isOpen ? 'hidden' : ''
        window.scrollTo(0, 0)
      } else {
        document.body.style.overflow = this.isOpen ? 'hidden' : ''
      }
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
    // window.onbeforeunload = function () {
    //   return self.form_dirty ? 'If you leave this page you will lose your unsaved changes.' : null
    // }

    // window.onbeforeunload = function () {
    //   return 'handle your events or msgs here'
    // }

    // window.addEventListener('beforeunload', function (e) {
    //   // Cancel the event
    //   e.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //   // Chrome requires returnValue to be set
    //   e.returnValue = ''
    // })
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

.k-modal-dialog {
  padding: var(--spacing-xl, spacing(xl)) 0 14px 0;
  background: var(--white);
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
}

.k-modal-header {
  position: relative;
  display: flex;
  flex-direction: column;

  .k-modal-header-description {
    display: flex;
    justify-content: space-between;
    font-size: var(--KModalFullscreenHeaderSize, 20px);
    font-weight: var(--KModalFullscreenHeaderWeight, 500);
    color: var(--KModalFullscreenHeaderColor, var(--black-500, color(black-500)));
  }

  .k-modal-body {
    text-align: center;
    position: relative;
    flex: 1 1 auto;
    font-size: var(--KModalFullscreenFontSize, 13px);
    line-height: 20px;
  }
}

.k-modal-title {
  display: inline-flex;
  position: relative;
  margin-left: 36px;
}

.k-modal-action {
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

.k-modal-body-description,
.k-modal-body {
  margin-left: 230px;
  margin-right: 230px;
  color: var(--KModalFullscreenColor, var(--black-500, color(black-500)));
}

.k-modal-body-description {
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

.k-modal-body-description h2 {
  border: none;
}

.k-modal-fullscreen.isOpen .k-modal-dialog {
  overflow-y: auto;
}

.header-content {
  display: inline-block;
  margin-top: var(--spacing-xxs, spacing(xxs))
}

@media only screen and (max-width: $screen-md) {
  .k-modal-dialog {
    .k-modal-body-description,
    .k-modal-body {
      padding: 0 10%;
      margin: 0 auto;
    }
  }
}

</style>
