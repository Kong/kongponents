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
  margin-bottom: 16px;
  overflow: hidden;
  transition: $transition;
  width: 100%;

  :deep(.k-alert) {
    --KAlertInfoBorder: var(--blue-500, color(blue-500));
    --KAlertSuccessBorder: var(--green-400, color(green-400));
    --KAlertWarningBorder: var(--yellow-300, color(yellow-300));
    --KAlertDangerBorder: var(--red-500, color(red-500));
    background-color: #fff;
    color: var(--black-70);
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-bottom: 0;
    padding: 16px;
    text-align: left;

    .close {
      order: 1;
      padding: 0 0 0 16px;
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
