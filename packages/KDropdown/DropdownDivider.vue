<template>
  <li
    :aria-label="label ? label : null"
    role="separator">
    <div>{{ label }}</div>
    <hr>
  </li>
</template>

<script lang="ts">
export default {
  name: 'DropdownDivider',
  props: {
    label: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: default;
  color: var(--black-70);
  padding: 0.325rem 1rem 0.65rem 1rem;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &[role="separator"]:not(:first-child) {
    margin-top: 0.8rem;
  }

  div {
    flex: none;
  }
}

hr {
  border: none;
  /* IE uses color rather than background-color */
  color: var(--black-25);
  background-color: var(--black-25);
  margin-left: 0.4rem;
  width: 100%;
  height: 1px;
}
</style>
