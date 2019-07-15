import { configure, addDecorator, addParameters } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import {components, stories} from './index'
import { withInfo, setDefaults } from 'storybook-addon-vue-info'
import withRouter from 'storybook-vue-router'
import kongTheme from './kongTheme';

addParameters({
  options: {
    theme: kongTheme,
  },
});

// Install Vue plugins.
Vue.use(Vuex)

addDecorator(withInfo)
addDecorator(withRouter())

components(Vue)
configure(stories, module)
