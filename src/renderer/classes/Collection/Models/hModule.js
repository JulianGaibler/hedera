import Actions from '../Actions'
import Helpers from '../../Helpers'

export default class hModule {

	/**
	 * Creates an empty module
	 * @param  {number} dependency_type
	 * @param  {string} [dependent_id]
	 * @return {Action} create-action for Module
	 */
	static create(dependency_type, dependent_id) {
		let state = {
			_id: Helpers.getRandomID('m'),
			node_type: 0,
			dependency_type,
			title: '',
			sortkey: '',
			desc: '',
		}

		if (dependency_type === 0) 
			state.dependent_id = dependent_id

		return Actions.create('modules', 'create', {state})
	}

	static changeNodeType(state, type) {
		if (type !== 0) {
			delete state.and
			delete state.list
		}
		if (type === 1) {
			state.and = true
		}
		if (type === 2) {
			state.list = []
		}

		state.type = type
	}


}