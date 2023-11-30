<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCard"
  >
    <div class="kcard-sandbox">
      <SandboxTitleComponent
        title="KCard"
      >
        <template #description>
          <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1152%3A19831&mode=dev">
            Figma
          </KExternalLink>
        </template>
      </SandboxTitleComponent>

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
                  { label: 'Stay', to: { name: 'card' } }
                ]"
              >
                <KButton
                  appearance="tertiary"
                  class="icon-button"
                  size="small"
                >
                  <MoreIcon />
                </KButton>
              </KDropdown>
            </template>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <em>ut labore</em> et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <b>Excepteur sint occaecat cupidatat non proident</b>, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                  { label: 'Stay', to: { name: 'card' } }
                ]"
              >
                <KButton
                  appearance="tertiary"
                  class="icon-button"
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

      <!-- Legacy -->
      <SandboxTitleComponent
        is-subtitle
        title="Legacy"
      />
      <SandboxSectionComponent title="body slot (deprecated)">
        <KCard>
          When both `default` and `body` slots are present, `default` slot will be used.
          <template #body>
            And `body` slot will be ignored.
          </template>
        </KCard>
        <KCard>
          <template #body>
            But when only the `body` slot is present, it will be treated as `default`.
          </template>
        </KCard>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="body prop (deprecated)">
        <KCard body="`body` prop is deprecated but is backwards compatible." />
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
