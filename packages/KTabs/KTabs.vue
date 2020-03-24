<template>
  <div class="k-tabs">
    <ul
      role="tablist"
      aria-label="ktabs">
      <li
        v-for="(tab, i) in tabs"
        :key="tab.hash"
        :aria-selected="activeTab === tab.hash ? 'true' : 'false'"
        :aria-controls="`panel-${i}`"
        :id="`${tab.hash.replace('#','')}-tab`"
        :class="{ active: activeTab === tab.hash }"
        tabindex="0"
        role="tab"
        class="tab-item"
        @keydown.enter.prevent="activeTab = tab.hash"
        @click="handleTabChange(tab.hash)">
        <a class="tab-link">
          <slot :name="`${tab.hash.replace('#','')}-anchor`">{{ tab.title }}</slot>
        </a>
      </li>
    </ul>

    <div
      v-for="(tab, i) in tabs"
      :key="tab.hash"
      :id="`panel-${i}`"
      :aria-labelledby="`${tab.hash.replace('#','')}-tab`"
      role="tabpanel"
      tabindex="0"
      class="tab-container">
      <slot
        v-if="activeTab === tab.hash"
        :name="tab.hash.replace('#','')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KTabs',
  // v-model
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
      type: Array,
      required: true
    },
    /**
     * A set tab hash to use as default
     */
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      activeTab: this.value
        ? this.value
        : this.tabs[0].hash
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
@import '~@kongponents/styles/_variables.scss';

.k-tabs {
  ul {
    display: flex;
    margin-bottom: var(--spacing-lg, spacing(lg));
    padding-left: 0;
    list-style: none;
    border-bottom: 2px solid var(--KTabsBottomBorder, var(--grey-88, color(grey-88)));
    .tab-item {
      position: relative;
      padding: var(--spacing-sm, spacing(sm));
      cursor: pointer;
      &:not(:first-of-type) { margin-left: var(--spacing-xs, spacing(xs)); }
      &:not(:last-of-type) { margin-right: var(--spacing-xs, spacing(xs)); }
      &:after {
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        display: block;
        content: '';
      }
      &.active,
      &:hover {
        &:after { background-color: var(--KTabsActiveColor, var(--blue-base, color(blue-base))); }
        .tab-link { color: var(--KTabsActiveColor, var(--blue-base, color(blue-base))); }
      }
    }
    .tab-link {
      display: block;
      color: var(--KTabsColor, var(--tblack-45, color(tblack-45)));
      &:hover {
        text-decoration: none;
        border: none;
      }
    }
  }
}
</style>
