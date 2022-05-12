<template>
  <span
    v-if="!$slots.svgElements"
    ref="svgWrapper"
    :class="`kong-icon-${icon}`"
    class="kong-icon"
    v-html="icons[icon]"/>
  <span
    v-else
    ref="svgWrapper"
    :class="`kong-icon-${icon}`"
    class="kong-icon">
    <svg class="slot-content">
      <slot name="svgElements"/>
    </svg>
    <span
      :class="{ 'svg-with-slot-is-hidden': svgWithSlotIsHidden }"
      v-html="icons[icon]"/>
  </span>
</template>

<script>
import icons from './icons'
const iconNames = Object.keys(icons)
const DEFAULTS = {
  size: '24',
  viewBox: '0 0 24 24'
}

export default {
  name: 'KIcon',
  inheritAttrs: false,
  props: {
    /**
     * Checks for valid icon name
     */
    icon: {
      type: String,
      default: '',
      validator: function (value) {
        return iconNames.includes(value)
      },
      required: true
    },
    /**
     * Optional - Overrides default height and width with equal value
     */
    size: {
      type: String,
      default: ''
    },
    /**
     * Optional - Sets Fill color
     */
    color: {
      type: String,
      default: null
    },
    secondaryColor: {
      type: String,
      default: null
    },
    /**
     * Optional - Defines viewbox dimensions
     */
    viewBox: {
      type: String,
      default: ''
    },
    /**
     * Optional - Replaces default title attribute
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Optional - Prevents title from being shown on hover. Used by KoolTip
     */
    hideTitle: {
      type: Boolean,
      default: false
    },
    /**
     * If testMode enabled use the icon name for the title so we can test
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      svg: null,
      icons: icons,
      svgWithSlotIsHidden: true
    }
  },

  computed: {
    titleText () {
      if (this.title) { // use title prop if they provided
        return this.title
      }

      if (this.testMode) {
        return this.icon
      }

      const titleElems = this.svg && this.svg.getElementsByTagName('title')
      if (titleElems && titleElems.length) { // use title in SVG if it exists
        return titleElems[0].innerHTML
      }

      const icnName = this.icon.split(/(?=[A-Z])/).join(' ') // split on capital letters in icon name and add space

      return this.convertToTitleCase(icnName)
    },
    fills () {
      return this.svg ? Array.from(this.svg.querySelectorAll(`[fill*="#"], [stroke*="#"]`)) : null
    },
    width () {
      return this.svg ? this.svg.getAttribute('width') : null
    },
    height () {
      return this.svg ? this.svg.getAttribute('height') : null
    },
    setSize () {
      return this.svg ? (this.size || (this.svg && this.svg.getAttribute('width')) || DEFAULTS.size) : DEFAULTS.size
    },
    setViewbox () {
      return this.svg ? (this.viewBox || (this.svg && this.svg.getAttribute('viewBox')) || DEFAULTS.viewBox) : DEFAULTS.viewBox
    }
  },
  watch: {
    // Ensure icon color is updated when color prop value changes
    color: {
      handler () {
        this.recursivelyCustomizeIconColors(this.svg)
      }
    }
  },

  mounted () {
    this.$nextTick(function () {
      // Set svg
      this.svg = this.$refs.svgWrapper ? this.$refs.svgWrapper.querySelector('svg:not(.slot-content)') : null

      if (this.svg) {
        // Check for slot content
        if (this.$slots.svgElements && this.$slots.svgElements.length) {
          this.addSlotContent()
        }

        // Bind attributes
        for (const [attributeName, attributeValue] of Object.entries(this.$attrs)) {
          this.svg.setAttribute(attributeName, attributeValue)
        }

        // Add role
        this.svg.setAttribute('role', 'img')

        // Set size
        this.svg.setAttribute('width', this.setSize || this.width)
        this.svg.setAttribute('height', this.setSize || this.height)
        this.svg.setAttribute('viewBox', this.setViewbox)

        // Set title
        this.setSvgTitle()

        // Customize icon colors
        this.recursivelyCustomizeIconColors(this.svg)
      }
    })
  },

  methods: {
    convertToTitleCase (str) {
      return str.split('-').map(i => i.charAt(0).toUpperCase() + i.substring(1)).join(' ')
    },
    addSlotContent () {
      // Get slot content
      const slotContent = this.$refs.svgWrapper.querySelector('.slot-content').innerHTML

      this.$refs.svgWrapper.removeChild(this.$refs.svgWrapper.querySelector('.slot-content'))

      // Move slot content inside svg
      this.svg.innerHTML += slotContent

      // Done rendering slot, so set display to true
      this.svgWithSlotIsHidden = false
    },
    setSvgTitle () {
      let svgTitle = this.svg.querySelector('title')
      // Hide title
      if (svgTitle && this.hideTitle) {
        this.svg.removeChild(svgTitle)
      } else if (!this.hideTitle) {
        if (!svgTitle) {
          // No title element exists, create one
          svgTitle = document.createElement('title')
          // Set title
          const svgTitleText = document.createTextNode(this.titleText)

          svgTitle.appendChild(svgTitleText)
          this.svg.append(svgTitle)
        } else {
          svgTitle.textContent = this.titleText
        }
      }
    },
    recursivelyCustomizeIconColors (el) {
      if (!el) {
        return
      }

      const fillValue = el.hasAttribute('fill')
      const strokeValue = el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none' ? el.getAttribute('stroke') : null
      const hasPreservedColor = el.attributes.id && el.attributes.id.value === 'preserveColor'
      const isSecondary = el.attributes.type && el.attributes.type.value === 'secondary'

      if (!hasPreservedColor && fillValue && isSecondary && this.secondaryColor) {
        el.setAttribute('fill', this.secondaryColor)
      } else if (!hasPreservedColor && !isSecondary && fillValue && !strokeValue && this.color) {
        el.setAttribute('fill', this.color)
      } else if (strokeValue && this.color) {
        el.setAttribute('stroke', this.color)
      }

      [].forEach.call(el.children, child => {
        this.recursivelyCustomizeIconColors(child)
      })
    }
  }
}
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
// unscoped, so the svg <g> element can be accessed from the imported file
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1turn); }
}

.kong-icon.kong-icon-spinner svg g {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: spin 1.2s infinite linear;
}
</style>
