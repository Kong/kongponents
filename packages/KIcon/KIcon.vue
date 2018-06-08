<template>
  <svg
    :height="size"
    :width="size"
    class="kong-icon"
    viewBox="0 0 24 24"
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
     * Checks for valid icon name
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
    }
  },

  data () {
    return {
      icons,
      path: ''
    }
  },

  created () {
    let icon = icons[this.icon]
    let parser = new DOMParser()
    let doc = parser.parseFromString(icon, 'image/svg+xml')
    let path = doc.getElementsByTagName('path')[0]

    this.fill = this.color || path.getAttribute('fill')
    this.path = path.getAttribute('d')
  }
}
</script>
