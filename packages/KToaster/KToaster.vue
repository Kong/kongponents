<template>
  <transition name="slide">
    <div
      v-show="isVisible"
      :class="{visible: isVisible}"
      class="k-toaster">
      <div
        :class="appearance"
        class="k-toast">
        <a
          class="k-toast-btn-clear"
          @click="close()"/>
        <!-- @slot to add custom message if not passing :message prop -->
        <slot :name="message">{{ message }}</slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'KToaster',
  props: {
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      required: true
    },
    /**
      * Message to show in toaster
      */
    message: {
      type: String,
      required: true
    },
    /**
      * Amount of time in milliseconds before toaster hides
      */
    timeoutMilliseconds: {
      type: Number,
      default: 10000
    },
    /**
      * Color variantion of Toaster.<br>
      * Options: success, danger, info or warning
      */
    appearance: {
      type: String,
      default: 'info',
      validator: function (value) {
        return [
          'danger',
          'success',
          'info',
          'warning'
        ].indexOf(value) !== -1
      },
      required: false
    }
  },

  data () {
    return {
      toasterTimeout: null
    }
  },

  watch: {
    isVisible (newValue, oldValue) {
      if (newValue === true && newValue !== oldValue) {
        this.toasterTimeout = setTimeout(() => this.close(), this.timeoutMilliseconds)
      }
    }
  },

  methods: {
    close () {
      clearTimeout(this.toasterTimeout)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.k-toaster {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 10000;
  width: 300px;
  padding-left: 10px;
  padding-right: 10px;
}
.k-toaster .k-toast {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 1rem;
  border: 1px solid;
  border-radius: 8px;
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
  transition: all 0.3s ease;
}
.k-toaster .k-toast .k-toast-btn-clear {
  order: 1;
  margin-left: auto;
  border: 0;
  color: inherit;
  opacity: 0.45;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
}
.k-toaster .k-toast .k-toast-btn-clear:hover {
  opacity: 0.85;
}
.k-toaster .k-toast .k-toast-btn-clear::before {
  content: "\2715";
}

/* Toaster Variants */
.k-toaster .k-toast.success {
  color: #008038;
  border-color: #8cd9ac;
  background: #ecf9f2;
}
.k-toaster .k-toast.info {
  color: #004a80;
  border-color: #7cc9ff;
  background: #ebf7ff;
}
.k-toaster .k-toast.warning {
  color: #403624;
  border-color: #FFDF80;
  background-color: #FFF7E8;
}
.k-toaster .k-toast.danger {
  color: #c20d0a;
  border-color: #ff8080;
  background: #fff0f0;
}

/* Toaster Slide Animation */
.slide-enter-active,
.slide-leave-active {
  transition: all .4s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate(100%);
}

@media (max-width: 300px) {
  .k-toaster {
    width: 100%;
  }
}
</style>
