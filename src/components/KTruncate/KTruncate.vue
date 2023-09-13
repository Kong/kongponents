<template>
  <div
    ref="kTruncateWrapper"
    class="k-truncate"
    :class="[expanded ? 'expanded' : '', `k-truncate-${isTextContent ? 'text' : 'content'}`]"
    :style="widthStyle"
  >
    <!-- Order switched for ease when using keyboard navigation -->
    <div
      v-if="!isTextContent && showToggle"
      class="k-truncate-expand-controls"
    >
      <div
        v-if="!expanded"
        data-testid="expand-trigger-wrapper"
      >
        <slot
          :expand="handleToggleClick"
          name="expand-trigger"
          :truncated-count="truncatedCount"
        >
          <KButton
            appearance="btn-link"
            class="expand-trigger"
            @click="handleToggleClick"
          >
            {{ truncatedCount }}
          </KButton>
        </slot>
      </div>
    </div>
    <div
      ref="kTruncateContainer"
      class="k-truncate-container"
    >
      <slot name="default" />
      <div
        v-if="!isTextContent && expanded"
        data-testid="collapse-trigger-wrapper"
      >
        <slot
          :collapse="handleToggleClick"
          name="collapse-trigger"
        >
          <KButton
            appearance="primary"
            class="collapse-trigger"
            is-rounded
            @click="handleToggleClick"
          >
            <KIcon
              :color="`var(--KTruncateCollapseIconColor, var(--blue-500, var(--kui-color-text-primary, ${KUI_COLOR_TEXT_PRIMARY})))`"
              icon="chevronUp"
              :size="KUI_ICON_SIZE_10"
              title="Show less"
            />
          </KButton>
        </slot>
      </div>
    </div>
    <div
      v-if="isTextContent && (showToggle || expanded)"
      ref="textToggleControls"
      class="k-truncate-collapse-controls"
    >
      <div
        v-if="!expanded"
        data-testid="expand-trigger-wrapper"
      >
        <slot
          :expand="handleToggleClick"
          name="expand-trigger"
        >
          <KButton
            appearance="btn-link"
            class="expand-trigger"
            @click="handleToggleClick"
          >
            Show more
          </KButton>
        </slot>
      </div>
      <div v-if="expanded">
        <slot
          :collapse="handleToggleClick"
          name="collapse-trigger"
        >
          <KButton
            appearance="btn-link"
            class="collapse-trigger"
            @click="handleToggleClick"
          >
            Show less
          </KButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KIcon from '@/components/KIcon/KIcon.vue'
import { KUI_COLOR_TEXT_PRIMARY, KUI_ICON_SIZE_10, KUI_SPACE_40 } from '@kong/design-tokens'

const { getSizeFromString } = useUtilities()

const props = defineProps({
  rows: {
    type: Number,
    default: 1,
    validator: (value: number): boolean => value > 0,
  },
  isTextContent: {
    type: Boolean,
    default: false,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
})

const expanded = ref<boolean>(props.isExpanded)

const showToggle = ref<boolean>(false)

const resizeObserver = ref()

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
  if (props.isTextContent) {
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
    const targetWrapperHeight = (props.rows === 1 ? 0 : (props.rows - 1) * gapNumber) + (tallestChildHeight * props.rows) + 6 // account for padding
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
    const containerHeightProperty = props.isTextContent ? kTruncateContainer.value.scrollHeight : kTruncateContainer.value.offsetHeight
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
  if (props.isTextContent) {
    return
  }

  truncatedCount.value = 0
  if (kTruncateContainer.value && kTruncateWrapper.value) {
    const children = kTruncateContainer.value.children as unknown as HTMLElement[]
    for (let i = 0; i < children.length; i++) {
      /**
       * If element's offsetTop
       * (offset from the nearest relatively positioned parent, which is .k-truncate-container)
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
  expanded.value = !expanded.value
  // await for component to collapse/expand
  await nextTick()
  updateToggleVisibility()
}

const widthStyle = computed((): Record<string, string> => {
  return {
    width: getSizeFromString(props.width),
  }
})

onMounted(() => {
  resizeObserver.value = new ResizeObserver(entries => {
    // Wrapper 'window.requestAnimationFrame' is needed for disabling "ResizeObserver loop limit exceeded" error in DD
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return
      }
      // Actual code
      setWrapperHeight()
    })
  })
  resizeObserver.value.observe(kTruncateContainer.value as HTMLDivElement)
  updateToggleVisibility()
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(kTruncateContainer.value)
  }
})
</script>

<style lang="scss" scoped>



.k-truncate {
  align-items: flex-start;
  display: flex;
  overflow: hidden;
  padding: var(--kui-space-20, $kui-space-20);

  .k-truncate-expand-controls {
    align-items: flex-end !important;
    display: flex !important;
    height: 100% !important;
  }

  .expand-trigger,
  .collapse-trigger {
    --KButtonLink: var(--KTruncateToggleColor, var(--blue-500, var(--kui-color-text-primary, #{$kui-color-text-primary})));
    --KButtonPrimaryBase: var(--KTruncateCollapseBackground, var(--blue-100, var(--kui-color-background-primary-weakest, #{$kui-color-background-primary-weakest})));
    --KButtonPrimaryHover: var(--KTruncateCollapseHover, var(--blue-200, var(--kui-color-background-primary-weaker, #{$kui-color-background-primary-weaker})));
    --KButtonPrimaryActive: var(--KTruncateCollapseHover, var(--blue-200, var(--kui-color-background-primary-weaker, #{$kui-color-background-primary-weaker})));
  }

  &.k-truncate-content {
    display: flex;
    flex-direction: row-reverse;
    height: v-bind('wrapperHeight');

    &.expanded {
      height: auto;
    }
    .k-truncate-container {
      display: flex;
      flex-wrap: wrap;
      gap: v-bind('gap');
      margin-right: auto;
      position: relative;
    }

    .expand-trigger {
      font-size: var(--type-xs, var(--kui-font-size-20, $kui-font-size-20));

      &::before {
        content: '+';
        margin-right: -7px;
      }
    }
    .collapse-trigger {
      padding: var(--spacing-xxs, var(--kui-space-20, $kui-space-20));

      &:focus, &:active {
        box-shadow: none;
      }

      &:focus-within {
        background-color: var(--KTruncateCollapseHover, var(--blue-200, var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest)));
        outline: -webkit-focus-ring-color auto 1px;
      }
    }
  }
  &.k-truncate-text {
    display: flex;
    flex-direction: column;

    .k-truncate-container {
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: v-bind('props.rows');
      overflow: hidden;
    }
    &.expanded {
      .k-truncate-container {
        display: block;
      }
    }
    .expand-trigger,
    .collapse-trigger {
      font-size: var(--type-xs, var(--kui-font-size-20, $kui-font-size-20));
    }
  }

  .k-truncate-collapse-controls {
    margin-top: var(--kui-space-40, $kui-space-40) !important;
    place-self: flex-end !important;
  }
}
</style>
