import Vue from 'vue'

import App from './App'
import store from './store'
import Vector from './components/elements/Vector'

Vue.component('vector', Vector)

import css from './assets/styles/main.scss';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: { App },
	store,
	template: '<App/>'
}).$mount('#app')
