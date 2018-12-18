<template>
  <div
    :aria-hidden="isHovering ? 'true' : 'false'"
    :data-message="message"
    :class="positionClass"
    :style="{'text-align': alignment}"
    class="k-popover"
    role="tooltip"
    @mouseout="isHovering(false)"
    @mouseover="isHovering(true)">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'KPopover',
  props: {
    /**
     * Message to show in popover
     */
    message: {
      type: String,
      required: true
    },
    /**
     * Define which side the popover displays<br>
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
     * Sets the text alignment of the popover<br>
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
      return `k-popover-${this.position}`
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
.k-popover {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.k-popover:before,
.k-popover:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 1090;
  transition: all 0.15s cubic-bezier(0.5, 1, 0.25, 1);
}
.k-popover:before {
  min-width: 275px;
  padding: .5rem .75rem;
  font-size: .875rem;
  font-weight: normal;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.15);
  content: attr(data-message);
}
.k-popover:after {
  width: 0;
  border: 8px solid transparent;
  content: "";
}
.k-popover:hover:before,
.k-popover:hover:after {
  visibility: visible;
  opacity: 1;
}

  /* position styling */
.k-popover.k-popover-top:before,
.k-popover.k-popover-top:after {
  bottom: 100%;
  transform: translateX(-50%);
}
.k-popover.k-popover-top:before {
  left: 100%;
  margin-bottom: 5px;
}
.k-popover.k-popover-top:after {
  left: 50%;
  border-top: 8px solid #fff;
  border-bottom: none;
  margin-bottom: -3px;
}
.k-popover.k-popover-top:hover:before,
.k-popover.k-popover-top:hover:after {
  transform: translateX(-50%) translateY(-5px);
}

.k-popover.k-popover-right:before,
.k-popover.k-popover-right:after {
  top: 50%;
  left: 100%;
  transform: translateY(-50%)
}
.k-popover.k-popover-right:before {
  margin-left: 5px;
}
.k-popover.k-popover-right:after {
  border-right: 8px solid #fff;
  border-left: none;
  margin-left: -3px;
}
.k-popover.k-popover-right:hover:before,
.k-popover.k-popover-right:hover:after {
  transform: translateX(5px) translateY(-50%);
}

.k-popover.k-popover-bottom:before,
.k-popover.k-popover-bottom:after {
  top: 100%;
  transform: translateX(-50%);
}
.k-popover.k-popover-bottom:before {
  left: 100%;
  margin-top: 5px;
}
.k-popover.k-popover-bottom:after {
  left: 50%;
  border-bottom: 8px solid #fff;
  border-top: none;
  margin-top: -3px;
}
.k-popover.k-popover-bottom:hover:before,
.k-popover.k-popover-bottom:hover:after {
  transform: translateX(-50%) translateY(5px);
}

.k-popover.k-popover-left:before,
.k-popover.k-popover-left:after {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
}
.k-popover.k-popover-left:before {
  margin-right: 5px;
}
.k-popover.k-popover-left:after {
  border-left: 8px solid #fff;
  border-right: none;
  margin-right: -3px;
}
.k-popover.k-popover-left:hover:before,
.k-popover.k-popover-left:hover:after {
  transform: translateX(-5px) translateY(-50%);
}
</style>
