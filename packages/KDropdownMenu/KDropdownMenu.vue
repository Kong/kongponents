<template>
  <div
    :class="{'selection-dropdown-menu': appearance === 'selectionMenu'}"
    class="k-dropdown k-dropdown-menu"
  >
    <KToggle v-slot="{toggle, isToggled}">
      <KPop
        v-bind="boundKPopAttributes"
        :on-popover-click="() => {
          toggle();
          return isToggled
        }"
        @opened="() => {
          toggle()
          $emit('toggleDropdown', true)
        }"
        @closed="() => {
          toggle()
          $emit('toggleDropdown', false)
        }"
      >
        <div class="d-flex">
          <component
            :is="!!disabledTooltip ? 'Kooltip' : 'div'"
            :label="disabledTooltip"
            :position="!!disabledTooltip ? 'bottom' : undefined"
            :position-fixed="!!disabledTooltip ? true : undefined"
            :max-width="!!disabledTooltip ? '240' : undefined"
            class="k-dropdown-trigger dropdown-trigger"
          >
            <slot
              :is-open="isToggled"
              name="default"
            >
              <!-- Must wrap in div to allow tooltip when disabled -->
              <div>
                <KButton
                  v-if="label"
                  :disabled="disabled"
                  :is-open="showCaret || appearance === 'selectionMenu' ? isToggled : undefined"
                  :class="{ 'is-active': showCaret ? isToggled : undefined }"
                  :appearance="appearance === 'selectionMenu' ? 'outline' : 'primary'"
                  class="k-dropdown-btn"
                >
                  {{ label }}
                </KButton>
              </div>
            </slot>
          </component>
        </div>
        <template #content>
          <ul class="k-dropdown-list dropdown-list">
            <slot
              :items="items"
              :is-open="isToggled"
              :handle-selection="handleSelection"
              name="items"
            >
              <KDropdownItem
                v-for="(item, idx) in items"
                v-bind="item"
                :key="`${item.label}-${idx}`"
                :item="item"
                :selection-menu-child="appearance === 'selectionMenu'"
                @change="(selection) => handleSelection(selection)"
              />
            </slot>
          </ul>
        </template>
      </KPop>
    </KToggle>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import Kooltip from '@kongponents/kooltip/KoolTip.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KToggle from '@kongponents/ktoggle/KToggle'
import KDropdownItem from './KDropdownItem.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-dropdown-popover mt-1',
  popoverTimeout: 0,
  positionFixed: true,
  placement: 'bottomStart'
}

export default {
  name: 'KDropdownMenu',
  components: {
    KButton,
    KDropdownItem,
    Kooltip,
    KPop,
    KToggle
  },
  props: {
    appearance: {
      type: String,
      default: 'menu',
      validator: (value) => {
        return [
          'menu',
          'selectionMenu'
        ].includes(value)
      }
    },
    label: {
      type: String,
      default: ''
    },
    showCaret: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    // kpopAttributes is used to pass properties directly to the wrapped KPop component.
    // Commonly-overridden properties include:
    // - width
    // - placement
    // - popoverClasses
    // - target
    kpopAttributes: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledTooltip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      boundKPopAttributes: {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        width: this.width ? this.width : undefined,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses}`
      },
      selectedItem: {}
    }
  },
  watch: {
    selectedItem (newVal, oldVal) {
      if (newVal.value !== oldVal.value) {
        this.$emit('change', newVal)
      }
    }
  },
  methods: {
    handleSelection (item) {
      if (this.appearance !== 'selectionMenu') {
        return
      }

      this.selectedItem = item
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-dropdown-menu {
  width: fit-content;

  .drodpown-trigger:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: var(--spacing-xs, spacing(xs));
    vertical-align: middle;
    content: "";
    border-top: 0.325em solid;
    border-right: 0.325em solid transparent;
    border-left: 0.325em solid transparent;
  }

  .k-dropdown-list.dropdown-list {
    min-width: 148px;
  }
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

.k-popover.k-dropdown-popover {
  --KPopPaddingY: var(--spacing-sm);
  --KPopPaddingX: 0;
  border: 1px solid var(--black-10);

  ul {
    margin: 0;
    padding: 0;
  }

  a {
    flex: 1;
    color: var(--black-70);

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
    width: auto;
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
