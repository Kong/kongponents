<template>
  <div class="modal" role="dialog" aria-hidden="true" @keyup.esc="close" tabindex="1">
    <div class="modal-backdrop" @click="close" ></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- @slot Use this slot to add a Modal Header/Title -->
          <slot name="header">Modal Title</slot>
        </div>
        <div class="modal-body">
          <!-- @slot Use this slot to fill the body of the Modal -->
          <slot name="body">Modal Body</slot>
        </div>
        <div class="modal-footer">
          <!-- @slot Use this slot to place items like buttons in the footer -->
          <slot name="footer">Modal Footer</slot>
          <KButton appearance='secondary' :isRounded='true' :handleClick="close">Cancel</KButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import KButton from '../KButton'
  
  export default {
    name: 'KModal',
    component: { KButton },

    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-dialog {
    position: relative;
    width: auto;
    max-width: 500px;
    margin: 50px auto;
    padding: 1rem;
    border-radius: 3px;
    background: #fff;
  }

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: .3rem;
    outline: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    border-bottom: 1px solid #eceeef;
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 15px 0;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-top: 1px solid #eceeef;
  }

  .modal-footer .button:last-child {
    margin-left: 13px;
  }
  
</style>
