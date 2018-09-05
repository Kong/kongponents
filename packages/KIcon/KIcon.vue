<template>
  <svg
    :height="setSize || height"
    :width="setSize || width"
    :viewBox="viewbox"
    class="kong-icon"
    role="img"
  >
    <title>{{ icon }}</title>
    <path
      v-bind="attributes"
      :fill="fill" />
  </svg>
</template>

<script>
import icons from './icons'
const iconNames = Object.keys(icons)

export default {
  name: 'KIcon',
  props: {
    /**
     * Checks for valid icon name<br>
     * 'collapseExpand'  | 'gateway' | 'portal' | 'security' | 'workspaces'| 'workspacesCollapsed' | 'vitals' | 'back' | 'search'
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
      default: null
    },
    /**
     * Optional - Sets Fill color
     */
    color: {
      type: String,
      default: null
    },
    /**
     * Optional - Defines viewbox dimensions
     */
    viewBox: {
      type: String,
      default: null
    }
  },

  computed: {
    iconSVG () {
      return icons[this.icon]
    },
    doc () {
      return new DOMParser().parseFromString(this.iconSVG, 'image/svg+xml')
    },
    svg () {
      return this.doc.getElementsByTagName('svg')[0]
    },
    path () {
      return this.doc.getElementsByTagName('path')[0] || console.warn('(KIcon) Warning: SVG Path not found')
    },
    attributes () {
      if (this.path) {
        let attrs = Array.prototype.slice.call(this.path.attributes)
        let attributes = {}

        attrs.forEach((attr) => {
          const { value, name } = attr

          attributes[name] = value
        })

        return attributes
      }
    },
    width () {
      return this.svg.getAttribute('width')
    },
    height () {
      return this.svg.getAttribute('height')
    },
    setSize () {
      return this.size || this.svg.getAttribute('width')
    },
    fill () {
      return this.color || this.path.getAttribute('fill')
    },
    viewbox () {
      return this.viewBox || this.svg.getAttribute('viewBox')
    }
  }
}
</script>
