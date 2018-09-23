/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
const modules = {}
const plugins = []

files.keys().forEach(key => {
	if (key === './index.js') return;
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key)._modules;
	plugins.push(...files(key)._plugins);
})

export { modules, plugins }
