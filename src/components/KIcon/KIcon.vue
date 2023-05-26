<!-- eslint-disable vue/no-v-html -->
<template>
  <span
    v-if="!$slots.svgElements"
    v-bind="$attrs"
    ref="svgWrapper"
    class="kong-icon"
    :class="`kong-icon-${icon}`"
    v-html="icons[icon]"
  />
  <span
    v-else
    v-bind="$attrs"
    ref="svgWrapper"
    class="kong-icon"
    :class="`kong-icon-${icon}`"
  >
    <svg class="slot-content">
      <slot name="svgElements" />
    </svg>
    <span
      :class="{ 'svg-with-slot-is-hidden': svgWithSlotIsHidden }"
      v-html="icons[icon]"
    />
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch, useAttrs, useSlots } from 'vue'
import * as allIcons from './icons'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const icons: Array<string, any[]> = allIcons

const DEFAULTS = {
  size: '24',
  viewBox: '0 0 24 24',
}

const props = defineProps({
  /**
     * Checks for valid icon name
     */
  icon: {
    type: String,
    validator: (value: string): boolean => {
      return Object.keys(allIcons).includes(value)
    },
    required: true,
  },
  /**
     * Optional - Overrides default height and width with equal value
     */
  size: {
    type: String,
    default: '',
  },
  /**
     * Optional - Sets Fill color
     */
  color: {
    type: String,
    default: null,
  },
  secondaryColor: {
    type: String,
    default: null,
  },
  /**
     * Optional - Defines viewbox dimensions
     */
  viewBox: {
    type: String,
    default: '',
  },
  /**
     * Optional - Replaces default title attribute
     */
  title: {
    type: String,
    default: '',
  },
  /**
     * Optional - Prevents title from being shown on hover. Used by KTooltip
     */
  hideTitle: {
    type: Boolean,
    default: false,
  },
  /**
     * If testMode enabled use the icon name for the title so we can test
     */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const attrs = useAttrs()
const slots = useSlots()

const svgWrapper = ref<HTMLElement>()
const svg = ref<any>()
const svgWithSlotIsHidden = ref(true)

const titleText = computed((): string => {
  if (props.title) { // use title prop if they provided
    return props.title
  }

  if (props.testMode) {
    return props.icon
  }

  const titleElems: any = svg.value && svg.value.getElementsByTagName('title')
  if (titleElems && titleElems.length) { // use title in SVG if it exists
    return titleElems[0].innerHTML
  }

  const icnName = props.icon.split(/(?=[A-Z])/).join(' ') // split on capital letters in icon name and add space

  return convertToTitleCase(icnName)
})

const width = computed((): string | null => svg.value ? svg.value.getAttribute('width') : null)

const height = computed((): string | null => svg.value ? svg.value.getAttribute('height') : null)

const setSize = computed((): string => svg.value ? (props.size || (svg.value && svg.value.getAttribute('width')) || DEFAULTS.size) : DEFAULTS.size)

const setViewbox = computed((): string => svg.value ? (props.viewBox || (svg.value && svg.value.getAttribute('viewBox')) || DEFAULTS.viewBox) : DEFAULTS.viewBox)

const convertToTitleCase = (str: string): string => {
  return str.split('-').map(i => i.charAt(0).toUpperCase() + i.substring(1)).join(' ')
}

const addSlotContent = (): void => {
  // Get slot content
  const slotContent = svgWrapper?.value?.querySelector('.slot-content')?.innerHTML

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  svgWrapper.value?.removeChild(svgWrapper?.value?.querySelector('.slot-content'))

  // Move slot content inside svg
  svg.value.innerHTML += slotContent

  // Done rendering slot, so set hidden to false
  svgWithSlotIsHidden.value = false
}

const setSvgTitle = (): void => {
  let svgTitle = svg.value.querySelector('title')
  // Hide title
  if (svgTitle && props.hideTitle) {
    svg.value.removeChild(svgTitle)
  } else if (!props.hideTitle) {
    if (!svgTitle) {
      // No title element exists, create one
      svgTitle = document.createElement('title')
      // Set title
      const svgTitleText = document.createTextNode(titleText.value)

      svgTitle.appendChild(svgTitleText)
      svg.value.append(svgTitle)
    } else {
      svgTitle.textContent = titleText.value
    }
  }
}

const recursivelyCustomizeIconColors = (el: any): void => {
  if (!el) {
    return
  }

  const fillValue = el.hasAttribute('fill')
  const strokeValue = el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none' ? el.getAttribute('stroke') : null
  const hasPreservedColor = el.attributes.id && el.attributes.id.value === 'preserveColor'
  const isSecondary = el.attributes.type && el.attributes.type.value === 'secondary'

  if (!hasPreservedColor && fillValue && isSecondary && props.secondaryColor) {
    el.setAttribute('fill', props.secondaryColor)
  } else if (!hasPreservedColor && strokeValue && isSecondary && props.secondaryColor) {
    el.setAttribute('stroke', props.secondaryColor)
  } else if (!hasPreservedColor && !isSecondary && fillValue && !strokeValue && props.color) {
    el.setAttribute('fill', props.color)
  } else if (strokeValue && props.color) {
    el.setAttribute('stroke', props.color)
  }

  for (const child of el.children) {
    recursivelyCustomizeIconColors(child)
  }
}

// Re-render the svg if the icon prop changes
watch(() => [props.icon, props.size, props.color, props.secondaryColor, props.viewBox, props.hideTitle], async () => {
  await nextTick()

  renderIcon()
}, { deep: true })

const renderIcon = (): void => {
  svg.value = null

  // Set svg
  svg.value = svgWrapper.value ? svgWrapper.value.querySelector('svg:not(.slot-content)') : null

  if (svg.value) {
    // Check for slot content
    if (slots.svgElements) {
      addSlotContent()
    }

    // Bind attributes
    for (const [attributeName, attributeValue] of Object.entries(attrs)) {
      if (!['class', 'id', 'style'].includes(attributeName)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        svg.value.setAttribute(attributeName, attributeValue)
      }
    }

    // Add role
    svg.value.setAttribute('role', 'img')

    // Set size
    svg.value.setAttribute('width', setSize.value || width.value)
    svg.value.setAttribute('height', setSize.value || height.value)
    svg.value.setAttribute('viewBox', setViewbox.value)

    // Set title
    setSvgTitle()

    // Customize icon colors
    recursivelyCustomizeIconColors(svg.value)
  }
}

onMounted(async () => {
  await nextTick()

  renderIcon()
})
</script>

<style lang="scss" scoped>
.kong-icon {
  display: inline-block;

  .slot-content,
  .svg-with-slot-is-hidden {
    display: none !important;
    visibility: hidden !important;
  }
}
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped
.kong-icon {
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(1turn); }
  }
}

// unscoped, so the svg <g> element can be accessed from the imported file
.kong-icon.kong-icon-spinner svg g {
  animation: spin 1.2s infinite linear;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
</style>
