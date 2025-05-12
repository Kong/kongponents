<template>
  <KDropdown
    class="bulk-actions-dropdown"
    data-testid="bulk-actions-dropdown"
    :disabled="disabled"
    :kpop-attributes="{ placement: 'bottom-end' }"
  >
    <KTooltip
      placement="bottom-end"
      text="Selected Row Actions"
    >
      <KButton
        appearance="secondary"
        :aria-label="buttonLabel"
        class="bulk-actions-dropdown-trigger"
        data-testid="bulk-actions-dropdown-trigger"
        :disabled="disabled"
        icon
        size="large"
      >
        <MoreIcon
          class="more-icon"
          decorative
        />
        <Transition name="kongponents-fade-transition">
          <span
            v-if="count"
            class="bulk-actions-dropdown-trigger-count"
          >
            {{ count }}
          </span>
        </Transition>
      </KButton>
    </KTooltip>

    <template #items>
      <slot name="items" />
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KButton from '@/components/KButton/KButton.vue'
import { MoreIcon } from '@kong/icons'
import type { BulkActionsDropdownProps, BulkActionsDropdownSlots } from '@/types'

const {
  disabled,
  count = '',
  buttonLabel = '',
} = defineProps<BulkActionsDropdownProps>()
defineSlots<BulkActionsDropdownSlots>()
</script>

<style lang="scss" scoped>
.bulk-actions-dropdown {
  .bulk-actions-dropdown-trigger {
    gap: var(--kui-space-0, $kui-space-0);

    .bulk-actions-dropdown-trigger-count {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin-right: var(--kui-space-20, $kui-space-20);
      min-width: 2ch; // Prevents the button from resizing when the count changes
    }
  }
}
</style>
