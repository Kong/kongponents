<template>
  <div
    class="k-dropdown"
    :class="{ 'selection-dropdown-menu': selectionMenu }"
  >
    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        v-bind="boundKPopAttributes"
        data-testid="k-dropdown-popover"
        :hide-popover="hidePopover"
        :on-popover-click="() => handleTriggerToggle(isToggled, toggle, false)"
        @closed="() => handleTriggerToggle(isToggled, toggle, false)"
        @opened="() => handleTriggerToggle(isToggled, toggle, true)"
      >
        <component
          :is="tooltipComponent"
          class="dropdown-trigger"
          data-testid="dropdown-trigger"
          :label="disabledTooltip"
          :max-width="!!disabledTooltip ? '240' : undefined"
          :position="!!disabledTooltip ? 'bottom' : undefined"
          :position-fixed="!!disabledTooltip ? true : undefined"
        >
          <slot
            :is-open="isToggled.value"
            name="default"
          >
            <KButton
              v-if="triggerButtonText || icon"
              :appearance="appearance"
              class="dropdown-trigger-button"
              data-testid="dropdown-trigger-button"
              :disabled="disabled"
              :icon="icon"
            >
              {{ triggerButtonText }}
              <ChevronDownIcon
                v-if="showCaret"
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

<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import type { ButtonAppearance, DropdownItem, PopPlacements } from '@/types'
import { ButtonAppearances } from '@/types'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KDropdownItem from './KDropdownItem.vue'
import { ChevronDownIcon } from '@kong/icons'

const props = defineProps({
  selectionMenu: {
    type: Boolean,
    default: false,
  },
  appearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
    validator: (value: ButtonAppearance) => {
      // @ts-ignore
      if (value === 'menu' || value === 'selectionMenu') {
        console.warn('KDropdown: the usage for the `appearance` prop has changed. Please see the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kdropdownmenu')
      }

      return Object.values(ButtonAppearances).includes(value)
    },
  },
  triggerText: {
    type: String,
    default: '',
  },
  // TODO: [beta] remove this prop
  icon: {
    type: String,
    default: '',
  },
  showCaret: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '',
  },
  /**
   * kpopAttributes is used to pass properties directly to the wrapped KPop component
   * Commonly-overridden properties include:
   * - placement
   * - popoverClasses
   * - target
   */
  kpopAttributes: {
    type: Object,
    default: null,
  },
  items: {
    type: Array as PropType<Array<DropdownItem>>,
    default: () => [],
    validator: (items: DropdownItem[]) => !items.length || items.every(i => i.label !== undefined),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledTooltip: {
    type: String,
    default: '',
  },
  /**
   * @deprecated in favor of the "triggerText" prop
   */
  label: {
    type: String,
    default: '',
    validator: (value: string) => {
      if (value) {
        console.warn('KDropdown: `label` prop is deprecated. Please use `triggerText` prop instead. Please see the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kdropdownmenu')
      }

      return true
    },
  },
})

const emit = defineEmits<{
  (e: 'toggleDropdown', value: boolean): void;
  (e: 'change', value: DropdownItem): void;
}>()

const hidePopover = ref<boolean>(false)

const tooltipComponent = computed(() => props.disabledTooltip ? KTooltip : 'div')

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-dropdown-popover',
  popoverTimeout: 0,
  positionFixed: true,
  placement: 'bottomStart' as PopPlacements,
}

const boundKPopAttributes = {
  ...defaultKPopAttributes,
  ...props.kpopAttributes,
  width: props.width ? props.width : undefined,
  popoverClasses: `${defaultKPopAttributes.popoverClasses} ${props.kpopAttributes?.popoverClasses || ''}`,
}

const triggerButtonText = computed((): string => selectedItem.value?.label || props.triggerText || props.label)

const selectedItem = ref<DropdownItem>()

const handleSelection = (item: DropdownItem): void => {
  if (!props.selectionMenu) {
    return
  }

  selectedItem.value = item
}

const handleCloseDropdown = async (): Promise<void> => {
  hidePopover.value = true

  // reset the hidePopover value so it's ready for the next time the dropdown is opened
  // need nextTick to ensure the popover is hidden before resetting the value
  await nextTick(() => {
    hidePopover.value = false
  })
}

const handleTriggerToggle = (isToggled: Ref<boolean>, toggle: () => void, isOpen: boolean): boolean => {
  // avoid toggling twice for the same event
  if (isToggled.value !== isOpen) {
    toggle()
    emit('toggleDropdown', isToggled.value)
  }

  return isToggled.value
}

watch(selectedItem, (newVal, oldVal): void => {
  if (newVal && newVal !== oldVal) {
    emit('change', newVal)
  }
})

onMounted(() => {
  if (props.items) {
    const selectionArr = props.items.filter(item => item.selected)

    if (selectionArr.length) {
      selectedItem.value = selectionArr[0]
    }
  }
})
</script>

<style lang="scss" scoped>
/* Component styles */

.k-dropdown {
  width: fit-content;

  :deep(.k-popover.k-dropdown-popover) {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    margin-top: var(--kui-space-30, $kui-space-30);
    padding: var(--kui-space-0, $kui-space-0);

    ul {
      margin: 0;
      padding: var(--kui-space-20, $kui-space-20) 0;
    }
  }
}
</style>
