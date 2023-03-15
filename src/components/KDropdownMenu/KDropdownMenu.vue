<template>
  <div
    class="k-dropdown k-dropdown-menu"
    :class="{ 'selection-dropdown-menu': appearance === 'selectionMenu' }"
  >
    <KToggle v-slot="{ toggle, isToggled }">
      <KPop
        v-bind="boundKPopAttributes"
        data-testid="k-dropdown-menu-popover"
        :on-popover-click="() => handleTriggerToggle(isToggled, toggle, false)"
        :test-mode="!!testMode || undefined"
        @closed="() => handleTriggerToggle(isToggled, toggle, false)"
        @opened="() => handleTriggerToggle(isToggled, toggle, true)"
      >
        <component
          :is="!!disabledTooltip ? 'Kooltip' : 'div'"
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

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted, Ref } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import Kooltip from '@/components/KTooltip/KTooltip.vue'
import KPop from '@/components/KPop/KPop.vue'
import KToggle from '@/components/KToggle'
import KDropdownItem from './KDropdownItem.vue'
import type { ButtonAppearance, DropdownItem, Appearance, AppearanceRecord, IconNames } from '@/types'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-dropdown-popover mt-1',
  popoverTimeout: 0,
  positionFixed: true,
  placement: 'bottomStart',
}

const appearanceRecord: AppearanceRecord = {
  menu: 'menu',
  selectionMenu: 'selectionMenu',
}

export default defineComponent({
  name: 'KDropdownMenu',
  components: {
    KButton,
    KDropdownItem,
    Kooltip,
    KPop,
    KToggle,
  },
  props: {
    appearance: {
      type: String as PropType<Appearance>,
      default: 'menu',
      validator: (value: Appearance) => Object.values(appearanceRecord).includes(value),
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
      type: String as PropType<IconNames>,
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
  },
  emits: ['toggleDropdown', 'change'],
  setup(props, { emit }) {
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

    const handleTriggerToggle = (isToggled: Ref<boolean>, toggle: () => void, isOpen: boolean): boolean => {
      // avoid toggling twice for the same event
      if (isToggled.value !== isOpen) {
        toggle()
        emit('toggleDropdown', isToggled.value)
      }

      return isToggled.value
    }

    watch(selectedItem, (newVal, oldVal): void => {
      if (newVal !== oldVal) {
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

    return {
      boundKPopAttributes,
      selectedItem,
      handleSelection,
      handleTriggerToggle,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-dropdown-menu {
  width: fit-content;
  .drodpown-trigger:after {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid;
    content: "";
    display: inline-block;
    height: 0;
    margin-left: var(--spacing-xs, spacing(xs));
    vertical-align: middle;
    width: 0;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-popover.k-dropdown-popover {
  --KPopPaddingY: var(--spacing-sm);
  --KPopPaddingX: 0;
  border: 1px solid var(--black-10);

  ul {
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--black-70);
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
    border: 0;
    color: var(--grey-600);
    white-space: nowrap;

    &:focus {
      box-shadow: none;
    }

    &:active:disabled {
      background-color: var(--white);
    }

    &.is-active {
      background-color: var(--grey-100);
    }

    // Set dropdown icon color
    --KButtonOutlineColor: var(--grey-500);
  }

  .k-popover.k-dropdown-popover {
    z-index: 10000 !important;

    li {
      .non-visual-button {
        font-weight: 400 !important;
      }

      &.k-dropdown-selected-option {
        background-color: var(--blue-100);

        .non-visual-button {
          font-weight: 500 !important;
        }
      }
    }
  }
}
</style>
