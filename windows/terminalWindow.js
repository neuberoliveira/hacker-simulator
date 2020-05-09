const { BrowserWindow } = require('electron')
const { calcHeight } = require('../ratio-calculator')
const store = require('../store')

let mainWindow
const terminalWindow = () => {
	mainWindow = new BrowserWindow({
		width: store.screen.width,
		height: calcHeight(store.terminalRatio, store.screen.width),
		x: 0,
		y: 0,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// mainWindow.webContents.openDevTools()
	mainWindow.loadFile('./templates/terminal.html')
	return mainWindow
}



module.exports = terminalWindow