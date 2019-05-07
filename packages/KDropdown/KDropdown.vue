<template>
  <div
    :class="{ 'no-toggle-icon': !showToggleIcon, 'is-open': isOpen, 'has-icon': hasIcon }"
    class="k-dropdown">
    <!-- Overlay to click away -->
    <div
      v-if="isOpen"
      class="overlay"
      @click="isOpen = !isOpen"/>
    <KButton
      :appearance="buttonType === 'btn' ? 'secondary' : 'btn-link'"
      aria-haspopup="true"
      class="k-dropdown-toggle"
      @click="() => isOpen = !isOpen">
      <slot name="icon" />
      <span>{{ toggleText }}</span>
    </KButton>
    <ul
      :class="`k-dropdown-menu-${position}`"
      class="k-dropdown-menu"
      role="listbox"
      aria-labelledby="dropdown">
      <li
        v-for="item in items"
        :key="item && item.name || item"
        :id="item && item.name || item"
        :class="{ 'is-selected': item.selected }"
        class="k-dropdown-item"
        role="option"
        @click="clickHandler(item)">
        <slot :item="item">{{ item && item.name || item }}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton'

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
      validator: function (value) {
        return Object.values(alignments).indexOf(value) !== -1
      }
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
    buttonType: {
      type: String,
      default: 'btn',
      validator: function (value) {
        return [
          'btn',
          'text'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Show dropdown arrow
     */
    showToggleIcon: {
      type: Boolean,
      default: true
    },
    /**
     * Array of items to render in menu. Can pass array of Strings or Objects
     * String: ['item', 'item', 'item]
     * Object: [ { name: 'item', selected: false }, { name: 'item'} ]
     */
    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      isOpen: false
    }
  },

  computed: {
    hasIcon () {
      return !!this.$slots.icon
    }
  },

  mounted () {
    this.hasIcon && this.$slots.icon[0].elm.setAttribute('viewBox', '0 0 16 16')
  },

  methods: {
    clickHandler (item) {
      // Only run if item has selected key
      if (Object.keys(item).includes('selected')) {
        item.selected = !item.selected
        this.$emit('selected', item)
      }
    }
  }
}
</script>

<style scoped>
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
}

  /* Toggle button arrow */
.k-dropdown.has-icon .k-dropdown-toggle > span:not(:empty) {
  margin-left: var(--spacing-xs);
}
.k-dropdown:not(.no-toggle-icon) .k-dropdown-toggle:after {
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
.k-dropdown.is-open:not(.no-toggle-icon) .k-dropdown-toggle:after {
  transform: rotate(180deg);
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
  background-color: var(--blue-lightest);
  cursor: pointer;
  transition: all 200ms ease-out;
}
.k-dropdown .k-dropdown-menu .k-dropdown-item a,
.k-dropdown .k-dropdown-menu .k-dropdown-item > div > a {
  color: inherit;
  display: block;
}
</style>

<style>
/* Toggle button */
.k-dropdown .k-dropdown-toggle.btn-link,
.k-dropdown .k-dropdown-toggle.btn-link:hover {
  color: inherit;
}
.k-dropdown.is-open .k-dropdown-toggle {
  background-color: var(--secondaryActive);
}
.k-dropdown.is-open .k-dropdown-toggle.btn-link {
  background-color: transparent;
}
.k-dropdown.has-icon .k-dropdown-toggle {
  display: flex;
  align-items: center;
}
.k-dropdown .k-dropdown-toggle:focus,
.k-dropdown .k-dropdown-toggle:active {
  outline: 0;
}

/* Toggle button icon */
.k-dropdown .k-dropdown-toggle > svg {
  width: 16px;
  height: 16px;
}

</style>
