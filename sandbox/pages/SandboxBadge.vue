<template>
  <div class="kbadge-sandbox">
    <SandboxTitleComponent
      title="KBadge"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=467%3A10283&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent title="appearance">
      <div class="horizontal-spacing">
        <KBadge appearance="info">
          Info
        </KBadge>
        <KBadge appearance="success">
          Success
        </KBadge>
        <KBadge appearance="warning">
          Warning
        </KBadge>
        <KBadge appearance="danger">
          Danger
        </KBadge>
        <KBadge appearance="neutral">
          Neutral
        </KBadge>
      </div>
      <div class="horizontal-spacing">
        <KBadge appearance="get">
          Get
        </KBadge>
        <KBadge appearance="post">
          Post
        </KBadge>
        <KBadge appearance="put">
          Put
        </KBadge>
        <KBadge appearance="delete">
          Delete
        </KBadge>
        <KBadge appearance="patch">
          Patch
        </KBadge>
        <KBadge appearance="options">
          Options
        </KBadge>
        <KBadge appearance="head">
          Head
        </KBadge>
        <KBadge appearance="connect">
          Connect
        </KBadge>
        <KBadge appearance="trace">
          Trace
        </KBadge>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="backgroundColor & color">
      <KBadge
        :background-color="KUI_COLOR_BACKGROUND_PRIMARY_WEAK"
        :color="KUI_COLOR_TEXT_INVERSE"
      >
        Custom
      </KBadge>
    </SandboxSectionComponent>
    <!-- <SandboxSectionComponent title="tooltip">
      <KBadge tooltip="I always tooltip">
        Truncation unnecessary
      </KBadge>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="truncationTooltip">
      <div class="horizontal-spacing">
        <KBadge
          tooltip="I never tooltip"
          truncation-tooltip
        >
          Truncation unnecessary
        </KBadge>
        <KBadge
          tooltip="I only tooltip when truncation is needed"
          truncation-tooltip
        >
          Very long text that should be truncated
        </KBadge>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="backgroundColor & color">
      <KBadge max-width="auto">
        Very long text that should be truncated but isn't thanks to max-width="auto"
      </KBadge>
    </SandboxSectionComponent> -->

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Legacy"
    />
    <SandboxSectionComponent title="truncationTooltip prop (deprecated)">
      <div class="horizontal-spacing">
        <KBadge truncation-tooltip="I never tooltip">
          Truncation unnecessary
        </KBadge>
        <KBadge truncation-tooltip="I only tooltip when truncation is needed">
          Very long text that should be truncated
        </KBadge>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="forceTooltip prop (deprecated)">
      <KBadge
        force-tooltip
        truncation-tooltip="I always tooltip"
      >
        Truncation unnecessary
      </KBadge>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KExternalLink, KBadge } from '@/components'
import { KUI_COLOR_BACKGROUND_PRIMARY_WEAK, KUI_COLOR_TEXT_INVERSE } from '@kong/design-tokens'
</script>

<style scoped lang="scss">
.kbadge-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
