<template>
  <div>
    <li v-if="$scopedSlots.default && $listeners.click">
      <button
        :disabled="disabled"
        class="btn-link k-button non-visual-button"
        v-on="listeners" >
        <slot />
      </button>
    </li>
    <li
      v-else-if="$scopedSlots.default || (item && !item.to)"
      :class="{ disabled: disabled }">
      <slot>{{ item.label }}</slot>
    </li>
    <li v-else-if="item.to">
      <router-link
        :data-testid="item.label"
        :to="item.to">
        {{ item.label }}
      </router-link>
    </li>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SelectItem',
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      // Items must have a label
      validator: (item) => item.hasOwnProperty('label')
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  font-size: var(--type-xs);
  line-height: 26px;
  color: var(--grey-600);

  svg {
    margin-right: .75rem;
  }

  &:hover {
    background-color: var(--grey-100);
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
