<template>
  <div
    ref="tagsWrapper"
    :class="{ 'entity-list-tags-wrapper': true, 'expanded': noCollapse || expanded }"
  >
    <div
      ref="tagsContainer"
      class="tags-container"
    >
      <KBadge
        v-for="tag in tags"
        :key="getTagLabel(tag)"
        :background-color="getTagBackground(tag) || defaultBackgroundColor"
        :color="getTagForeground(tag) || defaultColor"
        :is-bordered="getTagIsBordered(tag)"
      >
        <div>
          {{ getTagLabel(tag) }}
        </div>
      </KBadge>
    </div>
    <div
      v-if="showToggle"
      class="more-tags-toggle"
    >
      <KBadge
        :background-color="defaultBackgroundColor"
        :color="defaultColor"
        @click.stop="handleMoreToggleClick"
      >
        <img
          v-if="!expanded"
          alt="expand"
          src="@/components/KIcon/icons/icn-more-horizontal.svg"
        >
        <img
          v-else
          alt="collapse"
          src="@/components/KIcon/icons/icn-chevron-up.svg"
        >
      </KBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, PropType } from 'vue'
const props = defineProps({
  noCollapse: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  tagsAppearance: {
    type: String as PropType<'default' | 'light'>,
    required: false,
    default: 'default',
  },
})

const mapAppearanceToBackgroundColor = {
  default: 'var(--blue-100)',
  light: 'var(--grey-200)',
}

const mapAppearanceToColor = {
  default: 'var(--blue-500)',
  light: 'var(--grey-600)',
}

const defaultBackgroundColor = computed((): string => mapAppearanceToBackgroundColor[props.tagsAppearance])
const defaultColor = computed((): string => mapAppearanceToColor[props.tagsAppearance])

const expanded = ref<boolean>(false)
const showToggle = ref<boolean>(false)
const resizeObserver = ref(null)
const tagsContainer = ref<HTMLDivElement>()
const tagsWrapper = ref<HTMLDivElement>()
const updateToggleVisibility = () => {
  if (tagsContainer.value && tagsWrapper.value) {
    showToggle.value = tagsContainer.value.offsetHeight > tagsWrapper.value.offsetHeight && !props.noCollapse
  }
}
const handleMoreToggleClick = () => {
  expanded.value = props.noCollapse || !expanded.value
}
const getTagLabel = (tag) => {
  if (typeof tag === 'object' && tag !== null && 'label' in tag) {
    return tag.label
  }
  return tag
}
const getTagForeground = (tag) => {
  if (typeof tag === 'object' && tag !== null && 'foreground' in tag) {
    return tag.foreground
  }
  return undefined
}
const getTagBackground = (tag) => {
  if (typeof tag === 'object' && tag !== null && 'background' in tag) {
    return tag.background
  }
  return undefined
}
const getTagIsBordered = (tag) => {
  if (typeof tag === 'object' && tag !== null && 'isBordered' in tag) {
    return tag.isBordered
  }
  return undefined
}
onMounted(() => {
  resizeObserver.value = new ResizeObserver(updateToggleVisibility).observe(tagsContainer.value)
  updateToggleVisibility()
})
onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(tagsContainer.value)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
.entity-list-tags-wrapper {
  --KBadgeFontSize: 12px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  height: 28px;
  padding: 4px 0;
  transition: height linear 150ms;
  &.expanded {
    height: auto;
  }
  .tags-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    .k-badge {
      height: 20px;
      & > div{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .more-tags-toggle {
    margin-left: 10px;
    display: flex;
    box-sizing: border-box;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    .k-badge {
      padding: 4px;
      height: auto;
      line-height: 1;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: unset;
    }
  }
}
</style>
