<template>
  <li class="k-step">
    <div
      :class="{ 'completed': state === 'completed' }"
      class="k-step-container"
    >
      <KStepState :state="state" />

      <div
        :class="{
          'bolder': state === 'pending' || state === 'error',
          'error': state === 'error'
        }"
        :style="labelStyle"
        class="k-step-label"
      >
        <KLabel>
          {{ label }}
        </KLabel>
      </div>
    </div>
  </li>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import KStepState from './KStepState.vue'

export default {
  name: 'KStep',
  components: { KLabel, KStepState },
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
    maxLabelWidth: {
      type: String,
      default: '170'
    }
  },
  computed: {
    labelStyle () {
      return {
        maxWidth: this.maxLabelWidth === 'auto' || this.maxLabelWidth.endsWith('%') || this.maxLabelWidth.endsWith('vw') || this.maxLabelWidth.endsWith('px') ? this.maxLabelWidth : this.maxLabelWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-step {
  display: list-item;
  padding: 12px 0;
  flex: 1 1 0%;

  &:last-child > .k-step-container::after {
    display: none;
  }

  .k-step-container {
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--spacing-xxs);
    position: relative;

    .k-step-label {
      --KInputLabelWeight: 400;
      min-width: 100px;
      padding: 10px;
      text-align: center;

      &.bolder {
        --KInputLabelWeight: 600;
      }
    }

    /**
     * Divider styles
     */
    &::after {
      content: "";
      height: 2px;
      width: 100%;
      position: absolute;
      top: 10px;
      left: 50%;
      z-index: 0;
      background-color: var(--grey-300);
    }

    &.completed::after {
      background-color: var(--teal-300);
    }
  }
}
</style>

<style lang="scss">
@import '~@kongponents/styles/variables';

.k-step {
  .k-step-label {
    &.error .k-input-label {
      color: var(--red-500);
    }
  }
}
</style>
