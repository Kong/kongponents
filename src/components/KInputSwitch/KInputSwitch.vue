<template>
  <div
    class="k-input-switch"
    :class="[size, { 'label-before': labelBefore, 'disabled': disabled }, $attrs.class]"
  >
    <input
      v-bind="strippedAttrs"
      :id="inputId"
      ref="switchInputElement"
      :checked="modelValue"
      :disabled="disabled"
      tabindex="-1"
      type="checkbox"
      @input="handleChange"
    >
    <KTooltip
      v-bind="disabled && disabledTooltipText ? tooltipAttributes : {}"
      class="switch-control-wrapper"
      :text="disabled ? disabledTooltipText : ''"
    >
      <span
        :aria-checked="modelValue"
        :aria-labelledby="inputId"
        class="switch-control"
        :class="{ 'checked': modelValue, 'disabled': disabled }"
        data-testid="switch-control"
        role="checkbox"
        :tabindex="disabled ? -1 : 0"
        @click="propagateInputEvent"
        @keydown.space.prevent
        @keyup.space="propagateInputEvent"
      >

        <!-- white vertical bar that is visible when switch is enabled -->
        <span class="switch-control-enabled-bar" />
      </span>
    </KTooltip>

    <KLabel
      v-if="label || $slots.label"
      :for="inputId"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </KLabel>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, useId } from 'vue'
import type { InputSwitchEmits, InputSwitchProps, InputSwitchSlots } from '@/types'

const {
  modelValue,
  size = 'small',
  label = '',
  disabled,
  disabledTooltipText = '',
  tooltipAttributes = {},
  labelBefore,
} = defineProps<InputSwitchProps>()

const emit = defineEmits<InputSwitchEmits>()
defineSlots<InputSwitchSlots>()

const attrs = useAttrs()

const switchInputElement = ref<HTMLInputElement | null>(null)

const defaultId = useId()
const inputId = computed((): string => attrs.id ? String(attrs.id) : defaultId)

/**
 * Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
 * Vue 3 no longer removes attribute if the value is boolean false. Instead, it's set as attr="false".
 * So for <KButton :disabled="false" to="SOME_URL">, the rendered <a> element will have `disabled="false"`,
 * which is greyed out and cannot be interacted with.
 */
const strippedAttrs = computed((): typeof attrs => {
  if (disabled !== undefined && disabled !== false) {
    return attrs
  }

  const modifiedAttrs = Object.assign({}, attrs)

  delete modifiedAttrs.class
  delete modifiedAttrs.disabled

  return modifiedAttrs
})

const propagateInputEvent = (event: Event): void => {
  if (disabled) {
    return
  }

  if (event.type === 'click' || (event.type === 'keyup' && (event as KeyboardEvent).code === 'Space')) {
    switchInputElement.value?.click()
  }
}

const handleChange = (event: Event): void => {
  if (modelValue !== (event.target as HTMLInputElement).checked) {
    emit('update:modelValue', (event.target as HTMLInputElement).checked)
    emit('change', (event.target as HTMLInputElement).checked)
    emit('input', (event.target as HTMLInputElement).checked)
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
/* Component variables */

$kInputSwitchSmallWidth: 44px;
$kInputSwitchSmallHeight: calc($kInputSwitchSmallWidth / 2);
$kInputSwitchLargeWidth: 60px;
$kInputSwitchLargeHeight: calc($kInputSwitchLargeWidth / 2);
$kInputSwitchPadding: var(--kui-space-10, $kui-space-10);
$kInputSwitchSmallCircleSize: 8px;
$kInputSwitchLargeCircleSize: 10px;

/* Component mixins */

@mixin kInputSwitchSmallSize {
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  height: $kInputSwitchSmallHeight;
  width: $kInputSwitchSmallWidth;
}

@mixin kInputSwitchLargeSize {
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  height: $kInputSwitchLargeHeight;
  width: $kInputSwitchLargeWidth;
}

@mixin kInputSwitchSmallSizeCircle {
  height: $kInputSwitchSmallCircleSize;
  right: calc((50% / 2) - ($kInputSwitchSmallCircleSize / 2));
  width: $kInputSwitchSmallCircleSize;
}

@mixin kInputSwitchLargeSizeCircle {
  height: $kInputSwitchLargeCircleSize;
  right: calc((50% / 2) - ($kInputSwitchLargeCircleSize / 2));
  width: $kInputSwitchLargeCircleSize;
}

/* Component styles */

.k-input-switch {
  align-items: center;
  display: inline-flex;
  gap: var(--kui-space-40, $kui-space-40);

  &.label-before {
    flex-direction: row-reverse;
  }

  input {
    display: none;
  }

  :deep(.k-label) {
    margin-bottom: var(--kui-space-0, $kui-space-0);
  }

  :not(&.disabled) {
    :deep(.k-label) {
      cursor: pointer;
    }
  }

  .switch-control-wrapper {
    display: flex !important;
  }

  .switch-control {
    @include kInputSwitchSmallSize;

    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    cursor: pointer;
    outline: none;
    padding: $kInputSwitchPadding;
    position: relative;
    transition: background-color $kongponentsTransitionDurTimingFunc;

    &:hover:not(.disabled) {
      background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);

      &::after {
        border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-neutral-weaker, $kui-color-border-neutral-weaker);
      }
    }

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    }

    &::before {
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      box-shadow: var(--kui-shadow-border, $kui-shadow-border);
      content: '';
      display: block;
      height: calc(100% - ($kInputSwitchPadding * 2));
      left: $kInputSwitchPadding;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: transform $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
      width: calc(50% - ($kInputSwitchPadding * 2));
      z-index: 1;
    }

    &:after {
      @include kInputSwitchSmallSizeCircle;

      border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      box-sizing: border-box;
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: border-color $kongponentsTransitionDurTimingFunc;
    }

    &-enabled-bar {
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      display: block;
      height: 35%;
      left: 25%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
    }

    &.checked {
      background-color: var(--kui-color-background-primary, $kui-color-background-primary);

      &:hover:not(.disabled) {
        background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong);
      }

      &::before {
        box-shadow: 0px 0px 0px var(--kui-border-width-10, $kui-border-width-10) var(--kui-color-border-primary-strong, $kui-color-border-primary-strong) inset;
        transform: translateY(-50%) translateX(calc($kInputSwitchSmallWidth / 2));
      }
    }

    &.disabled {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      cursor: not-allowed;

      &::before {
        background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
        box-shadow: 0px 0px 0px var(--kui-border-width-10, $kui-border-width-10) var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak) inset;
      }

      .switch-control-enabled-bar {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }
    }
  }

  &.small {
    .switch-control {
      @include kInputSwitchSmallSize;

      &::after {
        @include kInputSwitchSmallSizeCircle;
      }
    }
  }

  &.large {
    .switch-control {
      @include kInputSwitchLargeSize;

      &::before {
        border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      }

      &::after {
        @include kInputSwitchLargeSizeCircle;
      }

      &.checked {
        &::before {
          transform: translateY(-50%) translateX(calc($kInputSwitchLargeWidth / 2));
        }
      }
    }
  }

  &.disabled {
    :deep(.k-label) {
      cursor: not-allowed;
    }
  }
}
</style>
