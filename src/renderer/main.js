import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './lang'
import Vector from './components/elements/Vector'
import './assets/styles/main.scss'

Vue.component('vector', Vector)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: { App },
	i18n,
	store,
	template: '<App/>'
}).$mount('#app')
