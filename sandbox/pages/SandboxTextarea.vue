<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTextarea"
  >
    <div class="ktextarea-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=737%3A10936&mode=dev">
        Figma
      </KExternalLink>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="label">
        <KTextArea
          :character-limit="true"
          label="Label"
          resizable
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelAttributes">
        <KTextArea
          label="Label"
          :label-attributes="{ info: 'I use the KLabel `info` prop' }"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="help"
      >
        <div class="toggle-container">
          <KToggle v-slot="{isToggled, toggle}">
            <KTextArea
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
        <KTextArea
          error
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="characterLimit"
      >
        <KTextArea
          :character-limit="67"
          label="Label"
          model-value="Type in 1 more character to see the character limit error message: "
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rows">
        <KTextArea
          label="Label"
          :rows="2"
        />
      </SandboxSectionComponent>

      <!-- Attributes -->
      <SandboxTitleComponent
        is-subtitle
        title="Attributes"
      />
      <SandboxSectionComponent>
        <KTextArea
          label="Placeholder"
          placeholder="This input has a placeholder"
        />
        <KTextArea
          label="Required"
          required
        />
        <KTextArea
          disabled
          label="Disabled"
          model-value="This input is disabled"
        />
        <KTextArea
          label="Read-only"
          model-value="This input is read-only"
          readonly
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="label-tooltip">
        <KTextArea label="Label">
          <template #label-tooltip>
            Id: <code>123</code>
          </template>
        </KTextArea>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
</script>

<style lang="scss" scoped>
.ktextarea-sandbox {
  .toggle-container {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: $kui-space-70;
  }
}
</style>
