<template>
  <div
    :class="{'is-open': isOpen }"
    class="k-dropdown">
    <!-- Overlay to click away -->
    <div
      v-if="isOpen"
      class="overlay"
      @click="isOpen = !isOpen"/>
    <KButton
      :appearance="buttonAppearance"
      :disabled="disabled"
      aria-haspopup="true"
      class="k-dropdown-toggle"
      @click="() => isOpen = !isOpen">
      <span>{{ toggleText }}</span>
    </KButton>
    <ul
      :class="`k-dropdown-menu-${position}`"
      class="k-dropdown-menu"
      role="listbox"
      aria-labelledby="dropdown">
      <li
        v-for="item in items"
        :key="getItem(item)"
        :id="getItem(item)"
        :class="{ 'is-selected': item.selected }"
        class="k-dropdown-item"
        role="option"
        @click="clickHandler(item)">
        <slot
          :name="item"
          :item="item">{{ getItem(item) }}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { default as KButton, appearances } from '@kongponents/kbutton/KButton.vue'

export const alignments = {
  left: 'left',
  center: 'center',
  right: 'right'
}

export default {
  name: 'KDropdown',
  components: { KButton },

  props: {
    /**
     * Align dropdown menu to left, center or right
     */
    position: {
      type: String,
      default: 'left',
      validator: (value) => Object.values(alignments).includes(value)
    },
    /**
     * Button text
     */
    toggleText: {
      type: String,
      default: ''
    },
    /**
     * Style as button or text link
     */
    buttonAppearance: {
      type: String,
      default: 'secondary',
      validator: (value) => Object.values(appearances).includes(value)
    },
    /**
     * Array of items to render in menu. Can pass array of Strings or Objects
     * String: ['item', 'item', 'item]
     * Object: [ { name: 'item', selected: false }, { name: 'item'} ]
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Disable dropdown toggle button
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    getItem (item) {
      return (item && item.name) || item
    },

    clickHandler (item) {
      // Only run if item has selected key
      if (Object.keys(item).includes('selected')) {
        const itemIndex = this.items.findIndex(i => i.name === item.name)

        item.selected = !item.selected
        this.$emit('selected', item, itemIndex)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.k-dropdown {
  position: relative;
  display: inline-block;
  .k-dropdown-toggle:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: var(--spacing-xs);
    vertical-align: middle;
    content: "";
    border-top: 0.325em solid;
    border-right: 0.325em solid transparent;
    border-left: 0.325em solid transparent;
  }
  &.is-open .k-dropdown-toggle:after {
    transform: rotate(180deg);
  }
}

/* Dropdown menu */
.k-dropdown.is-open .k-dropdown-menu {
  display: block;
}
.k-dropdown .k-dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  left: auto;
  min-width: 100px;
  max-width: 300px;
  width: auto;
  margin: 0;
  padding: var(--spacing-xs) 0;
  list-style: none;
  border-radius: 3px;
  background: #fff;
  border: 1px solid var(--grey-88);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}
/* Dropdown menu alignment */
.k-dropdown .k-dropdown-menu-left {
  left: 0;
  right: auto;
}
.k-dropdown .k-dropdown-menu-right {
  left: auto;
  right: 0;
}
.k-dropdown .k-dropdown-menu-center {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}

/* Menu items */
.k-dropdown .k-dropdown-menu .k-dropdown-item {
  display: block;
  padding: 0 var(--spacing-md);
  white-space: nowrap;
  color: var(--tblack-70);
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 200ms ease-in;
}
.k-dropdown .k-dropdown-menu .k-dropdown-item.is-selected {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='13'%3E%3Cpath fill='%2366BFFF' fill-rule='evenodd' d='M4.5 10L13.7968194.7031806c.3883559-.3883559 1.021292-.3850692 1.4092576.0028964l.087846.087846c.3899555.3899555.3864986 1.0256554.0040118 1.4081422L5.2020652 12.2979348c-.3877399.3877399-1.0256941.3784363-1.4051902-.0010598l-3.09375-3.09375C.3147998 8.8147998.3181114 8.1818886.706077 7.793923l.087846-.087846c.3899555-.3899555 1.0271296-.3850244 1.4170351.0048811L4.5 10z'/%3E%3C/svg%3E");
  background-position: var(--spacing-sm) 50%;
  background-repeat: no-repeat;
  padding-left: var(--spacing-xl);
  color: var(--blue-link);
}
.k-dropdown .k-dropdown-menu .k-dropdown-item:hover,
.k-dropdown .k-dropdown-menu .k-dropdown-item.active {
  // background-color: var(--blue-lightest);
  // cursor: pointer;
  // transition: all 200ms ease-out;
}
.k-dropdown .k-dropdown-menu .k-dropdown-item a,
.k-dropdown .k-dropdown-menu .k-dropdown-item > div > a {
  // color: inherit;
  // display: block;
}
</style>

<style>
.k-dropdown .k-dropdown-toggle:focus,
.k-dropdown .k-dropdown-toggle:active {
  outline: 0;
}

</style>
