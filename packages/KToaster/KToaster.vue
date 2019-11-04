<template>
  <transition-group
    name="toaster"
    tag="div"
    class="toaster-container-outer">
    <div
      v-for="toaster in toasterState"
      :key="toaster.key"
      class="toaster-item">
      <KAlert
        :appearance="toaster.appearance"
        is-dismissible
        is-bordered
        @closed="$emit('close', toaster.key)">
        <template v-slot:alertMessage>{{ toaster.message }}</template>
      </KAlert>
    </div>
  </transition-group>
</template>

<script>
import { default as KAlert, appearances } from '@kongponents/kalert'
import KIcon from '@kongponents/kicon'

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
  &.info {
    color: var(--KToasterInfoColor, var(--blue-dark, color(blue-dark)));
    border-color: var(--KToasterInfoBorder, var(--blue-light, color(blue-light)));
    background-color: var(--KToasterInfoBackground, var(--blue-lighter, color(blue-lighter)));
  }
  &.success {
    color: var(--KToasterSuccessColor, var(--green-dark, color(green-dark)));
    border-color: var(--KToasterSuccessBorder, var(--green-light-01, color(green-light-01)));
    background-color: var(--KToasterSuccessBackground, var(--green-lighter, color(green-lighter)));
  }
  &.danger {
    color: var(--KToasterDangerColor, var(--red-dark, color(red-dark)));
    border-color: var(--KToasterDangerBorder, var(--red-light-01, color(red-light-01)));
    background-color: var(--KToasterDangerBackground, var(--red-lighter, color(red-lighter)));
  }
  &.warning {
    color: var(--KToasterWarningColor, var(--yellow-darker, color(yellow-darker)));
    border-color: var(--KToasterWarningBorder, var(--yellow-light, color(yellow-light)));
    background-color: var(--KToasterWarningBackground, var(--yellow-lighter, color(yellow-lighter)));
  }

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
