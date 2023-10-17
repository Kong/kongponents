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
      <KDropdownMenu
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
        ]"
        trigger-text="Documentation"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="isSelectionMenu (replacement for `appearance` prop)"
    >
      <KDropdownMenu
        is-selection-menu
        :trigger-text="selectionMenuSelectedItem?.label || 'Selection menu'"
      >
        <template #items>
          <KDropdownItem
            v-for="item in selectionMenuItems"
            :key="item.value"
            :item="item"
            @click="handleSelectionMenuSelection(item)"
          />
        </template>
      </KDropdownMenu>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="appearance (replacement for `buttonAppearance` prop)"
    >
      <div class="horizontal-spacing">
        <KDropdownMenu
          appearance="primary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'KButton', to: { name: 'button' } }
          ]"
          trigger-text="Primary"
        />
        <KDropdownMenu
          appearance="secondary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'KButton', to: { name: 'button' } }
          ]"
          trigger-text="Secondary"
        />
        <KDropdownMenu
          appearance="tertiary"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'KButton', to: { name: 'button' } }
          ]"
          trigger-text="Tertiary"
        />
        <KDropdownMenu
          appearance="danger"
          :items="[
            { label: 'Home', to: { name: 'home' } },
            { label: 'KAlert', to: { name: 'alert' } },
            { label: 'KButton', to: { name: 'button' } }
          ]"
          trigger-text="Danger"
        />
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="showCaret"
    >
      <KDropdownMenu
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
        ]"
        show-caret
        trigger-text="Show caret"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="disabled"
    >
      <KDropdownMenu
        disabled
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
        ]"
        trigger-text="Disabled"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="disabledTooltip"
    >
      <KDropdownMenu
        disabled
        disabled-tooltip="Tooltip I am"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
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
      <KDropdownMenu
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
        ]"
      >
        <KButton>
          Default slot
        </KButton>
      </KDropdownMenu>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="items"
    >
      <KDropdownMenu>
        <KButton
          appearance="secondary"
          class="icon-button"
        >
          <CogIcon />
        </KButton>
        <template #items>
          <KDropdownItem :item="{ label: 'Home', to: { name: 'home' } }">
            Home
          </KDropdownItem>
          <KDropdownItem>
            <!-- { label: 'External link', to: 'https://kongponents.konghq.com/' } -->
            <a
              href="https://kongponents.konghq.com/"
              rel="noopener"
              target="_blank"
            >
              External link
            </a>
          </KDropdownItem>
          <KDropdownItem disabled>
            Disabled
          </KDropdownItem>
          <KDropdownItem
            has-divider
            is-dangerous
            @click="handleItemClick"
          >
            Delete
          </KDropdownItem>
        </template>
      </KDropdownMenu>
    </SandboxSectionComponent>

    <!-- Legacy -->
    <SandboxTitleComponent
      is-subtitle
      title="Legacy"
    />
    <SandboxSectionComponent
      title="Prop: icon"
    >
      <KDropdownMenu
        icon="gear"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
        ]"
        trigger-text="Icon prop"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="Props: label & appearance"
    >
      <KDropdownMenu
        appearance="selectionMenu"
        :items="[
          { label: 'Home', to: { name: 'home' } },
          { label: 'KAlert', to: { name: 'alert' } },
          { label: 'KButton', to: { name: 'button' } }
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
import { KDropdownItem, KDropdownMenu, KExternalLink, KButton } from '@/components'
import type { DropdownItem } from '@/types'
import { CogIcon } from '@kong/icons'

const selectionMenuSelectedItem = ref<DropdownItem | null>(null)

const selectionMenuItems = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' },
  { label: 'Item 3', value: 'item3' },
]

const handleSelectionMenuSelection = (item: DropdownItem) => {
  selectionMenuSelectedItem.value = item
}

const handleItemClick = () => {
  alert('Item clicked!')
}
</script>

<style lang="scss" scoped>
.kdropdown-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
