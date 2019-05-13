<template>
  <div
    :aria-hidden="isHovering ? 'true' : 'false'"
    :data-message="message"
    :class="positionClass"
    :style="{'text-align': alignment}"
    class="k-tooltip"
    role="tooltip"
    @mouseout="isHovering(false)"
    @mouseover="isHovering(true)">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'KoolTip',
  props: {
    /**
     * Message to show in tooltip
     */
    message: {
      type: String,
      required: true
    },
    /**
     * Define which side the tooltip displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    position: {
      type: String,
      default: 'top',
      validator: function (value) {
        return [
          'top',
          'bottom',
          'left',
          'right'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Sets the text alignment of the tooltip<br>
     * 'left' | 'center' | 'right'
     */
    alignment: {
      type: String,
      default: 'left',
      validator: function (value) {
        return [
          'left',
          'right',
          'center'
        ].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      hovering: false
    }
  },

  computed: {
    positionClass () {
      return `k-tooltip-${this.position}`
    }
  },

  methods: {
    isHovering (isHovering) {
      this.hovering = isHovering
    }
  }
}
</script>

<style>
.k-tooltip {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.k-tooltip:before,
.k-tooltip:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 1090;
  transition: all 0.15s cubic-bezier(0.5, 1, 0.25, 1);
}
.k-tooltip:before {
  min-width: 275px;
  padding: .5rem .75rem;
  font-size: .875rem;
  font-weight: normal;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.15);
  content: attr(data-message);
}
.k-tooltip:after {
  width: 0;
  border: 8px solid transparent;
  content: "";
}
.k-tooltip:hover:before,
.k-tooltip:hover:after {
  visibility: visible;
  opacity: 1;
}

  /* position styling */
.k-tooltip.k-tooltip-top:before,
.k-tooltip.k-tooltip-top:after {
  bottom: 100%;
  transform: translateX(-50%);
}
.k-tooltip.k-tooltip-top:before {
  left: 100%;
  margin-bottom: 5px;
}
.k-tooltip.k-tooltip-top:after {
  left: 50%;
  border-top: 8px solid #fff;
  border-bottom: none;
  margin-bottom: -3px;
}
.k-tooltip.k-tooltip-top:hover:before,
.k-tooltip.k-tooltip-top:hover:after {
  transform: translateX(-50%) translateY(-5px);
}

.k-tooltip.k-tooltip-right:before,
.k-tooltip.k-tooltip-right:after {
  top: 50%;
  left: 100%;
  transform: translateY(-50%)
}
.k-tooltip.k-tooltip-right:before {
  margin-left: 5px;
}
.k-tooltip.k-tooltip-right:after {
  border-right: 8px solid #fff;
  border-left: none;
  margin-left: -3px;
}
.k-tooltip.k-tooltip-right:hover:before,
.k-tooltip.k-tooltip-right:hover:after {
  transform: translateX(5px) translateY(-50%);
}

.k-tooltip.k-tooltip-bottom:before,
.k-tooltip.k-tooltip-bottom:after {
  top: 100%;
  transform: translateX(-50%);
}
.k-tooltip.k-tooltip-bottom:before {
  left: 100%;
  margin-top: 5px;
}
.k-tooltip.k-tooltip-bottom:after {
  left: 50%;
  border-bottom: 8px solid #fff;
  border-top: none;
  margin-top: -3px;
}
.k-tooltip.k-tooltip-bottom:hover:before,
.k-tooltip.k-tooltip-bottom:hover:after {
  transform: translateX(-50%) translateY(5px);
}

.k-tooltip.k-tooltip-left:before,
.k-tooltip.k-tooltip-left:after {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
}
.k-tooltip.k-tooltip-left:before {
  margin-right: 5px;
}
.k-tooltip.k-tooltip-left:after {
  border-left: 8px solid #fff;
  border-right: none;
  margin-right: -3px;
}
.k-tooltip.k-tooltip-left:hover:before,
.k-tooltip.k-tooltip-left:hover:after {
  transform: translateX(-5px) translateY(-50%);
}
</style>