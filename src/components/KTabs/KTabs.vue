<template>
  <div class="k-tabs">
    <ul
      aria-label="Tabs"
      role="tablist"
    >
      <li
        v-for="tab in tabs"
        :id="`${tab.hash.replace('#','')}-tab`"
        :key="tab.hash"
        class="tab-item"
        :class="{ active: activeTab === tab.hash, disabled: tab.disabled }"
      >
        <div
          :aria-controls="hidePanels ? undefined : `panel-${tab.hash}`"
          :aria-selected="hidePanels ? undefined : (activeTab === tab.hash ? 'true' : 'false')"
          class="tab-link"
          :class="{ 'has-panels': !hidePanels }"
          role="tab"
          :tabindex="tab.disabled ? '-1' : '0'"
          @click.prevent="handleTabChange(tab.hash)"
          @keydown.enter.prevent="handleTabChange(tab.hash)"
          @keydown.space.prevent="handleTabChange(tab.hash)"
        >
          <slot :name="`${tab.hash.replace('#','')}-anchor`">
            <span>{{ tab.title }}</span>
          </slot>
        </div>
      </li>
    </ul>

    <template v-if="!hidePanels">
      <div
        v-for="(tab, i) in tabs"
        :id="`panel-${i}`"
        :key="tab.hash"
        :aria-labelledby="`${tab.hash.replace('#','')}-tab`"
        class="tab-container"
        role="tabpanel"
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
   * Array of Tab objects [{ hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2' }]
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
  hidePanels: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'change', val: string): void
}>()

const activeTab = ref<string>(props.modelValue ? props.modelValue : props.tabs[0].hash)

const handleTabChange = (tab: string): void => {
  activeTab.value = tab
  emit('change', tab)
  emit('update:modelValue', tab)
}

watch(() => props.modelValue, (newTabHash) => {
  activeTab.value = newTabHash
  emit('change', newTabHash)
  emit('update:modelValue', newTabHash)
})
</script>

<style lang="scss" scoped>
.k-tabs {
  ul {
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    display: flex;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    gap: var(--kui-space-80, $kui-space-80);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    list-style: none;
    margin-bottom: var(--kui-space-70, $kui-space-70);
    overflow-x: auto;
    overflow-y: hidden;
    padding: var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);
    padding-top: var(--kui-space-20, $kui-space-20);

    .tab-item {
      border-bottom-color: var(--kui-color-border-transparent, $kui-color-border-transparent);
      border-bottom-style: solid;
      border-bottom-width: var(--kui-border-width-20, $kui-border-width-20);
      cursor: pointer;
      padding-bottom: var(--kui-space-40, $kui-space-40);
      position: relative;
      transition: border-bottom-color $kongponentsTransitionDurTimingFunc;
      white-space: nowrap;

      .tab-link {
        border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        display: inline-flex;
        gap: var(--kui-space-40, $kui-space-40);
        text-decoration: none;
        transition: color $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
        user-select: none;

        // Applies the padding to the tab’s content when not showing panels which is typically used for placing links inside KTabs for navigational tabs. Otherwise, clicking the tab outside of the link’s box will mark it as active but won’t actually navigate.
        &.has-panels,
        &:not(.has-panels) :deep(> *) {
          padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);
        }

        a, :deep(a) {
          color: var(--kui-color-text, $kui-color-text);
          text-decoration: none;
        }

        &:focus-visible {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
          color: var(--kui-color-text, $kui-color-text);
          outline: none;
        }
      }

      &:hover:not(.disabled) {
        .tab-link {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
        }
      }

      &.active {
        border-bottom-color: var(--kui-color-border-decorative-purple, $kui-color-border-decorative-purple);

        .tab-link {
          color: var(--kui-color-text, $kui-color-text);
        }
      }

      &.disabled {
        cursor: not-allowed;

        .tab-link {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled);
          pointer-events: none;
        }
      }
    }
  }
}
</style>
