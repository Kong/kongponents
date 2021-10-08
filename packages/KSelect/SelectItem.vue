<template>
  <div
    :key="item.key"
    class="k-select-item"
    @click="handleClick">
    <button
      :class="{ disabled, selected: item.selected }">
      <slot>{{ item.label }}</slot>
      <KIcon
        v-if="item.selected"
        class="selected-item-icon"
        icon="check"
        color="var(--blue-200)" />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SelectItem',
  props: {
    item: {
      type: Object,
      default: null,
      // Items must have a label
      validator: (item) => item.hasOwnProperty('label')
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
.k-select-item button {
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

  svg:not(.selected-item-icon) {
    margin-right: .75rem;
  }

  .selected-item-icon {
    margin-left: auto;
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
</style>
