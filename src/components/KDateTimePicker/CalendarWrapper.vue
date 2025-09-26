<template>
  <div class="calendar-wrapper">
    <DatePicker
      v-model="calendarVModel"
      borderless
      color="blue"
      :drag-attribute="calendarDragAttributes"
      expanded
      :is-range="isRange"
      :max-date="maxDate"
      :min-date="minDate"
      mode="date"
      :model-config="modelConfig"
      :select-attribute="calendarSelectAttributes"
      transparent
    />
    <div
      v-if="showTime"
      class="time-wrapper"
    >
      <div
        class="time-input"
      >
        <label
          class="time-input-label"
          :for="`time-input-start-${componentId}`"
        >
          <span v-if="showRange('start')">
            <!-- @vue-ignore: typeguard in showRange -->
            {{ formatDateDisplay(calendarVModel.start) }}
          </span>
          <span v-else-if="(calendarVModel && calendarVModel instanceof Date)">
            {{ formatDateDisplay(calendarVModel) }}
          </span>
        </label>
        <input
          :id="`time-input-start-${componentId}`"
          v-model="startTimeValue"
          class="time-input-start"
          :class="{ 'input-error': hasError }"
          data-testid="time-input-start"
          :step="60"
          type="time"
        >
        <label
          class="time-input-label"
          :for="`time-input-end-${componentId}`"
        >
          <span v-if="showRange('end')">
            <!-- @vue-ignore: typeguard in showRange -->
            {{ format(calendarVModel.end, 'EEE MMM d yyyy') }}
          </span>
        </label>
        <input
          v-if="isRange"
          :id="`time-input-end-${componentId}`"
          v-model="endTimeValue"
          class="time-input-end"
          :class="{ 'input-error': hasError }"
          data-testid="time-input-end"
          :step="60"
          type="time"
        >
      </div>
      <Transition
        mode="out-in"
        name="kongponents-fade-transition"
      >
        <div
          v-if="hasError && errorMessage"
          class="help-text"
        >
          {{ errorMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useId, watch } from 'vue'
import { DatePicker } from 'v-calendar'
import type { DatePickerModel, DatePickerRangeObject, DateTimePickerMode } from '@/types'
import { format } from 'date-fns'

const props = withDefaults(defineProps<{
  isRange: boolean
  kDatePickerMode: DateTimePickerMode
  maxDate?: Date
  minDate?: Date
  errorMessage?: string
}>(), {
  maxDate: undefined,
  minDate: undefined,
  errorMessage: undefined,
})
const calendarVModel = defineModel<DatePickerModel>({ required: true })
const hasError = defineModel<boolean>('error', { default: false })
const startTimeValue = ref<string>(format(new Date(), 'HH:mm:ss'))
const endTimeValue = ref<string>(format(new Date(), 'HH:mm:ss'))
const originalTimeValues = ref<{ start: string, end: string }>({
  start: format(new Date(), 'HH:mm:ss'),
  end: format(new Date(), 'HH:mm:ss'),
})
const componentId = useId()

const showTime = computed(() => {
  return ['time', 'dateTime', 'relativeDateTime'].includes(props.kDatePickerMode)
})

const isInvalidRange = (start: Date, end: Date): boolean => {
  return start > end
}

const initTimeInputs = () => {
  if (calendarVModel.value && showTime.value) {
    if (props.isRange && (calendarVModel.value as DatePickerRangeObject).start && (calendarVModel.value as DatePickerRangeObject).end) {
      const dateRange = calendarVModel.value as DatePickerRangeObject
      startTimeValue.value = format(dateRange.start as Date, 'HH:mm')
      endTimeValue.value = format(dateRange.end as Date, 'HH:mm')
    } else if (calendarVModel.value instanceof Date) {
      startTimeValue.value = format(calendarVModel.value as Date, 'HH:mm')
    } else {
      startTimeValue.value = format(new Date(), 'HH:mm')
    }
  }
}

onMounted(() => {
  initTimeInputs()
  // Keep track of original time values in case time picker is cancelled
  originalTimeValues.value.start = startTimeValue.value
  originalTimeValues.value.end = endTimeValue.value
})

const modelConfig = { type: 'number' }
const calendarDragAttributes = {
  key: 'select-drag',
  highlight: {
    start: { contentClass: 'vcal-day-drag-start' },
    base: { contentClass: 'vcal-day-drag-base' },
    end: { contentClass: 'vcal-day-drag-end' },
  },
}
const calendarSelectAttributes = {
  key: 'select-calendar',
  highlight: {
    start: { contentClass: 'vcal-day-start' },
    base: { contentClass: 'vcal-day-base' },
    end: { contentClass: 'vcal-day-end' },
  },
}

watch(() => startTimeValue.value, (newTime) => {
  if (!newTime) {
    return
  }
  if (calendarVModel.value && props.isRange && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date && 'end' in calendarVModel.value && calendarVModel.value.end instanceof Date) {
    const startTime = new Date()
    const timeParts = newTime.split(':')
    startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)
    calendarVModel.value.start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    const startTime = new Date()
    const timeParts = newTime.split(':')
    startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)
    calendarVModel.value.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
  }
})

watch(() => endTimeValue.value, (newTime) => {
  if (!newTime) {
    return
  }
  if (calendarVModel.value && props.isRange && 'end' in calendarVModel.value && calendarVModel.value.end instanceof Date && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date) {
    const endTime = new Date()
    const timeParts = newTime.split(':')
    endTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)
    calendarVModel.value.end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  }
})

watch(() => calendarVModel.value, () => {
  if (calendarVModel.value && props.isRange &&
  'start' in calendarVModel.value &&
  calendarVModel.value.start instanceof Date &&
  'end' in calendarVModel.value &&
  calendarVModel.value.end instanceof Date) {
    startTimeValue.value = format(calendarVModel.value.start, 'HH:mm')
    endTimeValue.value = format(calendarVModel.value.end, 'HH:mm')
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    startTimeValue.value = format(calendarVModel.value, 'HH:mm')
  }
}, { immediate: true, deep: true })

const showRange = (rangeType: 'start' | 'end') => {
  const value = calendarVModel.value as { start: Date, end: Date }
  return props.isRange && value && rangeType in value && value[rangeType] instanceof Date
}

const resetTime = () => {
  startTimeValue.value = originalTimeValues.value.start
  endTimeValue.value = originalTimeValues.value.end
}

const formatDateDisplay = (date: Date) => {
  try {
    return format(date, 'EEE MMM d yyyy')
  } catch (error) {
    console.warn('Error formatting date:', error)
  }
}

defineExpose({
  resetTime,
  initTimeInputs,
})

</script>

<style scoped lang="scss">
.calendar-wrapper {
  .time-wrapper {
    background: var(--kui-color-background, $kui-color-background-neutral-weakest);

    .time-input {
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
      display: flex;
      flex-direction: column;
      gap: var(--kui-space-30, $kui-space-30);
      padding: var(--kui-space-30, $kui-space-30) var(--kui-space-60, $kui-space-60);
      width: fit-content;

      input[type="time"] {
        @include inputDefaults;

        &:hover {
          @include inputHover;
        }

        &:focus {
          @include inputFocus;
        }

        &:disabled {
          @include inputDisabled;
        }

        &::-webkit-calendar-picker-indicator {
          -webkit-appearance: none;
          display: none;
        }

        // error styles
        &.input-error {
          @include inputError;

          &:hover {
            @include inputErrorHover;
          }

          &:focus {
            @include inputErrorFocus;
          }
        }
      }
    }

    .help-text {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }
}
</style>
