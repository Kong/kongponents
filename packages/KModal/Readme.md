```js
new Vue({
  data(){
    return {
      isVisible: false
    }
  },
  methods: {
    showModal() {
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    doAThing() {
      console.log('A THING!')
    }
  },
  template:`
    <div>
      <KButton appearance='primary' :isRounded='true' :handleClick="showModal">Open Modal</KButton>
      <KModal :isVisible='isVisible' @close='closeModal'>
        <template slot="header">{{ modalHeader }}</template>
        <template slot="body">{{ modalBody }}</template>
        <template slot="footer-actions">
          <KButton appearance='danger' :isRounded='true' :handleClick='doAThing'>Do A Thing!</KButton>
        </template>
      </Kmodal>
    </div>
  `
})
```
