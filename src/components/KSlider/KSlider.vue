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

      <datalist
        :id="`${inputId}-markers`"
        data-testid="slider-datalist-marks"
      >
        <option
          v-for="mark in rangeMarks"
          :key="`datalist-mark-${mark.value}`"
          :data-testid="`datalist-mark-${mark.value}`"
          :label="mark.label"
          :style="{ left: getValuePercent(mark.value!) }"
          :value="mark.value"
        />
      </datalist>

      <div
        aria-hidden="true"
        class="slider-marks"
        data-testid="slider-marks"
      >
        <span
          v-for="mark in rangeMarks"
          :key="`mark-${mark.value}`"
          :data-testid="`mark-${mark.value}`"
          role="button"
          :style="{ left: getValuePercent(mark.value) }"
          @click="onMarkClick(mark.value)"
        >
          {{ mark.label || mark.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef, watch } from 'vue'
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

const onMarkClick = (markValue: number) => {
  inputValue.value = markValue
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

const inputValue = defineModel({
  required: true,
  type: Number,
})

// This helps resolve the precision issues with floating point numbers
const multiplier = computed(() => {
  const decimalPlaces = Math.max(
    (String(step).split('.')[1] || '').length,
    (String(min).split('.')[1] || '').length,
    (String(max).split('.')[1] || '').length,
  )
  return Math.pow(10, decimalPlaces)
})

const rangeValues = computed((): number[] => {
  if (max <= min || step <= 0) {
    return []
  }

  const values = []
  const multipliedMin = min * multiplier.value
  const multipliedMax = max * multiplier.value
  const multipliedStep = step * multiplier.value
  for (let v = multipliedMin; v <= multipliedMax; v += multipliedStep) {
    values.push(v / multiplier.value)
  }

  return values
})
const isValueWithinRange = (value: number): boolean => value >= min && value <= max && rangeValues.value.includes(value)


const rangeMarks = computed((): SliderMarkObject[] => {
  if (marks.length) {
    if (typeof marks[0] === 'object') {
      return (marks as SliderMarkObject[])
        .filter(mark => isValueWithinRange(mark.value))
    } else {
      const sanitizedMarks = (marks as number[])
        .filter(mark => isValueWithinRange(mark))
        .map((mark) => ({
          label: String(mark),
          value: mark,
        }))

      // make sure min and max are included in the marks when marks are numbers
      if (sanitizedMarks[0]?.value !== min) {
        sanitizedMarks.unshift({ label: String(min), value: min })
      }
      if (sanitizedMarks.at(-1)?.value !== max) {
        sanitizedMarks.push({ label: String(max), value: max })
      }

      return sanitizedMarks
    }
  }

  if (showMarks) {
    return rangeValues.value.map(value => ({
      label: String(value),
      value,
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

/**
 * Validation logic for min, max, step, modelValue and marks
 */

watch(() => max, (newMax) => {
  // Ensure max is greater than min
  if (newMax <= min) {
    console.warn(`KSlider: max value ${newMax} must be greater than min value ${min}.`)
  }
}, { immediate: true })

watch(() => step, (newStep) => {
  // Ensure step is a positive number and not zero and remainder from division of (max - min) by step is zero
  if (max > min && (newStep <= 0 || ((max * multiplier.value - min * multiplier.value)) % (newStep * multiplier.value) !== 0)) {
    console.warn(`KSlider: step value ${newStep} is invalid.`)
  }
}, { immediate: true })

watch(inputValue, (newValue) => {
  // Ensure inputValue is within the range of min and max
  if (max > min && !isValueWithinRange(newValue)) {
    console.warn(`KSlider: value ${newValue} is out of range [${rangeValues.value.join(', ')}]. Setting to min value ${min}.`)
    inputValue.value = min
  }
}, { immediate: true })

watch(() => marks, (newMarks) => {
  // Ensure all marks are within the range of allowed values
  if (newMarks.length) {
    let invalidMarks = []
    invalidMarks = newMarks
      .filter(mark => !isValueWithinRange(typeof marks[0] === 'object' ? (mark as SliderMarkObject).value : mark as number))

    if (invalidMarks.length) {
      console.warn(`KSlider: marks [${invalidMarks.map(mark => typeof invalidMarks[0] === 'object' ? (mark as SliderMarkObject).value : mark as number).join(', ')}] are out of range [${rangeValues.value.join(', ')}].`)
    }
  }
}, { immediate: true })
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
      cursor: pointer;
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
