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
      v-if="['time', 'dateTime'].includes(kDatePickerMode)"
      class="time-input"
    >
      <input
        v-model="startTimeValue"
        :step="2"
        type="time"
      >
      <input
        v-if="isRange"
        v-model="endTimeValue"
        :step="2"
        type="time"
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { DatePicker } from 'v-calendar'
import type { DatePickerRangeObject, DateTimePickerMode } from '@/types'
import { format } from 'date-fns'

const props = defineProps<{
  isRange: boolean
  kDatePickerMode: DateTimePickerMode
  maxDate?: Date
  minDate?: Date
}>()
const calendarVModel = defineModel<DatePickerRangeObject | Date>({ required: true })
const startTimeValue = ref<string>(format(new Date(), 'HH:mm:ss'))
const endTimeValue = ref<string>(format(new Date(), 'HH:mm:ss'))
onMounted(() => {
  if (calendarVModel.value) {
    if (props.isRange && (calendarVModel.value as DatePickerRangeObject).start && (calendarVModel.value as DatePickerRangeObject).end) {
      const dateRange = calendarVModel.value as DatePickerRangeObject
      startTimeValue.value = format(dateRange.start as Date, 'HH:mm')
      endTimeValue.value = format(dateRange.end as Date, 'HH:mm')
    } else {
      startTimeValue.value = format(calendarVModel.value as Date, 'HH:mm')
    }
  } else {
    startTimeValue.value = format(new Date(), 'HH:mm')
  }
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
  if (calendarVModel.value && props.isRange && 'start' in calendarVModel.value && calendarVModel.value.start instanceof Date) {

    const startTime = new Date()
    const timeParts = newTime.split(':')
    startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)

    calendarVModel.value.start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
  } else if (calendarVModel.value instanceof Date) {
    const startTime = new Date()
    const timeParts = newTime.split(':')
    startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)

    calendarVModel.value.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
  }
})

watch(() => endTimeValue.value, (newTime) => {
  if (calendarVModel.value && props.isRange && 'end' in calendarVModel.value && calendarVModel.value.end instanceof Date) {

    const endTime = new Date()
    const timeParts = newTime.split(':')
    endTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)

    calendarVModel.value.end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), 0)
  }
})

watch(() => calendarVModel.value, () => {
  if (calendarVModel.value && props.isRange &&
  'start' in calendarVModel.value &&
  calendarVModel.value.start instanceof Date &&
  'end' in calendarVModel.value &&
  calendarVModel.value.end instanceof Date) {

    const startTime = new Date()
    const endTime = new Date()
    const startTimeParts = startTimeValue.value.split(':')
    const endTimeParts = startTimeValue.value.split(':')
    startTime.setHours(parseInt(startTimeParts[0], 10), parseInt(startTimeParts[1], 10), 0, 0)
    endTime.setHours(parseInt(endTimeParts[0], 10), parseInt(endTimeParts[1], 10), 0, 0)

    calendarVModel.value.start.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
    calendarVModel.value.end.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), 0)
  } else if (calendarVModel.value instanceof Date) {
    const startTime = new Date()
    const timeParts = startTimeValue.value.split(':')
    startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0)

    calendarVModel.value.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0)
  }
})

</script>

<style scoped lang="scss">
.calendar-wrapper {
  .time-input {
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-30, $kui-space-30);
    padding-left: var(--kui-space-60, $kui-space-60);
    padding-right: var(--kui-space-60, $kui-space-60);
    width: 160px;
  }
}
</style>
