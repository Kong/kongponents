<template>
  <div>
    <ul class="nav nav-tabs">
      <li
        v-for="tab in tabs"
        :key="tab.hash"
        :aria-selected="activeTab === tab.hash ? 'true' : 'false'"
        class="nav-item"
        @click="handleTabChange(tab.hash)">
        <a
          :id="`${tab.title.replace(/\s/g,'-').toLowerCase()}`"
          :class="{active: activeTab === tab.hash}"
          :aria-controls="`${tab.title.replace(' ','-').toLowerCase()}`"
          class="nav-link">
          {{ tab.title }}
        </a>
      </li>
    </ul>

    <div
      v-for="tab in tabs"
      :key="tab.hash"
      :id="`${tab.title.toLowerCase()}-tab`">
      <slot
        v-if="activeTab === tab.hash"
        :name="tab.title"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KTabs',
  props: {
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      activeTab: location.hash || this.tabs[0].hash
    }
  },

  computed: {
    hash () {
      return location.hash
    }
  },

  methods: {
    handleTabChange (tab) {
      this.activeTab = tab
      this.$emit('changed', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  &.nav-tabs {
    border-bottom: 1px solid var(--grey-88);
    .nav-item {
      margin-bottom: -1px;
      cursor: pointer;
    }
    .nav-link {
      display: block;
      color: var(--tblack-45);
      padding: var(--spacing-xs) var(--spacing-md);
      border: 1px solid transparent;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      &.active {
        color: var(--blue-dark);
        border-color: var(--grey-88) var(--grey-88) #fff;
        background-color: #fff;
        &:hover,
        &:focus {
          border-color: var(--grey-88) var(--grey-88) #fff;
        }
      }
      &:hover,
      &:focus {
        text-decoration: none;
        border-color: var(--grey-92) var(--grey-92) var(--grey-88);
      }
    }
  }
}
</style>
