import Dexie from 'dexie'
import {shell} from 'electron'

import AppData from './AppData'
import Helpers from './Helpers'
import Actions from './Collection/Actions'
import Listeners from './Collection/Listeners'

import 'dexie-observable'

export default class Collection {

	/**
	 * Loads Collection-Files and syncs them with local Database
	 * @constructor
	 * @param {string} path - Path to collection file
	 * @param {string} [menubar] - Reference to ManuHandler-Instance
	 */
	constructor(path, menubar) {
		this.path = path

		if (menubar) {
			this.menubar = menubar
			menubar.subscribe('undo', ()=>{this.doUndo()})
			menubar.subscribe('redo', ()=>{this.doUndo(true)})
		}

		this.undo = []
		this.redo = []
	}

	/**
	 * Initializes Collection, this can fail unlike the constructor-function
	 * @return {promise} Promise of successful instantiation
	 */
	init() {
		return new Promise((resolve, reject) => {
			try {
				this.data = AppData.loadCollection(this.path)
			} catch(e) {
				reject()
			}

			Dexie.delete(this.path).then(() => {

				this.db = new Dexie(this.path)
				this.db.version(1).stores({
					modules: '_id, dependency_type, dependent_id',
					terms: '_id',
				})
				// Upgrade for dexie-observable
				this.db.version(2).stores({})
		
				this.data2db().then(()=>{
					this.events = new Listeners(this.db)
			
					// This is nonsense, but otherwise the listener
					// won't be called until the second change.
					this.db.modules.count()

					resolve()
				}).catch(e => {
					//TODO
					console.log(e)
				}) 

			})
		})
	}

	/**
	 * Saves collection to file
	 */
	save() {
		return this.db2data().then(()=>AppData.saveCollection(this.path, this.data))
	}

	/**
	 * Closes all things that have to be closed
	 * when you don't need the collection anymore
	 */
	close() {
		this.save().then(()=>this.db.close())
		if (this.menubar) {
			this.menubar.unsubscribe('undo', this.undo)
			this.menubar.unsubscribe('redo', this.redo)
		}
	}

	/**
	 * Exports tables from db to this.data
	 */
	db2data() {
		return new Promise((resolve, reject) => {

			this.db.transaction('r', this.db.tables, async () => {
				let tables = this.db.tables
				let accumulator = []
				for (var i = tables.length - 1; i >= 0; i--) {
					// Filter all tables starting with _
					if (tables[i].name.startsWith('_')) {continue}
					// convert table into array
					const rows = await tables[i].toArray()
					accumulator.push({table: tables[i].name, rows: rows})
				}
				return Promise.all(accumulator)

			}).then(result => {
				for (var i = result.length - 1; i >= 0; i--) {
					this.data[result[i].table] = result[i].rows
				}
				resolve()
			}).catch(e => reject(e))


		})
	}

	/**
	 * Imports this.data to tables in db
	 */
	data2db() {
		let tables = ['modules', 'terms']
		return this.db.transaction('rw', this.db.tables, () => {
			return Promise.all(tables.map(t => 
				this.db.table(t).clear().then(()=>
					this.db.table(t).bulkAdd(this.data[t]))))
		})
	}



	//
	// Action execution
	//

	/**
	 * Any action that has to be made on the collection should be passed through here
	 * so it can be added to the undo-stack
	 * @param  {Action} Action-object
	 */
	apply(action) {
		console.log(`%cApplyAction: ${action.action_type}`, 'color: #bada55')
		this._apply(action).then((result) => {
			console.log('done: ', result)
			this.undo.push(action)
		}).catch((error) => {
			console.warn(error)
		})

	}

	/**
	 * Tries to execute actions
	 * [!] Bypasses undo/redo-stacks
	 * @param  {Action} Action-object
	 * @return {Promise} Promise
	 */
	_apply(a) {
		if (a.action_type === 'create') 
			return this.db[a.data_type].add(a.state)
		else if (a.action_type === 'remove')
			return this.db[a.data_type].delete(a.state._id)
		else if (a.action_type === 'change')
			return this.db[a.data_type].put(a.to, a.from._id)

		Promise.reject(new Error('Could not apply collection-action'))
	}

	/**
	 * @param  {Boolean} [doRedo] - if redo should be made instead of an undo
	 */
	doUndo(doRedo=false) {
		const from = doRedo ? 'redo' : 'undo'
		const to = doRedo ? 'undo' : 'redo'

		if (this[from].length < 1) {
			shell.beep()
			return
		}

		let a = this[from].pop()
		let ai = Actions.invert(a)


		this._apply(ai).then(() => {
			this[to].push(ai)
		}).catch(() => {
			// TODO throw error
			shell.beep()
			//this[from].push(a)
		})

	}

	/**
	 * Creates an empty term
	 */
	createTerm() {
		let state = {
			_id: Helpers.getRandomID('t'),
			title: '',
			sortkey: '',
			desc: '',
		}
		this.apply(
			Actions.create('terms', 'create', {state})
		)
	}




}