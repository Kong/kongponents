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
        has-left-border
        @closed="$emit('close', toaster.key)">
        <template v-slot:alertMessage>
          <div class="message">{{ toaster.message }}</div>
        </template>
      </KAlert>
    </div>
  </transition-group>
</template>

<script>
import KAlert, { appearances } from '@kongponents/kalert/KAlert.vue'

export const toasterAppearances = appearances

/**
 * @typedef {Object} Toaster - toaster item
 * @property {String} apperance - 'success', 'info', 'warning', 'danger'
 * @property {String} key - unique identifier of toaster
 * @property {String} message - Text to display in toaster
 */

export default {
  name: 'KToaster',
  components: { KAlert },
  data () {
    return {
      /**
      * @type Toaster[]
      */
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
    margin-left: 2rem;
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
  width: auto;
  bottom: 1rem;
  right: 1rem;
  max-width: 300px;
  z-index: 10000;
  transition: $transition;
}

.toaster-item {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  transition: $transition;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0,0,0,.12);

  .k-alert {
    --KAlertInfoBorder: var(--blue-500, color(blue-500));
    --KAlertSuccessBorder: var(--green-400, color(green-400));
    --KAlertWarningBorder: var(--yellow-300, color(yellow-300));
    --KAlertDangerBorder: var(--red-500, color(red-500));
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 1rem;
    text-align: left;
    background-color: #fff;
    color: var(--black-70);
  }

  .message {
-webkit-hyphens: auto;
   -moz-hyphens: auto;
        hyphens: auto;
    max-width: 150ch;
}
}

/* Vue Animations */
.toaster-enter { transform: translateX(300px); }
.toaster-leave-to { transform: translateX(100%); }
</style>
