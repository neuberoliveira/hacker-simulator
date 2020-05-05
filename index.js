const { app, ipcMain } = require('electron')
const { terminalWindow, sendTrickln, sendLoader } = require('./windows/terminalWindow')
const codeOutTrick = require('./tricks/code-out')

app.whenReady().then(() => {
	const terminalWindowBrowser = terminalWindow()

	ipcMain.on('first-cmd', (evt, cmd) => {
		sendTrickln('simple output')
		let i = 0
		setInterval(() => {
			sendLoader('loading' + Array(i).fill('').reduce((prev, cur) => prev += '.', ''), 'line-loader')
			i++
		}, 600)
	})
})
