<template>
  <div class="kinput-sandbox">
    <SandboxTitleComponent
      title="KInput"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=218%3A646&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent title="label">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="labelAttributes">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="help"
    >
      <div class="toggle-container">
        <KToggle v-slot="{isToggled, toggle}">
          <KInput
            class="full-width-input"
            :has-error="isToggled.value"
            help="This is help text. When hasError is true, this text will be red."
            label="Label"
          />
          <KButton
            size="small"
            @click="toggle"
          >
            Toggle error
          </KButton>
        </KToggle>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="hasError">
      <KInput
        has-error
        label="Label"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="errorMessage"
    >
      <div class="toggle-container">
        <KToggle v-slot="{isToggled, toggle}">
          <KInput
            class="full-width-input"
            error-message="This is errorMessage."
            :has-error="isToggled.value"
            help="This is help text. When hasError is true, this text will be red. When hasError is true and errorMessage is set, this text will be replaced by the errorMessage."
            label="Label"
          />
          <KButton
            size="small"
            @click="toggle"
          >
            Toggle error
          </KButton>
        </KToggle>
      </div>
    </SandboxSectionComponent>

    <SandboxSectionComponent
      title="characterLimit"
    >
      <div class="toggle-container">
        <KToggle v-slot="{isToggled, toggle}">
          <KInput
            v-model="characterLimitModelValue"
            :character-limit="67"
            class="full-width-input"
            error-message="This is errorMessage. When character limit is exceeded, this text will be replaced by character limit error message."
            :has-error="isToggled.value"
            help="This is help text. When hasError is true, this text will be red. When hasError is true and errorMessage is set, this text will be replaced by the errorMessage. When character limit is exceeded, errorMessage text will be replaced by character limit error message."
            label="Label"
          />
          <KButton
            size="small"
            @click="toggle"
          >
            Toggle error
          </KButton>
        </KToggle>
      </div>
    </SandboxSectionComponent>

    <!-- Attributes -->
    <SandboxTitleComponent
      is-subtitle
      title="Attributes"
    />
    <SandboxSectionComponent>
      <KInput
        label="Placeholder"
        placeholder="This input has a placeholder"
      />
      <KInput
        label="Required"
        required
      />
      <KInput
        v-model="disabledModelValue"
        disabled
        label="Disabled"
      />
      <KInput
        v-model="readOnlyModelValue"
        label="Readonly"
        readonly
      />
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent title="before">
      <KInput label="Label">
        <template #before>
          <SearchIcon />
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="after">
      <KInput label="Label">
        <template #after>
          <CloseIcon />
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="before & after">
      <KInput
        label="Label"
        placeholder="This input has a placeholder"
      >
        <template #before>
          <SearchIcon @click.stop="onSlotContentClick('before')" />
        </template>
        <template #after>
          <CloseIcon @click.stop="onSlotContentClick('after')" />
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="label-tooltip">
      <KInput label="Label" />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KInput, KExternalLink, KToggle, KButton } from '@/components'
import { SearchIcon, CloseIcon } from '@kong/icons'

const characterLimitModelValue = ref<string>('Type in 1 more character to see the character limit error message: ')
const disabledModelValue = ref<string>('This input is disabled')
const readOnlyModelValue = ref<string>('This input is read only')

const onSlotContentClick = (slotName: string) => {
  alert(`You clicked on ${slotName} slot content`)
}
</script>

<style lang="scss" scoped>
.kinput-sandbox {
  .toggle-container {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: $kui-space-70;
  }

  .full-width-input {
    width: 100%;
  }
}
</style>
