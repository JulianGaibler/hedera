import { Menu, app } from 'electron'
import template from '../menu'

const builtMenu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(builtMenu)

app.on('ready', () => {
	const builtMenu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(builtMenu)
})