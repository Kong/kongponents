<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal isOpen"
    role="dialog"
    aria-modal="true">
    <div
      class="k-modal-dialog"
    >
      <div class="k-modal-header">
        <div
          v-if="$scopedSlots.title || !hideTitle"
          class="k-modal-header-description mb-5"
          role="heading"
          aria-level="2">
          <div class="k-modal-title">
            <span class="header-icon">
              <slot name="header-icon"/>
            </span>
            <span class="header-content">
              <slot name="header-content">{{ title }}</slot>
            </span>
          </div>
          <div
            class="k-modal-action ml-3">
            <KButton
              :appearance="cancelButtonAppearance"
              @click="close"
              @keyup.esc="close">
              {{ cancelButtonText }}
            </KButton>
            <!-- @slot Use this slot to pass extra buttons other than Cancel  -->
            <slot
              v-if="hasActionButtons"
              name="actionButtons">
              <KButton
                size="small"
                @click="proceed"
                @keyup.enter="proceed"/>
            </slot>
          </div>
        </div>
        <div class="divider">
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

export default {
  name: 'KModalfullscreen',
  components: { KButton },

  props: {
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
      type: Boolean,
      default: false
    },
    /**
     * NEW
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
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline'
    }
  },

  computed: {
    hasActionButtons () {
      return !!this.$slots.actionButtons
    },
    isOpen () {
      return !!this.isVisible
    }
  },

  watch: {
    isVisible: function () {
      if (this.isOpen) {
        document.querySelector('body').style.overflow = 'hidden'
        window.scrollTo(0, 0)
      } else {
        document.querySelector('body').style.overflow = 'visible'
      }
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown (e) {
      if (this.isVisible && e.keyCode === 27) {
        this.close()
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

.k-modal-dialog {
  padding: 32px 0px 14px 0;
  background: #fff;
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
  margin-top: 15px;

  .k-modal-header-description {
    display: flex;
    align-items: center;
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

.k-modal-action {
  display: inline-flex;
  position: absolute;
  right: 32px;
  & button {
    height: 30px;
    margin-left: 16px;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
  }
}

.k-modal-title {
  display: inline-flex;
  position: absolute;
  left: 36px;
  margin-top: 7px;
}

.header-icon {
  margin-right: 6px;
}

.k-modal-body-description,
.k-modal-body {
  margin-top: 56px;
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

.k-modal.isOpen .k-modal-dialog {
  overflow-y: auto;
}

.header-content {
  display: inline-block;
  margin-top: 4px;
}

.divider hr {
  margin-top: 26px;
}
</style>
