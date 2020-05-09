const { app, screen, ipcMain } = require('electron')
const { terminalWindow, sendLoader } = require('./windows/terminalWindow')
const store = require('./store')
const codeOutTrick = require('./tricks/code-out')
const openImage = require('./tricks/open-image')
const playVideo = require('./tricks/play-video')

app.whenReady().then(() => {
	store.screen = {
		width: screen.getPrimaryDisplay().workAreaSize.width,
		height: screen.getPrimaryDisplay().workAreaSize.height
	}

	terminalWindow()
	ipcMain.on('first-cmd', (evt, cmd) => {
		codeOutTrick()

		let i = 0
		setInterval(() => {
			sendLoader('loading' + Array(i).fill('').reduce((prev, cur) => prev += '.', ''), 'line-loader')
			i++
		}, 600)

		/* const imagePositionFactor = 60
		const firstWinX = (store.screen.width - 600) - (imagePositionFactor * 2)
		openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX, y: 100, width: 600, height: 600, delay: 0, autoCloseDelay: 3000 })
		openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX + (imagePositionFactor), y: 100 + (imagePositionFactor), width: 600, height: 600, delay: 200, autoCloseDelay: 2600 })
		openImage('./assets/image/top-secret.jpg', { x: firstWinX + (imagePositionFactor * 2), y: 100 + (imagePositionFactor * 2), width: 464, height: 600, delay: 400, autoCloseDelay: 2200 }) */

		/* playVideo('../assets/video/copy1.mp4', {
			width: 640,
			height: 360,
			onEnd: (win) => {
				win.close()
				win.destroy()
			}
		}) */
	})
})
