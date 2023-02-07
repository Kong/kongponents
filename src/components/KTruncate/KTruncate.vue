<template>
  <div
    ref="kTruncateWrapper"
    class="k-truncate"
    :class="[expanded ? 'expanded' : '', `k-truncate-${isTextContent ? 'text' : 'content'}`]"
    :style="widthStyle"
  >
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
              color="var(--KTruncateCollapseIconColor, var(--blue-500, color(blue-500)))"
              icon="chevronUp"
              size="10"
              title="Show less"
            />
          </KButton>
        </slot>
      </div>
    </div>
    <div
      v-if="!isTextContent && showToggle"
      class="d-flex h-100 align-items-end"
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
      v-if="isTextContent && (showToggle || expanded)"
      ref="textToggleControls"
      class="place-self-end mt-2"
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

const { getSizeFromString } = useUtilities()

const props = defineProps({
  rows: {
    type: Number,
    default: 1,
    validator: (value: Number): boolean => value > 0,
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

const truncatedCount = ref<number>(0)

/**
 * Sets wrapper height.
 * When rows prop === 1: sets wrapper height equal to height of the tallest child.
 * When rows prop > 1: wrapper hight will be rows count multiplied by height of the tallest child plus gap (10px).
 * For example if rows is 2 and all elements are equal height if 22px, wrapper height will be set to 54px (2 * 22 + 10).
 */
const setWrapperHeight = async (): Promise<void> => {
  if (props.isTextContent) {
    return
  }

  if (kTruncateContainer.value && kTruncateContainer.value.children?.length) {
    const children = kTruncateContainer.value.children as unknown as HTMLElement[]
    let tallestChildHeight = 0
    for (let i = 0; i < children.length; i++) {
      // find height of tallest child
      tallestChildHeight = children[i].offsetHeight > tallestChildHeight ? children[i].offsetHeight : tallestChildHeight
    }
    const targetWrapperHeight = (props.rows === 1 ? 0 : (props.rows - 1) * 10) + (tallestChildHeight * props.rows)
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
      }
    }
  }
}

const handleToggleClick = async () => {
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
  resizeObserver.value = new ResizeObserver(setWrapperHeight).observe(kTruncateContainer.value as HTMLDivElement)
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(kTruncateContainer.value)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-truncate {
  align-items: flex-start;
  display: flex;
  overflow: hidden;

  .expand-trigger,
  .collapse-trigger {
    --KButtonBtnLink: var(--KTruncateToggleColor, var(--blue-500, color(blue-500)));
    --KButtonPrimaryBase: var(--KTruncateCollapseBackground, var(--blue-100, color(blue-100)));
    --KButtonPrimaryHover: var(--KTruncateCollapseHover, var(--blue-200, color(blue-200)));
    --KButtonPrimaryActive: var(--KTruncateCollapseHover, var(--blue-200, color(blue-200)));
  }

  &.k-truncate-content {
    height: v-bind('wrapperHeight');

    &.expanded {
      height: auto;
    }
    .k-truncate-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      position: relative;
    }

    .expand-trigger {
      font-size: var(--type-xs);

      &::before {
        content: '+';
        margin-right: -7px;
      }
    }
    .collapse-trigger {
      padding: var(--spacing-xxs);

      &:focus, &:active {
        box-shadow: none;
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
      font-size: var(--type-xs);
    }
  }
}
</style>
