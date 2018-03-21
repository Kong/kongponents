import { configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import {components, stories} from '../index'

// Install Vue plugins.
Vue.use(Vuex)

components(Vue)
configure(stories, module)