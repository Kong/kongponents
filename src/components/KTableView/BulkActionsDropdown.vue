<template>
  <KDropdown
    class="bulk-actions-dropdown"
    data-testid="bulk-actions-dropdown"
    :disabled="disabled"
    :kpop-attributes="{ placement: 'bottom-end' }"
  >
    <KTooltip
      placement="bottom-end"
      :text="`Bulk Actions${disabled ? ' (at least one row must be selected)' : ''}`"
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
  buttonLabel: {
    type: String,
    default: '',
  },
})
</script>
