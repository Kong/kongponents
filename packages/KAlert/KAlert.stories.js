import { storiesOf } from '../../storybook/node_modules/@storybook/vue'

import { default as KAlert, appearances } from './KAlert.vue'
import KIcon from '../KIcon/KIcon.vue'

storiesOf('KAlert', module)
  .add('Alert - Dismissible', () => ({
    components: { KAlert },
    template: `<KAlert :isShowing="isShowing" isDismissible alertMessage="howdy!" @closed="dismissAlert" />`,
    data: () => {
      return {
        isShowing: true
      }
    },
    methods: {
      dismissAlert () {
        console.log('dismissed!')
        this.isShowing = false
      }
    }
  }), {info: {}})
  .add('Alert - Centered', () => ({
    components: { KAlert },
    template: `<KAlert isCentered alertMessage="I'm centered!" />`
  }), {info: {}})
  .add('Alert - Fixed', () => ({
    components: { KAlert },
    template: `<div style="height:200vh">
      <KAlert isFixed alertMessage="I'm fixed to the top!" />
    </div>`
  }), {info: {}})
  .add('Alert - Appearances', () => ({
    components: { KAlert },
    template: `
    <div>
      ${Object.keys(appearances).map(type => {
      return `<KAlert isDismissible alertMessage="${type}" appearance="${type}" style="margin-bottom: 10px;"/>`
    }).join('')}
    </div>`
  }), {info: {}})
  .add('Alert - Bordered', () => ({
    components: { KAlert },
    template: `
    <div>
      ${Object.keys(appearances).map(type => {
      return `<KAlert isBordered alertMessage="${type}" appearance="${type}" style="margin-bottom: 10px;"/>`
    }).join('')}
    </div>`
  }), {info: {}})
  .add('Alert - Small & Left Border', () => ({
    components: { KAlert },
    template: `
    <div>
      ${Object.keys(appearances).map(type => {
      return `<div style="width:300px; margin-bottom: 10px;">
        <KAlert hasLeftBorder size="small" alertMessage="${type}" appearance="${type}"/>
      </div>`
    }).join('')}
    </div>`
  }), {info: {}})
  .add('Alert - Slots', () => ({
    components: { KAlert, KIcon },
    template: `
    <div>
      ${Object.keys(appearances).map(type => {
      return `<div style="margin-bottom: 10px;">
          <KAlert appearance="${type}">
            <template slot="alertIcon">
              <KIcon icon="portal" />
            </template>
            <template slot="alertMessage">
              I have an icon and a <a href="">Link</a>!
            </template>
          </KAlert>
        </div>`
    }).join('')}

    </div>`
  }), {info: {}})
