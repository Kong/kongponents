<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KRadio"
  >
    <div class="kradio-sandbox">
      <SandboxSectionComponent>
        <div class="grid-container standalone-container">
          <div class="vertical-spacing">
            <KRadio
              v-model="modelValue0"
              label="Label"
              selected-value="barfoo0"
            />
            <KRadio
              v-model="modelValue0"
              disabled
              label="Disabled"
              selected-value="barfoo1"
            />
            <KRadio
              v-model="modelValue0"
              error
              label="Error"
              selected-value="barfoo2"
            />
            <KRadio
              v-model="modelValue0"
              disabled
              error
              label="Error & Disabled"
              selected-value="barfoo3"
            />
          </div>
          <div class="vertical-spacing">
            <KRadio
              v-model="modelValue1"
              label="Checked"
              selected-value="barfoo"
            />
            <KRadio
              v-model="modelValue1"
              disabled
              label="Checked & Disabled"
              selected-value="barfoo"
            />
            <KRadio
              v-model="modelValue1"
              error
              label="Checked & Error"
              selected-value="barfoo"
            />
            <KRadio
              v-model="modelValue1"
              disabled
              error
              label="Checked & Error & Disabled"
              selected-value="barfoo"
            />
          </div>
        </div>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="label">
        <KRadio
          v-model="modelValue0"
          label="Label"
          selected-value="foobar0"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="description">
        <div class="grid-container">
          <KRadio
            v-model="modelValue0"
            description="Very long description that wraps to the next line and ends with lorem ipsum dolor sit amet."
            label="Label"
            selected-value="foobar1"
          />
          <KRadio
            v-model="modelValue0"
            description="Lorem ipsum dolor sit amet."
            disabled
            label="Disabled"
            selected-value="foobar2"
          />
          <KRadio
            v-model="modelValue0"
            description="Lorem ipsum dolor sit amet."
            error
            label="Error"
            selected-value="foobar3"
          />
          <KRadio
            v-model="modelValue0"
            description="Lorem ipsum dolor sit amet."
            disabled
            error
            label="Error & Disabled"
            selected-value="foobar4"
          />
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="card">
        <div class="grid-container">
          <KRadio
            v-model="modelValue2"
            card
            description="Very long description that wraps to the next line and ends with lorem ipsum dolor sit amet."
            label="Selected"
            selected-value="card0"
          >
            <KongIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            description="Lorem ipsum dolor sit amet."
            label="Other"
            selected-value="card1"
          >
            <KongIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            error
            label="Error"
            selected-value="card2"
          >
            <KongIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            error
            label="Selected & Error"
            selected-value="card0"
          >
            <KongIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            disabled
            label="Disabled"
            selected-value="card3"
          >
            <LockIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            disabled
            error
            label="Disabled & Error"
            selected-value="card4"
          >
            <LockIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            description="Lorem ipsum dolor sit amet."
            disabled
            label="Disabled & Checked"
            selected-value="card0"
          >
            <LockIcon />
          </KRadio>
          <KRadio
            v-model="modelValue2"
            card
            description="Lorem ipsum dolor sit amet."
            disabled
            error
            label="Disabled & Checked & Error"
            selected-value="card0"
          >
            <LockIcon />
          </KRadio>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="cardOrientation">
        <KRadio
          v-model="modelValue4"
          card
          card-orientation="horizontal"
          description="Lorem ipsum dolor sit amet."
          label="Horizontal 1"
          :selected-value="true"
        >
          <KBadge appearance="success">
            Recommended
          </KBadge>
        </KRadio>
        <KRadio
          v-model="modelValue4"
          card
          card-orientation="horizontal"
          description="Lorem ipsum dolor sit amet."
          label="Horizontal 2"
          :selected-value="false"
        >
          <KBadge appearance="info">
            Default
          </KBadge>
        </KRadio>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="cardRadioVisible">
        <KRadio
          v-model="modelValue3"
          card
          :card-radio-visible="false"
          description="Lorem ipsum dolor sit amet."
          label="Vertical"
          :selected-value="false"
        />
        <KRadio
          v-model="modelValue3"
          card
          card-orientation="horizontal"
          :card-radio-visible="false"
          description="Lorem ipsum dolor sit amet."
          label="Horizontal"
          :selected-value="true"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelAttributes">
        <div class="vertical-spacing">
          <KRadio
            v-model="modelValue0"
            label="Label"
            :label-attributes="{ info: 'Tooltip it is' }"
            selected-value="foobar5"
          />
          <KRadio
            v-model="modelValue0"
            label="Label"
            :label-attributes="{ required: true }"
            selected-value="foobar6"
          />
        </div>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <KRadio
          v-model="modelValue0"
          selected-value="foobar7"
        >
          Label
        </KRadio>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="description">
        <KRadio
          v-model="modelValue0"
          label="Label"
          selected-value="foobar8"
        >
          <template #description>
            Lorem ipsum dolor sit amet.
          </template>
        </KRadio>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="default & description">
        <KRadio
          v-model="modelValue0"
          selected-value="foobar9"
        >
          Label
          <template #description>
            Lorem ipsum dolor sit amet.
          </template>
        </KRadio>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="tooltip">
        <KRadio
          v-model="modelValue0"
          selected-value="foobar10"
        >
          Label
          <template #tooltip>
            Lorem ipsum <b>dolor</b> sit amet.
          </template>
        </KRadio>
        <KRadio
          v-model="modelValue0"
          card
          label="Label"
          selected-value="foobar11"
        >
          <template #tooltip>
            Lorem ipsum <b>dolor</b> sit amet.
          </template>
        </KRadio>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon, LockIcon } from '@kong/icons'

const modelValue0 = ref<string>('foobar')
const modelValue1 = ref<string>('barfoo')
const modelValue2 = ref<string>('card0')
const modelValue3 = ref<boolean>(false)
const modelValue4 = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.kradio-sandbox {
  .standalone-container {
    margin-bottom: $kui-space-90;
  }

  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
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
