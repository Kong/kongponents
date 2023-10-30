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
    <SandboxSectionComponent title="tooltip">
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
    <SandboxSectionComponent title="maxWidth">
      <KBadge max-width="auto">
        Very long text that should be truncated but isn't thanks to max-width="auto"
      </KBadge>
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent
      title="default"
    >
      <KBadge>
        <b>Default</b> slot
      </KBadge>
      <p>Using icon within the default slot basically becomes a don't unless you are willing to override some default component styles.</p>
      <div class="horizontal-spacing">
        <KBadge>
          Icon within default slot
          <KongIcon />
        </KBadge>
        <KBadge appearance="warning">
          Truncation becomes problematic when content is long
          <KongIcon />
        </KBadge>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="icon">
      <div class="horizontal-spacing">
        <KBadge :icon-before="false">
          Badge with icon
          <template #icon>
            <KongIcon />
          </template>
        </KBadge>
        <KBadge appearance="warning">
          <template #icon>
            <WarningOutlineIcon />
          </template>
          4
        </KBadge>
      </div>
      <p>Clickable icon</p>
      <div class="horizontal-spacing">
        <KBadge :icon-before="false">
          Badge with clickable icon
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="danger"
          :icon-before="false"
        >
          Disabled clickable icon
          <template #icon>
            <CloseIcon
              disabled
              role="button"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="warning"
          :icon-before="false"
        >
          Very long truncated badge with icon
          <template #icon>
            <KongIcon />
          </template>
        </KBadge>
      </div>
      <div class="horizontal-spacing">
        <KBadge
          appearance="info"
          :icon-before="false"
        >
          Info
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="success"
          :icon-before="false"
        >
          Success
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="warning"
          :icon-before="false"
        >
          Warning
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="danger"
          :icon-before="false"
        >
          Danger
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="neutral"
          :icon-before="false"
        >
          Neutral
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
      </div>
      <div class="horizontal-spacing">
        <KBadge
          appearance="get"
          :icon-before="false"
        >
          Get
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="post"
          :icon-before="false"
        >
          Post
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="put"
          :icon-before="false"
        >
          Put
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="delete"
          :icon-before="false"
        >
          Delete
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="patch"
          :icon-before="false"
        >
          Patch
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="options"
          :icon-before="false"
        >
          Options
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="head"
          :icon-before="false"
        >
          Head
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="connect"
          :icon-before="false"
        >
          Connect
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
        <KBadge
          appearance="trace"
          :icon-before="false"
        >
          Trace
          <template #icon>
            <CloseIcon
              role="button"
              tabindex="0"
              @click="handleIconClick"
            />
          </template>
        </KBadge>
      </div>
      <KBadge appearance="get">
        <template #icon>
          <CloseIcon
            role="button"
            tabindex="0"
            @click="handleIconClick"
          />
        </template>
        Get
      </KBadge>
    </SandboxSectionComponent>

    <!-- Legacy -->
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
import { KongIcon, WarningOutlineIcon, CloseIcon } from '@kong/icons'

const handleIconClick = (): void => {
  alert('Icon clicked!')
}
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
