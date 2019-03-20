import { configure, addDecorator, addParameters } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import {components, stories} from './index'
import { withInfo, setDefaults } from 'storybook-addon-vue-info'
import kongTheme from './kongTheme';

addParameters({
  options: {
    theme: kongTheme,
  },
});

// Install Vue plugins.
Vue.use(Vuex)

addDecorator(withInfo)

components(Vue)
configure(stories, module)
