<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KEmptyState"
  >
    <div class="kemptystate-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title & message & actionButtonText">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Content"
        />
        <p>Super long content</p>
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          title="Empty State Super Long Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="actionButtonVisible">
        <KComponent
          v-slot="{ data }"
          :data="{ actionButtonVisible: true }"
        >
          <KInputSwitch
            v-model="data.actionButtonVisible"
            label="Action button visible"
          />

          <KEmptyState
            action-button-text="Action"
            :action-button-visible="data.actionButtonVisible"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
            title="Empty State Action Button"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="actionButtonDisabled">
        <KComponent
          v-slot="{ data }"
          :data="{ actionButtonEnabled: true }"
        >
          <KInputSwitch
            v-model="data.actionButtonEnabled"
            label="Action button enabled"
          />

          <KEmptyState
            :action-button-disabled="!data.actionButtonEnabled"
            action-button-text="Action"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
            title="Empty State Action Button"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="iconVariant">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Default Icon Variant"
        />
        <KEmptyState
          action-button-text="Action"
          icon-variant="error"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Error Icon Variant"
        />
        <KEmptyState
          action-button-text="Action"
          icon-variant="search"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Search Icon Variant"
        />
        <KEmptyState
          action-button-text="Action"
          icon-variant="kong"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Kong Icon Variant"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="iconBackground">
        <KEmptyState
          icon-background
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Icon Background"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="features">
        <KEmptyState
          :features="features"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State With Features"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <KEmptyState
          action-button-text="Action"
          title="Empty State Slotted Content"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="icon">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Icon"
        >
          <template #icon>
            <KongIcon
              :color="KUI_COLOR_TEXT_PRIMARY"
              :size="KUI_ICON_SIZE_80"
            />
          </template>
        </KEmptyState>
        <KEmptyState
          icon-background
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Icon Background"
        >
          <template #icon>
            <DesignIcon />
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="action">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Slotted Action Button"
        >
          <template #action>
            <KButton>
              <AddCircleIcon />
              Create New
            </KButton>
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="image">
        <KEmptyState
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State With Image"
        >
          <template #image>
            <img src="https://picsum.photos/640/300">
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="featureIcon">
        <KEmptyState
          action-button-text="Action"
          :features="features"
          title="Empty State With Features & Icons"
        >
          <template #default>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            </div>
            <div>
              Pricing: your first portal is free, then $300 per portal per month.
            </div>
          </template>

          <template #feature-icon-wave>
            <WavingHandIcon />
          </template>
          <template #feature-icon-sparkles>
            <SparklesIcon />
          </template>
          <template #feature-icon-rocket>
            <RocketIcon />
          </template>
          <template #feature-icon-design>
            <DesignIcon />
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="footer">
        <KEmptyState
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State With Footer Content"
        >
          <template #footer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </template>
        </KEmptyState>
        <KEmptyState
          :features="features"
          title="Empty State With Footer Content"
        >
          <template #image>
            <img src="https://picsum.photos/640/300">
          </template>
          <template #default>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            </div>
            <div>
              Pricing: your first portal is free, then $300 per portal per month.
            </div>
          </template>
          <template #action>
            <KButton appearance="secondary">
              Secondary action
            </KButton>
            <KButton>
              Primary action
            </KButton>
          </template>
          <template #feature-icon-wave>
            <WavingHandIcon />
          </template>
          <template #feature-icon-sparkles>
            <SparklesIcon />
          </template>
          <template #feature-icon-rocket>
            <RocketIcon />
          </template>
          <template #feature-icon-design>
            <DesignIcon />
          </template>
          <template #footer>
            <div class="footer-content-title-container">
              <h2>
                Get started with the CLI
              </h2>
              <KExternalLink href="https://kongponents.konghq.com/">
                Read the docs
              </KExternalLink>
            </div>
            <KCodeBlock
              id="footer-content-code-block"
              code="{example code here}"
              language="plaintext"
              single-line
              theme="dark"
            />
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon, AddCircleIcon, DesignIcon, WavingHandIcon, SparklesIcon, RocketIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_PRIMARY, KUI_ICON_SIZE_80 } from '@kong/design-tokens'
import type { EmptyStateFeature } from '@/types'

const features: EmptyStateFeature[] = [
  {
    key: 'wave',
    title: 'Feature 1',
    description: 'Description for feature 0.',
  },
  {
    key: 'sparkles',
    title: 'Feature with a very long title that exceeds the usual length',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    key: 'rocket',
    title: 'Feature 3',
    description: 'Description for feature 2.',
  },
  {
    key: 'design',
    title: 'Feature 4',
    description: 'Description for feature 3.',
  },
]
</script>

<style lang="scss" scoped>
.kemptystate-sandbox {
  .footer-content-title-container {
    display: flex;
    justify-content: space-between;

    h2 {
      color: $kui-color-text;
      font-size: $kui-font-size-50;
      font-weight: $kui-font-weight-semibold;
      line-height: $kui-line-height-50;
      margin: $kui-space-0;
    }
  }
}
</style>
