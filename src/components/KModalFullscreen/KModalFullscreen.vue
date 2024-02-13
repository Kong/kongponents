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
      :class="{ 'has-footer': $slots['footer-content'] }"
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
            <span class="header-icon">
              <slot name="header-icon">
                <KIcon :icon="iconString" />
              </slot>
            </span>
            <span class="header-content">
              <slot name="header-content">{{ title }}</slot>
            </span>
          </div>
          <div class="k-modal-fullscreen-action">
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
      <!-- Footer -->
      <div
        v-if="$slots['footer-content']"
        class="k-modal-fullscreen-footer"
      >
        <slot name="footer-content" />
        <div class="k-modal-fullscreen-action">
          <div class="k-modal-fullscreen-action-buttons">
            <slot name="action-buttons">
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
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { watch, ref, computed, onMounted, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { ButtonAppearance } from '@/types'

const props = defineProps({
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
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  /**
  * Set the appearance of the close/cancel button
  */
  cancelButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'secondary',
  },
  /**
  *  Pass the type of icon for the header on the left
  */
  iconString: {
    type: String,
    default: 'kong',
  },
})

const emit = defineEmits(['canceled', 'proceed'])

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

  console.warn("The Kongponents 'KFullScreenModal' component is deprecated and will be removed in the 9.0.0-beta.0 release.\nWe suggest using 'KModal' component instead.\nDocs: https://alpha--kongponents.netlify.app/components/modal.html#fullscreen")
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
$kmodalfullscreen-viewport-md: 992px;
$fullscreen-modal-padding: 64px;

.k-modal-fullscreen-dialog {
  background: var(--kui-color-background, $kui-color-background);
  bottom: 0;
  left: 0;
  padding-top: $fullscreen-modal-padding * 2;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;

  @media (min-width: $kui-breakpoint-phablet) {
    padding-top: $fullscreen-modal-padding;
  }

  &.has-footer {
    padding-bottom: $fullscreen-modal-padding * 2;

    @media (min-width: $kui-breakpoint-phablet) {
      padding-bottom: $fullscreen-modal-padding;
    }
    .k-modal-fullscreen-header {
      position: absolute;
    }
  }
}

.k-modal-fullscreen-header {
  background-color: var(--kui-color-background, $kui-color-background);
  border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
  display: flex;
  flex-direction: column;
  padding: var(--kui-space-70, $kui-space-70) var(--kui-space-0, $kui-space-0);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1009;

  .k-modal-fullscreen-header-description {
    color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
    display: flex;
    flex-direction: column;
    font-size: var(--kui-font-size-60, $kui-font-size-60);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    justify-content: space-between;

    @media (min-width: $kui-breakpoint-phablet) {
      flex-direction: row;
    }
  }
}

.k-modal-fullscreen-footer {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
  bottom: 0;
  box-shadow: var(--kui-shadow, $kui-shadow);
  display: inline-flex;
  justify-content: space-between;
  padding: var(--kui-space-80, $kui-space-80) var(--kui-space-0, $kui-space-0);
  padding-left: var(--kui-space-80, $kui-space-80);
  position: fixed;
  width: 100%;
  z-index: 1009;
}

.k-modal-fullscreen-title {
  display: inline-flex;
  justify-content: center;
  margin-bottom: var(--kui-space-40, $kui-space-40);
  position: relative;

  @media (min-width: $kui-breakpoint-phablet) {
    justify-content: flex-start;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    margin-left: var(--kui-space-80, $kui-space-80); // This was 36px, switched it to 32px
  }
}

.k-modal-fullscreen-action {
  display: inline-flex;
  justify-content: center;
  margin-left: var(--kui-space-50, $kui-space-50) !important;
  margin-right: var(--kui-space-80, $kui-space-80);

  @media (min-width: $kui-breakpoint-phablet) {
    justify-content: flex-end;
  }
}

.k-modal-fullscreen-body-header,
.k-modal-fullscreen-body {
  color: var(--kui-color-text, $kui-color-text);
  padding-left: var(--kui-space-80, $kui-space-80);
  padding-right: var(--kui-space-80, $kui-space-80);

  @media (min-width: $kui-breakpoint-phablet) {
    padding-left: 120px;
    padding-right: 120px;
  }

  @media (min-width: $kmodalfullscreen-viewport-md) {
    padding-left: 230px;
    padding-right: 230px;
  }
}

.k-modal-fullscreen-body {
  padding-bottom: var(--kui-space-80, $kui-space-80);
  @media (min-width: $kui-breakpoint-phablet) {
    padding-bottom: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-body-header {
  margin-bottom: var(--kui-space-80, $kui-space-80);
  margin-top: $fullscreen-modal-padding;
  padding-bottom: var(--kui-space-0, $kui-space-0);
  padding-top: var(--kui-space-0, $kui-space-0);

  .body-header {
    font-size: var(--kui-font-size-80, $kui-font-size-80);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    line-height: var(--kui-line-height-80, $kui-line-height-80);
    margin-bottom: calc(-1 * var(--kui-space-20, $kui-space-20));
  }

  .body-header-description {
    color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    margin-top: var(--kui-space-60, $kui-space-60);
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
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-60, $kui-font-size-60);
  font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
  letter-spacing: var(--kui-letter-spacing-minus-40, $kui-letter-spacing-minus-40);
  line-height: var(--kui-line-height-50, $kui-line-height-50);
  margin-bottom: var(--kui-space-auto, $kui-space-auto) !important;
  margin-top: var(--kui-space-auto, $kui-space-auto) !important;
  padding-left: var(--kui-space-30, $kui-space-30);
  user-select: none;
}

.k-modal-fullscreen-action-buttons {
  button,
  :deep(button) {
    margin-left: var(--kui-space-40, $kui-space-40);
  }

  @media (min-width: $kui-breakpoint-phablet) {
    margin-left: var(--kui-space-auto, $kui-space-auto) !important;
  }
}

.header-icon {
  margin-bottom: var(--kui-space-auto, $kui-space-auto) !important;
  margin-top: var(--kui-space-auto, $kui-space-auto) !important;
  padding-right: var(--kui-space-40, $kui-space-40) !important;
  .kong-icon.kong-icon-kong {
    position: relative;
    top: 1px;
  }
}
</style>
