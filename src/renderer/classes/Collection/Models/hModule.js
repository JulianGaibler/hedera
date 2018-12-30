import Actions from '../Actions'
import Helpers from '../../Helpers'

export default class hModule {
	/**
	 * Creates an empty module
	 * @param  {Number} dependency_type
	 * @param  {Object} [dependent]
	 * @param  {Number} node_type
	 * @return {Action} create-action for Module
	 */
	static create(dependency_type, dependent, node_type=0) {
		let state = {
			_id: Helpers.getRandomID('m'),
			node_type: 0,
			dependency_type,
			title: '',
			sortkey: '',
			desc: '',
		}

		if (node_type !== 0) {
			state = this.changeNodeType(state, node_type).to
		}

		let createAction = Actions.create('modules', 'create', {state})

		if (dependency_type === 0) {
			let newChildren = [...dependent.children, ...[createAction.state._id]]
			let editAction = Actions.create('modules', 'edit', {
				field: 'children',
				from: dependent.children,
				to: newChildren,
				_id: dependent._id,
			})
			return Actions.createSet([createAction, editAction])
		}
		else {
			return createAction
		}
	}

	static changeNodeType(state, node_type) {
		let s = {...state}

		if (node_type === 1 || node_type === 2) {
			if (!s.children) s.children = []
		} else {
			delete s.children
		}

		s.node_type = node_type
		return Actions.create('modules', 'change', {from: state, to: s})
	}


}