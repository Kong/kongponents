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
        :class="{ active: activeTab === tab.hash }"
        :data-testid="`${tab.hash.replace('#','')}-tab`"
      >
        <component
          :is="tabComponent(tab).tag"
          :aria-controls="hidePanels ? undefined : `panel-${tab.hash}`"
          :aria-selected="hidePanels ? undefined : (activeTab === tab.hash ? 'true' : 'false')"
          class="tab-link"
          :class="{ disabled: tab.disabled }"
          role="tab"
          :tabindex="getAnchorTabindex(tab)"
          v-bind="tabComponent(tab).attributes"
          @click="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @click.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @keydown.enter.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @keydown.space.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
        >
          <slot :name="`${getTabSlotName(tab.hash)}-anchor`">
            <span>{{ tab.title }}</span>
          </slot>
        </component>
      </li>
    </ul>

    <template v-if="!hidePanels">
      <div
        v-for="(tab, i) in tabs"
        :id="`panel-${i}`"
        :key="tab.hash"
        :aria-labelledby="`${getTabSlotName(tab.hash)}-tab`"
        class="tab-container"
        role="tabpanel"
      >
        <slot
          v-if="activeTab === tab.hash"
          :name="getTabSlotName(tab.hash)"
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
  /**
   * @deprecated
   */
  anchorTabindex: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= -1 && val <= 32767,
  },
  beforeChange: {
    type: Function as PropType<(tab: string) => boolean>,
    default: () => true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'change', val: string): void
}>()

const activeTab = ref<string>(props.modelValue ? props.modelValue : props.tabs[0]?.hash)

const handleTabChange = (tab: string): void => {
  // if beforeChange is not a function, skip the check
  if (typeof props.beforeChange !== 'function' || props.beforeChange(tab)) {
    activeTab.value = tab
    emit('change', tab)
    emit('update:modelValue', tab)
  }
}

const getTabSlotName = (tabHash: string): string => tabHash.replace('#', '')

const getAnchorTabindex = (tab: Tab): string => {
  if (tab.disabled) {
    return '-1'
  }

  return typeof props.anchorTabindex === 'number' && props.anchorTabindex >= -1 && props.anchorTabindex <= 32767 ? String(props.anchorTabindex) : '0'
}

const tabComponent = (tab: Tab) => {
  if (tab.to) {
    if (typeof tab.to === 'string') {
      return { tag: 'a', attributes: { href: tab.disabled ? undefined : tab.to } }
    } else if (typeof tab.to === 'object') {
      return { tag: 'router-link', attributes: { to: tab.disabled ? undefined : tab.to } }
    }
  }

  return { tag: 'div', attributes: {} }
}

watch(() => props.modelValue, (newTabHash) => {
  activeTab.value = newTabHash
  emit('change', newTabHash)
  emit('update:modelValue', newTabHash)
})
</script>

<style lang="scss" scoped>
@mixin kTabsFocus {
  background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
  color: var(--kui-color-text, $kui-color-text);
  outline: none;
}

.k-tabs {
  ul {
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
    list-style: none;
    margin-bottom: var(--kui-space-70, $kui-space-70);
    margin-top: var(--kui-space-0, $kui-space-0);
    overflow-x: auto;
    overflow-y: hidden;
    padding: var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);
    padding-top: var(--kui-space-20, $kui-space-20);

    .tab-item {
      border-bottom-color: var(--kui-color-border-transparent, $kui-color-border-transparent);
      border-bottom-style: solid;
      border-bottom-width: var(--kui-border-width-20, $kui-border-width-20);
      padding-bottom: var(--kui-space-40, $kui-space-40);
      position: relative;
      transition: border-bottom-color $kongponentsTransitionDurTimingFunc;
      white-space: nowrap;

      .tab-link {
        @include defaultButtonReset;
        align-items: center;

        border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        cursor: pointer;
        display: inline-flex;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        gap: var(--kui-space-40, $kui-space-40);
        line-height: var(--kui-line-height-40, $kui-line-height-40);
        padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);
        text-decoration: none;
        transition: color $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
        user-select: none;

        &:hover:not(.disabled) {
          background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
        }

        &:focus-visible {
          @include kTabsFocus;
        }

        &.disabled {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled);
          cursor: not-allowed;
        }

        :slotted(a),
        :deep(a) {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral);
          text-decoration: none;

          &:focus-visible {
            @include kTabsFocus;
          }
        }
      }

      &.active {
        border-bottom-color: var(--kui-color-border-decorative-purple, $kui-color-border-decorative-purple);

        .tab-link {
          color: var(--kui-color-text, $kui-color-text);

          a, :deep(a) {
            color: var(--kui-color-text, $kui-color-text);
          }
        }
      }
    }
  }
}
</style>
