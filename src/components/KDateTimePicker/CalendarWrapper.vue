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
      <div class="time-inputs-container">
        <div class="time-input-column">
          <label
            class="time-input-label"
            :for="`time-input-start-${componentId}`"
          >
            <span v-if="showRange()">
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
        </div>
        <template v-if="isRange">
          <div class="time-input-separator">
            -
          </div>
          <div class="time-input-column">
            <label
              class="time-input-label"
              :for="`time-input-end-${componentId}`"
            >
              <span v-if="showRange()">
                <!-- @vue-ignore: typeguard in showRange -->
                {{ format(calendarVModel.end, 'EEE MMM d yyyy') }}
              </span>
            </label>
            <input
              :id="`time-input-end-${componentId}`"
              v-model="endTimeValue"
              class="time-input-end"
              :class="{ 'input-error': hasError }"
              data-testid="time-input-end"
              :step="timeStep"
              type="time"
            >
          </div>
        </template>
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
import type { DatePickerModel, DatePickerRangeObject, DateTimePickerMode, TimeGranularity } from '@/types'

import { computed, nextTick, onMounted, ref, useId, watch } from 'vue'
import { DatePicker } from 'v-calendar'
import { format, isBefore, isSameDay, startOfToday } from 'date-fns'

const {
  isRange,
  kDatePickerMode,
  maxDate = undefined,
  minDate = undefined,
  errorMessage = undefined,
  timeGranularity = 'minutely',
  sameDayFullRange = false,
  customRangeValidation = undefined,
} = defineProps<{
  isRange: boolean
  kDatePickerMode: DateTimePickerMode
  maxDate?: Date
  minDate?: Date
  errorMessage?: string
  timeGranularity?: TimeGranularity
  sameDayFullRange?: boolean
  customRangeValidation?: (start: Date, end: Date) => boolean
}>()

const formatTimeForInput = (date: Date, granularity: TimeGranularity): string => {
  if (granularity === 'secondly') {
    return format(date, 'HH:mm:ss')
  } else {
    return format(date, 'HH:mm')
  }
}

const calendarVModel = defineModel<DatePickerModel>({ required: true })
const hasError = defineModel<boolean>('error', { default: false })
const startTimeValue = ref<string>(formatTimeForInput(new Date(), timeGranularity))
const endTimeValue = ref<string>(formatTimeForInput(new Date(), timeGranularity))
const isApplyingFullDayRange = ref(false)
const originalTimeValues = ref<{ start: string, end: string }>({
  start: formatTimeForInput(new Date(), timeGranularity),
  end: formatTimeForInput(new Date(), timeGranularity),
})
const componentId = useId()

const initialPage = computed(() => {
  if (isRange && isValidDateRange(calendarVModel.value)) {
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
  trimWeeks: true,
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
  if (start > end) {
    return true
  }

  if (customRangeValidation) {
    return customRangeValidation(start, end)
  }

  return false
}

const isValidDateRange = (
  value: DatePickerModel,
): value is DatePickerRangeObject & { start: Date, end: Date } => {
  if (!value || typeof value !== 'object') {
    return false
  }

  if (!('start' in value) || !('end' in value)) {
    return false
  }

  return value.start instanceof Date && value.end instanceof Date
}

/**
 * Automatically adjust times to create a full-day range (00:00:00 - 23:59:59)
 * @returns true if full-day range was applied, false otherwise
 */
const applyFullDayRangeIfSameDay = async (): Promise<boolean> => {
  if (!sameDayFullRange || !isRange) {
    return false
  }

  if (!isValidDateRange(calendarVModel.value)) {
    return false
  }

  if (!isSameDay(calendarVModel.value.start, calendarVModel.value.end)) {
    return false
  }

  // Prevents time watchers from overwriting the calendarVModel
  isApplyingFullDayRange.value = true

  startTimeValue.value = '00:00'
  endTimeValue.value = '23:59'

  calendarVModel.value.start.setHours(0, 0, 0, 0)
  calendarVModel.value.end.setHours(23, 59, 59, 999)

  await nextTick()
  isApplyingFullDayRange.value = false

  return true
}

const initTimeInputs = () => {
  if (!showTime.value) {
    return
  }

  if (isRange && isValidDateRange(calendarVModel.value)) {
    startTimeValue.value = formatTimeForInput(calendarVModel.value.start, timeGranularity)
    endTimeValue.value = formatTimeForInput(calendarVModel.value.end, timeGranularity)
  } else if (calendarVModel.value instanceof Date) {
    startTimeValue.value = formatTimeForInput(calendarVModel.value, timeGranularity)
  } else {
    startTimeValue.value = formatTimeForInput(new Date(), timeGranularity)
  }
}

const getTimeParts = (timeString: string) => {
  const timeParts = timeString.split(':')
  const hours = parseInt(timeParts[0] ?? '0', 10)
  const minutes = parseInt(timeParts[1] ?? '0', 10)
  const seconds = timeGranularity === 'secondly' && timeParts[2] ? parseInt(timeParts[2], 10) : 0
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
  if (!newTime || isApplyingFullDayRange.value) {
    return
  }

  const { hours, minutes, seconds } = getTimeParts(newTime)

  if (isRange && isValidDateRange(calendarVModel.value)) {
    calendarVModel.value.start.setHours(hours, minutes, seconds, 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    calendarVModel.value.setHours(hours, minutes, seconds, 0)
  }
})

watch(() => endTimeValue.value, (newTime) => {
  if (!newTime || isApplyingFullDayRange.value) {
    return
  }

  const { hours, minutes, seconds } = getTimeParts(newTime)

  if (isRange && isValidDateRange(calendarVModel.value)) {
    calendarVModel.value.end.setHours(hours, minutes, seconds, 0)
    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  }
})

watch(() => calendarVModel.value, () => {
  if (isRange && isValidDateRange(calendarVModel.value)) {
    if (!applyFullDayRangeIfSameDay()) {
      startTimeValue.value = formatTimeForInput(calendarVModel.value.start, timeGranularity)
      endTimeValue.value = formatTimeForInput(calendarVModel.value.end, timeGranularity)
    }

    hasError.value = isInvalidRange(calendarVModel.value.start, calendarVModel.value.end)
  } else if (calendarVModel.value instanceof Date) {
    startTimeValue.value = formatTimeForInput(calendarVModel.value, timeGranularity)
  }
}, { immediate: true, deep: true })

// Keep track of original time values if time granularity changes
watch(() => timeGranularity, () => {
  if (isRange && isValidDateRange(calendarVModel.value)) {
    originalTimeValues.value.start = formatTimeForInput(calendarVModel.value.start, timeGranularity)
    originalTimeValues.value.end = formatTimeForInput(calendarVModel.value.end, timeGranularity)
  } else if (calendarVModel.value instanceof Date) {
    originalTimeValues.value.start = formatTimeForInput(calendarVModel.value, timeGranularity)
  }
})

const showRange = () => {
  return isRange && isValidDateRange(calendarVModel.value)
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
    background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    margin-top: var(--kui-space-30, $kui-space-30);

    .time-inputs-container {
      display: flex;
      flex-direction: row;
      gap: var(--kui-space-20, $kui-space-20);
      line-height: var(--kui-line-height-20, $kui-line-height-20);
      padding: var(--kui-space-40, $kui-space-40);
    }

    .time-input-column {
      align-items: center;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--kui-space-20, $kui-space-20);

      .time-input-label {
        margin-bottom: 0;
      }
    }

    .time-input-separator {
      align-self: flex-end;
      flex-shrink: 0;
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      padding: var(--kui-space-40, $kui-space-40) 0;
    }

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

    .help-text {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
      margin-left: var(--kui-space-50, $kui-space-50);
    }
  }
}
</style>
