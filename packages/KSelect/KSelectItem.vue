<template>
  <li
    :key="item.key"
    :data-testid="`k-select-item-${item.value}`"
    class="k-select-item"
    @click="handleClick">
    <div
      role="option"
      class="d-block">
      <button
        :class="{ disabled, selected: item.selected }"
        :value="item.value">
        <span class="k-select-item-label mr-2">
          <slot name="content">{{ item.label }}</slot>
        </span>
        <span class="k-select-selected-icon-container">
          <KIcon
            v-if="item.selected"
            class="selected-item-icon"
            icon="check"
            color="var(--blue-200)" />
        </span>
      </button>
    </div>
  </li>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'SelectItem',
  components: { KIcon },
  props: {
    item: {
      type: Object,
      default: null,
      // Items must have a label and value
      validator: (item) => item.hasOwnProperty('label') && item.hasOwnProperty('value')
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('selected', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-select-item {
  margin-bottom: 6px;
  list-style: none !important;

  button {
    display: flex;
    align-items: center;
    font-size: var(--type-xs);
    line-height: 26px;
    color: var(--grey-500);
    padding-left: var(--spacing-xxs);
    width: 100%;
    border: none;
    font-family: var(--font-family-sans);
    background-color: var(--white);
    border-radius: 4px;
    text-align: left;
    font-weight: 200;

    &:not(:disabled),
    &:not(.disabled) {
      cursor: pointer;
    }

    .k-select-item-label {
      width: auto;
      line-height: 16px;
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: .75rem;
    }

    .k-select-selected-icon-container {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      height: 24px;
      width: 24px;

      .kong-icon {
        position: relative;
        top: 0;
      }
    }

    &:hover {
      background-color: var(--grey-100);
      color: var(--grey-600);
    }

    &.selected {
      background-color: var(--blue-100);
      color: var(--blue-500);
      font-weight: 400;
    }

    &.danger {
      color: var(--red-500);
    }
  }
}
</style>
