export default class Listeners {

	constructor(db) {
		// subscribe to db-changes
		db.on('changes', (e) => {this.updateHandler(e)})
		this.subscriptions = {}
	}

	subscribe(table, func) {
		let t = this.subscriptions
		// create array if this is the first listener for this table
		if (!t[table]) t[table] = []
		// push to array
		t[table].push(func)
	}

	unsubscribe(table, func) {
		const t = this.subscriptions
		// check if the table does even exist
		if (!t[table]) return

		// find function and remove from array
		const i = t[table].indexOf(func)
		if (i > 0) t[table].splice(i, 1)
	}

	updateHandler(changes) {
		// split changes by tables
		let tables = this.splitByTable(changes)
		let tableNames = Object.keys(tables)
		for (let i = tableNames.length - 1; i >= 0; i--) {
			if (!this.subscriptions[tableNames[i]]) continue
			for (let j = this.subscriptions[tableNames[i]].length - 1; j >= 0; j--) {
				this.subscriptions[tableNames[i]][j](tables[tableNames[i]])
			}
		}

	}

	splitByTable(changes) {
		let obj = {}
		for (let i = changes.length - 1; i >= 0; i--) {
			let table = changes[i].table
			if (!obj[table]) obj[table] = []
			obj[table].push(changes[i])
		}
		return obj
	}

}