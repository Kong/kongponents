<template>
  <div v-if="showTooltip">
    <ul
      class="tooltip"
      :style="{ left }"
    >
      <li>
        <span>{{ title }}</span>
        <span class="ml-auto">{{ context }}</span>
      </li>
      <li
        v-for="{ backgroundColor, borderColor, label, value } in series"
        :key="label"
      >
        <span
          class="tooltip-legend"
          :style="{ background: backgroundColor, 'border-color': borderColor }"
        />
        <span>{{ label }}</span>
        <span class="ml-auto">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    showTooltip: {
      type: Boolean,
      required: true,
      default: false
    },
    /**
     * The left position relative to the chart
     * eg. '10px'
     */
    left: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Chart title
     */
    title: {
      type: String,
      required: true,
      default: ''
    },
    /**
     * X axes value under cursor
     */
    context: {
      type: String,
      required: true,
      default: ''
    },
    /**
     * Array of all dataset series labels and colors under cursor
     */
    series: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  top: var(--spacing-xl);
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
  padding-left: 0px;
  list-style: none;
  font-family: "Roboto", monospace;
  font-size: var(--type-xs);
  min-width: 200px;
  border-radius: 3px;
  li {
    display: flex;
    margin: var(--spacing-xs);
  }
  li:first-child {
    font-size: 13px;
    padding-bottom: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--black-10);
  }
  span:first-child {
    font-weight: 500;
  }
}

.tooltip-legend {
  border-width: 2px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 6px;
  width: 13px;
  height: 13px;
}
</style>
