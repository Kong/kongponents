<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KDateTimePicker"
  >
    <div class="kdatetimepicker-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="popoverPlacement">
        <KDateTimePicker
          mode="dateTime"
          popover-placement="bottom-end"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="clearButton">
        <KComponent
          v-slot="{ data }"
          :data="{ showClearButton: true }"
        >
          <KDateTimePicker
            :clear-button="data.showClearButton"
            mode="date"
            placeholder="Select a date"
          />

          <KInputSwitch
            v-model="data.showClearButton"
            label="Show clear button"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="icon">
        <KComponent
          v-slot="{ data }"
          :data="{ showIcon: true }"
        >
          <KDateTimePicker
            :icon="data.showIcon"
            mode="date"
            placeholder="Select a date"
          />

          <KInputSwitch
            v-model="data.showIcon"
            label="Show icon"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="range">
        <KDateTimePicker
          mode="date"
          range
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="mode">
        <KComponent
          v-slot="{ data }"
          :data="{ selectedMode: 'dateTime', modes: [
            { label: 'date', value: 'date' },
            { label: 'time', value: 'time' },
            { label: 'dateTime', value: 'dateTime' },
            { label: 'relative', value: 'relative' },
            { label: 'relativeDate', value: 'relativeDate' },
            { label: 'relativeDateTime', value: 'relativeDateTime' },
          ] }"
        >
          <KDateTimePicker
            :key="`${data.selectedMode}-mode`"
            :max-date="maxDate"
            :mode="data.selectedMode"
            :time-periods="data.selectedMode.includes('relative') ? [
              {
                section: 'Relative',
                values: [
                  { key: 'barfoo0', display: 'Between now and then', timeframeText: 'Between now and then', start: () => new Date(), end: () => new Date(), timeframeLength: () => 'undefined' },
                  { key: 'barfoo1', display: 'Week', timeframeText: 'Week', start: () => new Date(), end: () => new Date(), timeframeLength: () => 'undefined' },
                  { key: 'barfoo2', display: 'Month', timeframeText: 'Month', start: () => new Date(), end: () => new Date(), timeframeLength: () => 'undefined' },
                  { key: 'barfoo3', display: 'Quarter', timeframeText: 'Quarter', start: () => new Date(), end: () => new Date(), timeframeLength: () => 'undefined' },
                  { key: 'barfoo4', display: 'Year', timeframeText: 'Year', start: () => new Date(), end: () => new Date(), timeframeLength: () => 'undefined' },
                ],
              },
              {
                section: 'Absolute',
                values: [
                  { key: 'foobar0', display: 'Jan 01 2024 - Jan 15 2024', timeframeText: 'Jan 01 2024 - Jan 15 2024', start: () => new Date(), end: () => new Date(), timeframeLength: () => '15days' },
                  { key: 'foobar1', display: 'Feb 01 2024 - Feb 15 2024', timeframeText: 'Feb 01 2024 - Feb 15 2024', start: () => new Date(), end: () => new Date(), timeframeLength: () => '15days' },
                  { key: 'foobar2', display: 'Mar 01 2024 - Mar 15 2024', timeframeText: 'Mar 01 2024 - Mar 15 2024', start: () => new Date(), end: () => new Date(), timeframeLength: () => '15days' },
                  { key: 'foobar3', display: 'Apr 01 2024 - Apr 15 2024', timeframeText: 'Apr 01 2024 - Apr 15 2024', start: () => new Date(), end: () => new Date(), timeframeLength: () => '15days' },
                ],
              },
            ] : []"
          />

          <KSelect
            v-model="data.selectedMode"
            :items="data.modes"
            label="Mode:"
            width="200"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="width">
        <KDateTimePicker
          invalid-time-error-message="There was an error."
          mode="dateTime"
          :model-value="{ start: new Date(), end: new Date() }"
          placeholder="Select a date and time"
          range
          width="300"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabled">
        <KDateTimePicker
          disabled
          mode="dateTime"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="readonly">
        <KDateTimePicker
          mode="dateTime"
          :model-value="{ start: new Date(), end: null }"
          readonly
        />
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent
        description="When range is selected, in narrow spaces KDateTimePicker should wrap to next line."
        title="Wrapping to next line"
      >
        <div class="between-container">
          <div class="full-width-sibling">
            <p>Full-width sibling</p>
          </div>
          <div>
            <KDateTimePicker
              mode="dateTime"
              popover-placement="bottom-end"
              range
            />
          </div>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const maxDate = new Date()
maxDate.setMonth(new Date().getMonth() + 3)
</script>

<style lang="scss" scoped>
.kdatetimepicker-sandbox {
  .between-container {
    display: flex;
    gap: $kui-space-50;
    justify-content: space-between;

    .full-width-sibling {
      align-items: center;
      background-color: $kui-color-background-danger-weaker;
      border-radius: $kui-border-radius-20;
      display: flex;
      overflow: auto;
      padding: $kui-space-40;
      resize: horizontal;
      width: 100%;

      p {
        margin: 0;
      }
    }
  }
}
</style>
