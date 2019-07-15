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
      <KModal @close="toggleModal(false)()" :isVisible='isVisible' />
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
      <KModal @close="toggleModal(false)()" :isVisible='isVisible'>
      <template slot="header-content">
          ⚠️ Are you sure?
        </template>
        <template slot="body-content">
          This is a destructive action and by clicking this button you will destroy things.
        </template>
        <template slot="footer-actions">&#8203;</template>
        <template slot="footer-dismiss">
          <KButton style="margin-left: 0;" appearance="danger" @click="toggleModal(false)()">Destroy the things</KButton>
        </template>
      </Kmodal>
    </div>
    `,
    data: sharedData,
    methods: sharedMethods
  }), {info: {}})
