<template>
  <div class="k-tabs">
    <ul
      aria-label="Tabs"
      role="tablist"
    >
      <li
        v-for="(tab, i) in tabs"
        :id="`${tab.hash.replace('#','')}-tab`"
        :key="tab.hash"
        :aria-controls="`panel-${i}`"
        :aria-selected="activeTab === tab.hash ? 'true' : 'false'"
        class="tab-item"
        :class="{ active: activeTab === tab.hash }"
        role="tab"
        tabindex="0"
        @click="handleTabChange(tab.hash)"
        @keydown.enter.prevent="handleTabChange(tab.hash)"
        @keydown.space.prevent="handleTabChange(tab.hash)"
      >
        <a class="tab-link">
          <slot :name="`${tab.hash.replace('#','')}-anchor`">{{ tab.title }}</slot>
        </a>
      </li>
    </ul>

    <div
      v-for="(tab, i) in tabs"
      :id="`panel-${i}`"
      :key="tab.hash"
      :aria-labelledby="`${tab.hash.replace('#','')}-tab`"
      class="tab-container"
      role="tabpanel"
      tabindex="0"
    >
      <slot
        v-if="activeTab === tab.hash"
        :name="tab.hash.replace('#','')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

export interface Tab {
  hash: string
  title: string
}

export default defineComponent({
  name: 'KTabs',
  props: {
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
    /**
     * A set tab hash to use as default
     */
    modelValue: {
      type: String,
      default: '',
      validator: (val: string): boolean => val === '' || (val.includes('#') && !val.includes(' ')),
    },
  },
  emits: ['update:modelValue', 'changed'],
  setup(props, { emit }) {
    const activeTab = ref(props.modelValue ? props.modelValue : props.tabs[0].hash)

    const handleTabChange = (tab: string): void => {
      activeTab.value = tab
      emit('changed', tab)
      emit('update:modelValue', tab)
    }

    watch(() => props.modelValue, (newTabHash) => {
      activeTab.value = newTabHash
      emit('changed', newTabHash)
      emit('update:modelValue', newTabHash)
    })

    return {
      activeTab,
      handleTabChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-tabs {
  ul {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 20px;
    list-style: none;
    border-bottom: 1px solid var(--KTabsBottomBorderColor, var(--grey-300, color(grey-300)));

    .tab-item {
      position: relative;
      padding: var(--spacing-md, spacing(md));
      cursor: pointer;

      &:not(:first-of-type) { margin-left: var(--spacing-xs, spacing(xs)); }

      &:not(:last-of-type) { margin-right: var(--spacing-xs, spacing(xs)); }

      &:after {
        position: absolute;
        bottom: -2px;
        left: 0;
        display: block;
        width: 100%;
        height: 2px;
        content: '';
      }

      &.active,
      &:hover {
        border-bottom: 4px solid var(--KTabBottomBorderColor, var(--teal-300, color(teal-300)));
        .tab-link { color: var(--KTabsActiveColor, var(--black-500, color(black-500))); }
      }
    }

    .tab-link {
      display: block;
      color: var(--KTabsColor, var(--black-45, color(black-45)));
      &:hover {
        text-decoration: none;
        border: none;
      }
    }
  }
}
</style>
