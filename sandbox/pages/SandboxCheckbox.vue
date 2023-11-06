<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCheckbox"
  >
    <div class="kcheckbox-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=283%3A2899&mode=dev">
        Figma
      </KExternalLink>

      <div class="grid-container standalone-container">
        <div class="vertical-spacing">
          <KCheckbox
            v-model="modelValue0"
            label="Label"
          />
          <KCheckbox
            v-model="modelValue0"
            disabled
            label="Disabled"
          />
          <KCheckbox
            v-model="modelValue0"
            error
            label="Error"
          />
          <KCheckbox
            v-model="modelValue0"
            disabled
            error
            label="Error & Disabled"
          />
        </div>
        <div class="vertical-spacing">
          <KCheckbox
            v-model="modelValue1"
            label="Checked"
            selected-value="barfoo"
          />
          <KCheckbox
            v-model="modelValue1"
            disabled
            label="Checked & Disabled"
          />
          <KCheckbox
            v-model="modelValue1"
            error
            label="Checked & Error"
          />
          <KCheckbox
            v-model="modelValue1"
            disabled
            error
            label="Checked & Error & Disabled"
          />
        </div>
      </div>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="label">
        <KCheckbox
          v-model="modelValue2"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="description">
        <div class="grid-container">
          <KCheckbox
            v-model="modelValue3"
            description="Very long description that wraps to the next line and ends with lorem ipsum dolor sit amet."
            label="Label"
          />
          <KCheckbox
            v-model="modelValue3"
            description="Lorem ipsum dolor sit amet."
            disabled
            label="Disabled"
          />
          <KCheckbox
            v-model="modelValue3"
            description="Lorem ipsum dolor sit amet."
            error
            label="Error"
          />
          <KCheckbox
            v-model="modelValue3"
            description="Lorem ipsum dolor sit amet."
            disabled
            error
            label="Error & Disabled"
          />
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="Example"
        title="indeterminate"
      >
        <div class="vertical-spacing">
          <KCheckbox
            v-model="indeterminateValueAll"
            :indeterminate="isIndeterminate"
            :label="indeterminateValueAll ? 'Uncheck all' : 'Check all'"
            @change="handleIndeterminateChange"
          />
          <KCheckbox
            v-for="(value, index) in indeterminateValues"
            :key="index"
            v-model="indeterminateValues[index].value"
            :label="indeterminateValues[index].label"
          />
        </div>
        <p>Different states</p>
        <div class="grid-container standalone-container">
          <KCheckbox
            v-model="indeterminateValue"
            description="Lorem ipsum dolor sit amet."
            indeterminate
            label="Label"
          />
          <KCheckbox
            v-model="indeterminateValue"
            description="Lorem ipsum dolor sit amet."
            disabled
            indeterminate
            label="Disabled"
          />
          <KCheckbox
            v-model="indeterminateValue"
            description="Lorem ipsum dolor sit amet."
            error
            indeterminate
            label="Error"
          />
          <KCheckbox
            v-model="indeterminateValue"
            description="Lorem ipsum dolor sit amet."
            disabled
            error
            indeterminate
            label="Error & Disabled"
          />
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelAttributes">
        <KCheckbox
          v-model="modelValue4"
          label="Label"
          :label-attributes="{ info: 'Tooltip it is' }"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <KCheckbox
          v-model="modelValue5"
        >
          Label
        </KCheckbox>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="description">
        <KCheckbox
          v-model="modelValue6"
          label="Label"
        >
          <template #description>
            Lorem ipsum dolor sit amet.
          </template>
        </KCheckbox>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="default & description">
        <KCheckbox
          v-model="modelValue7"
        >
          Label
          <template #description>
            Lorem ipsum dolor sit amet.
          </template>
        </KCheckbox>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="tooltip">
        <KCheckbox
          v-model="modelValue8"
        >
          Label
          <template #tooltip>
            Lorem ipsum <b>dolor</b> sit amet.
          </template>
        </KCheckbox>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KCheckbox, KExternalLink } from '@/components'

const modelValue0 = ref<boolean>(false)
const modelValue1 = ref<boolean>(true)
const modelValue2 = ref<boolean>(false)
const modelValue3 = ref<boolean>(false)
const modelValue4 = ref<boolean>(false)
const modelValue5 = ref<boolean>(false)
const modelValue6 = ref<boolean>(false)
const modelValue7 = ref<boolean>(false)
const modelValue8 = ref<boolean>(false)

const indeterminateValue = ref<boolean>(false)

// indeterminate example logic
const indeterminateValueAll = ref<boolean>(false)

const indeterminateValues = ref<Array<Record<string, any>>>([
  {
    label: 'Option 1',
    value: false,
  },
  {
    label: 'Option 2',
    value: true,
  },
  {
    label: 'Option 3',
    value: false,
  },
])

const isIndeterminate = computed((): boolean => {
  return !!indeterminateValues.value.filter((value) => value.value).length && !!indeterminateValues.value.filter((value) => !value.value).length
})

const handleIndeterminateChange = (value: boolean) => {
  indeterminateValues.value.forEach((val) => {
    val.value = value
  })
}

watch(indeterminateValues, () => {
  // all are selected
  if (indeterminateValues.value.filter((value) => value.value).length === indeterminateValues.value.length) {
    indeterminateValueAll.value = true
  // all are unselected
  } else if (indeterminateValues.value.filter((value) => !value.value).length === indeterminateValues.value.length) {
    indeterminateValueAll.value = false
  // some are selected
  } else {
    indeterminateValueAll.value = false
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
.kcheckbox-sandbox {
  .standalone-container {
    margin-bottom: $kui-space-90;
  }

  .vertical-spacing {
    display: flex;
    flex-direction: column;
    gap: $kui-space-50;
  }

  .grid-container {
    display: grid;
    gap: $kui-space-50;
    grid-template-columns: repeat(2, 1fr);
    /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
    max-width: $kui-breakpoint-tablet;
  }
}
</style>
