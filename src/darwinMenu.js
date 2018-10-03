let send = function(menuItem, browserWindow) {
	if (browserWindow === null) return
	browserWindow.webContents.send('menuAction', menuItem.id)
}

// Use this shortcut for the click event:
// click: (a, b) => send(a, b)
// because it appears a lot in here

const menuTemplate = [
	{
		label: 'Hedera',
		submenu: [
			{role:'about'},
			{type:'separator'},
			{
				label: 'Preferences',
				accelerator: 'CmdOrCtrl+,',
			},
			{type:'separator'},
			{role:'quit'}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				id: 'undo',
				accelerator: 'CmdOrCtrl+Z',
				click: (a, b) => send(a, b)
			},
			{
				label: 'Redo',
				id: 'redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				click: (a, b) => send(a, b)
			},
			{type:'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'}
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'event2',
				id: 'event',
				click: (a, b) => send(a, b)
			}
		]
	}
]

export default menuTemplate