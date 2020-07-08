<template>
  <svg
    v-if="isSSR"
    :height="setSize || height"
    :width="setSize || width"
    :viewBox="viewbox"
    :class="`kong-icon-${icon}`"
    class="kong-icon"
    role="img"
  >
    <title>{{ title || icon }}</title>
    <g>
      <path
        v-for="(path, idx) in paths"
        :key="path.d"
        v-bind="attributes[idx]"/>
    </g>
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
      default: '24'
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
      default: '0 0 24 24'
    },
    /**
     * Optional - Replaces default title attribute
     */
    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isSSR: false
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
    paths () {
      return this.doc.querySelectorAll('path').length ? Array.from(this.doc.querySelectorAll('path')) : console.warn('(KIcon) Warning: SVG Path not found')
    },
    attributes () {
      return this.paths && this.paths.map(path =>
        Array.from(path.attributes).reduce((attr, { value, name }) => {
          const hasPreservedColor = path.attributes.id && path.attributes.id.value === 'preserveColor'

          // color override
          if (name === 'fill' && this.color && !hasPreservedColor) {
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
      return this.size || this.svg.getAttribute('width')
    },
    viewbox () {
      return this.viewBox || this.svg.getAttribute('viewBox')
    }
  },

  beforeMount () {
    // Do not render KIcon until client is available
    this.isSSR = true
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
