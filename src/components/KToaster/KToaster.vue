<template>
  <transition-group
    name="toaster"
    tag="div"
    class="toaster-container-outer"
  >
    <div
      v-for="toaster in toasterState"
      :key="toaster.key"
      class="toaster-item"
    >
      <KAlert
        :appearance="toaster.appearance"
        dismiss-type="icon"
        has-left-border
        @closed="$emit('close', toaster.key)"
      >
        <template #alertMessage>
          <div class="message">
            {{ toaster.message }}
          </div>
        </template>
      </KAlert>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import KAlert, { appearances } from '@/components/KAlert/KAlert.vue'

export const toasterAppearances = appearances

/**
 * @typedef {Object} Toaster - toaster item
 * @property {String} apperance - 'success', 'info', 'warning', 'danger'
 * @property {String} key - unique identifier of toaster
 * @property {String} message - Text to display in toaster
 */
export interface Toast {
  appearance: string
  key: any
  message: string
}

export default defineComponent({
  name: 'KToaster',
  components: { KAlert },
  // Changed the implementation to a prop to make it easier to utilize a render function in ./ToastManager.ts
  props: {
    toasterState: {
      type: Array as PropType<Toast[]>,
      default: [] as Toast[],
      required: true,
    },
  },
})
</script>

<style lang="scss">
.toaster-item {
  :deep(.k-alert) .close {
    position: relative;
    order: 1;
    right: 0;
    padding: 0 0 0 1rem;
    &:focus,
    &:active {
      outline: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/styles.scss';

$transition: all .3s;

.toaster-container-outer {
  position: fixed;
  width: auto;
  bottom: 1rem;
  right: 1rem;
  max-width: 300px;
  z-index: 10000;
  transition: $transition;
}

.toaster-item {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  transition: $transition;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0,0,0,.12);

  :deep(.k-alert) {
    --KAlertInfoBorder: var(--blue-500, color(blue-500));
    --KAlertSuccessBorder: var(--green-400, color(green-400));
    --KAlertWarningBorder: var(--yellow-300, color(yellow-300));
    --KAlertDangerBorder: var(--red-500, color(red-500));
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 1rem;
    text-align: left;
    background-color: #fff;
    color: var(--black-70);
    margin-bottom: 0;
  }

  .message {
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    max-width: 150ch;
  }
}

/* Vue Animations */
.toaster-enter { transform: translateX(300px); }
.toaster-leave-to { transform: translateX(100%); }
</style>
