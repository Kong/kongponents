<template>
  <div class="kdropdown-sandbox">
    <SandboxTitleComponent
      title="KDropdown"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=466%3A9443&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent
      title="triggerText (replacement for deprecated `label` prop)"
    >
      <KDropdown
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
        trigger-text="Documentation"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="isSelectionMenu (replacement for `appearance` prop)"
    >
      <KDropdown
        is-selection-menu
        :items="selectionMenuItems"
        trigger-text="Selection menu"
        @change="handleSelectionMenuUpdate"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="appearance (replacement for `buttonAppearance` prop)"
    >
      <div class="horizontal-spacing">
        <KDropdown
          appearance="primary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'Stay', to: { name: 'dropdown' } }
          ]"
          trigger-text="Primary"
        />
        <KDropdown
          appearance="secondary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'Stay', to: { name: 'dropdown' } }
          ]"
          trigger-text="Secondary"
        />
        <KDropdown
          appearance="tertiary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'Stay', to: { name: 'dropdown' } }
          ]"
          trigger-text="Tertiary"
        />
        <KDropdown
          appearance="danger"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'Stay', to: { name: 'dropdown' } }
          ]"
          trigger-text="Danger"
        />
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="showCaret"
    >
      <div class="horizontal-spacing">
        <KDropdown
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'Stay', to: { name: 'dropdown' } }
          ]"
          show-caret
          trigger-text="Show caret"
        />
        <KDropdown
          is-selection-menu
          show-caret
          trigger-text="Selection menu with caret"
          @change="handleSelectionMenuUpdate"
        >
          <template #items="{ handleSelection }">
            <KDropdownItem
              v-for="item in selectionMenuItems"
              :key="item.value"
              :item="item"
              :selected="item.value === selectionMenuSelectedItem?.value"
              @click="handleSelection(item)"
            />
          </template>
        </KDropdown>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="disabled"
    >
      <KDropdown
        disabled
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
        trigger-text="Disabled"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="disabledTooltip"
    >
      <KDropdown
        disabled
        disabled-tooltip="Tooltip I am"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
        trigger-text="Disabled with a tooltip"
      />
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent
      title="default"
    >
      <KDropdown
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
      >
        <KButton>
          Default slot
        </KButton>
      </KDropdown>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="items"
    >
      <KDropdown width="220">
        <KButton
          appearance="secondary"
          class="icon-button"
        >
          <CogIcon />
        </KButton>
        <template #items>
          <KDropdownItem
            :item="{ label: 'Home', to: { name: 'home' } }"
            target="_blank"
          >
            <KongIcon />
            Router link
          </KDropdownItem>
          <KDropdownItem
            :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
            target="_blank"
          >
            <ExternalLinkIcon />
            External link
          </KDropdownItem>
          <KDropdownItem
            disabled
            has-divider
            @click="handleItemClick"
          >
            <DisabledIcon />
            Disabled button
          </KDropdownItem>
          <KDropdownItem
            disabled
            :item="{ label: 'Home', to: { name: 'home' } }"
          >
            <KongIcon />
            Disabled router link
          </KDropdownItem>
          <KDropdownItem
            disabled
            :item="{ label: 'External link', to: 'https://kongponents.konghq.com/' }"
          >
            <ExternalLinkIcon />
            Disabled external link
          </KDropdownItem>
          <KDropdownItem
            has-divider
            is-dangerous
            @click="handleItemClick"
          >
            <TrashIcon />
            Delete
          </KDropdownItem>
        </template>
      </KDropdown>
      <p>KDropdownItem takes care of spacing between the elements. However, should you need to implement some custom layout, you can sprinkle a little CSS in there.</p>
      <KDropdown
        trigger-text="Slotted content positioning"
        width="250"
      >
        <template #items>
          <KDropdownItem>
            Updates
            <KBadge
              class="dropdown-item-content-end"
              shape="rectangular"
            >
              14
            </KBadge>
          </KDropdownItem>
          <KDropdownItem>
            Support
            <KBadge
              appearance="success"
              shape="rectangular"
            >
              Enterprise
            </KBadge>
            <ExternalLinkIcon class="dropdown-item-content-end" />
          </KDropdownItem>
          <KDropdownItem>
            <BookIcon />
            Docs
            <KTooltip
              class="dropdown-item-content-end"
              label="This is a tooltip"
            >
              <InfoIcon />
            </KTooltip>
          </KDropdownItem>
        </template>
      </KDropdown>
      <pre>
        {{ slottedContentPositioningSnippet }}
      </pre>
    </SandboxSectionComponent>

    <!-- Legacy -->
    <SandboxTitleComponent
      is-subtitle
      title="Legacy"
    />
    <SandboxSectionComponent
      title="Prop: icon"
    >
      <KDropdown
        icon="gear"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
        trigger-text="Icon prop"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="Props: label & appearance"
    >
      <KDropdown
        appearance="selectionMenu"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'Stay', to: { name: 'dropdown' } }
        ]"
        label="Deprecated props"
      />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KDropdownItem, KDropdown, KExternalLink, KButton, KBadge, KTooltip } from '@/components'
import type { DropdownItem } from '@/types'
import { CogIcon, KongIcon, ExternalLinkIcon, DisabledIcon, TrashIcon, BookIcon, InfoIcon } from '@kong/icons'

const selectionMenuSelectedItem = ref<DropdownItem>()

const selectionMenuItems = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3' },
]

const handleSelectionMenuUpdate = (item: DropdownItem) => {
  selectionMenuSelectedItem.value = item
}

const handleItemClick = () => {
  alert('Item clicked!')
}

const slottedContentPositioningSnippet = `
<template>
  <KDropdownItem>
    Updates
    <KBadge class="dropdown-item-content-end">
      14
    </KBadge>
  </KDropdownItem>
</template>

<style lang="scss" scoped>
.dropdown-item-content-end {
  margin-left: $kui-space-auto;
}
</style>`
</script>

<style lang="scss" scoped>
.kdropdown-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }

  .dropdown-item-content-end {
    margin-left: $kui-space-auto;
  }

  pre {
    margin-bottom: 0;
  }
}
</style>