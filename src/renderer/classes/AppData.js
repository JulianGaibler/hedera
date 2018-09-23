import Jetpack from 'fs-jetpack'
import Yaml from 'js-yaml'
import { app, remote } from 'electron'
const electronApp = (app || remote.app);

const filePath = remote.app.getPath('appData')+'/hedera'

export default class AppData {

	/**
	 * Writes config-file to AppData
	 *
	 * @param {string} fileName - name of config-file (without .json)
	 */
	static saveJson(fileName, data) {
		// Relaying the promise
		Jetpack.writeAsync(`${filePath}/${fileName}.json`, data, )
	}

	/**
	 * Reads config-file from AppData
	 *
	 * @param {string} fileName - name of config-file (without .json)
	 * @returns {String} Result
	 */
	static loadJson(fileName) {
		// Relaying the promise
		return Jetpack.read(`${filePath}/${fileName}.json`, 'json');
	}

	/**
	 * Creates a new Collection
	 *
	 * @param {string} collection.title - title
	 * @param {string} collection.title_short - abbreviation
	 * @param {string} collection.file - full path to file
	 * @param {number} collection.color - number of color (0-359)
	 * @returns {boolean} false if file already exists
	 */
	static createCollection({title, title_short, file, color}) {
		let result = Jetpack.exists(file);
		if (result === 'file') return false;

		let data = {
			title,
			title_short,
			version: 1,
			color,
			main_modules: [],
			reusable_modules: [],
			terms: [],
		}

		this.saveCollection(file, data)
		return true;
	}
	/**
	 * Checks if file exists
	 *
	 * @param {string} file - full path to file
	 * @returns {boolean} true if file exists
	 */
	static checkForFile(file) {
		return Jetpack.exists(file) === 'file';
	}

	/**
	 * Loads File
	 *
	 * @param {string} file - full path to file
	 * @returns {boolean} true if file exists
	 */
	static saveCollection(file, data) {
		let yData = Yaml.safeDump(data, { condenseFlow: true, noCompatMode: true, lineWidth: 200 })
		Jetpack.write(file, yData);
	}

	/**
	 * Loads File
	 *
	 * @param {string} file - full path to file
	 * @returns {boolean} true if file exists
	 */
	static loadCollection(file) {
		let yData = Jetpack.read(file, 'utf8');
		return Yaml.safeLoad(yData, { filename: file });
	}
}