<template>
  <div class="text-block">
    <div class="label">
      <strong>Variable Name:</strong> <span>{{ variableName }}</span>
    </div>
    <div class="label">
      <strong>Font Size:</strong> <span>{{ fontSize }}</span>
    </div>
    <div class="label">
      <strong>Class:</strong> <code>.type-{{variableName}}</code>
    </div>
    <div class="example">
      <p :class="[`type-${variableName}`, fontType === 'mono' && 'mono']">
        Kong is a Lua application running in Nginx
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'text-block',
    props: {
      fontType: {
        type: String,
        default: 'sans'
      },
      fontSize: {
        type: String,
        default: '16px'
      },
      variableName: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
.text-block {
  padding: 1.5rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
  p {
    margin: 0;
  }
  .label {
    margin-bottom: .25rem;
    strong {
      font-weight: 500;
    }
    span {
      font-size: var(--type-sm);
      color: var(--black-70);
    }
  }
}
</style>
