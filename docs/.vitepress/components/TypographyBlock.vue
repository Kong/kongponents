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
        class="mt-2"
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
  padding: 24px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
  p {
    background-color: $kui-color-background-neutral-weakest;
    border: 1px solid $kui-color-border-neutral-weak;
    border-radius: 5px;
    color: $kui-color-text;
    margin: 0;
    padding: $kui-space-40;
  }
  .label {
    margin-bottom: 4px;
    strong {
      font-weight: 600;
    }
    span {
      color: var(--vp-c-text, $kui-color-text);
      font-size: $kui-font-size-30;
    }
  }
}
</style>
