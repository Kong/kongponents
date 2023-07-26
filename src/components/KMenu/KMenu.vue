<template>
  <div
    class="k-menu"
    :style="widthStyle"
  >
    <slot name="body">
      <div>
        <template
          v-for="(item, index) in items"
          :key="item.title + index"
        >
          <KMenuItem
            :class="{ 'last-menu-item': index === items.length - 1 }"
            :expandable="item.expandable"
            :item="item"
            :last-menu-item="index === items.length - 1"
            :test-mode="!!testMode || undefined"
            :type="item.type"
          />
        </template>
      </div>
    </slot>

    <div
      v-if="hasActionButton"
      class="clear-cta-button"
    >
      <KMenuDivider />

      <slot name="actionButton">
        <KButton
          @click="proceed"
          @keyup.enter="proceed"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, useSlots } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KMenuItem from '@/components/KMenu/KMenuItem.vue'
import KMenuDivider from '@/components/KMenu/KMenuDivider.vue'
import type { KMenuItemType } from '@/types'

const { getSizeFromString } = useUtilities()

const props = defineProps({
  items: {
    type: Array as PropType<KMenuItemType[]>,
    required: false,
    default: () => [],
  },
  actionButton: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '284',
  },
  /**
  * Test mode - for testing only, strips out generated ids
  */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'proceed'): void
}>()

const slots = useSlots()
const widthStyle = computed((): Record<string, string> => {
  return {
    width: getSizeFromString(props.width),
  }
})

const hasActionButton = computed((): boolean => !!slots.actionButton)

const proceed = (): void => {
  emit('proceed')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-menu {
  background-color: var(--white, var(--kui-color-background, $kui-color-background));
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
  border-radius: var(--KCardBorderRadius, var(--kui-border-radius-20, $kui-border-radius-20));
  padding-bottom: var(--kui-space-40, $kui-space-40);
  padding-top: var(--kui-space-50, $kui-space-50);
}

.clear-cta-button > :deep(button.k-button) {
  border: none;
  color: var(--blue-300, $tmp-color-blue-300);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  margin-bottom: var(--kui-space-30, $kui-space-30);
  margin-top: var(--kui-space-40, $kui-space-40);
  padding-top: var(--kui-space-10, $kui-space-10);

  &:active, &:hover {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
  }

  &:focus {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    box-shadow: none;
    color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
  }
}

</style>
