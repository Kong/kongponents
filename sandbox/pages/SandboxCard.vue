<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCard"
  >
    <div class="kcard-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title">
        <KCard title="Card title">
          Card content slot
        </KCard>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="titleTag">
        <KCard
          title="Card title"
          title-tag="h2"
        >
          Card content slot
        </KCard>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title & content & actions & footer">
        <div>
          <KCard>
            <template #title>
              Card title
            </template>
            <template #actions>
              <KDropdown
                :items="[
                  { label: 'Home', to: { name: 'home' } },
                  { label: 'KDropdown', to: { name: 'dropdown' } },
                  { label: 'Stay', to: { name: 'card' } },
                ]"
              >
                <KButton
                  appearance="tertiary"
                  icon
                  size="small"
                >
                  <MoreIcon />
                </KButton>
              </KDropdown>
            </template>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <em>ut labore</em> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <b>Excepteur sint occaecat cupidatat non proident</b>, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <template #footer>
              <KBadge appearance="success">
                Published
              </KBadge>
              <KBadge>2 versions</KBadge>
            </template>
          </KCard>
        </div>
        <div class="limit-width">
          <KCard>
            <template #title>
              Example of very long card title that should not be truncated with ellipsis and should wrap to the next line even if it is too long
            </template>
            <template #actions>
              <KDropdown
                :items="[
                  { label: 'Home', to: { name: 'home' } },
                  { label: 'KDropdown', to: { name: 'dropdown' } },
                  { label: 'Stay', to: { name: 'card' } },
                ]"
              >
                <KButton
                  appearance="tertiary"
                  icon
                  size="small"
                >
                  <MoreIcon />
                </KButton>
              </KDropdown>
            </template>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <template #footer>
              <CheckIcon
                :color="KUI_COLOR_TEXT_SUCCESS"
                :size="KUI_ICON_SIZE_40"
              />
              Approved
            </template>
          </KCard>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { MoreIcon, CheckIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_SUCCESS, KUI_ICON_SIZE_40 } from '@kong/design-tokens'
</script>

<style scoped lang="scss">
.kcard-sandbox {
  .horizontal-spacing {
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }

  .limit-width {
    /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
    max-width: $kui-breakpoint-mobile;
  }

  .footer-content {
    color: $kui-color-text-success;
    display: flex;
    gap: $kui-space-30;
  }
}
</style>
