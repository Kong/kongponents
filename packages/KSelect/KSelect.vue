<template>
  <div class="k-select">
    <KLabel
      v-if="label"
      :for="selectId">{{ label }}</KLabel>
    <div :id="selectId">
      <div
        v-if="selectedItem && appearance === 'dropdown'"
        :style="selectionStyle"
        class="k-select-item-selection px-3 py-1">
        <div
          :value="selectedItem.value"
          class="selected-item-label">{{ selectedItem.label }}</div>
        <button
          class="clear-selection-icon"
          @click="clearSelection()">
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
          :target="`#${selectInputId}`"
          placement="bottomStart"
          @opened="() => {
            filterStr = ''
            toggle()
          }"
          @closed="() => {
            if (selectedItem && appearance === 'select') {
              filterStr = selectedItem.label
            }
            toggle()
          }"
        >
          <div
            :id="selectInputId"
            :class="{ 'k-select-input': appearance === 'select'}">
            <KIcon
              v-if="appearance === 'select'"
              icon="chevronDown"
              color="var(--grey-500)"
              size="15" />
            <KInput
              :is-open="isToggled"
              v-bind="attrs"
              v-model="filterStr"
              :style="inputStyle"
              class="k-select-input"
              @keyup.enter="() => {
                toggle()
                return isToggled
            }" />
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
                  @selected="handleItemSelect"
                />
              </slot>
            </ul>
          </template>
        </KPop>
      </KToggle>
    </div>
  </div>
</template>

<script lang="ts">
import { uuid } from 'vue-uuid'
import KSelectItem from './KSelectItem.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-select-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomLeft'
}

export default {
  name: 'KSelect',
  components: { KSelectItem },
  props: {
    kpopAttributes: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    /**
     * The width of the select and popover's min-width
     */
    width: {
      type: String,
      default: '170'
    },
    /**
     * The display style, can be either dropdown or select
     */
    appearance: {
      type: String,
      default: 'dropdown',
      validator: function (value) {
        return ['dropdown', 'select'].indexOf(value) !== -1
      }
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
      selectInputId: !this.testMode ? uuid.v1() : 'test-select-input-id-1234'
    }
  },

  computed: {
    boundKPopAttributes: function () {
      const paddingOffset = 10 // 4px (left padding) + 4px (right padding) + 1px (left border) + 1px (right border)

      return {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses} k-select-pop-${this.appearance}`,
        placement: this.placement,
        width: parseInt(this.width) - paddingOffset + '', // popover and input same width
        disabled: this.$attrs.disabled
      }
    },
    attrs () {
      return this.$attrs
    },
    inputStyle: function () {
      return {
        width: this.width === 'auto' ? this.width : this.width + 'px'
      }
    },
    selectionStyle: function () {
      const paddingOffset = 24 // 12px (left padding) + 12px (right padding)

      return {
        width: this.width === 'auto' ? this.width : (this.width - paddingOffset) + 'px'
      }
    },
    filteredItems: function () {
      return this.items.filter(item => item.label.toLowerCase().includes(this.filterStr.toLowerCase()))
    }
  },
  beforeMount () {
    // items need keys
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].key = `${this.items[i].label.replace(' ', '-')}-${i}`
      if (this.items[i].selected) {
        this.selectedItem = this.items[i]
        this.items[i].key += '-selected'

        if (this.appearance === 'select') {
          this.filterStr = this.selectedItem.label
        }
      }
    }
  },
  methods: {
    handleItemSelect (item) {
      this.items.forEach(anItem => {
        if (anItem.key === item.key) {
          anItem.selected = true
          anItem.key += '-selected'
          this.selectedItem = anItem
        } else {
          delete anItem.selected
          anItem.key = anItem.key.split('-selected')[0]
        }
      })
      this.filterStr = this.appearance === 'dropdown' ? '' : item.label
    },
    clearSelection () {
      this.items.forEach(anItem => {
        delete anItem.selected
        anItem.key = anItem.key.split('-selected')[0]
      })
      this.selectedItem = null
    }
  }
}
</script>

<style lang="scss">
.k-select {
  width: fit-content; // necessary for correct placement of popup

  .k-select-item-selection {
    background-color: var(--blue-100);
    color: var(--blue-500);
    font-weight: 400;
    display: flex;

    .selected-item-label {
      align-self: center;
    }

    .clear-selection-icon {
      display: contents;

      svg {
        margin-left: auto;
      }
    }
  }

  .k-select-input {
    position: relative;
    display: inline-block;

    input.k-input {
      padding: var(--spacing-xs);
    }

    svg {
      position: absolute;
      top: 15px;
      right: 6px;
      z-index: 9;
    }
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
