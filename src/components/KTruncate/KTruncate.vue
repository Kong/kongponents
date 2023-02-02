<template>
  <div
    ref="wrapper"
    class="k-truncate"
    :class="[expanded ? 'expanded' : '', `k-truncate-${isTextContent ? 'text' : 'content'}`]"
  >
    <div
      ref="container"
      class="container"
    >
      <slot name="default" />
      <KToggle v-if="expanded">
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
      </KToggle>
    </div>
    <div
      v-if="showToggle"
      class="d-flex h-100 align-items-end"
    >
      <KToggle v-if="!expanded">
        <slot
          :excess-elements-count="excessElementsCount"
          :expand="handleToggleClick"
          name="expand-trigger"
        >
          <KButton
            appearance="btn-link"
            class="expand-trigger"
            is-rounded
            @click="handleToggleClick"
          >
            {{ excessElementsCount }}
          </KButton>
        </slot>
      </KToggle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

const props = defineProps({
  rows: {
    type: Number,
    default: 1,
    validator: (value: Number) => value > 0,
  },
  isTextContent: {
    type: Boolean,
    default: false,
  },
})

const expanded = ref<boolean>(false)

const showToggle = ref<boolean>(false)

const resizeObserver = ref()

const container = ref<HTMLDivElement>()
const wrapper = ref<HTMLDivElement>()
const wrapperHeight = ref<string>('0px')

const excessElementsCount = ref<number>(0)

/**
 * Sets wrapper height.
 * When rows prop === 1: sets wrapper height equal to height of the tallest child.
 * When rows prop > 1: wrapper hight will be rows count multiplied by height of the tallest child plus gap (10px).
 * For example if rows is 2 and all elements are equal height if 22px, wrapper height will be set to 54px (2 * 22 + 10).
 */
const setWrapperHeight = () => {
  if (container.value && container.value.children?.length) {
    const children = container.value.children as unknown as HTMLElement[]
    let tallestChildHeight = 0
    for (let i = 0; i < children.length; i++) {
      // find height of tallest child
      tallestChildHeight = children[i].offsetHeight > tallestChildHeight ? children[i].offsetHeight : tallestChildHeight
    }
    const targetWrapperHeight = (props.rows === 1 ? 0 : (props.rows - 1) * 10) + (tallestChildHeight * props.rows)
    wrapperHeight.value = container.value.offsetHeight > targetWrapperHeight ? `${targetWrapperHeight}px` : 'auto'
  }
}

const updateToggleVisibility = () => {
  setWrapperHeight()
  if (container.value && wrapper.value) {
    showToggle.value = container.value.offsetHeight > wrapper.value.offsetHeight
    countExcessElements()
  }
}

// Counts elements that are wrapped to the hidden rows and therefore are not visible.
const countExcessElements = () => {
  excessElementsCount.value = 0
  if (container.value && wrapper.value) {
    const children = container.value.children as unknown as HTMLElement[]
    for (let i = 0; i < children.length; i++) {
      /**
       * If element's offsetTop
       * (offset from the nearest relatively positioned parent, which is .container)
       * is greater than the wrapper element height - means it's not visible
       */
      if (children[i].offsetTop > wrapper.value.offsetHeight) {
        excessElementsCount.value += 1
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

onMounted(async () => {
  if (!props.isTextContent) {
    resizeObserver.value = new ResizeObserver(updateToggleVisibility).observe(container.value as HTMLDivElement)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(container.value)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-truncate {
  align-items: flex-start;
  display: flex;
  height: v-bind('wrapperHeight');
  overflow: hidden;
  width: 100%;

  &.k-truncate-content {
    &.expanded {
      height: auto;
    }
    .container {
      align-items: flex-start;
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
      --KButtonPrimaryBase: var(--KTruncateCollapseBackground, var(--blue-100, color(blue-100)));
      --KButtonPrimaryHover: var(--KTruncateCollapseHover, var(--blue-200, color(blue-200)));
      --KButtonPrimaryActive: var(--KTruncateCollapseHover, var(--blue-200, color(blue-200)));
      padding: var(--spacing-xxs);

      &:focus, &:active {
        box-shadow: none;
      }
    }
  }
}
</style>
