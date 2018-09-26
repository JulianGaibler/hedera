import AppData from './AppData'
import Helpers from './Helpers'
import Actions from './Collection/Actions'
import Dexie from 'dexie'

export default class Collection {

	constructor(path) {
		this.path = path
		this.data = AppData.loadCollection(path)

		this.db = new Dexie(path)
		this.db.version(1).stores({
			modules: '_id',
			terms: '_id',
		})

		this.undo = []
		this.redo = []
	}

	save() {
		// todo filter
		AppData.saveCollection(this.path, this.data)
	}

	//
	// Action execution
	//

	apply(action, invert) {

		this._apply(action, invert).then((result) => {
			console.warn(result)
		}).catch((error) => {
			console.warn(error)
		})

	}

	_apply(a, i) {
		if (i) a = Actions.invert(a)

		console.log(this.db[a.data_type])

		if (a.action_type === 'create') 
			return this.db[a.data_type].add(a.state)
	}

	//
	// Action creation
	//

	createModule(dependency_type, dependent_id) {
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

		this.apply(
			Actions.create('modules', 'create', {state})
		)
	}




}