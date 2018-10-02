import { Menu, app } from 'electron'
import template from '../menu'

app.on('ready', () => {
	const builtMenu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(builtMenu)
})