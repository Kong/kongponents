<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KFileUpload"
  >
    <div class="kfileupload-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=285%3A2601&mode=dev">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="label">
        <KFileUpload
          :accept="['image/*']"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelAttributes">
        <KFileUpload
          :accept="['image/*']"
          label="Label"
          :label-attributes="{ info: 'I use the KLabel `info` prop' }"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="help"
      >
        <div class="toggle-container">
          <KToggle v-slot="{isToggled, toggle}">
            <KFileUpload
              :accept="['image/*']"
              class="full-width-input"
              :error="isToggled.value"
              help="This is help text. When error is true, this text will be red."
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
        <KFileUpload
          :accept="['image/*']"
          error
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="errorMessage"
      >
        <div class="toggle-container">
          <KToggle v-slot="{isToggled, toggle}">
            <KFileUpload
              :accept="['image/*']"
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
      <SandboxSectionComponent title="buttonText">
        <KFileUpload
          :accept="['image/*']"
          button-text="Choose file"
        />
      </SandboxSectionComponent>

      <!-- Attributes -->
      <SandboxTitleComponent
        is-subtitle
        title="Attributes"
      />
      <SandboxSectionComponent>
        <KFileUpload
          :accept="['image/*']"
          label="Placeholder"
          placeholder="This input has a placeholder"
        />
        <KFileUpload
          :accept="['image/*']"
          label="Required"
          required
        />
        <KFileUpload
          :accept="['image/*']"
          disabled
          label="Disabled"
          model-value="This input is disabled"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="icon">
        <KFileUpload
          :accept="['image/*']"
          label="Label"
        >
          <template #icon>
            <ImageIcon />
          </template>
        </KFileUpload>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { inject } from 'vue'
import { ImageIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.kfileupload-sandbox {
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
