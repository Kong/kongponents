<template functional>
  <div class="skeleton-card-wrapper">
    <div
      v-for="c in props.cardCount"
      :key="c"
      class="skeleton-card-column">
      <div class="skeleton-card">
        <div class="skeleton-card-header">
          <div class="box width-2 height-2" />
          <div class="box width-10 height-2" />
        </div>
        <div class="skeleton-card-subheader">
          <div class="box width-6 height-1" />
          <div class="box width-6 height-1" />
        </div>
        <div class="skeleton-card-footer">
          <div class="box width-5 height-1" />
          <div class="box width-5 height-1" />
          <div class="box width-5 height-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSkeleton',
  props: {
    cardCount: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #e6e6e6;
.skeleton-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.skeleton-card-column {
  width: 33.33%;
  padding: 0 1rem 0 0;
  margin-bottom: 1rem;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  height: 324px;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid $borderColor;
  .skeleton-card-header {
    width: 100%;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dotted $borderColor;
    > div:nth-of-type(2) {
      margin-left: 1rem;
    }
  }
  .skeleton-card-subheader {
    display: flex;
    justify-content: space-between;
  }
  .skeleton-card-footer {
    display: flex;
    align-self: flex-end;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid $borderColor;
  }
}
</style>
