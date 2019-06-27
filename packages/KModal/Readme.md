```js
new Vue({
  data(){
    return {
      isVisible: false
    }
  },
  methods: {
    toggleModal (isVisible) {
      this.isVisible = isVisible;
    },
  },
  template:`
    <div>
      <KButton @click="toggleModal(true)()">Toggle Modal</KButton>
      <KModal
        :isVisible='isVisible'
        action-button-appearance="outline-primary"
        action-button-text="Custom text"
        @closed="toggleModal(false)()" />
    </div>
  `
})
```
