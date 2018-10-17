import {ipcRenderer} from 'electron'

export default class MenuHandler {

	constructor() {
		this.subscriptions = {}

		ipcRenderer.on('menuAction', (event, arg) => {this.updateHandler(arg, event)})
	}

	/**
	 * Subscribes to menu-item events
	 * @param  {string} id of menu item 
	 * @param  {function} function to be called when clicked
	 */
	subscribe(menuItem, func) {
		let t = this.subscriptions
		// create array if this is the first listener for this menu item
		if (!t[menuItem]) t[menuItem] = []
		// push to array
		t[menuItem].push(func)
	}

	/**
	 * Unsubscribes menu-item events
	 * @param  {string} id of menu item 
	 * @param  {function} function to be called when clicked
	 */
	unsubscribe(menuItem, func) {
		const t = this.subscriptions
		// check if the menu item does even exist
		if (!t[menuItem]) return

		// find function and remove from array
		const i = t[menuItem].indexOf(func)
		if (i > 0) t[menuItem].splice(i, 1)
	}

	/**
	 * Gets called on menu-action
	 */
	updateHandler(menuItem, event) {
		if (!this.subscriptions[menuItem]) return
		for (var i = this.subscriptions[menuItem].length - 1; i >= 0; i--) {
			this.subscriptions[menuItem][i](menuItem, event)
		}
	}

}