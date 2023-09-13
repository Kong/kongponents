<template>
  <div
    class="k-dropdown k-dropdown-menu"
    :class="{ 'selection-dropdown-menu': appearance === 'selectionMenu' }"
  >
    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        v-bind="boundKPopAttributes"
        data-testid="k-dropdown-menu-popover"
        :hide-popover="hidePopover"
        :on-popover-click="() => handleTriggerToggle(isToggled, toggle, false)"
        :test-mode="!!testMode || undefined"
        @closed="() => handleTriggerToggle(isToggled, toggle, false)"
        @opened="() => handleTriggerToggle(isToggled, toggle, true)"
      >
        <component
          :is="tooltipComponent"
          class="k-dropdown-trigger dropdown-trigger"
          data-testid="k-dropdown-trigger"
          :label="disabledTooltip"
          :max-width="!!disabledTooltip ? '240' : undefined"
          :position="!!disabledTooltip ? 'bottom' : undefined"
          :position-fixed="!!disabledTooltip ? true : undefined"
          :test-mode="!!testMode || undefined"
        >
          <slot
            :is-open="isToggled.value"
            name="default"
          >
            <!-- Must wrap in div to allow tooltip when disabled -->
            <div>
              <KButton
                v-if="label || icon"
                :appearance="appearance === 'selectionMenu' ? 'outline' : buttonAppearance"
                :caret-color="caretColor"
                class="k-dropdown-btn"
                data-testid="k-dropdown-btn"
                :disabled="disabled"
                :icon="icon"
                :show-caret="showCaret || appearance === 'selectionMenu'"
              >
                {{ label }}
              </KButton>
            </div>
          </slot>
        </component>
        <template #content>
          <ul
            class="k-dropdown-list dropdown-list"
            data-testid="k-dropdown-list"
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
                :selection-menu-child="appearance === 'selectionMenu'"
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
import type { Appearance, ButtonAppearance, DropdownItem, PopPlacements } from '@/types'
import { AppearanceArray } from '@/types'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KDropdownItem from './KDropdownItem.vue'

const props = defineProps({
  appearance: {
    type: String as PropType<Appearance>,
    default: 'menu',
    validator: (value: Appearance) => AppearanceArray.includes(value),
  },
  buttonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  caretColor: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
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
  // kpopAttributes is used to pass properties directly to the wrapped KPop component.
  // Commonly-overridden properties include:
  // - placement
  // - popoverClasses
  // - target
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
   * Test mode - for testing only, strips out generated ids
   */
  testMode: {
    type: Boolean,
    default: false,
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

const selectedItem = ref<DropdownItem>()

const handleSelection = (item: DropdownItem): void => {
  if (props.appearance !== 'selectionMenu') {
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
.k-dropdown-menu {
  width: fit-content;
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';

.k-popover.k-dropdown-popover {
  border: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-black-10;
  margin-top: var(--kui-space-20, $kui-space-20) !important;
  padding: var(--kui-space-50, $kui-space-50) var(--kui-space-0, $kui-space-0);

  ul {
    margin: var(--kui-space-0, $kui-space-0);
    padding: var(--kui-space-0, $kui-space-0);
  }

  a {
    color: var(--kui-color-text, $kui-color-text);
    flex: 1;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
}

.selection-dropdown-menu {
  .dropdown-trigger .k-button {
    border: var(--kui-border-width-0, $kui-border-width-0);
    color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
    white-space: nowrap;

    &:focus {
      box-shadow: none;
    }

    &:active:disabled {
      background-color: var(--kui-color-background, $kui-color-background);
    }

    &.is-active {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
    }
  }

  .k-popover.k-dropdown-popover {
    z-index: 10000 !important;

    li {
      .non-visual-button {
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular) !important;
      }

      &.k-dropdown-selected-option {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);

        .non-visual-button {
          font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium) !important;
        }
      }
    }
  }
}
</style>
