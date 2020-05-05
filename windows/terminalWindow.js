const { BrowserWindow, nativeImage } = require('electron')
const store = require('../store')

let mainWindow
function terminalWindow() {
	mainWindow = new BrowserWindow({
		width: store.screenWidth,
		height: 350,
		x: 0,
		y: 0,
		webPreferences: {
			nodeIntegration: true
		}
	})
	mainWindow.webContents.openDevTools()
	mainWindow.loadFile('./templates/terminal.html')
	return mainWindow
}

function sendTrick(output) {
	mainWindow.webContents.send('trick-output', {
		output,
		type: 'default',
		id: undefined,
	})
}

function sendTrickln(output) {
	mainWindow.webContents.send('trick-output', {
		output: `${output}<br />`,
		type: 'default',
		id: undefined,
	})
}

function sendLoader(output, id) {
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