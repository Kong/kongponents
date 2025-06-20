<template>
  <div
    ref="kTruncateWrapper"
    class="k-truncate"
    :class="[_expanded ? 'expanded' : '', `truncate-${truncateText ? 'text' : 'content'}`]"
    :style="widthStyle"
  >
    <!-- Order switched for ease when using keyboard navigation -->
    <div
      v-if="!truncateText && showToggle"
      class="truncate-expand-controls"
    >
      <div
        v-if="!_expanded"
        data-testid="expand-trigger-wrapper"
      >
        <slot
          :expand="handleToggleClick"
          name="expand-trigger"
          :truncated-count="truncatedCount"
        >
          <button
            :aria-label="`Show ${truncatedCount} more items`"
            class="expand-trigger"
            type="button"
            @click.stop="handleToggleClick"
          >
            {{ truncatedCount }}
          </button>
        </slot>
      </div>
    </div>
    <div
      ref="kTruncateContainer"
      class="truncate-container"
    >
      <slot name="default" />
      <div
        v-if="!truncateText && _expanded"
        data-testid="collapse-trigger-wrapper"
      >
        <slot
          :collapse="handleToggleClick"
          name="collapse-trigger"
        >
          <button
            aria-label="Collapse content"
            class="collapse-trigger"
            type="button"
            @click.stop="handleToggleClick"
          >
            <ChevronUpIcon
              decorative
              :size="KUI_ICON_SIZE_30"
            />
          </button>
        </slot>
      </div>
    </div>
    <div
      v-if="truncateText && (showToggle || _expanded)"
      ref="textToggleControls"
      class="truncate-collapse-controls"
    >
      <div
        v-if="!_expanded"
        data-testid="expand-trigger-wrapper"
      >
        <slot
          :expand="handleToggleClick"
          name="expand-trigger"
        >
          <KButton
            appearance="tertiary"
            size="small"
            @click.stop="handleToggleClick"
          >
            Show more
          </KButton>
        </slot>
      </div>
      <div v-if="_expanded">
        <slot
          :collapse="handleToggleClick"
          name="collapse-trigger"
        >
          <KButton
            appearance="tertiary"
            size="small"
            @click.stop="handleToggleClick"
          >
            Show less
          </KButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, computed, onBeforeUnmount, watch } from 'vue'
import { ChevronUpIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30, KUI_SPACE_40 } from '@kong/design-tokens'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'
import { normalizeSize } from '@/utilities/css'
import { warnInvalidProp } from '@/utilities/warning'
import type { TruncateProps, TruncateSlots } from '@/types'

const {
  rows = 1,
  width = '100%',
  expanded,
  truncateText,
} = defineProps<TruncateProps>()

watch(
  () => rows,
  (val) => {
    if (val < 0) {
      warnInvalidProp('rows', `\`rows\` prop cannot be less than 0, but got "${val}".`)
    }
  },
  { immediate: true },
)

defineSlots<TruncateSlots>()

const _expanded = ref<boolean>(expanded)

const showToggle = ref<boolean>(false)

const resizeObserver = ref<ResizeObserverHelper>()

const kTruncateContainer = ref<HTMLDivElement>()
const kTruncateWrapper = ref<HTMLDivElement>()
const textToggleControls = ref<HTMLDivElement>()
const wrapperHeight = ref<string>('0px')
/**
 * set value to const because it's used in styles and in script
 * so if the value ever changes - it should be changed here in the definition so both usages reference the same value
 */
const gap = KUI_SPACE_40

const truncatedCount = ref<number>(0)

/**
 * Sets wrapper height.
 * When rows prop === 1: sets wrapper height equal to height of the tallest child.
 * When rows prop > 1: wrapper hight will be rows count multiplied by height of the tallest child plus gap.
 * For example if rows is 2 and all elements are equal height if 22px, wrapper height will be set to 54px (2 * 22 + gap).
 */
const setWrapperHeight = async (): Promise<void> => {
  if (truncateText) {
    return
  }

  if (kTruncateContainer.value && kTruncateContainer.value.children?.length) {
    const children = kTruncateContainer.value.children as unknown as HTMLElement[]
    const gapNumber = Number(String(gap).replace(/px$/gi, ''))
    let tallestChildHeight = 0
    for (let i = 0; i < children.length; i++) {
      // find height of tallest child
      tallestChildHeight = children[i].offsetHeight > tallestChildHeight ? children[i].offsetHeight : tallestChildHeight
    }
    const targetWrapperHeight = (rows === 1 ? 0 : (rows - 1) * gapNumber) + (tallestChildHeight * rows) + 6 // account for padding
    wrapperHeight.value = kTruncateContainer.value.offsetHeight > targetWrapperHeight ? `${targetWrapperHeight}px` : 'auto'

    await nextTick()
    updateToggleVisibility()
  }
}

/**
 * Determines whether expand/collapse toggle need to be shown.
 * In other words, determines whether the content overflows.
 * If the height of the content is greater than height of the wrapper element - content does overflow.
 */
const updateToggleVisibility = (): void => {
  if (kTruncateContainer.value && kTruncateWrapper.value) {
    // in case with text content, need to compare scrollHeight value
    const containerHeightProperty = truncateText ? kTruncateContainer.value.scrollHeight : kTruncateContainer.value.offsetHeight
    const textToggleControlsHeight = textToggleControls.value ? textToggleControls.value.offsetHeight : 0
    /**
     * In case with text content, toggle controls element is rendered below content, so adds up to wrapper height.
     * Therefore it's height need to be subtracted to determine the actual wrapper height.
     */
    showToggle.value = containerHeightProperty > (kTruncateWrapper.value.offsetHeight - textToggleControlsHeight)
    countExcessElements()
  }
}

// Counts elements that are wrapped to the hidden rows and therefore are not visible.
const countExcessElements = (): void => {
  if (truncateText) {
    return
  }

  truncatedCount.value = 0
  if (kTruncateContainer.value && kTruncateWrapper.value) {
    const children = kTruncateContainer.value.children as unknown as HTMLElement[]
    for (let i = 0; i < children.length; i++) {
      /**
       * If element's offsetTop
       * (offset from the nearest relatively positioned parent, which is .truncate-container)
       * is greater than the wrapper element height - means it's not visible
       */
      if (children[i].offsetTop > kTruncateWrapper.value.offsetHeight) {
        truncatedCount.value += 1
        if (children[i].getAttribute('tabindex')) {
          // set tabindex to -1 in truncated children
          children[i].tabIndex = -1
        }
      } else {
        if (children[i].getAttribute('tabindex')) {
          // reset tabindex
          children[i].tabIndex = 0
        }
      }
    }
  }
}

const handleToggleClick = async (): Promise<void> => {
  _expanded.value = !_expanded.value
  // await for component to collapse/expand
  await nextTick()
  updateToggleVisibility()
}

const widthStyle = computed((): Record<string, string> => {
  return {
    width: normalizeSize(width),
  }
})

onMounted(() => {
  resizeObserver.value = ResizeObserverHelper.create(setWrapperHeight)

  resizeObserver.value.observe(kTruncateContainer.value as HTMLDivElement)
  updateToggleVisibility()
})

onBeforeUnmount(() => {
  resizeObserver.value?.unobserve(kTruncateContainer.value as HTMLDivElement)
})
</script>

<style lang="scss" scoped>
.k-truncate {
  align-items: flex-start;
  display: flex;
  overflow: hidden;
  padding: var(--kui-space-20, $kui-space-20);

  .truncate-expand-controls {
    align-items: flex-end;
    display: flex;
    height: 100%;

    .expand-trigger {
      background: var(--kui-color-background-transparent, $kui-color-background-transparent);
      border: 0;
      border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
      color: var(--kui-color-text-primary, $kui-color-text-primary);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-10, $kui-font-size-10);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      line-height: var(--kui-line-height-10, $kui-line-height-10);
      padding: var(--kui-space-10, $kui-space-10);

      &:focus, &:active {
        outline: none;
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &:hover {
        color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
      }

      &:focus {
        color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
      }
    }
  }

  .collapse-trigger {
    @include defaultButtonReset;

    background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
    outline: none;
    padding: var(--kui-space-20, $kui-space-20);

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    }

    &:hover {
      background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);

      :deep(#{$kongponentsKongIconSelector}) {
        color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong) !important;
      }
    }

    &:focus,
    &:focus-within {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);

      :deep(#{$kongponentsKongIconSelector}) {
        color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger) !important;
      }
    }
  }

  &.truncate-content {
    display: flex;
    flex-direction: row-reverse;
    height: v-bind('wrapperHeight');

    &.expanded {
      height: auto;
    }

    .truncate-container {
      display: flex;
      flex-wrap: wrap;
      gap: v-bind('gap');
      margin-right: auto;
      position: relative;
    }

    .expand-trigger {
      &::before {
        content: '+';
      }
    }
  }

  &.truncate-text {
    display: flex;
    flex-direction: column;

    .truncate-container {
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: v-bind('rows');
      overflow: hidden;
    }

    &.expanded {
      .truncate-container {
        display: block;
      }
    }
  }

  .truncate-collapse-controls {
    margin-top: var(--kui-space-40, $kui-space-40);
    place-self: flex-end;
  }
}
</style>
