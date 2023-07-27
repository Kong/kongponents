<template>
  <transition-group
    class="toaster-container-outer"
    name="toaster"
    tag="div"
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

<script lang="ts" setup>
import { PropType } from 'vue'
import KAlert from '@/components/KAlert/KAlert.vue'
import type { Toast } from '@/types'

defineProps({
  toasterState: {
    type: Array as PropType<Toast[]>,
    default: [] as Toast[],
    required: true,
  },
})

defineEmits<{
  (e: 'close', val: any): void
}>()
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';
@import '@/styles/styles';

$transition: all .3s;

.toaster-container-outer {
  bottom: 16px;
  max-width: 300px;
  position: fixed;
  right: 16px;
  transition: $transition;
  width: auto;
  z-index: 10000;
}

.toaster-item {
  box-shadow: 0 0 12px rgba(0,0,0,.12);
  display: flex;
  margin-bottom: var(--kui-space-60, $kui-space-60);
  overflow: hidden;
  transition: $transition;
  width: 100%;

  :deep(.k-alert) {
    --KAlertInfoBorder: var(--blue-500, var(--kui-color-border-primary, #{$kui-color-border-primary}));
    --KAlertSuccessBorder: var(--green-400, #{$tmp-color-green-400});
    --KAlertWarningBorder: var(--yellow-300, #{$tmp-color-yellow-300});
    --KAlertDangerBorder: var(--red-500, var(--kui-color-border-danger-weak, #{$kui-color-border-danger-weak}));
    background-color: var(--white, var(--kui-color-background, $kui-color-background));
    color: var(--black-70, var(--kui-color-text, $kui-color-text));
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    padding: var(--kui-space-60, $kui-space-60);
    text-align: left;

    .close {
      order: 1;
      padding: var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0) var(--kui-space-60, $kui-space-60);
      position: relative;
      right: 0;
      &:focus,
      &:active {
        outline: none;
      }
    }
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
