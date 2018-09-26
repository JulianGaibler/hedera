import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const files = require.context('.', false, /\.json$/)
let messages = {}
//let fileNames = []


files.keys().forEach(key => {
	if (key === './index.js') return
	//fileNames.push(key)
	messages[key.replace(/(\.\/|\.json)/g, '')] = files(key)
})

const i18n = new VueI18n({
	locale: 'en',
	messages,
})

// Todo if neccesary
//if (module.hot) {
//	module.hot.accept(['./en.json', './de.json'], () => {
//		i18n.setLocaleMessage('en', require('./en.json'))
//		i18n.setLocaleMessage('de', require('./de.json'))
//	})
//}

export default i18n