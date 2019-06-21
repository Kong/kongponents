import { storiesOf } from '@storybook/vue'
import { default as KHeading, sizes } from './KHeading.vue'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

storiesOf('Heading', module)
  .add('Default', () => ({
    components: { KHeading },
    template: `<KHeading>Default Heading</KHeader>`
  }), {info: {}})
  .add('Headings', () => ({
    components: { KHeading },
    template: `
    <div>
      ${headings.map(type => {
      return `<KHeading style="margin: 0 0 1rem" type="${type}">Heading ${type}</KHeading>`
    }).join('')}
    </div>`
  }), {info: {}})
  .add('Sizes', () => ({
    components: { KHeading },
    template: `
    <div>
      ${Object.values(sizes).map(size => {
      return `<KHeading type="p" size="${size}">${size}</KHeading>`
    }).join('')}
    </div>`
  }), {info: {}})
  .add('Fonts', () => ({
    components: { KHeading },
    template: `
    <div>
      <div>
        <h1>Sans Fonts</h1>
        <div>${Object.values(sizes).map(size => {
      return `<KHeading style="margin: 0 0 1rem" type="p" size="${size}" font="sans">${size}</KHeading>`
    }).join('')}</div>
      </div>
      <div>
        <h1>Mono Fonts</h1>
        <div>${Object.values(sizes).map(size => {
      return `<KHeading style="margin: 0 0 1rem" type="p" size="${size}" font="mono">${size}</KHeading>`
    }).join('')}</div>
      </div>
    </div>
    `
  }))
