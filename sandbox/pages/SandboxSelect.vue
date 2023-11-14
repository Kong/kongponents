<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KRadio"
  >
    <div class="kselect-sandbox">
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=283%3A2898&mode=dev">
        Figma
      </KExternalLink>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent
        title="items"
      >
        <KSelect :items="selectItems" />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="label"
      >
        <KSelect
          :items="selectItems"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="labelAttributes"
      >
        <KSelect
          :items="selectItems"
          label="Label"
          :label-attributes="{ info: 'I use KLabels `info` prop.' }"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="clearable"
      >
        <KSelect
          clearable
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="width"
      >
        <KSelect
          :items="selectItems"
          width="700"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownMaxHeight"
      >
        <KSelect
          dropdown-max-height="100"
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
        <KSelect
          dropdown-footer-text="Keep scrolling to reach the bottom."
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterTextPosition"
      >
        <KSelect
          dropdown-footer-text="You've reached the bottom."
          dropdown-footer-text-position="static"
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableFiltering"
      >
        <KSelect
          enable-filtering
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="filterFunc"
      >
        <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="loading"
      >
        <KSelect
          :items="selectItems"
          loading
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="reuseItemTemplate"
      >
        <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="enableItemCreation"
      >
        <KSelect
          enable-item-creation
          :items="selectItems"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="required"
      >
        <KSelect
          :items="selectItems"
          label="Label"
          required
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="labelTooltip"
      >
      <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="itemTemplate"
      >
      <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="selectedItemTemplate"
      >
        <KSelect
          :items="selectItems"
        >
          <template #selected-item-template="{ item }">
            <KongIcon />
            {{ item?.label }}
          </template>
        </KSelect>
        <p>Truncation of long content is NOT handled by the component.</p>
        <KSelect
          clearable
          :items="selectItems"
          width="300"
        >
          <template #selected-item-template="{ item }">
            <KongIcon />
            <span class="very-long-item-title">{{ item?.label }} with very long names tend to be more than one line. In this case the text should hopefully get truncated.</span>
          </template>
        </KSelect>
        <pre>{{ itemTemplateTruncationSnippet }}</pre>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="loading"
      >
      <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="empty"
      >
      <!-- TODO: add example -->
      </SandboxSectionComponent>
      <SandboxSectionComponent
        title="dropdownFooterText"
      >
      <!-- TODO: add example -->
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'

const selectItems = [{
  label: 'Cats',
  value: 'cats',
  selected: true,
}, {
  label: 'Dogs',
  value: 'dogs',
}, {
  label: 'Bunnies',
  value: 'bunnies',
  disabled: true,
}, {
  label: 'Duck',
  value: 'duck',
  group: 'Birds',
}, {
  label: 'Oriole',
  value: 'oriole',
  group: 'Birds',
}, {
  label: 'Trout',
  value: 'trout',
  group: 'Fish',
}, {
  label: 'Salmon',
  value: 'salmon',
  group: 'Fish',
}]

const itemTemplateTruncationSnippet = `
<template>
  <KSelect
    :items="items"
    width="300"
  >
    <template #selected-item-template="{ item }">
      <KongIcon />
      <span class="very-long-item-title">{{ item?.label }} with very long names tend to be more than one line. In this case the text should hopefully get truncated.</span>
    </template>
  </KSelect>
</template>

<style>
.very-long-item-title {
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
`
</script>

<style lang="scss" scoped>
.kselect-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }

  .very-long-item-title {
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
