<template>
  <div
    class="k-select-item"
    @click="handleClick">
    <li
      v-if="$scopedSlots.default && $listeners.click"
      :class="{ selected: item.selected }">
      <button
        :disabled="disabled"
        class="btn-link k-button non-visual-button"
        v-on="listeners" >
        <slot />
      </button>
      <KIcon
        v-if="item.selected"
        class="selected-item-icon"
        icon="check"
        color="var(--blue-200)" />
    </li>
    <li
      v-else-if="$scopedSlots.default || (item && !item.to)"
      :class="{ disabled, selected: item.selected }">
      <slot>{{ item.label }}</slot>
      <KIcon
        v-if="item.selected"
        class="selected-item-icon"
        icon="check"
        color="var(--blue-200)" />
    </li>
    <li
      v-else-if="item.to"
      :class="{ selected: item.selected }">
      <router-link
        :data-testid="item.label"
        :to="item.to">
        {{ item.label }}
      </router-link>
      <KIcon
        v-if="item.selected"
        class="selected-item-icon"
        icon="check"
        color="var(--blue-200)" />
    </li>
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
.k-select-item li {
  display: flex;
  align-items: center;
  font-size: var(--type-xs);
  line-height: 26px;
  color: var(--grey-500);
  padding-left: var(--spacing-xxs);

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

  button, a {
    text-align: left;
    padding: .625rem 1rem;
    text-decoration: none;
    width: 100%;
    color: var(--black-70);

    &:disabled {
      cursor: not-allowed;
    }
  }

  &.danger button:not(:disabled):hover {
    color: var(--black-70);
    transition: all 300ms;

    &:hover {
      color: var(--red-500);
    }
  }
}
</style>
