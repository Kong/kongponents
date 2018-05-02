<template>
   <input type="text" class="input" id="textfield" placeholder="Textfield">
</template>

<script>
  export default {
    name: 'KInput',
    props: {
      /** 
        * Secondary styling of the input field<br>
        * One of ['outline-danger', 'disabled']
        */
      appearance: {
        type: String,
        validator: function (value) {
          return [
            'outline-danger',
            'disabled'
          ].indexOf(value) !== -1
        }
      },


    }
  }
</script>

<style scope>
  .input{
    display: block;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    padding: 8px 12px;
    font-size: 15px;
    color: hsla(0, 0%, 0%, .70);
    border-color: hsla(0, 0%, 0%, .12);
    background-color: #ffffff;
    border-radius: 3px;
    border-width: 1px;
  }

  .input:focus{
    outline: none !important;
    border: 1px solid hsla(205, 100%, 75%, 1);
  }

  .input:disabled{
    cursor: not-allowed;
    background-color: #f7f7f7;
    opacity: .75;
  }

  .input.input-error{
    outline: none !important;
    border: 1px solid hsla(1, 100%, 75%, 1);
  }
</style>
