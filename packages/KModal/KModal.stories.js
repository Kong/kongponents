import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import KModal from './KModal.vue'

const sharedData = function () {
  return {
    isVisible: false
  }
}

const sharedMethods = {
  toggleModal (isVisible) {
    return () => {
      this.isVisible = isVisible
    }
  }
}

storiesOf('Modal', module)
  .add('Default', () => ({
    components: { KModal },
    template: `
    <div>
      <KButton @click="toggleModal(true)()">Toggle Modal</KButton>
      <KModal @canceled="toggleModal(false)()" :isVisible='isVisible' />
    </div>
    `,
    data: sharedData,
    methods: sharedMethods
  }), {info: {}})
  .add('Button Props', () => ({
    components: { KModal },
    template: `
    <div>
      <KButton @click="toggleModal(true)()">Toggle Modal</KButton>
      <KModal
        :isVisible='isVisible'
        action-button-appearance="outline-primary"
        action-button-text="Custom confirm text"
        cancel-button-appearance="outline-danger"
        cancel-button-text="Custom cancel text"
<<<<<<< HEAD
        @closed="toggleModal(false)()" />
=======
        @canceled="toggleModal(false)()" />
>>>>>>> master
    </div>
    `,
    data: sharedData,
    methods: sharedMethods
  }), {info: {}})
  .add('Slots', () => ({
    components: { KModal },
    template: `
    <div>
      <KButton @click="toggleModal(true)()">Toggle Modal</KButton>
      <KModal
        :isVisible='isVisible'
        action-button-appearance="outline-primary"
        action-button-text="Click to move on"
<<<<<<< HEAD
        @closed="toggleModal(false)()">
=======
        @canceled="toggleModal(false)()">
>>>>>>> master
      <template slot="header-content">
          Custom header
        </template>
        <template slot="body-content">
          <p class="mt-0"><strong>Look Mah</strong></p>
          <p class="mt-0 mb-0">This content is slotted ;)</p>
        </template>
        <template slot="footer-content">
          <div style="margin-bottom: .5rem">I want some custom text above the buttons</div>
          <KButton
            appearance="primary"
            @click="doSomething">Submit Modal</KButton>
          <KButton
            appearance="secondary"
            @click="slottedIsOpen = false">Close Modal</KButton>
          <div style="margin-top: .5rem">I want some custom text below the buttons</div>
        </template>
      </Kmodal>
    </div>
    `,
    data: sharedData,
    methods: sharedMethods
  }), {info: {}})
