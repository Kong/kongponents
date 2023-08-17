<template>
  <div class="typography-block">
    <div class="label">
      <strong>Variable Name:</strong> <span>{{ variableName }}</span>
    </div>
    <div v-if="fontSize" class="label">
      <strong>Font Size:</strong> <span>{{ fontSize }}</span>
    </div>
    <div class="label">
      <strong>Class:</strong> <code>.{{prefix}}{{variableName}}</code>
    </div>
    <div class="example">
      <strong>Sample:</strong>
      <p
        class="example-description"
        :class="[`${prefix}${variableName}`, fontType === 'mono' && 'mono', styleClasses]">
        Kong is a Lua application running in Nginx
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TypographyBlock',
  props: {
    prefix: {
      type: String,
      default: ''
    },
    fontType: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    variableName: {
      type: String,
      required: true
    },
    styleClasses: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.typography-block {
  padding: $kui-space-80 $kui-space-0;
  &:not(:last-child) {
    border-bottom: $kui-border-width-10 solid $kui-color-border;
  }
  p {
    background-color: $kui-color-background-neutral-weakest;
    border: $kui-border-width-10 solid $kui-color-border-neutral-weak;
    border-radius: $kui-border-radius-20;
    color: $kui-color-text;
    margin: $kui-space-0;
    padding: $kui-space-40;
  }
  .label {
    margin-bottom: $kui-space-20;
    strong {
      font-weight: $kui-font-weight-semibold;
    }
    span {
      color: $kui-color-text;
      font-size: $kui-font-size-30;
    }
  }
  .example {
    .example-description {
      margin-top: $kui-space-20;
    }
  }
}
</style>
