<template>
  <div
    :style="widthStyle"
    class="k-select"
  >
    <KLabel
      v-if="label"
      :for="selectId"
      v-bind="labelAttributes"
      data-testid="k-select-label">{{ label }}</KLabel>
    <div
      :id="selectId"
      data-testid="k-select-selected-item">
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        class="k-select-item-selection px-3 py-1">
        <div
          class="selected-item-label">{{ selectedItem.label }}</div>
        <button
          class="clear-selection-icon cursor-pointer non-visual-button"
          @click="clearSelection"
          @keyup.enter="clearSelection">
          <KIcon
            color="var(--blue-200)"
            icon="clear"
          />
        </button>
      </div>
      <KToggle v-slot="{toggle, isToggled}">
        <KPop
          v-bind="boundKPopAttributes"
          :on-popover-click="() => {
            toggle()
            return isToggled
          }"
          :position-fixed="positionFixed"
          :test-mode="testMode"
          :target="`[id='${selectInputId}']`"
          @opened="() => {
            filterStr = ''
            toggle()
          }"
          @closed="() => {
            if (selectedItem && appearance === 'select') {
              filterStr = selectedItem.label
            }
            if (isToggled) {
              toggle()
            }
          }"
        >
          <div
            v-if="appearance === 'button'"
            :id="selectInputId"
            class="k-select-button"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox">
            <KButton
              :style="widthStyle"
              :id="selectTextId"
              :is-open="isToggled"
              :is-rounded="false"
              v-bind="$attrs"
              appearance="btn-link"
              @keyup="triggerFocus(isToggled)">{{ selectButtonText }}</KButton>
          </div>
          <div
            v-else
            :id="selectInputId"
            :class="{ 'k-select-input': appearance === 'select'}"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox">
            <KIcon
              v-if="appearance === 'select'"
              icon="chevronDown"
              color="var(--grey-500)"
              size="15" />
            <KInput
              :is-open="isToggled"
              :id="selectTextId"
              v-bind="$attrs"
              v-model="filterStr"
              :placeholder="placeholderText"
              class="k-select-input"
              @keyup="triggerFocus(isToggled)" />
          </div>
          <template v-slot:content>
            <ul class="k-select-list ma-0 pa-0">
              <slot
                :items="items"
                :is-open="isToggled"
                name="items"
              >
                <KSelectItem
                  v-for="item in filteredItems"
                  :key="item.key"
                  :item="item"
                  @selected="handleItemSelect">
                  <template v-slot:content>
                    <slot
                      :item="item"
                      name="item-template"
                    />
                  </template>
                </KSelectItem>
                <KSelectItem
                  v-if="!filteredItems.length"
                  key="k-select-empty-state"
                  :item="{ label: 'No results', value: 'no_results' }"
                  class="k-select-empty-item"/>
              </slot>
            </ul>
          </template>
        </KPop>
      </KToggle>
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
import KInput from '@kongponents/kinput/KInput.vue'
import KLabel from '@kongponents/klabel/KLabel.vue'
import KPop from '@kongponents/kpop/KPop.vue'
import KToggle from '@kongponents/ktoggle/KToggle'
import KSelectItem from './KSelectItem.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-select-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomStart'
}

export default {
  name: 'KSelect',
  components: { KButton, KIcon, KInput, KLabel, KPop, KSelectItem, KToggle },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    kpopAttributes: {
      type: Object,
      default: () => ({
        popoverClasses: ''
      })
    },
    label: {
      type: String,
      default: ''
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    /**
     * The width of the select and popover's min-width
     */
    width: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * The display style, can be either dropdown, select, or button
     */
    appearance: {
      type: String,
      default: 'dropdown',
      validator: function (value) {
        return ['dropdown', 'select', 'button'].indexOf(value) !== -1
      }
    },
    /**
     * Override the text displayed on the button if `appearance` is `button` after an item
     * has been selected. By default display the selected item's label
     */
    buttonText: {
      type: String,
      default: ''
    },
    /**
     * Items are JSON objects with required 'label' and 'value'
     * {
     *  label: 'Item 1',
     *  value: 'item1'
     * }
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      // Items must have a label & value
      validator: (items) => !items.length || items.some(i => i.hasOwnProperty('label') && i.hasOwnProperty('value'))
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: false
    },
    /**
     * Override default filter functionality of case-insensitive search on label
     */
    filterFunc: {
      type: Function,
      default: ({ items, query }) => items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      filterStr: '',
      selectedItem: null,
      selectId: !this.testMode ? uuid.v1() : 'test-select-id-1234',
      selectInputId: !this.testMode ? uuid.v1() : 'test-select-input-id-1234',
      selectTextId: !this.testMode ? uuid.v1() : 'test-select-text-id-1234',
      selectItems: []
    }
  },

  computed: {
    boundKPopAttributes: function () {
      return {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses} k-select-pop-${this.appearance}`,
        width: this.width,
        disabled: this.$attrs.disabled
      }
    },
    listeners () {
      return this.$listeners
    },
    widthValue: function () {
      let w

      if (!this.width) {
        w = 200
        if (this.appearance === 'button') {
          w = 230
        }
      } else {
        w = this.width
      }

      return w === 'auto' ? w : w + 'px'
    },
    widthStyle: function () {
      return {
        width: this.widthValue
      }
    },
    filteredItems: function () {
      return this.filterFunc({ items: this.selectItems, query: this.filterStr })
    },
    placeholderText () {
      if (this.placeholder) {
        return this.placeholder
      } else if (this.$attrs.placeholder) {
        return this.$attrs.placeholder
      }

      if (this.appearance === 'button') {
        return 'Select an item'
      }

      return 'Filter...'
    },
    selectButtonText () {
      if (this.buttonText && this.selectedItem) {
        return this.buttonText
      } else if (this.selectedItem) {
        return this.selectedItem.label
      }

      return this.placeholderText
    }
  },
  beforeMount () {
    // items need keys
    this.selectItems = this.items

    for (let i = 0; i < this.selectItems.length; i++) {
      this.selectItems[i].key = `${this.selectItems[i].label.replace(' ', '-')}-${i}`
      if (this.selectItems[i].value === this.value || this.selectItems[i].selected) {
        this.selectItems[i].selected = true
        this.selectedItem = this.selectItems[i]
        this.selectItems[i].key += '-selected'

        if (this.appearance === 'select') {
          this.filterStr = this.selectedItem.label
        }
      }
    }
  },
  methods: {
    handleItemSelect (item) {
      this.selectItems.forEach(anItem => {
        if (anItem.key === item.key) {
          anItem.selected = true
          anItem.key += '-selected'
          this.selectedItem = anItem
        } else if (anItem.selected) {
          delete anItem.selected
          anItem.key = anItem.key.split('-selected')[0]
        }
      })
      this.filterStr = this.appearance === 'dropdown' ? '' : item.label
      this.$emit('selected', item)
      // this 'input' event must be emitted for v-model binding to work properly
      this.$emit('input', item.value)
      this.$emit('change', item)
    },
    clearSelection () {
      this.selectItems.forEach(anItem => {
        delete anItem.selected
        anItem.key = anItem.key.split('-selected')[0]
      })
      this.selectedItem = null
      // this 'input' event must be emitted for v-model binding to work properly
      this.$emit('input', null)
      this.$emit('change', null)
    },
    triggerFocus (isToggled) {
      const inputElem = document.getElementById(this.selectTextId)

      if (!isToggled && inputElem) { // simulate click to trigger dropdown open
        inputElem.click()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@kongponents/styles/variables';

.k-select {
  width: fit-content; // necessary for correct placement of popup

  .k-select-item-selection {
    background-color: var(--blue-100);
    color: var(--blue-500);
    font-weight: 400;
    display: flex;
    border-radius: 4px;
    margin-bottom: 6px;

    .selected-item-label {
      align-self: center;
      font-size: var(--type-xs);
      line-height: 16px;
    }

    .clear-selection-icon {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      padding: 0;
      height: 24px;

      .kong-icon {
        margin-left: auto;
      }
    }
  }

  .k-select-input {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;

    input.k-input {
      padding: var(--spacing-xs);
      height: 100%;
      border-radius: 4px 4px 0 0;
    }

    .kong-icon {
      position: absolute;
      top: 15px;
      right: 6px;
      z-index: 9;
    }

    .kong-icon-chevronDown {
      top: 10px;
    }
  }

  .k-select-button .has-caret .kong-icon {
    margin-left: auto;
  }

  .k-input {      // need this so input takes the
    width: 100%;  // k-input-wrapper's width which uses this.width prop
  }

  .k-select-trigger:after {
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

  .k-select-popover {
    box-sizing: border-box;
    width: 100%;
    border-radius: 0 0 4px 4px;

    &.k-select-pop-button {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border-radius: 4px;
      border: 1px solid var(--blue-200);
    }

    &.k-select-pop-dropdown {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border: 1px solid var(--blue-200);
    }

    &.k-select-pop-select {
      --KPopPaddingY: var(--spacing-md);
      --KPopPaddingX: var(--spacing-xxs);
      border: 1px solid var(--black-10);
    }

    .k-select-empty-item button,
    .k-select-empty-item button:focus,
    .k-select-empty-item button:hover {
      font-style: italic;
      color: var(--grey-400);
    }

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
}
</style>
