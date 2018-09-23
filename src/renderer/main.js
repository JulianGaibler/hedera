import Vue from 'vue'

import App from './App'
import store from './store'
import Vector from './components/elements/Vector'
import './assets/styles/main.scss'

Vue.component('vector', Vector)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: { App },
	store,
	template: '<App/>'
}).$mount('#app')
