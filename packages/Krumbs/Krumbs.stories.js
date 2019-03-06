import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import Krumbs from './Krumbs'

storiesOf('Krumbs', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(StoryRouter())
  .add('Breadcrumbs', () => ({
    components: { Krumbs },
    template: `
      <Krumbs :items="routes" />
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
