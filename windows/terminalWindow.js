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

const sendTrick = (output) => {
	mainWindow.webContents.send('trick-output', {
		output,
		type: 'default',
		id: undefined,
	})
}

const sendTrickln = (output) => {
	mainWindow.webContents.send('trick-output', {
		output: `${output}<br />`,
		type: 'default',
		id: undefined,
	})
}

const sendLoader = (output, id) => {
	mainWindow.webContents.send('trick-output', {
		output,
		type: 'loader',
		id,
	})
}

module.exports = {
	terminalWindow,
	sendLoader,
	sendTrick,
	sendTrickln,
}