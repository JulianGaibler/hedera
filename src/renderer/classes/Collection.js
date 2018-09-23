import AppData from './AppData'

export default class Collection {

	constructor(path) {
		this.path = path;
		this.data = AppData.loadCollection(path);
	}

	save() {
		AppData.saveCollection(this.path, this.data)
	}

	// Need a well defined set of actions for cmd-z and cmd-y

}