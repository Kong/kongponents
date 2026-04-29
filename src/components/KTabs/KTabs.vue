<template>
  <div
    class="k-tabs"
    :class="appearance"
  >
    <ul
      aria-label="Tabs"
      role="tablist"
    >
      <li
        v-for="tab in tabs"
        :id="`${tab.hash.replace('#', '')}-tab`"
        :key="tab.hash"
        class="tab-item"
        :class="{ active: activeTab === tab.hash }"
        :data-testid="`${tab.hash.replace('#', '')}-tab`"
      >
        <KButton
          appearance="none"
          :aria-controls="hidePanels ? undefined : `panel-${tab.hash}`"
          :aria-selected="hidePanels ? undefined : (activeTab === tab.hash ? 'true' : 'false')"
          class="tab-link"
          :class="{ disabled: tab.disabled }"
          :disabled="tab.disabled"
          role="tab"
          :tabindex="getAnchorTabindex(tab)"
          :to="tab.to"
          @click="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @click.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @keydown.enter.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
          @keydown.space.prevent="!tab.disabled ? handleTabChange(tab.hash) : undefined"
        >
          <slot :name="`${getTabSlotName(tab.hash)}-anchor`">
            <span>{{ tab.title }}</span>
          </slot>
        </KButton>
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

<script lang="ts" setup generic="const Hash extends string = string">
import { ref, watch } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import type { StripHash, Tab, TabsEmits, TabsProps, TabsSlots } from '@/types'

const {
  tabs,
  modelValue = '',
  hidePanels,
  anchorTabindex = 0,
  beforeChange = () => true,
  appearance = 'default',
} = defineProps<TabsProps<Hash>>()

const emit = defineEmits<TabsEmits<Hash>>()

defineSlots<TabsSlots<Hash>>()

const activeTab = ref<Hash | ''>(modelValue ? modelValue : tabs[0]?.hash ?? '')

const handleTabChange = async (tab: Hash): Promise<void> => {
  // if beforeChange is not a function, skip the check
  if (typeof beforeChange !== 'function' || await beforeChange(tab)) {
    activeTab.value = tab
    emit('change', tab)
    emit('update:modelValue', tab)
  }
}

const getTabSlotName = (tabHash: Hash): StripHash<Hash> => tabHash.replace('#', '') as StripHash<Hash>

const getAnchorTabindex = (tab: Tab): string => {
  if (tab.disabled) {
    return '-1'
  }

  return typeof anchorTabindex === 'number' && anchorTabindex >= -1 && anchorTabindex <= 32767 ? String(anchorTabindex) : '0'
}

watch(() => modelValue, (newTabHash) => {
  activeTab.value = newTabHash
})
</script>

<style lang="scss" scoped>
@mixin kTabsFocus {
  box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
  outline: none;
}

.k-tabs {
  ul {
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
    list-style: none;
    margin-top: var(--kui-space-0, $kui-space-0);
    padding: var(--kui-space-0, $kui-space-0);
    padding-top: var(--kui-space-20, $kui-space-20);

    .tab-item {
      position: relative;
      white-space: nowrap;

      .tab-link {
        align-items: center;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        gap: var(--kui-space-40, $kui-space-40);
        text-decoration: none;
        transition: color $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
        user-select: none;

        &:focus-visible {
          @include kTabsFocus;
        }

        &.disabled {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled);
          cursor: not-allowed;
        }

        :slotted(a),
        :deep(a) {
          text-decoration: none;

          &:focus-visible {
            @include kTabsFocus;
          }
        }
      }

      &.active {
        .tab-link,
        .tab-link.tab-link {
          color: var(--kui-color-text, $kui-color-text);

          a, :deep(a) {
            color: var(--kui-color-text, $kui-color-text);
          }
        }
      }
    }
  }

  &.default {
    ul {
      border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      overflow-x: auto;
      overflow-y: hidden;
      padding: var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);

      .tab-item {
        border-bottom-color: var(--kui-color-border-transparent, $kui-color-border-transparent);
        border-bottom-style: solid;
        border-bottom-width: var(--kui-border-width-20, $kui-border-width-20);
        padding-bottom: var(--kui-space-40, $kui-space-40);
        transition: border-bottom-color $kongponentsTransitionDurTimingFunc;

        .tab-link {
          @include defaultButtonReset;

          border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
          color: var(--kui-color-text-neutral, $kui-color-text-neutral);
          font-size: var(--kui-font-size-30, $kui-font-size-30);
          font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
          line-height: var(--kui-line-height-40, $kui-line-height-40);
          padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);

          &:hover:not(.disabled) {
            background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
          }

          &:focus-visible {
            @include kTabsFocus;

            background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
            border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
            color: var(--kui-color-text, $kui-color-text);
          }

          :slotted(a),
          :deep(a) {
            color: var(--kui-color-text-neutral, $kui-color-text-neutral);

            &:focus-visible {
              @include kTabsFocus;

              background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
              border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
              color: var(--kui-color-text, $kui-color-text);
            }
          }
        }

        &.active {
          border-bottom-color: var(--kui-color-border-decorative-purple, $kui-color-border-decorative-purple);
        }
      }
    }
  }

  &.minimal {
    ul {
      gap: var(--kui-space-70, $kui-space-70);
      margin-bottom: var(--kui-space-50, $kui-space-50);

      .tab-item {
        .tab-link {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral);
          font-size: var(--kui-font-size-20, $kui-font-size-20);
          font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
          line-height: var(--kui-line-height-30, $kui-line-height-30);
          transition: color 0.2s ease-in, border-color 0.2s ease-in, font-weight 0.2s ease-in;

          &:hover:not(.disabled) {
            color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
          }
        }

        &.active {
          .tab-link {
            font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);

            a, :deep(a) {
              font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
            }
          }
        }
      }
    }
  }
}
</style>
