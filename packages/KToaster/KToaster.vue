<template>
  <transition-group
    name="toaster"
    tag="div"
    class="toaster-container-outer">
    <div
      v-for="toaster in toasterState"
      :key="toaster.key"
      class="toaster-item">
      <slot v-bind="toaster">
        <KAlert
          :appearance="toaster.appearance"
          is-dismissible
          is-bordered
          @closed="$emit('close', toaster.key)">
          <template v-slot:alertMessage>{{ toaster.message }}</template>
        </KAlert>
      </slot>
    </div>
  </transition-group>
</template>

<script>
import KAlert, { appearances } from '@kongponents/kalert/KAlert.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export const toasterAppearances = appearances

export default {
  name: 'KToaster',
  components: { KAlert, KIcon },
  data () {
    return {
      toasterState: []
    }
  }
}
</script>

<style lang="scss">
.toaster-item {
  .k-alert .close {
    position: relative;
    order: 1;
    right: 0;
    padding: 0 0 0 1rem;
    margin-left: auto;
    &:focus,
    &:active {
      outline: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';
$transition: all .3s;

.toaster-container-outer {
  position: fixed;
  top: 10px;
  right: 10px;
  width: auto;
  max-width: 300px;
  z-index: 10000;
  transition: $transition;
}

.toaster-item {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 3px;
  transition: $transition;
  overflow: hidden;

  .k-alert {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 1rem;
    text-align: left;
  }

  .message {
    flex: 1;
    padding: 1rem;
    text-align: left;
    transition: $transition;
  }
}

/* Vue Animations */
.toaster-enter { transform: translateX(300px); }
.toaster-leave-to { transform: translateX(100%); }
</style>
