<template>
  <div class="k-slider">
    <KLabel
      v-if="label"
      :for="inputId"
    >
      {{ label }}
    </KLabel>

    <div class="slider-container">
      <input
        :id="inputId"
        v-model="value"
        :disabled="disabled"
        :list="rangeMarks.length ? `${inputId}-markers` : undefined"
        :max="max"
        :min="min"
        :step="step"
        type="range"
      >

      <datalist
        v-if="rangeMarks.length"
        :id="`${inputId}-markers`"
      >
        <option
          v-for="mark in rangeMarks"
          :key="mark.value"
          :label="mark.label"
          :value="mark.value"
        />
      </datalist>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SliderProps } from '@/types'
import { computed, useId } from 'vue'

const {
  label = '',
  min = 0,
  max = 10,
  step = 1,
  showMarks = false,
  marks = [],
  disabled = false,
} = defineProps<SliderProps>()

const inputId = useId()

const value = defineModel<number>()

const rangeMarks = computed((): { label: string, value: number }[] => {
  if (marks.length) {
    if (typeof marks[0] === 'object') {
      return marks as { label: string, value: number }[]
    }

    return (marks as number[]).map((mark: number) => ({
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

  return []
})
</script>

<style scoped lang="scss">
/* Component mixins */

@mixin sliderRangeTrack {
  background: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  cursor: pointer;
  height: 4px;
  width: 100%;
}

@mixin sliderThumb {
  -webkit-appearance: none;
  background: var(--kui-color-background-primary, $kui-color-background-primary);
  border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
  cursor: pointer;
  height: var(--kui-icon-size-30, $kui-icon-size-30);
  margin-top: calc(var(--kui-space-30, $kui-space-30) * -1);
  width: var(--kui-icon-size-30, $kui-icon-size-30);
}

/* Component styles */

.k-slider {
  input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: var(--kui-space-30, $kui-space-30) var(--kui-space-0, $kui-space-0);
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

    /* Range track styles */
    &::-webkit-slider-runnable-track {
      @include sliderRangeTrack;
    }

    &::-moz-range-track {
      @include sliderRangeTrack;
    }

    &::-ms-track {
      @include sliderRangeTrack;

      background: transparent;
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
      background: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    }
  }

  datalist {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    option {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-20, $kui-line-height-20);
      padding: 0;
    }
  }
}
</style>
