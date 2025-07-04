<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KBadge"
  >
    <div class="kbadge-sandbox">
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
          <KBadge appearance="decorative">
            Decorative
          </KBadge>
          <KBadge appearance="neutral">
            Neutral
          </KBadge>
        </div>
        <div class="horizontal-spacing">
          <KBadge appearance="connect">
            Connect
          </KBadge>
          <KBadge appearance="custom">
            Custom
          </KBadge>
          <KBadge appearance="delete">
            Delete
          </KBadge>
          <KBadge appearance="get">
            Get
          </KBadge>
          <KBadge appearance="head">
            Head
          </KBadge>
          <KBadge appearance="options">
            Options
          </KBadge>
          <KBadge appearance="patch">
            Patch
          </KBadge>
          <KBadge appearance="post">
            Post
          </KBadge>
          <KBadge appearance="put">
            Put
          </KBadge>
          <KBadge appearance="trace">
            Trace
          </KBadge>
        </div>
        <KBadge appearance="connect">
          Long truncating method badge
        </KBadge>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="tooltip & tooltipAttributes">
        <KBadge
          tooltip="I always tooltip"
          :tooltip-attributes="{ placement: 'bottom-end' }"
        >
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
        <div class="resizable-container">
          <KBadge max-width="100%">
            Very long text that should be truncated but isn't thanks to max-width="100%" (try resizing the container)
          </KBadge>
        </div>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="default"
      >
        <div class="horizontal-spacing">
          <KBadge>
            Info.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
          <KBadge appearance="success">
            Success.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
          <KBadge appearance="warning">
            Warning.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
          <KBadge appearance="danger">
            Danger.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
          <KBadge appearance="decorative">
            Decorative.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
          <KBadge appearance="neutral">
            Neutral.
            <KExternalLink
              href="https://kongponents.konghq.com/components/badge.html"
              target="_blank"
            >
              Link
            </KExternalLink>
          </KBadge>
        </div>
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
            appearance="decorative"
            :icon-before="false"
          >
            Decorative
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
            appearance="custom"
            :icon-before="false"
          >
            Custom
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
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon, WarningOutlineIcon, CloseIcon } from '@kong/icons'
import KExternalLink from '@/components/KExternalLink/KExternalLink.vue'

const handleIconClick = (): void => {
  alert('Icon clicked!')
}
</script>

<style scoped lang="scss">
.kbadge-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }

  .resizable-container {
    max-width: 900px;
    overflow-x: auto;
    padding-bottom: $kui-space-60;
    resize: horizontal;
  }
}
</style>
