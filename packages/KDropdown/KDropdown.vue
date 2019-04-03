<template>
  <div
    :class="{ 'no-toggle-icon': !toggleIcon }"
    class="k-dropdown">
    <a class="k-dropdown-toggle">
      <slot name="toggle-text">{{ dropdownToggleText }}</slot>
    </a>
    <ul
      :class="`k-dropdown-menu-${position}`"
      class="k-dropdown-menu">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        :class="{'active-item' : activeItem === item }"
        class="k-dropdown-item"
        @click="setActiveItem(item)">
        <slot :name="item">
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export const alignments = {
  left: 'left',
  center: 'center',
  right: 'right'
}

export default {
  name: 'KDropdown',
  props: {
    position: {
      type: String,
      default: 'left',
      validator: function (value) {
        return Object.values(alignments).indexOf(value) !== -1
      }
    },
    showActive: {
      type: Boolean,
      default: false
    },
    toggleText: {
      type: String,
      default: ''
    },
    toggleIcon: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      activeItem: this.showActive ? this.items[0] : ''
    }
  },

  computed: {
    dropdownToggleText () {
      return this.showActive
        ? this.activeItem
          ? this.activeItem
          : this.toggleText : this.toggleText
    }
  },

  methods: {
    setActiveItem (item) {
      this.activeItem = item
    }
  }
}
</script>

<style>
.k-dropdown {
  position: relative;
  display: inline-block;
}
.k-dropdown:hover .k-dropdown-menu {
  display: block;
}
.k-dropdown .k-dropdown-toggle {
  position: relative;
  cursor: pointer;
}
.k-dropdown:not(.no-toggle-icon) .k-dropdown-toggle:after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.3em;
  vertical-align: middle;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-left: 0.3em solid transparent;
}
.k-dropdown .k-dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  left: auto;
  min-width: 10rem;
  margin: 0;
  padding: 0.5rem 0;
  list-style: none;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}
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
.k-dropdown .k-dropdown-menu .k-dropdown-item {
  display: block;
  width: 100%;
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  color: inherit;
}
.k-dropdown .k-dropdown-menu .k-dropdown-item a,
.k-dropdown .k-dropdown-menu .k-dropdown-item > div > a {
  color: inherit;
  display: block;
}
</style>
