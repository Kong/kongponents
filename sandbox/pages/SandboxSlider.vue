<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSlider"
  >
    <div class="kslider-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="label">
        <KSlider
          v-model="vModel1"
          label="Slider with a label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="min, max, step & showMarks">
        <KSlider
          v-model="vModel2"
          :max="100"
          :min="40"
          show-marks
          :step="5"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="marks & showValue">
        <KSlider
          v-model="vModel3"
          label="Approximate number of API requests (monthly in million)"
          :marks="simpleMarks"
          :max="10"
          :min="1"
        />
        <KSlider
          v-model="userRating"
          label="How likely are you to recommend Kong to a friend or colleague?"
          :marks="ratingMarks"
          :show-value="false"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelAttributes">
        <KSlider
          v-model="vModel4"
          label="Slider with a label and tooltip"
          :label-attributes="{ info: 'This is a tooltip.' }"
        />
      </SandboxSectionComponent>

      <!-- Events -->
      <SandboxTitleComponent
        is-subtitle
        title="Events"
      />
      <SandboxSectionComponent title="@change">
        <KSlider
          v-model="vModel5"
          @change="onChange"
        />
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent
        description="KSlider has some validation logic for making sure that provided values for min, max, step, modelValue and marks props do not produce incorrect or unexpected behavior."
        title="Validation"
      >
        <KTabs
          :tabs="[
            { title: 'Scenario 1', hash: '#scenario1' },
            { title: 'Scenario 2', hash: '#scenario2' },
            { title: 'Scenario 3', hash: '#scenario3' },
            { title: 'Scenario 4', hash: '#scenario4' },
            { title: 'Scenario 5', hash: '#scenario5' },
            { title: 'Scenario 6', hash: '#scenario6' },
            { title: 'Scenario 7', hash: '#scenario7' },
          ]"
        >
          <template #scenario1>
            <SandboxSectionComponent
              description="max = 1, min = 2, step = 1, modelValue = 1"
              title="max <= min"
            >
              <KSlider
                v-model="vModel6"
                :max="1"
                :min="2"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario2>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 3, modelValue = 0"
              title="range cannot be divided by step value"
            >
              <KSlider
                v-model="vModel7"
                :step="3"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario3>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 12, modelValue = 0"
              title="step value is greater than max"
            >
              <KSlider
                v-model="vModel8"
                :step="12"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario4>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 2, modelValue = 0, marks = [1, 3, 5, 6, 7, 10]"
              title="marks is array of numbers containing unreachable values"
            >
              <KSlider
                v-model="vModel9"
                :marks="[1, 3, 5, 6, 7, 10]"
                :step="2"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario5>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 5, modelValue = 0, marks = [{ label: 'Negative 1', value: -1 }, { label: 'Two', value: 2 }, { label: 'Five', value: 5 }, { label: 'Ten', value: 10 }, { label: 'Twelve', value: 12 }]"
              title="marks is array of objects containing invalid values"
            >
              <KSlider
                v-model="vModel10"
                :marks="[{ label: 'Negative 1', value: -1 }, { label: 'Two', value: 2 }, { label: 'Five', value: 5 }, { label: 'Ten', value: 10 }, { label: 'Twelve', value: 12 }]"
                :step="5"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario6>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 1, modelValue = -2"
              title="modelValue is outside of the range"
            >
              <KSlider
                v-model="vModel11"
              />
            </SandboxSectionComponent>
          </template>
          <template #scenario7>
            <SandboxSectionComponent
              description="max = 0, min = 10, step = 5, modelValue = 2"
              title="modelValue is unreachable by step value"
            >
              <KSlider
                v-model="vModel12"
                :step="5"
              />
            </SandboxSectionComponent>
          </template>
        </KTabs>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const vModel1 = ref<number>(2)
const vModel2 = ref<number>(65)
const vModel3 = ref<number>(10)
const vModel4 = ref<number>(4)
const vModel5 = ref<number>(4)

const vModel6 = ref<number>(1)
const vModel7 = ref<number>(0)
const vModel8 = ref<number>(0)
const vModel9 = ref<number>(0)
const vModel10 = ref<number>(0)
const vModel11 = ref<number>(-2)
const vModel12 = ref<number>(2)

const simpleMarks = [1, 3, 5, 7, 10]

const userRating = ref<number>(5)
const ratingMarks = [
  {
    label: 'Very likely',
    value: 0,
  },
  {
    label: 'Extremely likely',
    value: 5,
  },
  {
    label: 'Epically likely',
    value: 10,
  },
]

const onChange = (value: number) => {
  alert(`Slider value changed to: ${value}`)
}
</script>

