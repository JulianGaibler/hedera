export default class Actions {

	//
	// Creating actions
	//

	static create(data_type, action_type, {_id, field, from, to, state}) {
		return {
			data_type,
			action_type,
			_id,
			field,
			from,
			to,
			state,
		}
	}


	//
	// Inverting actions for undo/redo
	//

	static invert(action) {
		switch(action.action_type) {
		case 'create':
			return this.invertExist(action)
		case 'remove':
			return this.invertExist(action)
		case 'edit':
			return this.invertAction(action)
		case 'change':
			return this.invertAction(action)
		}
	}

	static invertExist({data_type, action_type, state}) {
		// create turns into remove and vice versa
		return {
			data_type,
			action_type: (action_type==='remove') ? 'create' : 'remove',
			state,
		}
	}

	static invertAction({data_type, action_type, id, field, from, to}) {
		// edit or change gets inverted
		return {
			data_type,
			action_type,
			id,
			field,
			from: to,
			to: from,
		}
	}


}