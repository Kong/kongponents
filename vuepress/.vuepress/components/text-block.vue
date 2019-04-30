<template>
  <div class="text-block">
    <div class="text-title mono">
      type-{{ text.variable }} <span>{{ text.label }}</span>
    </div>
    <div class="text-wrapper">
      <p :class="[text.variable, text.class]">{{ text.text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'text-block',
    props: {
      text: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style>
.text-block {
  overflow: hidden;
}
.text-title {
  color: rgba(0,0,0,.75);
  font-weight: 500;
  line-height: 24px;
  margin-bottom: var(--spacing-xs);
}
.text-title span {
  color: rgba(0,0,0,.45);
  font-weight: 400;
  font-size: var(--type-sm);
}
.text-wrapper {
  background: rgba(0,0,0,.03);
  padding: var(--spacing-md) 0;
  white-space: nowrap;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  overflow: hidden;
}
.text-wrapper > * {
  margin: 0;
}
</style>
