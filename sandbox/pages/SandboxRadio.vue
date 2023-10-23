<template>
  <div class="kradio-sandbox">
    <SandboxTitleComponent
      title="KRadio"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=763%3A12969&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

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
    <SandboxSectionComponent
      description="KRadio card styling is to be revisited in the next `9.0.0-beta.x` release as design is being finalized."
      title="card"
    >
      <div class="grid-container">
        <KRadio
          v-model="modelValue2"
          card
          description="Very long description that wraps to the next line and ends with lorem ipsum dolor sit amet."
          label="Label"
          selected-value="card0"
        >
          <WorldIcon />
        </KRadio>
        <KRadio
          v-model="modelValue2"
          card
          description="Disabled (and without a label)"
          disabled
          selected-value="card1"
        >
          <WorldPrivateIcon />
        </KRadio>
        <KRadio
          v-model="modelValue2"
          card
          description="Lorem ipsum dolor sit amet."
          error
          label="Error"
          selected-value="card2"
        >
          <WorldPrivateIcon />
        </KRadio>
        <KRadio
          v-model="modelValue2"
          card
          disabled
          error
          label="Error & Disabled"
          selected-value="card3"
        >
          <WorldPrivateIcon />
        </KRadio>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="labelAttributes">
      <KRadio
        v-model="modelValue0"
        label="Label"
        :label-attributes="{ info: 'Tooltip it is' }"
        selected-value="foobar5"
      />
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent title="default">
      <KRadio
        v-model="modelValue0"
        selected-value="foobar6"
      >
        Label
      </KRadio>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="description">
      <KRadio
        v-model="modelValue0"
        label="Label"
        selected-value="foobar7"
      >
        <template #description>
          Lorem ipsum dolor sit amet.
        </template>
      </KRadio>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="default & description">
      <KRadio
        v-model="modelValue0"
        selected-value="foobar8"
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
        selected-value="foobar9"
      >
        Label
        <template #tooltip>
          Lorem ipsum <b>dolor</b> sit amet.
        </template>
      </KRadio>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KRadio, KExternalLink } from '@/components'
import { WorldIcon, WorldPrivateIcon } from '@kong/icons'

const modelValue0 = ref('foobar')
const modelValue1 = ref('barfoo')
const modelValue2 = ref('card0')
</script>

<style lang="scss" scoped>
.kradio-sandbox {
  .standalone-container {
    margin-bottom: $kui-space-90;
  }

  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
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

.vertical-spacing {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.grid-container {
  align-items: flex-end;
  column-gap: $kui-space-50;
  display: grid;
  grid-template-columns: repeat(2, 40%);
  row-gap: $kui-space-70;
}
</style>
