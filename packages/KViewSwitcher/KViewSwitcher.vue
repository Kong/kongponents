<template>
  <KButton
    :class="[view, { 'is-animating': isAnimating }]"
    class="view-switch-button"
    @click="toggleView"
  >
    <div class="icon">
      <div class="dots">
        <i
          v-for="i in 4"
          :key="i" />
      </div>
      <div class="lines">
        <i
          v-for="i in 4"
          :key="i" />
      </div>
    </div>
    <div
      v-if="hasLabel"
      class="text">
      <span>Grid</span>
      <span>List</span>
    </div>
  </KButton>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'ViewSwitcher',
  components: { KButton },
  props: {
    view: {
      type: String,
      required: true,
      validator: (val) => ['grid', 'list'].includes(val)
    },
    hasLabel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isAnimating: false
    }
  },
  methods: {
    toggleView () {
      this.isAnimating = true // can stay on after initial click
      setTimeout(() => {
        // this.isAnimating = false// can stay on after initial click
      }, 500)
      this.$emit('view-changed', this.view === 'list' ? 'grid' : 'list')
    }
  }
}
</script>

<style lang="scss">
// Originally forked and modified from https://codepen.io/aaroniker/pen/dyoKeMP
.view-switch-button {
  --KButtonSecondaryBackground: var(--white);
  --KButtonSecondaryActiveBackground: var(--white);
  --KButtonPaddingY: var(--spacing-xxs);
  --KButtonPaddingX: var(--spacing-xxs);

  --color: var(--black-70);
  --icon-color: var(--black-25);
  // --span-name: text;
  // --dots-name: back;
  // --lines-name: scale-down;
  padding: 6px 12px 6px 8px;
  margin: 0;
  display: flex;
  outline: none;
  position: relative;
  border: none;
  border-radius: 9px;
  background: var(--b, var(--background));
  cursor: pointer;
  -webkit-appearence: none;
  -webkit-tap-highlight-color: transparent;
  .icon {
    width: 24px;
    height: 24px;
    position: relative;
    i {
      position: absolute;
      left: var(--left, 4px);
      top: var(--top, 4px);
      display: block;
      border-radius: 2px;
      width: var(--width, 7px);
      height: var(--height, 7px);
      background: var(--icon-color);
      animation: var(--name, var(--dots-name, none))
        var(--duration, var(--dots-duration, 5s))
        var(--easing, var(--dots-easing, linear)) forwards
        var(--delay, var(--dots-delay, 0s));
    }
    .dots {
      i {
        &:nth-child(1) {
          --x-middle: -8px;
          --y-middle: 10px;
          --x-end: -2px;
          --y-end: 12px;
          --x-back: 10px;
          --y-back: 7px;
          --x-back-end: 9px;
          --y-back-end: 0;
        }
        &:nth-child(2) {
          --left: 13px;
          --x-middle: -12px;
          --y-middle: 5px;
          --x-end: -11px;
          --y-end: 7px;
          --x-back: -3px;
          --y-back: 1px;
          --x-back-end: -9px;
          --y-back-end: 0;
        }
        &:nth-child(3) {
          --top: 13px;
          --x-middle: 4px;
          --y-middle: -5px;
          --x-end: -2px;
          --y-end: -7px;
          --x-back: -5px;
          --y-back: 0px;
          --x-back-end: 9px;
          --y-back-end: 0;
        }
        &:nth-child(4) {
          --left: 13px;
          --top: 13px;
          --x-middle: 0;
          --y-middle: -10px;
          --x-end: -11px;
          --y-end: -12px;
          --x-back: -14px;
          --y-back: -8px;
          --x-back-end: -9px;
          --y-back-end: 0;
        }
      }
    }
    .lines {
      --name: var(--lines-name, none);
      --duration: var(--lines-duration, 0.15s);
      --easing: var(--lines-easing, linear);
      --delay: var(--lines-delay, 0s);
      i {
        --left: 9px;
        --top: 3px;
        --height: 2px;
        --width: 11px;
        transform-origin: 0 50%;
        transform: translateY(20%) translateZ(0) scaleX(0);
        &:nth-child(2) {
          --top: 8px;
        }
        &:nth-child(3) {
          --top: 13px;
        }
        &:nth-child(4) {
          --top: 18px;
        }
        &:nth-child(3),
        &:nth-child(4) {
          transform-origin: 100% 50%;
        }
      }
    }
  }
  .text {
    margin-left: 4px;
    position: relative;
    line-height: 24px;
    font-weight: 600;
    font-size: 14px;
    min-width: 28px;
    color: var(--color);
    span {
      --y-default: 0;
      --o-default: 1;
      --y-active: -12px;
      --o-active: 0;
      display: block;
      opacity: var(--o-default);
      transform: translateY(var(--y-default)) translateZ(0);
      animation: var(--span-name, none) 0.4s ease forwards;
      &:last-child {
        --y-default: 12px;
        --o-default: 0;
        --y-active: 0;
        --o-active: 1;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  &.list {
    // animation: none;
    --span-name: text-active;
    --dots-name: none;
    --lines-name: scale;
    .dots i {
      // animation: none;
      // transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(0.4);
    }
    .lines {
     i {
      //  animation: none;
        // transform: translateY(20%) translateZ(0) scaleX(1);
      }
    }
  }
  &.is-animating {
    --span-name: text;
    --dots-name: back;
    --lines-name: scale-down;
    .lines {
      i {
        transform-origin: 0 50%;
        &:nth-child(3),
        &:nth-child(4) {
          transform-origin: 100% 50%;
        }
      }
    }
    &.list {
      --span-name: text-active;
      --dots-name: move;
      --lines-name: scale;
      --lines-duration: .15s;
      --lines-delay: .3s;
      .lines {
        i {
          transform-origin: 100% 50%;
          &:nth-child(3),
          &:nth-child(4) {
            transform-origin: 0 50%;
          }
        }
      }
    }
  }
}

@keyframes text {
  0% {
    opacity: var(--o-active);
    transform: translateY(var(--y-active)) translateZ(0);
  }
  100% {
    opacity: var(--o-default);
    transform: translateY(var(--y-default)) translateZ(0);
  }
}

@keyframes text-active {
  0% {
    opacity: var(--o-default);
    transform: translateY(var(--y-default)) translateZ(0);
  }
  100% {
    opacity: var(--o-active);
    transform: translateY(var(--y-active)) translateZ(0);
  }
}

@keyframes move {
  50% {
    transform: translate(var(--x-middle, 0), var(--y-middle, 0)) scale(0.4);
  }
  100% {
    transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(0.4);
  }
}

@keyframes back {
  0%,
  15% {
    transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(0.4);
  }
  50% {
    transform: translate(var(--x-back, 0), var(--y-back, 0)) scale(0.5);
  }
  100% {
    transform: translate(var(--x-back-end, 0), var(--y-back-end, 0)) scale(1);
  }
}

@keyframes scale {
  100% {
    transform: translateY(20%) translateZ(0) scaleX(1);
  }
}

@keyframes scale-down {
  0% {
    transform: translateY(20%) translateZ(0) scaleX(1);
  }
  100% {
    transform: translateY(20%) translateZ(0) scaleX(0);
  }
}
</style>
