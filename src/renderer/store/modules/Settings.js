import AppData from '../../classes/AppData'

const state = {
	recentDocuments: []
}


const savePlugin = store => {
	//load settings if present
	let settings = AppData.loadJson('settings')
	if (settings) store.commit('Settings/setState', settings)
	
	store.subscribe((mutation, state) => {
		let type = mutation.type.split('/')
		// Check if this is our namespace
		if (type[0]!=='Settings') return
		// save settings to file
		if (type[1]!=='setState') {
			AppData.saveJson('settings', state.Settings)
		}
	})
}

const mutations = {
	setState: (state, payload) => {
		let arr = Object.keys(payload)
		for (var i = arr.length - 1; i >= 0; i--) {
			state[arr[i]] = payload[arr[i]]
		}
	},
	createDocument: (state, payload) => {
		state.recentDocuments.push(payload)
	},
	updateDocument: (state, payload) => {
		state.recentDocuments[payload.index] = payload.data
	},
	removeDocument: (state, index) => {
		state.recentDocuments.splice(index,1)
	}
}

const actions = {
	updateDocument ({ commit, dispatch }, data) {
		dispatch('findDocument', data.file).then( (result) => {
			if (result < 0) commit('createDocument', data)
			else commit('updateDocument', {index: result, data})
		})
	},
	removeDocument ({ commit, state }, file) {
		for (let i = state.recentDocuments.length - 1; i >= 0; i--) {
			if (state.recentDocuments[i].file === file) {
				commit('removeDocument', i)
				return
			}
		}
	},
	findDocument ({ state }, file) {
		for (let i = state.recentDocuments.length - 1; i >= 0; i--) {
			if (state.recentDocuments[i].file === file) {
				return i
			}
		}
		return -1
	},
}

const _modules = {
	namespaced: true,
	state,
	mutations,
	actions,
}
const _plugins = [savePlugin]

export { _modules, _plugins }
