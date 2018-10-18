import { app, remote } from 'electron'
import Jetpack from 'fs-jetpack'
import Yaml from 'js-yaml'

const electronApp = (app || remote.app)

const filePath = electronApp.getPath('appData') + '/hedera'

export default class AppData {
	/**
	 * Writes config-file to AppData
	 *
	 * @param {string} fileName - name of config-file (without .json)
	 */
	static saveJson(fileName, data) {
		// Relaying the promise
		Jetpack.writeAsync(`${filePath}/${fileName}.json`, data)
	}

	/**
	 * Reads config-file from AppData
	 *
	 * @param {string} fileName - name of config-file (without .json)
	 * @returns {String} Result
	 */
	static loadJson(fileName) {
		// Relaying the promise
		return Jetpack.read(`${filePath}/${fileName}.json`, 'json')
	}

	/**
	 * Creates a new Collection
	 *
	 * @param {string} collection.title - title
	 * @param {string} collection.title_short - abbreviation
	 * @param {string} collection.file - full path to file
	 * @param {number} collection.color - number of color (0-359)
	 * @returns {number} 0 = okay, 1 = already exists, 2 = could not write file, 3 = other error
	 */
	static createCollection({title, title_short, file, color}) {
		const result = Jetpack.exists(file)
		if (result === 'file') return 1

		let data = {
			title,
			title_short,
			version: 1,
			color,
			main_modules: [],
			reusable_modules: [],
			terms: [],
			modules: [],
		}

		return this.saveCollection(file, data)
	}

	/**
	 * Checks if file exists
	 *
	 * @param {string} file - full path to file
	 * @returns {boolean} true if file exists
	 */
	static checkForFile(file) {
		return Jetpack.exists(file) === 'file'
	}

	/**
	 * Saves Collection
	 *
	 * @param {string} file - full path to file
	 * @param {string} data - data to be saved
	 * @returns {number} see createCollection()
	 */
	static saveCollection(file, data) {
		try {
			const yData = Yaml.safeDump(data, { condenseFlow: true, noCompatMode: true, lineWidth: 200 })
			Jetpack.write(file, yData)
		} catch(e) {
			if (e.syscall !== undefined) return 2
			return 3
		}
		return 0
	}

	/**
	 * Loads File
	 *
	 * @param {string} file - full path to file
	 * @returns {boolean} true if file exists
	 */
	static loadCollection(file) {
		const yData = Jetpack.read(file, 'utf8')
		return Yaml.safeLoad(yData, { filename: file })
	}
}
