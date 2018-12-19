import Actions from '../Actions'
import Helpers from '../../Helpers'

export default class hModule {
	/**
	 * Creates an empty module
	 * @param  {Number} dependency_type
	 * @param  {String} [dependent_id]
	 * @param  {Number} node_type
	 * @return {Action} create-action for Module
	 */
	static create(dependency_type, dependent_id, node_type=0) {
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
		if (node_type !== 0) {
			state = this.changeNodeType(state, node_type).to
		}

		return Actions.create('modules', 'create', {state})
	}

	static changeNodeType(state, node_type) {
		let s = {...state}
		s.node_type = node_type

		return Actions.create('modules', 'change', {from: state, to: s})
	}


}