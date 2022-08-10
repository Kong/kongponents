<template>
  <div
    :style="widthStyle"
    class="k-select"
  >
    <KLabel
      v-if="label && !overlayLabel"
      :for="selectId"
      v-bind="labelAttributes"
      data-testid="k-select-label"
    >
      {{ label }}
    </KLabel>
    <div
      :id="selectId"
      data-testid="k-select-selected-item"
    >
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        :class="{ 'overlay-label-item-selection': overlayLabel }"
        class="k-select-item-selection px-3 py-1"
      >
        <div class="selected-item-label">{{ selectedItem.label }}</div>
        <button
          class="clear-selection-icon cursor-pointer non-visual-button"
          @click="clearSelection"
          @keyup.enter="clearSelection"
        >
          <KIcon
            color="var(--blue-200)"
            icon="clear"
          />
        </button>
      </div>
      <KToggle v-slot="{toggle, isToggled}">
        <KPop
          ref="popper"
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
            onPopoverOpen()
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
            role="listbox"
          >
            <KButton
              :style="widthStyle"
              :id="selectTextId"
              :is-open="isToggled"
              :is-rounded="false"
              v-bind="$attrs"
              appearance="btn-link"
              @keyup="triggerFocus(isToggled)"
            >
              {{ selectButtonText }}
            </KButton>
          </div>
          <div
            v-else
            :id="selectInputId"
            :class="{ 'k-select-input': appearance === 'select'}"
            data-testid="k-select-input"
            style="position: relative;"
            role="listbox"
          >
            <button
              v-if="isClearVisible"
              :class="{ 'overlay-label-chevron': overlayLabel }"
              class="clear-selection-icon cursor-pointer non-visual-button"
              @click="clearSelection"
              @keyup.enter="clearSelection"
            >
              <KIcon
                icon="close"
                color="var(--grey-500)"
                size="10"
              />
            </button>
            <KIcon
              v-if="appearance === 'select'"
              :class="{ 'overlay-label-chevron': overlayLabel }"
              :icon="isToggled ? 'chevronUp' : 'chevronDown'"
              color="var(--grey-500)"
              size="15"
            />
            <KInput
              :id="selectTextId"
              v-bind="$attrs"
              :value="filterStr"
              :label="label && overlayLabel ? label : null"
              :overlay-label="overlayLabel"
              :placeholder="selectedItem && appearance === 'select' ? selectedItem.label : placeholderText"
              :class="{
                'cursor-default prevent-pointer-events': !filterIsEnabled,
                'input-placeholder-dark has-chevron': appearance === 'select',
                'has-clear': isClearVisible
              }"
              class="k-select-input"
              @keypress="onInputKeypress"
              @keyup="!$attrs.disabled ? triggerFocus(isToggled) : null"
              @input="onQueryChange"
              @focus="onInputFocus"
            />
          </div>
          <template v-slot:content>
            <slot
              v-if="autosuggest && loading"
              name="loading"
            >
              <KIcon
                class="k-select-loading"
                data-testid="k-select-loading"
                icon="spinner"
              />
            </slot>
            <ul
              v-else
              class="k-select-list ma-0 pa-0"
            >
              <slot
                :items="selectItems"
                :is-open="isToggled"
                name="items"
              >
                <KSelectItem
                  v-for="item in filteredItems"
                  :key="item.key"
                  :item="item"
                  @selected="handleItemSelect"
                >
                  <template v-slot:content>
                    <slot
                      :item="item"
                      name="item-template"
                      class="select-item-label select-item-desc"
                    />
                  </template>
                </KSelectItem>
                <KSelectItem
                  v-if="!filteredItems.length && !$slots.empty"
                  key="k-select-empty-state"
                  :item="{ label: 'No results', value: 'no_results' }"
                  class="k-select-empty-item"
                />
              </slot>
            </ul>
            <slot
              v-if="!loading && !filteredItems.length"
              name="empty"
            />
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
    dropdownMaxHeight: {
      type: String,
      default: '300'
    },
    label: {
      type: String,
      default: ''
    },
    overlayLabel: {
      type: Boolean,
      default: false
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
     * Control whether the input for `select` and `dropdown` appearances supports filtering.
     */
    enableFiltering: {
      type: Boolean,
      default: null
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
    },
    /**
     * A flag for autosuggest mode
     */
    autosuggest: {
      type: Boolean,
      default: false
    },
    /**
     * Loading state in autosuggest
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * A flag for clearing selection when appearance is 'select'
     */
    clearable: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      inputWidth: 0,
      filterStr: '',
      selectedItem: null,
      selectId: !this.testMode ? uuid.v1() : 'test-select-id-1234',
      selectInputId: !this.testMode ? uuid.v1() : 'test-select-input-id-1234',
      selectTextId: !this.testMode ? uuid.v1() : 'test-select-text-id-1234',
      selectItems: [],
      initialFocusTriggered: false
    }
  },

  computed: {
    boundKPopAttributes () {
      const theClasses = `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses} k-select-pop-${this.appearance}`

      return {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        popoverClasses: theClasses,
        width: String(this.inputWidth),
        maxWidth: String(this.inputWidth),
        maxHeight: String(this.dropdownMaxHeight),
        // We have to check here if the property exists since it evals to an empty string
        disabled: (this.$attrs.disabled !== undefined && String(this.$attrs.disabled) !== 'false') || (this.$attrs.readonly !== undefined && String(this.$attrs.readonly) !== 'false')
      }
    },
    listeners () {
      return this.$listeners
    },
    widthValue: function () {
      let w = ''

      if (!this.width) {
        w = '200'
        if (this.appearance === 'button') {
          w = '230'
        }
      } else {
        w = this.width
      }

      if (w !== 'auto' && !w.endsWith('%') && !w.endsWith('px')) {
        w += 'px'
      }

      return w
    },
    widthStyle: function () {
      return {
        width: this.widthValue
      }
    },
    filterIsEnabled: function () {
      if (this.autosuggest) {
        return true
      }

      if (this.enableFiltering !== null) {
        // filtering not allowed for `button` appearance
        return this.appearance === 'button' ? false : this.enableFiltering
      }

      if (this.appearance === 'dropdown') {
        return true
      }

      return false
    },
    filteredItems: function () {
      // For autosuggest, items don't need to be filtered internally
      return this.autosuggest ? this.selectItems : this.filterFunc({ items: this.selectItems, query: this.filterStr })
    },
    placeholderText () {
      if (this.placeholder) {
        return this.placeholder
      } else if (this.$attrs.placeholder) {
        return this.$attrs.placeholder
      }

      if (this.appearance === 'button' || !this.filterIsEnabled) {
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
    },
    isClearVisible () {
      return this.appearance === 'select' && this.clearable && !!this.selectedItem
    }
  },
  watch: {
    items: {
      handler (newValue, oldValue) {
        // Only trigger the watcher if items actually change
        if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
          return
        }

        this.selectItems = JSON.parse(JSON.stringify(this.items))

        for (let i = 0; i < this.selectItems.length; i++) {
          // Ensure each item has a `selected` property
          if (!Object.hasOwn(this.selectItems[i], 'selected')) {
            this.selectItems[i].selected = false
          }

          this.selectItems[i].key = `${this.selectItems[i].label.replace(' ', '-').replace(/[^a-z0-9-_]/gi, '')}-${i}`
          if (this.selectItems[i].value === this.value || this.selectItems[i].selected) {
            this.selectItems[i].selected = true
            this.selectedItem = this.selectItems[i]
            this.selectItems[i].key += '-selected'

            if (this.appearance === 'select') {
              this.filterStr = this.selectedItem.label
            }
          }

          if (this.selectedItem && this.selectedItem.value === this.selectItems[i].value) {
            this.selectItems[i].selected = true
          }
        }

        // Trigger an update to the popper element to cause the popover to redraw
        // This prevents the popover from displaying "detached" from the KSelect
        if (this.$refs.popper && typeof this.$refs.popper.updatePopper === 'function') {
          this.$nextTick(() => {
            this.$refs.popper.updatePopper()
          })
        }
      },
      immediate: true
    },

    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        const theItems = this.selectItems.filter(item => item.value === newVal)

        if (theItems.length) {
          this.handleItemSelect(theItems[0])
        }
      }
    }
  },

  methods: {
    handleItemSelect (item) {
      this.selectItems.forEach(anItem => {
        if (anItem.key === item.key) {
          anItem.selected = true
          anItem.key = anItem.key.includes('-selected') ? anItem.key : `${anItem.key}-selected`
          this.selectedItem = anItem
        } else if (anItem.selected) {
          anItem.selected = false
          anItem.key = anItem.key.replace(/-selected/gi, '')
        } else {
          anItem.selected = false
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
        anItem.selected = false
        anItem.key = anItem.key.replace(/-selected/gi, '')
      })
      this.selectedItem = null
      if (this.appearance === 'select') {
        this.filterStr = ''
      }

      // this 'input' event must be emitted for v-model binding to work properly
      this.$emit('input', null)
      this.$emit('change', null)
    },
    triggerFocus (isToggled) {
      const inputElem = document.getElementById(this.selectTextId)

      if (!isToggled && inputElem) { // simulate click to trigger dropdown open
        inputElem.click()
      }
    },
    onInputKeypress (event) {
      // If filters are not enabled, ignore any keypresses
      if (!this.filterIsEnabled) {
        event.preventDefault()

        return false
      }
    },
    onQueryChange (val) {
      this.filterStr = val
      this.$emit('query-change', val)
    },
    onInputFocus () {
      if (!this.initialFocusTriggered) {
        this.initialFocusTriggered = true
        this.$emit('query-change', '')
      }
    },
    onPopoverOpen () {
      const inputElem = document.getElementById(this.selectInputId)
      if (inputElem) {
        this.inputWidth = inputElem.offsetWidth
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
    margin-bottom: 6px;

    &.overlay-label-item-selection {
      position: relative;
      top: 15px;
    }

    .selected-item-label {
      align-self: center;
      font-size: 14px;
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

  .k-select-button {
    .k-button.btn-link:hover {
      text-decoration: none;
    }
  }

  .k-select-input {
    position: relative;
    display: inline-block;
    width: 100%;

    &.cursor-default {
      cursor: pointer;

      input.k-input {
        cursor: default;
      }
    }

    &.prevent-pointer-events {
      input.k-input {
        pointer-events: none;
      }
    }

    .input-placeholder-dark input::placeholder {
      color: var(--KInputColor, var(--black-70, rgba(0, 0, 0, 0.7))) !important;
    }

    .has-chevron input.k-input {
      padding-right: 25px;
    }

    .has-clear input.k-input {
      padding-right: 50px;
    }

    input.k-input {
      padding: var(--spacing-xs);
      height: 44px;
    }

    .kong-icon {
      position: absolute;
      top: 12px;
      right: 6px;
      z-index: 9;

      &.overlay-label-chevron {
        top: 55%;
      }
    }

    .clear-selection-icon {
      position: absolute;
      top: 13px;
      right: 22px;
      z-index: 9;

      &.overlay-label-chevron {
        top: 55%;
      }

      .kong-icon-close {
        position: static;
      }
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
    margin-top: 2px !important;
    overflow: auto !important; // Allow setting a maxHeight on the popover dropdown

    &[x-placement^="top"] {
      margin-top: 0 !important;
      margin-bottom: 2px !important;
    }

    &.k-select-pop-button {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--grey-300);
    }

    &.k-select-pop-dropdown {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
      border: 1px solid var(--grey-300);
    }

    &.k-select-pop-select {
      --KPopPaddingY: var(--spacing-xs);
      --KPopPaddingX: var(--spacing-xs);
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

    .k-select-loading {
      display: block;
      text-align: center;
      position: relative;
      top: 0;
      right: 0;
      height: 24px;
    }
  }
}
</style>
