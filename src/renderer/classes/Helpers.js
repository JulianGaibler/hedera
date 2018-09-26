import Color from 'color'

export default class Helpers {

	static titleRegex() {
		return /([\u2000-\u206F\u2190-\u21FF\u2200-\u22FF\u2500-\u257F\u0021-\u002C\u002E-\u002F\u2580-\u259F\u25A0-\u25FF\u2600-\u26FF\u2800-\u28FF\uFFF0-\uFFFF\u003A-\u0040\u005B-\u005F\u007B-\u007E])/g
	}

	/**
	 * Returns primary color for given color-number
	 *
	 * @param {number} hue between 0 and 359
	 * @returns {string} color as css-rgb
	 */
	static getColorPrimary(hue) {
		return Color.hsl(hue, 53, 40).rgb().string()
	}

	/**
	 * Returns secondary (lighter) color for given color-number
	 *
	 * @param {number} hue between 0 and 359
	 * @returns {string} color as css-rgb
	 */
	static getColorLight(hue) {
		return Color.hsl(hue, 52, 63).rgb().string()
	}

	/**
	 * Returns css gradient for given color-number
	 *
	 * @param {number} hue between 0 and 359
	 * @returns {string} color as cdd linear-gradient
	 */
	static getCssGradient(hue) {
		return `linear-gradient(135deg, ${this.getColorLight(hue)} 0%, ${this.getColorPrimary(hue)} 100%)`
	}

	/**
	 * Returns random number between min and max
	 *
	 * @param {number} min - smallest possible value
	 * @param {number} max - largest possible value
	 * @returns {number} random value
	 */
	static getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min
	}

	/**
	 * Returns real random number between min and max
	 *
	 * @param {number} min - smallest possible value
	 * @param {number} max - largest possible value
	 * @returns {number} random value
	 */
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	/**
	 * Generates a random module ID
	 *
	 * @param {string} prefix [optional]
	 * @returns {string} module ID
	 */
	static getRandomID(prefix) {
		let id = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(1)
		if (prefix) return prefix+=`_${id}`
		return id
	}
}