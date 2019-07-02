<template>
  <div class="preview-code">
    <div class="preview">
      <slot name="preview"></slot>
    </div>
    <div
      v-if="isOpen"
      class="editor">
      <slot name="editor"></slot>
    </div>
    <div
      class="actions"
      :class="{'closed' : !isOpen}"
      @click="() => isOpen = !isOpen">{{ isOpen ? 'Collapse code' : 'Open code' }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    }
  }
}
</script>

<style lang="scss">
$lightGry: #eaecef;
$darkGry: #282c34; // copied from prism class

.preview-code {
  margin: 2rem 0 3rem;
  box-shadow: none !important;
  border-radius: 6px;
  overflow: hidden;
  .preview {
    padding: 2rem .75rem;
    border: 2px solid $lightGry;
  }
  .editor {
    pre {
      margin: 0;
      border-radius: 0;
      &:focus {
        outline: none;
        border: none;
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #fff;
    background: lighten($darkGry, 5%);
    cursor: pointer;
    transition: all 200ms ease;
    &:hover {
      background: lighten($darkGry, 10%);
    }
    &.closed {
      color: #282c34;
      background: $lightGry;
    }
  }
}
</style>



