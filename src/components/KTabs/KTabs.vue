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
        :aria-controls="hasPanels ? `panel-${i}` : undefined"
        :aria-selected="hasPanels ? (activeTab === tab.hash ? 'true' : 'false') : undefined"
        class="tab-item"
        :class="{ active: activeTab === tab.hash }"
        :role="hasPanels ? 'tab' : undefined"
        tabindex="0"
        @click="handleTabChange(tab.hash)"
        @keydown.enter.prevent="handleTabChange(tab.hash)"
        @keydown.space.prevent="handleTabChange(tab.hash)"
      >
        <div
          :class="['tab-link', { 'has-panels': hasPanels }]"
        >
          <slot :name="`${tab.hash.replace('#','')}-anchor`">
            <span>{{ tab.title }}</span>
          </slot>
        </div>
      </li>
    </ul>

    <template v-if="hasPanels">
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { Tab } from '@/types'

const props = defineProps({
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
  /**
   * Render the tab's corresponding panel container
   */
  hasPanels: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'changed', val: string): void
}>()

const activeTab = ref<string>(props.modelValue ? props.modelValue : props.tabs[0].hash)

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
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';


.k-tabs {
  ul {
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--KTabsBottomBorderColor, var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak)));
    display: flex;
    font-size: var(--kui-font-size-50, $kui-font-size-50);
    line-height: var(--kui-line-height-50, $kui-line-height-50);
    list-style: none;
    margin-bottom: var(--kui-space-0, $kui-space-0);
    padding-left: var(--kui-space-0, $kui-space-0);

    .tab-item {
      cursor: pointer;
      position: relative;

      .tab-link {
        font-size: inherit;
        text-decoration: none;

        a,
        :deep(a) {
          text-decoration: none;
        }
      }

      .tab-link,
      .tab-link:not(.has-panels) :deep(> *) {
        color: var(--KTabsColor, var(--black-45, var(--kui-color-text, $kui-color-text)));
      }

      .tab-link.has-panels,
      .tab-link:not(.has-panels) :deep(> *) {
        display: inline-block;
        padding: var(--spacing-md, var(--kui-space-60, $kui-space-60));
      }

      &:not(:first-of-type) {
        margin-left: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
      }

      &:not(:last-of-type) {
        margin-right: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
      }

      &:after {
        bottom: -2px;
        content: '';
        display: block;
        height: 2px;
        left: 0;
        position: absolute;
        width: 100%;
      }

      &.active,
      &:hover {
        .tab-link.has-panels,
        .tab-link:not(.has-panels) :deep(> *) {
          border-bottom: var(--kui-border-width-30, $kui-border-width-30) solid var(--KTabBottomBorderColor, var(--teal-300, $tmp-color-aqua-50)); // teal-300 is now aqua-50
          color: var(--KTabsActiveColor, var(--black-500, var(--kui-color-text, $kui-color-text)));
        }
      }
    }
  }
}
</style>
