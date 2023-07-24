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
import { watch, ref, computed, onMounted, onUnmounted, onBeforeUnmount, nextTick, PropType } from 'vue'
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
    default: 'outline',
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
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';
$kmodalfullscreen-viewport-md: 992px;
$fullscreen-modal-padding: 64px;

.k-modal-fullscreen-dialog {
  background: var(--white, var(--kui-color-background, $kui-color-background));
  bottom: var(--kui-space-0, $kui-space-0);
  left: var(--kui-space-0, $kui-space-0);
  padding-top: $fullscreen-modal-padding * 2;
  position: fixed;
  right: var(--kui-space-0, $kui-space-0);
  top: var(--kui-space-0, $kui-space-0);
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
  background-color: var(--white, var(--kui-color-background, $kui-color-background));
  border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg, var(--kui-space-80, $kui-space-80)) var(--kui-space-0, $kui-space-0);
  position: fixed;
  top: var(--kui-space-0, $kui-space-0);
  width: 100%;
  z-index: 1009;

  .k-modal-fullscreen-header-description {
    color: var(--KModalFullscreenHeaderColor, var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest));
    display: flex;
    flex-direction: column;
    font-size: var(--KModalFullscreenHeaderSize, var(--kui-font-size-60, $kui-font-size-60));
    font-weight: var(--KModalFullscreenHeaderWeight, var(--kui-font-weight-semibold, $kui-font-weight-semibold));
    justify-content: space-between;

    @media (min-width: $kui-breakpoint-phablet) {
      flex-direction: row;
    }
  }
}

.k-modal-fullscreen-footer {
  align-items: center;
  background-color: var(--white, var(--kui-color-background, $kui-color-background));
  border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
  bottom: var(--kui-space-0, $kui-space-0);
  box-shadow: 0px 0px 20px var(black-10, $tmp-color-black-10);
  display: inline-flex;
  justify-content: space-between;
  padding: var(--spacing-lg, var(--kui-space-80, $kui-space-80)) var(--kui-space-0, $kui-space-0);
  padding-left: var(--spacing-xl, var(--kui-space-90, $kui-space-90));
  position: fixed;
  width: 100%;
  z-index: 1009;
}

.k-modal-fullscreen-title {
  display: inline-flex;
  justify-content: center;
  margin-bottom: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
  position: relative;

  @media (min-width: $kui-breakpoint-phablet) {
    justify-content: flex-start;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    margin-left: var(--kui-space-90, $kui-space-90); // This was 36px, switched it to 32px
  }
}

.k-modal-fullscreen-action {
  display: inline-flex;
  justify-content: center;
  margin-left: var(--kui-space-50, $kui-space-50) !important;
  margin-right: var(--spacing-xl, var(--kui-space-90, $kui-space-90));

  & button,
  & :deep(button) {
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    height: var(--kui-space-100, $kui-space-100);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    margin-left: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  }

  @media (min-width: $kui-breakpoint-phablet) {
    justify-content: flex-end;
  }
}

.k-modal-fullscreen-body-header,
.k-modal-fullscreen-body {
  color: var(--KModalFullscreenColor, var(--black-500, var(--kui-color-text, $kui-color-text)));
  padding-left: var(--spacing-lg, var(--kui-space-80, $kui-space-80));
  padding-right: var(--spacing-lg, var(--kui-space-80, $kui-space-80));

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
  padding-bottom: var(--spacing-lg, var(--kui-space-80, $kui-space-80));
  @media (min-width: $kui-breakpoint-phablet) {
    padding-bottom: $fullscreen-modal-padding;
  }
}

.k-modal-fullscreen-body-header {
  margin-bottom: var(--spacing-xl, var(--kui-space-90, $kui-space-90));
  margin-top: $fullscreen-modal-padding;
  padding-bottom: var(--kui-space-0, $kui-space-0);
  padding-top: var(--kui-space-0, $kui-space-0);

  .body-header {
    font-size: var(--type-xxxl, var(--kui-line-height-60, $kui-line-height-60));
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    line-height: var(--type-xxxl, var(--kui-line-height-60, $kui-line-height-60));
    margin-bottom: calc(-1 * var(--kui-space-20, $kui-space-20));
  }

  .body-header-description {
    color: var(--grey-600, var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong));
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--type-xl, var(--kui-line-height-30, $kui-line-height-30));
    margin-top: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  }
}

.k-modal-fullscreen-body-description h2 {
  border: none;
}

.k-modal-fullscreen.isOpen .k-modal-fullscreen-dialog {
  overflow-y: auto;
}

.header-content {
  border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
  display: inline-block;
  line-height: var(--kui-space-80, $kui-space-80);
  margin-bottom: var(--kui-space-auto, $kui-space-auto) !important;
  margin-top: var(--kui-space-auto, $kui-space-auto) !important;
  padding-left: var(--kui-space-30, $kui-space-30);
}

.k-modal-fullscreen-action-buttons {
  button,
  :deep(button) {
    margin-left: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  }

  @media (min-width: $kui-breakpoint-phablet) {
    margin-left: var(--kui-space-auto, $kui-space-auto) !important;
  }
}
</style>

<style lang="scss">
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
