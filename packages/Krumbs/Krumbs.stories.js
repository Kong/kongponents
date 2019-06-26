import Vue from 'vue'
import { storiesOf } from '../../storybook/node_modules/@storybook/vue'
import StoryRouter from '../../storybook/node_modules/storybook-vue-router'

import Krumbs from './Krumbs'

storiesOf('Krumbs', module)
  .addDecorator(StoryRouter())
  .add('Breadcrumbs', () => ({
    components: { Krumbs },
    template: `
      <div><Krumbs :items="routes"></div>
    `,
    data: function () {
      return {
        routes: [
          {
            key: 'root-services',
            to: { name: 'services', params: {}, path: '/services/' },
            title: 'Services',
            text: 'Services'
          },
          {
            key: 'docs',
            to: 'https://docs.konghq.com',
            title: 'Go to Kong Docs',
            text: 'External Link'
          }
        ]
      }
    }
  }))
