<template>
  <div
    :title="title"
    class="k-step-spinner mx-3"
  />
</template>

<script>
export default {
  name: 'KPendingState',
  props: {
    // TODO: probably can't support size / color - need to figure out background color though
    size: {
      type: String,
      default: '40'
    },
    color: {
      type: String,
      // TODO: var
      default: '#169FCC'
    },
    backgroundColor: {
      type: String,
      default: 'var(--white)'
    },
    title: {
      type: String,
      default: 'Completed'
    }
  }
}
</script>

<style lang="scss" scoped>
.k-step-spinner {
  font-size: 10px;
  text-indent: -9999em;
  width: var(--KStepStateWidth);
  height: var(--KStepStateWidth);
  border-radius: 50%;
  background: #038C8C;
  background: -moz-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #038C8C 10%, #B4B4B4, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #038C8C;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

 @-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
