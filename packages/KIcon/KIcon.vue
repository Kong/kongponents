<template>
  <svg
    v-if="isSSR"
    :height="setSize || height"
    :width="setSize || width"
    :viewBox="setViewbox"
    :class="`kong-icon-${icon}`"
    class="kong-icon"
    role="img"
  >
    <title v-if="!hideTitle">{{ titleText }}</title>
    <slot name="svgElements"/>
    <g>
      <template v-for="(elem, idx) in fills">
        <circle
          v-if="elem.nodeName === 'circle'"
          :key="`${elem.cx}-${elem.cy}-${elem.r}-${idx}`"
          v-bind="fillAttributes[idx]"/>
        <rect
          v-if="elem.nodeName === 'rect'"
          :key="`${elem.x}-${elem.y}-${idx}`"
          v-bind="fillAttributes[idx]"/>
        <path
          v-if="elem.nodeName === 'path'"
          :key="elem.d"
          v-bind="fillAttributes[idx]"/>
      </template>
    </g>
  </svg>
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
  props: {
    /**
     * Checks for valid icon name<br>
     * 'back' | 'collapseExpand' | 'gateway' | 'gear' | 'info' | 'portal' | 'search' | 'security' | 'workspaces' | 'workspacesCollapsed' | 'vitals'
     */
    icon: {
      type: String,
      default: '',
      validator: function (value) {
        return iconNames.indexOf(value) !== -1
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
    }
  },

  data () {
    return {
      isSSR: false
    }
  },

  computed: {
    titleText () {
      if (this.title) { // use title prop if they provided
        return this.title
      }

      const titleElems = this.doc.getElementsByTagName('title')
      if (titleElems.length) { // use title in SVG if it exists
        return titleElems[0].innerHTML
      }

      const icnName = this.icon.split(/(?=[A-Z])/).join(' ') // split on capital letters in icon name and add space

      return this.convertToTitleCase(icnName)
    },
    iconSVG () {
      return icons[this.icon]
    },
    doc () {
      return new DOMParser().parseFromString(this.iconSVG, 'image/svg+xml')
    },
    svg () {
      return this.doc.getElementsByTagName('svg')[0]
    },
    fills () {
      return Array.from(this.doc.querySelectorAll(`[fill*="#"], [stroke*="#"]`))
    },
    fillAttributes () {
      return this.fills && this.fills.map(fill =>
        Array.from(fill.attributes).reduce((attr, { value, name }) => {
          const hasPreservedColor = fill.attributes.id && fill.attributes.id.value === 'preserveColor'
          const isSecondary = fill.attributes.type && fill.attributes.type.value === 'secondary'

          // color override
          if (!hasPreservedColor && name === 'fill' && this.secondaryColor && isSecondary) {
            attr[name] = value === 'none' ? 'none' : this.secondaryColor
          } else if (!hasPreservedColor && !isSecondary && name === 'fill' && this.color) {
            attr[name] = value === 'none' ? 'none' : this.color
          } else if (name === 'stroke' && this.color) {
            attr[name] = this.color
          } else {
            attr[name] = value
          }

          return attr
        }, {})
      )
    },
    width () {
      return this.svg.getAttribute('width')
    },
    height () {
      return this.svg.getAttribute('height')
    },
    setSize () {
      return this.size || this.svg.getAttribute('width') || DEFAULTS.size
    },
    setViewbox () {
      return this.viewBox || this.svg.getAttribute('viewBox') || DEFAULTS.viewBox
    }
  },

  beforeMount () {
    // Do not render KIcon until client is available
    this.isSSR = true
  },

  methods: {
    convertToTitleCase (str) {
      return str.split('-').map(i => i.charAt(0).toUpperCase() + i.substring(1)).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.kong-icon {
  &.kong-icon-spinner g {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: spin 1.2s infinite linear;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1turn); }
}
</style>
