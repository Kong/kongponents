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
      <SandboxSectionComponent title="marks">
        <KSlider
          v-model="vModel3"
          label="API requests (monthly in million)"
          :marks="simpleMarks"
          :max="10"
          :min="1"
        />
        <KSlider
          v-model="userRating"
          label="How likely are you to recommend Kong to a friend or colleague?"
          :marks="ratingMarks"
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

