<template>
  <div
    :class="{
      'is-first-step': isFirst,
      'is-last-step': isLast,
      'is-pending': state === 'pending'
    }"
    class="k-step"
  >
    <div
      :style="stepContainerStyles"
      class="k-step-state-container d-flex mb-5"
    >
      <KStepState
        :state="state"
        :step-size="stepSize"
      />

      <div
        v-if="!isLast"
        class="k-step-divider-container"
      >
        <KStepDivider
          :is-completed="state === 'completed'"
          :width="dividerWidth ? String(dividerWidth) : undefined"
          :step-size="stepSize"
        />
      </div>
    </div>

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
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import KStepDivider from './KStepDivider.vue'
import KStepState from './KStepState.vue'

export default {
  name: 'KStep',
  components: { KLabel, KStepDivider, KStepState },
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
    },
    // The below are private properties used for calculating styles
    // We are not allowing customization at this stage
    stepSize: {
      type: Number,
      default: undefined
    },
    stepContainerWidth: {
      type: Number,
      default: undefined
    },
    dividerWidth: {
      type: Number,
      default: undefined
    },
    margins: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    labelStyle () {
      return {
        // must use explicit width so all steps are the same size regardless of label length
        width: this.stepContainerWidth + 'px',
        marginLeft: !this.isFirst ? this.margins * -1 + 'px' : 'unset'
      }
    },
    stepContainerStyles () {
      if (this.isFirst) {
        return {
          marginLeft: this.margins + 'px'
        }
      }

      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-step {
  width: fit-content;

  .k-step-label {
    --KInputLabelWeight: 400;
    text-align: center;

    &.bolder {
      --KInputLabelWeight: 600;
    }
  }

  &.is-first-step {
    .k-step-label {
      margin-left: 0;
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
