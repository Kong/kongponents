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
  padding: 1.5rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
  p {
    margin: 0;
    color: var(--black-70);
    background-color: var(--grey-100);
    border: 1px solid var(--grey-300);
    border-radius: 5px;
    padding: var(--spacing-xs);
  }
  .label {
    margin-bottom: .25rem;
    strong {
      font-weight: 600;
    }
    span {
      font-size: var(--type-sm);
      color: var(--c-text, var(--black-70));
    }
  }
}
</style>
