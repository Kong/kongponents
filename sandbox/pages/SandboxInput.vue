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
            :error="isToggled.value"
            help="This is help text. When error is true, this text will be red."
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
    <SandboxSectionComponent title="error">
      <KInput
        error
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
            :error="isToggled.value"
            error-message="This is errorMessage."
            help="This is help text. When error is true, this text will be red. When error is true and errorMessage is set, this text will be replaced by the errorMessage."
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
            :character-limit="67"
            class="full-width-input"
            :error="isToggled.value"
            error-message="This is errorMessage. When character limit is exceeded, this text will be replaced by character limit error message."
            help="This is help text. When error is true, this text will be red. When error is true and errorMessage is set, this text will be replaced by the errorMessage. When character limit is exceeded, errorMessage text will be replaced by character limit error message."
            label="Label"
            model-value="Type in 1 more character to see the character limit error message: "
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
        disabled
        label="Disabled"
        model-value="This input is disabled"
      />
      <KInput
        label="Readonly"
        model-value="This input is read only"
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
          <KongIcon />
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      description="To make icon clickable you need to give it role=&quot;button&quot; attribute."
      title="before & after"
    >
      <KInput
        label="Label"
        placeholder="This input has a placeholder"
      >
        <template #before>
          <SearchIcon />
        </template>
        <template #after>
          <CopyIcon
            role="button"
            tabindex="0"
            @click.stop="onSlotContentClick('after')"
          />
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="label-tooltip">
      <KInput label="Label">
        <template #label-tooltip>
          Brings all the <code>devs</code> to the yard
        </template>
      </KInput>
    </SandboxSectionComponent>
    <SandboxTitleComponent
      is-subtitle
      title="Examples"
    />
    <SandboxSectionComponent
      description="When using KInput and KButton side by side, you wanna use the large KButton. You might want to wrap them in a div and use flexbox to position them. Also, when using them side by side, it's recommended to not use the help text prop on KInput as that makes positioning challenging."
      title="KInput and KButton"
    >
      <div class="input-and-button">
        <KInput
          label="Label"
        />
        <KButton size="large">
          Submit
        </KButton>
      </div>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KInput, KExternalLink, KToggle, KButton } from '@/components'
import { SearchIcon, KongIcon, CopyIcon } from '@kong/icons'

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

  .input-and-button {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-40;
  }
}
</style>
