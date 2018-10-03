import { Menu, app } from 'electron'
import template from '../darwinMenu'

app.on('ready', () => {
	const builtMenu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(builtMenu)
})