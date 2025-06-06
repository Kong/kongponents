<template>
  <div
    class="k-slider"
    data-testid="k-slider"
  >
    <KLabel
      v-if="label"
      v-bind="labelAttributes"
      :for="`${inputId}-input`"
    >
      {{ label }}
    </KLabel>

    <div class="slider-container">
      <span
        aria-hidden="true"
        class="lower-range-track"
        :class="{ 'is-disabled': disabled }"
        :style="lowerRangeTrackStyles"
      />

      <KPop
        ref="thumbPopover"
        aria-hidden="true"
        :disabled="disabled || !showValue"
        hide-close-icon
        placement="top"
        :popover-timeout="500"
        trigger="hover"
        width="auto"
      >
        <span
          class="thumb"
          :class="{ 'is-disabled': disabled }"
          :style="thumbStyles"
        />

        <template #content>
          <span class="input-value">
            {{ inputValue }}
          </span>
        </template>
      </KPop>

      <input
        :id="`${inputId}-input`"
        v-model.number="inputValue"
        data-testid="slider-input"
        :disabled="disabled"
        :list="`${inputId}-markers`"
        :max="max"
        :min="min"
        :step="step"
        type="range"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @mouseup="onBlur"
        @touchend="onBlur"
      >

      <datalist :id="`${inputId}-markers`">
        <option
          v-for="mark in rangeMarks"
          :key="`datalist-mark-${mark.value}`"
          :label="mark.label"
          :style="{ left: getValuePercent(mark.value!) }"
          :value="mark.value"
        />
      </datalist>

      <div
        aria-hidden="true"
        class="slider-marks"
      >
        <span
          v-for="mark in rangeMarks"
          :key="`mark-${mark.value}`"
          :style="{ left: getValuePercent(mark.value) }"
        >
          {{ mark.label || mark.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'
import type { SliderProps, SliderEmits } from '@/types'
import KLabel from '@/components/KLabel/KLabel.vue'
import KPop from '@/components/KPop/KPop.vue'

interface SliderMarkObject {
  label: string
  value: number
}

const {
  label = '',
  min = 0,
  max = 10,
  step = 1,
  showMarks = false,
  marks = [],
  showValue = true,
  disabled = false,
  labelAttributes = {},
} = defineProps<SliderProps>()

const emit = defineEmits<SliderEmits>()

const inputId = useId()

const lowerRangeTrackStyles = computed(() => ({ width: getValuePercent(inputValue.value!) }))
const thumbStyles = computed(() => ({
  left: getValuePercent(inputValue.value!),
  transform: `translateX(-${getValuePercent(inputValue.value!)})`,
}))

const onInput = () => {
  emit('change', inputValue.value)
  onFocus()
}

const thumbPopoverRef = useTemplateRef('thumbPopover')

const onFocus = () => {
  thumbPopoverRef.value?.showPopover()
}
const onBlur = () => {
  thumbPopoverRef.value?.hidePopover()
}

const inputValue = defineModel({ type: Number, default: 5 })

const isMarkWithinRange = (value: number): boolean => {
  return value >= min && value <= max
}

const rangeMarks = computed((): SliderMarkObject[] => {
  if (marks.length) {
    if (typeof marks[0] === 'object') {
      return (marks as SliderMarkObject[])
        .filter(mark => isMarkWithinRange(mark.value))
    }

    return (marks as number[])
      .filter(mark => isMarkWithinRange(mark))
      .map((mark) => ({
        label: String(mark),
        value: mark,
      }))
  }

  if (showMarks) {
    const stepCount = Math.floor((max - min) / step)

    return Array.from({ length: stepCount + 1 }, (_, i) => ({
      label: String(min + i * step),
      value: min + i * step,
    }))
  }

  return [{
    label: String(min),
    value: min,
  },
  {
    label: String(max),
    value: max,
  }]
})

const getValuePercent = (value: number): string => `${((value - min) / (max - min)) * 100}%`
</script>

<style scoped lang="scss">
/* Component mixins */

@mixin sliderRangeTrack {
  background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
  border: none;
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  cursor: pointer;
  height: 4px;
  width: 100%;
}

@mixin sliderThumb {
  -webkit-appearance: none;
  background-color: var(--kui-color-background-transparent, $kui-color-background-transparent); // make the default thumb transparent so it doesn't interfere with the custom thumb
  border: none;
  border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
  cursor: pointer;
  height: var(--kui-icon-size-30, $kui-icon-size-30);
  margin-top: calc(var(--kui-space-30, $kui-space-30) * -1);
  position: relative; // Ensure that the thumb is above the lower track
  width: var(--kui-icon-size-30, $kui-icon-size-30);
}

@mixin markContent {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
}

/* Component styles */

.k-slider {
  box-sizing: border-box;
  margin-bottom: var(--kui-space-20, $kui-space-20);

  input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: var(--kui-space-30, $kui-space-30) var(--kui-space-0, $kui-space-0);
    min-block-size: 22px; // -webkit-slider-container
    width: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      &::-webkit-slider-thumb {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &::-moz-range-thumb {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &::-ms-thumb {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }
    }

    &:disabled {
      cursor: not-allowed;

      /* Range track disabled styles */
      &::-webkit-slider-runnable-track {
        cursor: not-allowed;
      }

      &::-moz-range-track {
        cursor: not-allowed;
      }

      &::-ms-track {
        cursor: not-allowed;
      }

      /* Thumb disabled styles */
      &::-webkit-slider-thumb {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        cursor: not-allowed;
      }

      &::-moz-range-thumb {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        cursor: not-allowed;
      }

      &::-ms-thumb {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        cursor: not-allowed;
      }
    }

    /* Range track styles */
    &::-webkit-slider-runnable-track {
      @include sliderRangeTrack;
    }

    &::-moz-range-track {
      @include sliderRangeTrack;
    }

    &::-ms-track {
      @include sliderRangeTrack;

      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      color: transparent;
    }

    /* Thumb styles */
    &::-webkit-slider-thumb {
      @include sliderThumb;
    }

    &::-moz-range-thumb {
      @include sliderThumb;
    }

    &::-ms-thumb {
      @include sliderThumb;
    }

    /* Edge specific styles */

    &::-ms-fill-lower {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    }

    &::-ms-fill-upper {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    }
  }

  .slider-marks {
    width: 100%;

    span {
      @include markContent;

      bottom: 0;
      padding: $kui-space-0;
      position: absolute;
      white-space: nowrap;

      &:not(:first-child) {
        transform: translateX(-50%);
      }

      &:last-child {
        transform: translateX(-100%);
      }
    }
  }

  .slider-container {
    padding-bottom: var(--kui-space-70, $kui-space-70);
    position: relative;

    .lower-range-track {
      @include sliderRangeTrack;

      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
      margin-top: 15px; // Align with the track
      pointer-events: none;
      position: absolute;

      &.is-disabled {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }
    }

    .thumb {
      @include sliderThumb;

      background-color: var(--kui-color-background-primary, $kui-color-background-primary);
      margin-top: 9px; // Align with the track
      pointer-events: none;
      position: absolute;
      z-index: 1; // Ensure the thumb is above the input

      &.is-disabled {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }
    }

    .input-value {
      @include markContent;
    }
  }
}
</style>
