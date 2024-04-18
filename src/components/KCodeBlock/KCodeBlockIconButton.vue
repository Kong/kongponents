<template>
  <KTooltip
    class="code-block-action-tooltip"
    placement="bottomStart"
    :popover-timeout="300"
    :text="copyTooltipText"
  >
    <KButton
      appearance="tertiary"
      class="code-block-action-button"
      :class="[`theme-${theme}`, { 'code-block-action-button-active': active }]"
      v-bind="attrs"
      @click="onClick"
    >
      <!-- TODO: [beta] update once icon slot is deprecated -->
      <template #icon>
        <slot />
      </template>
    </KButton>
  </KTooltip>
</template>

<script lang="ts">
import { ref, type PropType, useAttrs } from 'vue'
import type { Theme } from '@/types'
import { watch } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String as PropType<Theme>,
    default: 'light',
  },
  active: {
    type: Boolean,
    default: true,
  },
  /**
   * Only pass tooltip text if it's the copy button
   */
  copyTooltip: {
    type: String,
    default: '',
  },
})

const copyTooltipText = ref<string>(props.copyTooltip)

const attrs = useAttrs()

const onClick = () => {
  // if copy text is passed means it's the copy button - therefore change tooltip text to 'Copied!' on click
  if (props.copyTooltip) {
    copyTooltipText.value = 'Copied!'
  }
}

watch(copyTooltipText, () => {
  // change tooltip back to original after 3 seconds
  setTimeout(() => {
    copyTooltipText.value = props.copyTooltip
  }, 3000)
})
</script>

<style lang="scss" scoped>
.code-block-action-tooltip {
  // display: inline-block;
}

// expand upon original tertiary button styles changing some colors and states
.code-block-action-button {
  &:not(:disabled) {
    &.theme-light {
      // not active
      &:not(.code-block-action-button-active) {
        color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);

        &:hover:not(:disabled):not(:focus),
        &:focus:is(:hover),
        &:focus-visible,
        &:active {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
          color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
        }
      }

      // active
      &.code-block-action-button-active {
        &:hover:not(:disabled):not(:focus),
        &:focus:is(:hover),
        &:focus-visible,
        &:active {
          background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
        }
      }
    }

    &.theme-dark {
      // not active
      &:not(.code-block-action-button-active) {
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);

        &:hover:not(:disabled):not(:focus),
        &:focus:is(:hover),
        &:focus-visible,
        &:active {
          background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong);
          color: var(--kui-color-text-inverse, $kui-color-text-inverse);
        }
      }

      // active
      &.code-block-action-button-active {
        color: var(--kui-color-text-primary-weak, $kui-color-text-primary-weak);

        &:hover:not(:disabled):not(:focus),
        &:focus:is(:hover),
        &:focus-visible,
        &:active {
          background-color: var(--kui-color-background-primary, $kui-color-background-primary);
          color: var(--kui-color-text-inverse, $kui-color-text-inverse);
        }
      }
    }
  }
}
</style>
