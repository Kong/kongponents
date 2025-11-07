<template>
  <div class="calendar-wrapper">
    <DatePicker
      v-if="isRange"
      v-bind="pickerProps"
      v-model.range="calendarVModel"
    />
    <DatePicker
      v-else
      v-bind="pickerProps"
      v-model="calendarVModel"
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
          :step="timeStep"
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
          :step="timeStep"
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
import type { DatePickerModel, DatePickerRangeObject, DateTimePickerMode, TimeGranularity } from '@/types'
import { format, isBefore, startOfToday } from 'date-fns'

const {
  isRange,
  kDatePickerMode,
  maxDate = undefined,
  minDate = undefined,
  errorMessage = undefined,
  timeGranularity = 'minutely',
} = defineProps<{
  isRange: boolean
  kDatePickerMode: DateTimePickerMode
  maxDate?: Date
  minDate?: Date
  errorMessage?: string
  timeGranularity?: TimeGranularity
}>()

const timeInputFormat = computed(() => {
  switch (timeGranularity) {
    case 'minutely':
      return 'HH:mm:00'
    case 'secondly':
      return 'HH:mm:ss'
    default:
      return 'HH:mm:00'
  }
})

const calendarVModel = defineModel<DatePickerModel>({ required: true })
const hasError = defineModel<boolean>('error', { default: false })
const startTimeValue = ref<string>(format(new Date(), timeInputFormat.value))
const endTimeValue = ref<string>(format(new Date(), timeInputFormat.value))
const originalTimeValues = ref<{ start: string, end: string }>({
  start: format(new Date(), timeInputFormat.value),
  end: format(new Date(), timeInputFormat.value),
})
const componentId = useId()

const initialPage = computed(() => {
  if (isRange && calendarVModel.value && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date) {
    return { year: calendarVModel.value.start.getFullYear(), month: calendarVModel.value.start.getMonth() + 1 }
  } else if (calendarVModel.value instanceof Date) {
    return { year: calendarVModel.value.getFullYear(), month: calendarVModel.value.getMonth() + 1 }
  } else if (maxDate && isBefore(maxDate, startOfToday())) {
    return { year: maxDate.getFullYear(), month: maxDate.getMonth() + 1 }
  } else {
    return { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
  }
})

const pickerProps = computed(() => ({
  borderless: true,
  color: 'blue',
  dragAttribute: calendarDragAttributes,
  expanded: true,
  initialPage: initialPage.value,
  maxDate: maxDate,
  minDate: minDate,
  mode: 'date' as const,
  modelConfig,
  selectAttribute: calendarSelectAttributes,
  transparent: true,
}))

const showTime = computed(() => {
  return ['time', 'dateTime', 'relativeDateTime'].includes(kDatePickerMode)
})

const timeStep = computed(() => {
  switch (timeGranularity) {
    case 'minutely':
      return 60
    case 'secondly':
      return 1
    default:
      return 60
  }
})

const isInvalidRange = (start: Date, end: Date): boolean => {
  return start > end
}

const initTimeInputs = () => {
  if (calendarVModel.value && showTime.value) {
    if (isRange && (calendarVModel.value as DatePickerRangeObject).start && (calendarVModel.value as DatePickerRangeObject).end) {
      const dateRange = calendarVModel.value as DatePickerRangeObject
      startTimeValue.value = format(dateRange.start as Date, timeInputFormat.value)
      endTimeValue.value = format(dateRange.end as Date, timeInputFormat.value)
    } else if (calendarVModel.value instanceof Date) {
      startTimeValue.value = format(calendarVModel.value as Date, timeInputFormat.value)
    } else {
      startTimeValue.value = format(new Date(), timeInputFormat.value)
    }
  }
}

const getTimeParts = (timeString: string) => {
  const timeParts = timeString.split(':')
  const hours = parseInt(timeParts[0], 10)
  const minutes = parseInt(timeParts[1], 10)
  const seconds = timeGranularity === 'secondly' ? parseInt(timeParts[2], 10) : 0
  return { hours, minutes, seconds }
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
  if (calendarVModel.value && isRange && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date && 'end' in calendarVModel.value && calendarVModel.value.end instanceof Date) {
    const startTime = new Date()
    const { hours, minutes, seconds } = getTimeParts(newTime)
    startTime.setHours(hours, minutes, seconds, 0)
    calendarVModel.value.start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    const startTime = new Date()
    const { hours, minutes, seconds } = getTimeParts(newTime)
    startTime.setHours(hours, minutes, seconds, 0)
    calendarVModel.value.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
  }
})

watch(() => endTimeValue.value, (newTime) => {
  if (!newTime) {
    return
  }
  if (calendarVModel.value && isRange && 'end' in calendarVModel.value && calendarVModel.value.end instanceof Date && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date) {
    const endTime = new Date()
    const { hours, minutes, seconds } = getTimeParts(newTime)
    endTime.setHours(hours, minutes, seconds, 0)
    calendarVModel.value.end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  }
})

watch(() => calendarVModel.value, () => {
  if (calendarVModel.value && isRange &&
  'start' in calendarVModel.value &&
  calendarVModel.value.start instanceof Date &&
  'end' in calendarVModel.value &&
  calendarVModel.value.end instanceof Date) {
    startTimeValue.value = format(calendarVModel.value.start, timeInputFormat.value)
    endTimeValue.value = format(calendarVModel.value.end, timeInputFormat.value)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    startTimeValue.value = format(calendarVModel.value, timeInputFormat.value)
  }
}, { immediate: true, deep: true })

const showRange = (rangeType: 'start' | 'end') => {
  const value = calendarVModel.value as { start: Date, end: Date }
  return isRange && value && rangeType in value && value[rangeType] instanceof Date
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
