<template>
  <div
    class="k-dropdown"
    :class="{ 'selection-dropdown-menu': selectionMenu }"
  >
    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        ref="kPop"
        v-bind="boundKPopAttributes"
        close-on-popover-click
        data-testid="dropdown-popover"
        hide-close-icon
        :offset="KUI_SPACE_20"
        @close="() => handleTriggerToggle(isToggled, toggle, false)"
        @open="() => handleTriggerToggle(isToggled, toggle, true)"
        @popover-click="() => handleTriggerToggle(isToggled, toggle, false)"
      >
        <component
          :is="tooltipComponent"
          class="dropdown-trigger"
          data-testid="dropdown-trigger"
          :label="disabledTooltip ? disabledTooltip : undefined"
          :max-width="!!disabledTooltip ? '240' : undefined"
          :position="!!disabledTooltip ? 'bottom' : undefined"
        >
          <slot
            :is-open="isToggled.value"
            name="default"
          >
            <KButton
              v-if="triggerButtonText"
              :appearance="appearance"
              class="dropdown-trigger-button"
              data-dropdown-trigger="true"
              data-testid="dropdown-trigger-button"
              :disabled="disabled"
            >
              {{ triggerButtonText }}
              <ChevronDownIcon
                v-if="showCaret"
                decorative
              />
            </KButton>
          </slot>
        </component>
        <template #content>
          <ul
            class="dropdown-list"
            data-testid="dropdown-list"
          >
            <slot
              :close-dropdown="handleCloseDropdown"
              :handle-selection="handleSelection"
              :items="items"
              name="items"
            >
              <KDropdownItem
                v-for="(item, idx) in items"
                v-bind="item"
                :key="`${item.label}-${idx}`"
                :item="item"
                :selected="selectionMenu && selectedItem?.value === item.value"
                :selection-menu-child="selectionMenu"
                @change="handleSelection"
              />
            </slot>
          </ul>
        </template>
      </KPop>
    </KToggle>
  </div>
</template>

<script lang="ts" setup generic="T extends string | number">
import type { Ref } from 'vue'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import type { DropdownItem, PopoverAttributes, DropdownProps, DropdownEmits } from '@/types'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle/KToggle.vue'
import KDropdownItem from './KDropdownItem.vue'
import { ChevronDownIcon } from '@kong/icons'
import { KUI_SPACE_20 } from '@kong/design-tokens'

const {
  selectionMenu,
  appearance = 'primary',
  triggerText = '',
  showCaret,
  width = '',
  kpopAttributes = {},
  items = [],
  disabled,
  disabledTooltip = '',
  // Cannot set default value otherwise we cannot tell whether the prop is passed or not
  label,
} = defineProps<DropdownProps<T>>()

watch(() => appearance, (value) => {
  // @ts-ignore: allow comparing string values
  if (value === 'menu' || value === 'selectionMenu') {
    console.warn('KDropdown: the usage for the `appearance` prop has changed. Please see the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kdropdownmenu')
  }
}, { immediate: true })

watch(() => label, (value) => {
  if (value) {
    console.warn('KDropdown: `label` prop is deprecated. Please use `triggerText` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kdropdownmenu')
  }
}, { immediate: true })

const emit = defineEmits<DropdownEmits<T>>()

const tooltipComponent = computed(() => disabledTooltip ? KTooltip : 'div')

const kPopRef = useTemplateRef('kPop')
const defaultKPopAttributes: PopoverAttributes = {
  hideCaret: true,
  popoverClasses: 'dropdown-popover',
  popoverTimeout: 0,
  placement: 'bottom-start',
}

const boundKPopAttributes: PopoverAttributes = {
  ...defaultKPopAttributes,
  ...kpopAttributes,
  width: width || undefined,
  popoverClasses: `${defaultKPopAttributes.popoverClasses} ${kpopAttributes?.popoverClasses || ''}`,
}

const triggerButtonText = computed((): string => selectedItem.value?.label || triggerText || label || '')

const selectedItem = ref<DropdownItem<T>>()

const handleSelection = (item: DropdownItem<T>): void => {
  if (!selectionMenu) {
    return
  }

  selectedItem.value = item
}

const handleCloseDropdown = (): void => {
  kPopRef.value?.hidePopover()
}

const handleTriggerToggle = (isToggled: Ref<boolean>, toggle: () => void, isOpen: boolean): void => {
  // avoid toggling twice for the same event
  if (isToggled.value !== isOpen) {
    toggle()
    emit('toggleDropdown', isToggled.value)
  }
}

watch(selectedItem, (newVal, oldVal): void => {
  if (newVal && newVal !== oldVal) {
    emit('change', newVal)
  }
})

onMounted(() => {
  if (items) {
    const selectionArr = items.filter(item => item.selected)

    if (selectionArr.length) {
      selectedItem.value = selectionArr[0]
    }
  }
})

defineExpose({
  openDropdown: (): void => {
    kPopRef.value?.showPopover()
  },
  closeDropdown: handleCloseDropdown,
})
</script>

<style lang="scss" scoped>
/* Component styles */

.k-dropdown {
  width: fit-content;

  .dropdown-trigger {
    width: 100%;
  }

  :deep(.popover.dropdown-popover > .popover-container) {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    padding: var(--kui-space-0, $kui-space-0);

    ul {
      margin: 0;
      padding: var(--kui-space-20, $kui-space-20) 0;
    }
  }
}
</style>
