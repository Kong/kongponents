<template>
  <div
    :class="{ 'is-first-step': isFirst, 'is-last-step': isLast, 'is-pending': state === 'pending' }"
    class="k-step"
  >
    <div class="d-flex">
      <div class="k-step-state-container mb-4">
        <div
          v-if="state === 'pending'"
          title="Pending"
          class="k-step-spinner mx-3"
        />
        <div v-else-if="state === 'completed'">
          <svg
            width="40"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <title>Completed</title>
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="#169FCC"
              stroke="#fff"
              stroke-width="8"/>
            <path
              d="m25 17-6 6-3-3"
              fill="#169FCC"/>
            <path
              d="m25 17-6 6-3-3"
              stroke="#fff"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg>
        </div>
        <div v-else-if="state === 'error'">
          <svg
            width="40"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <title>Error</title>
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="#D44324"
              stroke="#fff"
              stroke-width="8"/>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.74 17.517a.889.889 0 0 0-1.257-1.257L20 18.743l-2.483-2.483a.889.889 0 0 0-1.257 1.257L18.743 20l-2.483 2.483a.889.889 0 0 0 1.257 1.257L20 21.257l2.483 2.483a.889.889 0 0 0 1.257-1.257L21.257 20l2.483-2.483Z"
              fill="#fff"/>
          </svg>

        </div>
        <div v-else>
          <svg
            width="40"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <title>Default</title>
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="#E7E7EC"
              stroke="#fff"
              stroke-width="8"/>
          </svg>
        </div>
      </div>
      <div v-if="!isLast">
        <KStepDivider />
      </div>
    </div>
    <div class="k-step-label">
      <KLabel>
        {{ label }}
      </KLabel>
    </div>
  </div>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import KStepDivider from './KStepDivider.vue'
import IconCompleted from './state-icons/icn-completed.svg?raw'

export default {
  name: 'KStep',
  components: { KLabel, KStepDivider, IconCompleted },
  props: {
    label: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'pending', 'completed', 'error'].includes(value)
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.k-step {
  --KStepContainerWidth: 170px;
  --KStepStateWidth: 24px;

  width: fit-content;

  .k-step-label {
    width: var(--KStepContainerWidth);
    text-align: center;
    margin-left: calc(((#{var(--KStepContainerWidth)} * .5) - #{var(--KStepStateWidth)}) * -1);
  }

  &.is-first-step {
    .k-step-state-container {
      margin-left: calc((#{var(--KStepContainerWidth)} * .5) - #{var(--KStepStateWidth)});
    }

    .k-step-label {
      margin-left: 0;
    }
  }

  &:not(.is-pending) {
    .k-step-state-container {
      position: relative;
      top: -8px;
    }

    .k-step-label {
      position: relative;
      top: -16px;
    }
  }

  .k-step-spinner {
    font-size: 10px;
    text-indent: -9999em;
    width: var(--KStepStateWidth);
    height: var(--KStepStateWidth);
    border-radius: 50%;
    background: #038C8C;
    background: -moz-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &:before {
      width: 50%;
      height: 50%;
      background: #038C8C;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
    }

    &:after {
      background: #fff;
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: '';
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
