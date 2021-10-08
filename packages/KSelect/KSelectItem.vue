<template>
  <div
    :key="item.key"
    :data-testid="`k-select-item-${item.value}`"
    class="k-select-item"
    @click="handleClick">
    <button
      :class="{ disabled, selected: item.selected }"
      :value="item.value">
      <slot>{{ item.label }}</slot>
      <KIcon
        v-if="item.selected"
        class="selected-item-icon"
        icon="check"
        color="var(--blue-200)" />
    </button>
  </div>
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
