<template>
  <KToggle v-slot="{toggle, isToggled}">
    <KPop
      v-bind="boundKPopAttributes"
      :on-popover-click="() => {
        toggle()
        return isToggled
      }"
      placement="bottomStart"
      class="k-select"
      @opened="toggle"
      @closed="toggle"
    >
      <slot :is-open="isToggled">
        <KInput
          v-bind="attrs"
          v-model="filterStr"
          :style="inputStyle"
          class="k-select-input"
          v-on="listeners" />
      </slot>
      <template v-slot:content>
        <ul class="k-select-list ma-0 pa-0">
          <slot
            :items="items"
            :is-open="isToggled"
            name="items"
          >
            <SelectItem
              v-for="item in items"
              :key="item.key"
              :item="item"
              @selected="handleItemSelect"
            />
          </slot>
        </ul>
      </template>
    </KPop>
  </KToggle>
</template>

<script lang="ts">
import SelectItem from './SelectItem.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-select-popover mt-0',
  popoverTimeout: 0,
  placement: 'bottomLeft'
}

export default {
  name: 'KSelect',
  components: { SelectItem },
  props: {
    kpopAttributes: {
      type: Object,
      default: () => ({})
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
      default: 'select',
      validator: function (value) {
        return ['dropdown', 'select'].indexOf(value) !== -1
      }
    },
    /**
     * Items are JSON objects with required 'label' and optional 'to' property
     * plugged into a <router-link> for navigation
     * {
     *  label: Item 1,
     *  to: '/home'
     * }
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      // Items must have a label
      validator: (items) => !items.length || items.some(i => i.hasOwnProperty('label'))
    }
  },

  data: function () {
    return {
      filterStr: '',
      selectedItem: { label: '' }
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
        width: parseInt(this.width) - paddingOffset + '' // popover and input same width
      }
    },
    attrs () {
      return this.$attrs
    },
    listeners () {
      return this.$listeners
    },
    inputStyle: function () {
      return {
        width: this.width === 'auto' ? this.width : this.width + 'px'
      }
    }
  },
  beforeMount () {
    // items need keys
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].key = `${this.items[i].label.replace(' ', '-')}-${i}`
      if (this.items[i].selected) {
        this.selectedItem = this.items[i]
        this.items[i].key += '-selected'
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
          this.filterStr = this.selectedItem.label
        } else {
          delete anItem.selected
          anItem.key = anItem.key.split('-selected')[0]
        }
      })
    }
  }
}
</script>

<style lang="scss">
.k-select {
  width: fit-content; // necessary for correct placement of popup

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

    &.k-select-popover {
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
