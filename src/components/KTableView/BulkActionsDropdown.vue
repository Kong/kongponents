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
            ({{ count }})
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

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  count: {
    type: String,
    default: '',
  },
  buttonLabel: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.bulk-actions-dropdown {
  .bulk-actions-dropdown-trigger {
    align-items: flex-end;
    gap: var(--kui-space-0, $kui-space-0);

    .bulk-actions-dropdown-trigger-count {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin-right: var(--kui-space-20, $kui-space-20);
    }
  }
}
</style>
