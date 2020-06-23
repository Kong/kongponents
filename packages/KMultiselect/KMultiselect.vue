<template>
  <KPop
    :width="width"
    :popover-timeout="0"
    :hide-popover="hidePopover"
    hide-caret
    placement="bottomStart"
    popover-classes="k-multiselect mt-0 mb-0"
    @opened="handleOpen"
    @closed="handleClose">
    <KButton
      v-bind="buttonAttributes"
      :appearance="buttonAttributes.appearance || 'secondary'"
      class="k-multiselect-trigger">
      {{ buttonText }}
    </KButton>
    <template
      v-if="!hidePopover"
      #content>
      <div class="k-multiselect-dropdown">
        <div
          v-if="title"
          class="k-multiselect-title">
          {{ title }}
        </div>
        <div
          v-if="hasFilter"
          class="k-multiselect-filter">
          <input
            ref="filterInput"
            v-model="filter"
            type="search"
            class="k-input w-100"
            placeholder="Filter..." >
        </div>
        <div class="k-multiselect-list">
          <ul
            class="k-multiselect-menu"
            role="listbox"
            aria-labelledby="dropdown">
            <li
              v-for="item in filteredItems"
              :key="item.label"
              :class="{ 'is-selected': item.selected, 'is-disabled': item.disabled }"
              :disabled="item.disabled"
              class="k-multiselect-item"
              role="option"
              @click="handleClick(item)">
              {{ item.label }}
            </li>
          </ul>
          <div class="k-multiselect-footer">
            <KButton
              :disabled="applyDisabled"
              size="small"
              appearance="secondary"
              class="k-multiselect-apply"
              @click="handleApply">{{ applyText }}</KButton>
          </div>
        </div>
      </div>
    </template>
  </KPop>
</template>

<script>
import KPop from '@kongponents/kpop/KPop'
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'KMultiselect',
  components: { KButton, KPop },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    buttonText: {
      type: String,
      default: ''
    },
    applyText: {
      type: String,
      default: 'Apply'
    },
    buttonAttributes: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    hasFilter: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => [],
      // Items must have a label and a selected property
      validator: (items) => items
        .some(i => i.hasOwnProperty('label') && i.hasOwnProperty('selected'))
    }
  },

  data () {
    return {
      filter: '',
      hidePopover: false,
      internalItems: this.copyItems(this.items)
    }
  },

  computed: {
    filteredItems () {
      const filter = this.filter

      return this.internalItems.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()))
    },

    applyDisabled () {
      const internalItems = this.internalItems
      const items = this.items

      for (var i = 0; i < internalItems.length; ++i) {
        if (internalItems[i].selected !== items.find(item => item.label === internalItems[i].label).selected) {
          return false
        }
      }

      return true
    }
  },

  methods: {
    handleClick (item) {
      item.selected = !item.selected
    },

    handleApply () {
      this.hidePopover = true
      this.$emit('changes', this.copyItems(this.internalItems))
    },

    async handleOpen () {
      if (!this.hasFilter) return

      // Wait for popper to open & position itself
      await this.$nextTick()
      await this.$nextTick()
      this.$refs.filterInput.focus()
    },

    async handleClose () {
      await this.$nextTick()
      this.hidePopover = false
    },

    copyItems (items) {
      return items.map(obj => ({...obj}))
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';

.k-multiselect {
  &-trigger {
    position: relative;
    display: inline-block;
    &:after {
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
    &:disabled { pointer-events: none; }
  }
  &-filter .k-input {
    --KInputBackground: var(--grey-98, color(grey-98));
    --KInputBorder: var(--grey-88, color(grey-88));

    border-radius: 0;
    border-left: 0;
    border-right: 0;
    margin-bottom: var(--spacing-sm, spacing(sm));
    &:focus {
      border-color: var(--KInputBorder);
      border-width: 1px 0 1px 0;
    }
  }
  &-dropdown {
    padding: 1rem 0;
  }
  &-title {
    padding: 0 2rem;
    margin-bottom: var(--spacing-sm);
    color: var(--KMultiselectTitleColor, var(--black-45, color(black-45)));
    font-size: var(--KMultiselectTitleSize, var(--type-xs, type(xs)));
  }
  &-menu {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &-item {
    position: relative;
    padding: var(--KMultiselectItemPaddingY, 0) var(--KMultiselectItemPaddingX, var(--spacing-xl, spacing(xl)));
    white-space: nowrap;
    color: var(--KMultiselectItemColor, var(--black-70, color(black-70)));
    font-size: 1rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover { background-color: var(--KMultiselectItemHover, var(--blue-100, color(blue-100)));}
    &.is-selected {
      color: var(--KMultiselectItemActiveColor, var(--blue-700, color(blue-700)));
      &:before {
        position: absolute;
        top: 10px;
        display: block;
        width: 12px;
        height: 12px;
        margin-left: -1.25rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='13'%3E%3Cpath fill='%2366BFFF' fill-rule='evenodd' d='M4.5 10L13.7968194.7031806c.3883559-.3883559 1.021292-.3850692 1.4092576.0028964l.087846.087846c.3899555.3899555.3864986 1.0256554.0040118 1.4081422L5.2020652 12.2979348c-.3877399.3877399-1.0256941.3784363-1.4051902-.0010598l-3.09375-3.09375C.3147998 8.8147998.3181114 8.1818886.706077 7.793923l.087846-.087846c.3899555-.3899555 1.0271296-.3850244 1.4170351.0048811L4.5 10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100%;
        content: '';
      }
    }
    &.is-disabled {
      color: var(--KMultiselectDisabledColor, var(--black-45, color(black-45)));
      pointer-events: none;
    }
  }
  &-footer { margin: var(--spacing-sm, spacing(sm)) var(--spacing-xl, spacing(xl)) 0; }
}
</style>

<style>
.k-multiselect {
  --KPopPaddingY: 0;
  --KPopPaddingX: 0;
}
.k-dropdown .k-multiselect:focus,
.k-dropdown .k-multiselect:active {
  outline: 0;
}
</style>
