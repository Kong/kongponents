<template functional>
  <div class="skeleton-form-wrapper">
    <div class="skeleton-form-row">
      <div class="box width-10 height-1" />
      <div class="box width-100 height-2" />
    </div>
    <div class="skeleton-form-row">
      <div class="box width-10 height-1" />
      <div class="box width-100 height-2" />
    </div>
    <div class="skeleton-form-row">
      <div class="box width-10 height-1" />
      <div class="box width-100 height-2" />
    </div>
    <div class="skeleton-form-row">
      <div class="box width-10 height-1" />
      <div class="box width-100 height-2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSkeleton'
}
</script>

<style lang="scss" scoped>
.skeleton-form-wrapper {
  width: 100%;
  .skeleton-form-row {
    margin-bottom: 2rem;
  }
}
</style>
