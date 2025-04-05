<template>
  <KTooltip
    class="code-block-action-tooltip"
    placement="bottom-start"
    :popover-timeout="300"
    :text="copyTooltipText"
  >
    <KButton
      appearance="tertiary"
      class="code-block-action-button"
      :class="[`theme-${theme}`, { 'code-block-action-button-active': active }]"
      v-bind="attrs"
      icon
      @click="onClick"
    >
      <slot />
    </KButton>
  </KTooltip>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import type { CodeBlockIconButtonProps } from '@/types'
import { watch } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

defineOptions({
  inheritAttrs: false,
})

const {
  theme = 'light',
  active = true,
  copyTooltip = '',
} = defineProps<CodeBlockIconButtonProps>()

const copyTooltipText = ref<string>(copyTooltip)

const attrs = useAttrs()

const onClick = () => {
  // if copy text is passed means it's the copy button - therefore change tooltip text to 'Copied!' on click
  if (copyTooltip) {
    copyTooltipText.value = 'Copied!'
  }
}

watch(copyTooltipText, () => {
  // change tooltip back to original after 3 seconds
  // FIXME: clearTimeout on unmount
  setTimeout(() => {
    copyTooltipText.value = copyTooltip
  }, 3000)
})
</script>

<style lang="scss" scoped>
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
