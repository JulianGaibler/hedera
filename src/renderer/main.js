import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './lang'
import MenuHandler from './classes/MenuHandler'
import Dexie from 'dexie'
import './assets/styles/main.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// https://electronjs.org/docs/tutorial/security
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true

// window.eval = global.eval = function () {
// 	throw new Error('Sorry, this app does not support window.eval().')
// }

// Keeping the database clean
if (process.env.NODE_ENV !== 'development') {
	Dexie.getDatabaseNames((dbs) => {
		for (var i = dbs.length - 1; i >= 0; i--) {
			Dexie.delete(dbs[i])
		}
	})
}

Vue.prototype.$menubar = new MenuHandler()

new Vue({
	components: { App },
	i18n,
	store,
	template: '<App/>'
}).$mount('#app')
