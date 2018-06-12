<template>
  <svg
    :height="setSize"
    :width="setSize"
    :viewBox="viewbox"
    class="kong-icon"
    role="img"
  >
    <title>{{ icon }}</title>
    <path
      :d="path"
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
     * 'collapseExpand'  | 'gateway' | 'portal' | 'security' | 'workspaces'| 'workspacesCollapsed' | 'vitals'
     */
    icon: {
      type: String,
      default: '',
      validator: function (value) {
        return iconNames.indexOf(value) !== -1
      }
    },
    /**
     * Defines the height and width in pixels
     */
    size: {
      type: Number,
      default: 24
    },
    /**
     * Optional fill color
     */
    color: {
      type: String,
      default: '#A3BBCC'
    },
    /**
     * Optional viewbox dimensions
     */
    viewBox: {
      type: String,
      default: '0 0 24 24'
    }
  },

  data () {
    return {
      icons,
      path: '',
      fill: '',
      viewbox: '',
      setSize: ''
    }
  },

  created () {
    let icon = icons[this.icon]
    let parser = new DOMParser()
    let doc = parser.parseFromString(icon, 'image/svg+xml')
    let svg = doc.getElementsByTagName('svg')[0]
    let path = doc.getElementsByTagName('path')[0]

    // Set path & fill if exist if not throw warning
    if (path) {
      this.path = path.getAttribute('d')
      this.setSize = this.size || svg.getAttribute('width')
      this.fill = this.color || path.getAttribute('fill')
      this.viewbox = this.viewBox || svg.getAttribute('viewBox')
    } else {
      console.warn('Warning: SVG Path not found')
    }
  }
}
</script>
