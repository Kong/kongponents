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
      <KModal @closed="toggleModal(false)()" :isVisible='isVisible' />
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
        action-button-text="Custom text"
        @closed="toggleModal(false)()" />
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
        @closed="toggleModal(false)()">
      <template slot="header-content">
          Custom header
        </template>
        <template slot="body-content">
          <p class="mt-0"><strong>Look Mah</strong></p>
          <p class="mt-0 mb-0">This content is slotted ;)</p>
        </template>
        <template slot="footer-dismiss">
          <KButton appearance="danger" @click="toggleModal(false)()">Destroy the things</KButton>
        </template>
      </Kmodal>
    </div>
    `,
    data: sharedData,
    methods: sharedMethods
  }), {info: {}})
