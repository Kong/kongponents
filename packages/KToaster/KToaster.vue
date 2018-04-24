<template>
  <transition name="slide">
    <div class="k-toaster" v-show="isVisible" :class="{visible: isVisible}">
      <div class="k-toast" :class="appearance">
        <a class="k-toast-btn-clear" @click="close()"></a>
        <!-- @slot to add custom message if not passing :message prop -->
        <slot :name="message">{{message}}</slot>
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
      default: {},
      required: true,
    },
    /**
      * Message to show in toaster
      */
    message: {
      type: String,
      default: {}
    },
    /**
      * Amount of time before toaster hides
      */
    timeout: {
      type: Number,
      default: 10000,
    },
    /**
      * Color variantion of Toaster.<br>
      * Options: success, danger or info
      */
    appearance: {
      type: String,
      validator: function (value) {
        return [
          'danger',
          'success',
          'info'
        ].indexOf(value) !== -1
      },
      required: true,
    },
  },

  watch: {
    isVisible: function (newValue, oldValue) {
      newValue === true && newValue !== oldValue
        ? setTimeout(() => this.close(), this.timeout)
        : null
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scope>
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
  color: #fff;
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
